import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const CameraController = () => {
  const { camera, size } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentPositionRef = useRef(new THREE.Vector3(0, 0, 4));
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : true;

  const baseCameraPosition = {
    x: 0,
    y: 0,
    z: 4,
  };

  useFrame(() => {
    const mouse = mouseRef.current;

    if (prefersReducedMotion) {
      camera.position.set(
        baseCameraPosition.x,
        baseCameraPosition.y,
        baseCameraPosition.z,
      );
      camera.lookAt(targetRef.current);
      return;
    }

    const tiltX = (mouse.y - 0.5) * 0.3;
    const tiltY = (mouse.x - 0.5) * 0.3;

    const targetPosition = new THREE.Vector3(
      baseCameraPosition.x + tiltY,
      baseCameraPosition.y - tiltX,
      baseCameraPosition.z,
    );

    currentPositionRef.current.lerp(targetPosition, 0.1);

    camera.position.copy(currentPositionRef.current);
    camera.lookAt(targetRef.current);
  });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX / size.width;
      mouseRef.current.y = event.clientY / size.height;
    };
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [size]);

  return null;
};

export default CameraController;
