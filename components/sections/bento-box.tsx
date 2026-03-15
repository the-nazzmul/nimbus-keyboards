import { BENTO_BOX_FEATURES } from "@/lib/constants";
import { BentoBoxItem } from "../bento-box-item";
import { Bounded } from "../bounded";
import { FadeIn } from "../fade-in";

const BentoBox = () => {
  return (
    <Bounded>
      <FadeIn>
        <h2
          id="features"
          className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl"
        >
          Vapor75 Features
        </h2>
      </FadeIn>
      <FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {BENTO_BOX_FEATURES.map((feature) => (
          <BentoBoxItem
            key={feature.title}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            size={feature.size as "small" | "medium" | "large"}
          />
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;
