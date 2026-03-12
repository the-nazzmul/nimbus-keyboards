import BentoBox from "@/components/sections/bento-box";
import CustomKeycaps from "@/components/sections/custom-keycaps";
import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";
import SoundPlayground from "@/components/sections/sound-playground";

export default function Home() {
  return (
    <main>
      <Hero />
      <BentoBox />
      <Marquee />
      <SoundPlayground />
      <Marquee direction="right" />
      <CustomKeycaps />
      <Marquee />
    </main>
  );
}
