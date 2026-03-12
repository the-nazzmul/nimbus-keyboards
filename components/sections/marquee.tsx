import { MARQUEE_PHRASES } from "@/lib/constants";
import { LogoMark } from "../logo-mark";
import { Fragment } from "react/jsx-runtime";
import clsx from "clsx";

const MarqueeContent = () => (
  <div className="flex items-center bg-gray-200 py-10 whitespace-nowrap">
    {MARQUEE_PHRASES.map((phrase, i) => (
      <Fragment key={i}>
        <div className="font-bold-slanted px-14 text-[180px] leading-none text-gray-400/80 uppercase [text-box:trim-both_cap_alphabetic] md:text-[260px]">
          {phrase}
        </div>
        <LogoMark className="size-36 shrink-0" />
      </Fragment>
    ))}
  </div>
);

const Marquee = ({ direction }: { direction?: "left" | "right" }) => {
  return (
    <section>
      <div
        className="relative flex w-full items-center overflow-hidden select-none"
        aria-hidden="true"
        role="presentation"
      >
        <div className="relative flex items-center whitespace-nowrap">
          <div
            className={clsx(
              "marquee-track animate-marquee flex",
              direction === "right" && "[animation-direction:reverse]",
            )}
          >
            {/* Content to duplicate */}
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
