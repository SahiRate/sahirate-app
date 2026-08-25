"""
SahiRate SmartBuild - Universal Calculation Engine
"""

from .rules import (
    get_rule,
    BRICK_RULE,
    RCC_RULE,
    get_aggregate_specification,
)
from .labour import calculate_labour
from .pcc_engine import calculate_pcc
from .plaster_engine import calculate_plaster
from .foundation_engine import calculate_foundation
from .cost import (
    PriceProvider,
    calculate_material_cost,
    calculate_labour_cost,
)

from .registry import get_rule_metadata
from .schema import (
    build_estimate_metadata,
    validate_estimate,
)


class CalculationEngine:

    def __init__(
        self,
        price_provider: PriceProvider | None = None,
    ):
        self.price_provider = (
            price_provider
            or PriceProvider()
        )

    def calculate(
        self,
        purpose: str,
        inputs: dict,
    ) -> dict:

        if purpose == "brick_wall":
            return self.calculate_brick_wall(inputs)

        if purpose == "rcc_slab":
            return self.calculate_rcc_slab(inputs)

        if purpose == "pcc":
            return calculate_pcc(
                inputs,
                self.price_provider,
            )

        if purpose == "plaster":
            return calculate_plaster(
                inputs,
                self.price_provider,
            )

        if purpose == "foundation":
            return calculate_foundation(
                inputs,
                self.price_provider,
            )

        rule = get_rule(purpose)

        missing = [
            field
            for field in rule["inputs"]
            if field not in inputs
        ]

        if missing:
            raise ValueError(
                f"Missing inputs for {purpose}: "
                f"{', '.join(missing)}"
            )

        return {
            "purpose": purpose,
            "rule": rule["name"],
            "inputs": inputs,
            "materials": [],
            "labour": [],
            "duration": None,
            "cost": {
                "material_total": None,
                "labour_total": None,
                "grand_total": None,
                "status": "NOT_CALCULATED",
            },
            "status": "RULE_READY",
        }


    # ========================================================
    # BRICK WALL
    # ========================================================

    def calculate_brick_wall(
        self,
        inputs: dict,
    ) -> dict:

        required = [
            "length",
            "height",
            "thickness",
        ]

        missing = [
            field
            for field in required
            if field not in inputs
        ]

        if missing:
            raise ValueError(
                "Missing brick-wall inputs: "
                + ", ".join(missing)
            )

        length = float(inputs["length"])
        height = float(inputs["height"])
        thickness = float(inputs["thickness"])

        if length <= 0 or height <= 0 or thickness <= 0:
            raise ValueError(
                "Length, height and thickness "
                "must be greater than zero."
            )

        wall_volume_cft = (
            length * height * thickness
        )

        wall_volume_m3 = (
            wall_volume_cft * 0.028316846592
        )

        base_bricks = (
            wall_volume_m3
            * BRICK_RULE["bricks_per_m3"]
        )

        bricks_required = (
            base_bricks
            * (1 + BRICK_RULE["wastage"]["bricks"])
        )

        mortar_wet_m3 = (
            wall_volume_m3
            * BRICK_RULE["mortar_fraction"]
        )

        mortar_dry_m3 = (
            mortar_wet_m3
            * BRICK_RULE["mortar_wet_to_dry_factor"]
        )

        cement_m3 = mortar_dry_m3 / 7
        sand_m3 = mortar_dry_m3 * 6 / 7

        cement_bags = (
            cement_m3
            / 0.0347
        )

        sand_cft = (
            sand_m3
            * 35.3146667215
        )

        cement_bags *= (
            1 + BRICK_RULE["wastage"]["cement"]
        )

        sand_cft *= (
            1 + BRICK_RULE["wastage"]["sand"]
        )

        brick_grade = inputs.get(
            "brick_grade",
            "A",
        )

        grade = BRICK_RULE[
            "brick_grades"
        ].get(brick_grade)

        if grade is None:
            raise ValueError(
                "brick_grade must be A, B or C."
            )

        tractors = (
            bricks_required
            / BRICK_RULE["trade_unit"]["typical_quantity"]
        )

        labour = calculate_labour(
            purpose="brick_wall",
            quantity_m3=wall_volume_m3,
            mason_count=inputs.get("mason_count"),
            helper_count=inputs.get("helper_count"),
        )

        material_items = [
            {
                "slug": "bricks",
                "quantity": round(bricks_required),
                "unit": "piece",
            },
            {
                "slug": "cement",
                "quantity": round(cement_bags, 2),
                "unit": "bag",
            },
            {
                "slug": "sand",
                "quantity": round(sand_cft, 2),
                "unit": "cft",
            },
        ]

        priced_materials = []

        for item in material_items:
            price = self.price_provider.get_price(
                item["slug"]
            )

            priced_materials.append(
                {
                    **item,
                    **calculate_material_cost(
                        item["quantity"],
                        price,
                    ),
                }
            )

        labour_items = [
            {
                "role": "mason",
                "count": labour["mason"]["count"],
                "person_days": labour["mason"]["person_days"],
            },
            {
                "role": "helper",
                "count": labour["helper"]["count"],
                "person_days": labour["helper"]["person_days"],
            },
        ]

        priced_labour = []

        for item in labour_items:
            price = self.price_provider.get_labour_rate(
                item["role"]
            )

            priced_labour.append(
                {
                    **item,
                    **calculate_labour_cost(
                        item["person_days"],
                        price,
                    ),
                }
            )

        return self._build_estimate(
            purpose="brick_wall",
            rule_name="Brick Wall Preliminary Estimation",
            inputs={
                "length_ft": length,
                "height_ft": height,
                "thickness_ft": thickness,
                "brick_grade": brick_grade,
            },
            quantities={
                "wall_volume_cft": round(
                    wall_volume_cft, 3
                ),
                "wall_volume_m3": round(
                    wall_volume_m3, 3
                ),
                "bricks": round(
                    bricks_required
                ),
                "cement_bags": round(
                    cement_bags, 2
                ),
                "sand_cft": round(
                    sand_cft, 2
                ),
                "typical_1500_piece_loads": round(
                    tractors, 2
                ),
            },
            materials=priced_materials,
            labour=priced_labour,
            duration_days=labour[
                "estimated_duration_days"
            ],
            extra={
                "brick_grade": grade,
                "trade_unit": BRICK_RULE["trade_unit"],
            },
        )


    # ========================================================
    # RCC ROOF SLAB
    # ========================================================

    def calculate_rcc_slab(
        self,
        inputs: dict,
    ) -> dict:

        required = [
            "length",
            "width",
            "thickness",
        ]

        missing = [
            field
            for field in required
            if field not in inputs
        ]

        if missing:
            raise ValueError(
                "Missing RCC slab inputs: "
                + ", ".join(missing)
            )

        length = float(inputs["length"])
        width = float(inputs["width"])
        thickness = float(inputs["thickness"])

        if length <= 0 or width <= 0 or thickness <= 0:
            raise ValueError(
                "Length, width and thickness "
                "must be greater than zero."
            )

        # Dimensions expected in feet.
        wet_volume_cft = (
            length
            * width
            * thickness
        )

        wet_volume_m3 = (
            wet_volume_cft
            * 0.028316846592
        )

        dry_volume_m3 = (
            wet_volume_m3
            * RCC_RULE["dry_volume_factor"]
        )

        mix = RCC_RULE["nominal_mix"]

        mix_total = (
            mix["cement"]
            + mix["sand"]
            + mix["aggregate"]
        )

        cement_m3 = (
            dry_volume_m3
            * mix["cement"]
            / mix_total
        )

        sand_m3 = (
            dry_volume_m3
            * mix["sand"]
            / mix_total
        )

        aggregate_m3 = (
            dry_volume_m3
            * mix["aggregate"]
            / mix_total
        )

        cement_bags = (
            cement_m3
            / RCC_RULE["cement_bag_volume_m3"]
        )

        sand_cft = (
            sand_m3
            * 35.3146667215
        )

        aggregate_cft = (
            aggregate_m3
            * 35.3146667215
        )

        cement_bags *= (
            1 + RCC_RULE["wastage"]["cement"]
        )

        sand_cft *= (
            1 + RCC_RULE["wastage"]["sand"]
        )

        aggregate_cft *= (
            1 + RCC_RULE["wastage"]["aggregate"]
        )

        tmt_kg = (
            wet_volume_m3
            * RCC_RULE["tmt_kg_per_m3"]
        )

        tmt_kg *= (
            1 + RCC_RULE["wastage"]["tmt-steel"]
        )

        aggregate_size = inputs.get(
            "aggregate_size",
            RCC_RULE["default_aggregate"],
        )

        aggregate_spec = get_aggregate_specification(
            aggregate_size
        )

        # Preliminary labour basis.
        labour = calculate_labour(
            purpose="rcc_slab",
            quantity_m3=wet_volume_m3,
            mason_count=inputs.get("mason_count"),
            helper_count=inputs.get("helper_count"),
        )

        material_items = [
            {
                "slug": "cement",
                "quantity": round(cement_bags, 2),
                "unit": "bag",
            },
            {
                "slug": "sand",
                "quantity": round(sand_cft, 2),
                "unit": "cft",
            },
            {
                "slug": "aggregate",
                "quantity": round(aggregate_cft, 2),
                "unit": "cft",
                "specification": aggregate_size,
            },
            {
                "slug": "tmt-steel",
                "quantity": round(tmt_kg, 2),
                "unit": "kg",
                "specification": inputs.get(
                    "tmt_grade",
                    "Fe-500",
                ),
            },
        ]

        priced_materials = []

        for item in material_items:
            price = self.price_provider.get_price(
                item["slug"]
            )

            priced_materials.append(
                {
                    **item,
                    **calculate_material_cost(
                        item["quantity"],
                        price,
                    ),
                }
            )

        labour_items = [
            {
                "role": "mason",
                "count": labour["mason"]["count"],
                "person_days": labour["mason"]["person_days"],
            },
            {
                "role": "helper",
                "count": labour["helper"]["count"],
                "person_days": labour["helper"]["person_days"],
            },
        ]

        priced_labour = []

        for item in labour_items:
            price = self.price_provider.get_labour_rate(
                item["role"]
            )

            priced_labour.append(
                {
                    **item,
                    **calculate_labour_cost(
                        item["person_days"],
                        price,
                    ),
                }
            )

        return self._build_estimate(
            purpose="rcc_slab",
            rule_name="RCC Roof Slab Preliminary Estimation",
            inputs={
                "length_ft": length,
                "width_ft": width,
                "thickness_ft": thickness,
                "aggregate_size": aggregate_size,
                "tmt_grade": inputs.get(
                    "tmt_grade",
                    "Fe-500",
                ),
            },
            quantities={
                "wet_volume_cft": round(
                    wet_volume_cft, 3
                ),
                "wet_volume_m3": round(
                    wet_volume_m3, 3
                ),
                "dry_volume_m3": round(
                    dry_volume_m3, 3
                ),
                "cement_bags": round(
                    cement_bags, 2
                ),
                "sand_cft": round(
                    sand_cft, 2
                ),
                "aggregate_cft": round(
                    aggregate_cft, 2
                ),
                "tmt_kg": round(
                    tmt_kg, 2
                ),
            },
            materials=priced_materials,
            labour=priced_labour,
            duration_days=labour[
                "estimated_duration_days"
            ],
            extra={
                "aggregate_specification": aggregate_spec,
                "calculation_status": (
                    "PRELIMINARY_ESTIMATE"
                ),
                "engineering_note": (
                    "Final RCC mix, reinforcement and "
                    "structural quantities must follow "
                    "approved project design/specification."
                ),
            },
        )


    # ========================================================
    # COMMON ESTIMATE BUILDER
    # ========================================================

    @staticmethod
    def _build_estimate(
        purpose: str,
        rule_name: str,
        inputs: dict,
        quantities: dict,
        materials: list,
        labour: list,
        duration_days: float,
        extra: dict | None = None,
    ) -> dict:

        material_total = sum(
            item["amount"]
            for item in materials
            if item["amount"] is not None
        )

        labour_total = sum(
            item["amount"]
            for item in labour
            if item["amount"] is not None
        )

        rates_missing = any(
            item["amount"] is None
            for item in materials + labour
        )

        grand_total = None

        if not rates_missing:
            grand_total = round(
                material_total + labour_total,
                2,
            )

        rule_metadata = get_rule_metadata(
            purpose
        )

        result = {
            **build_estimate_metadata(
                purpose,
                rule_metadata,
            ),
            "rule": rule_name,
            "inputs": inputs,
            "quantities": quantities,
            "materials": materials,
            "labour": labour,
            "duration": {
                "estimated_days": round(
                    duration_days,
                    2,
                ),
            },
            "cost": {
                "material_total": round(
                    material_total,
                    2,
                ),
                "labour_total": round(
                    labour_total,
                    2,
                ),
                "grand_total": grand_total,
                "status": (
                    "COMPLETE"
                    if grand_total is not None
                    else "RATE_DATA_REQUIRED"
                ),
            },
            "status": (
                "PRELIMINARY_ESTIMATE"
            ),
        }

        if extra:
            result.update(extra)

        return validate_estimate(result)





