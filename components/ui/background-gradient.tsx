import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const mouseX = React.useRef(0);
  const mouseY = React.useRef(0);

  const [{ x, y }, setPosition] = React.useState({ x: 0, y: 0 });

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!animate) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;
        setPosition({ x: mouseX.current, y: mouseY.current });
      }
    };

    ref.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      ref.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animate]);

  return (
    <div
      className={cn("relative overflow-hidden", containerClassName)}
      ref={ref}
    >
      <div
        className={cn(
          "relative z-10 backdrop-blur-[2px] bg-gradient-to-br from-black/70 to-black/40",
          className
        )}
      >
        {children}
      </div>
      {animate && (
        <div
          className="absolute inset-0 z-0 opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(29,78,216,0.15), transparent 80%)`,
          }}
        />
      )}
    </div>
  );
};