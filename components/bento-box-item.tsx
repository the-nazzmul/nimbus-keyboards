import clsx from "clsx";
import Image from "next/image";

type BentoBoxItemProps = {
  title: string;
  description: string;
  image: string;
  size: "small" | "medium" | "large";
};

export function BentoBoxItem({
  title,
  description,
  image,
  size,
}: BentoBoxItemProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-3xl",
        size === "small" && "md:col-span-2",
        size === "medium" && "md:col-span-3",
        size === "large" && "md:col-span-4",
      )}
    >
      <Image
        src={image}
        alt={title}
        width={700}
        height={700}
        className="h-full w-full object-cover"
        quality={90}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-black"></div>
      <p className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
        <strong>{title}</strong> {description}
      </p>
    </div>
  );
}
