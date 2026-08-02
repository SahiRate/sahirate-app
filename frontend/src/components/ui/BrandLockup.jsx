import { Link } from "react-router-dom";
import HorizontalLockup from "@/assets/horizontal-lockup.png";

export default function BrandLockup() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center"
      aria-label="SahiRate"
    >
      <img
        src={HorizontalLockup}
        alt="SahiRate"
        draggable={false}
        className="h-[66px] w-auto lg:h-[74px]"
      />
    </Link>
  );
}