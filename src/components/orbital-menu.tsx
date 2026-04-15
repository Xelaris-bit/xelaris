"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Logo from "./icons/logo";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type OrbitalMenuProps = {
  benefits: Benefit[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  logoUrl?: string;
};

const OrbitalMenu = ({
  benefits,
  activeTab,
  setActiveTab,
  logoUrl,
}: OrbitalMenuProps) => {
  const centerCircleSize = 120;
  const orbitRadius = 150;
  const itemSize = 70;

  return (
    <div className="relative flex h-[400px] w-full items-center justify-center">
      {/* Orbit Path */}
      <div
        className="absolute rounded-full border-2 border-dashed border-primary/30"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
        }}
      ></div>

      {/* Center Circle */}
      <div
        className="absolute flex items-center justify-center rounded-full bg-primary/10 text-primary gap-0.5 p-4"
        style={{
          width: centerCircleSize,
          height: centerCircleSize,
        }}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="object-contain w-full h-full max-h-[80px]" />
        ) : (
          <Logo style={{ height: 'var(--logo-size, 32px)', width: 'auto' }} />
        )}
      </div>

      {/* Orbiting Items */}
      {benefits.map((benefit, index) => {
        const angle = (index / benefits.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;

        return (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              "absolute flex transform items-center justify-center rounded-full shadow-lg transition-all duration-300 group",
              activeTab === index
                ? "scale-110 bg-primary text-primary-foreground z-10"
                : "bg-primary text-primary-foreground gradient-hover hover:text-primary-foreground",
              "orbiting-item"
            )}
            style={{
              width: itemSize,
              height: itemSize,
              animationDelay: `${-20 * (index / benefits.length)}s`,
              '--orbit-radius': `${orbitRadius}px`,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
            } as React.CSSProperties}

          >
            <benefit.icon
              className={cn(
                "h-8 w-8 transition-colors",
                activeTab === index
                  ? "text-primary-foreground"
                  : "text-primary-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default OrbitalMenu;
