"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { useRef } from "react";

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

export const FadeIn = ({
  children,
  vars = {},
  className,
  targetChildren = false,
}: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    const target = targetChildren ? el?.children : el;

    if (!el || !target) return;

    gsap.set(target, {
      opacity: 0,
      y: 60,
    });

    const tween = gsap.to(target, {
      duration: 0.8,
      opacity: 1,
      ease: "power3.out",
      y: 0,
      stagger: 0.2,
      paused: true,
      ...vars,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        tween.play();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  });
  return (
    <div ref={containerRef} className={clsx(className)}>
      {children}
    </div>
  );
};
