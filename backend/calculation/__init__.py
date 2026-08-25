"""
SahiRate SmartBuild - Calculation Package
"""

from .engine import CalculationEngine
from .units import convert
from .registry import (
    RULE_REGISTRY,
    get_rule_metadata,
)

from .reference_registry import (
    REFERENCE_REGISTRY,
    get_reference,
    references_for_region,
)

from .region_rules import (
    REGION_RULE_OVERRIDES,
    get_region_rule_metadata,
)

from .aggregate_provider import (
    AggregateRateProvider,
)
from .schema import (
    ESTIMATE_SCHEMA_VERSION,
    build_estimate_metadata,
    validate_estimate,
)

__all__ = [
    "CalculationEngine",
    "convert",
    "RULE_REGISTRY",
    "get_rule_metadata",
    "REFERENCE_REGISTRY",
    "get_reference",
    "references_for_region",
    "REGION_RULE_OVERRIDES",
    "get_region_rule_metadata",
    "AggregateRateProvider",
    "ESTIMATE_SCHEMA_VERSION",
    "build_estimate_metadata",
    "validate_estimate",
]


