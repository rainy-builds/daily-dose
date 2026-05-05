"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "select";

// Rendered at 50% of Figma dimensions
const S = 0.5;
const CW = 101.5 * S;   // ~50.75px — cursor width
const CH = 117.6 * S;   // ~58.8px  — cursor height
// Arrow tip is at ~(3.3%, 2.55%) of the cursor image from top-left
const TIP_X = (3.3 / 101.5) * CW;
const TIP_Y = (3.0 / 117.6) * CH;

// Select state container is larger to accommodate sparkles
const SEL_W = 136.843 * S;
const SEL_H = 154.245 * S;
// Cursor sits at 30.21% left, 27.88% top within the select container
const SEL_CUR_L = 0.3021 * SEL_W;
const SEL_CUR_T = 0.2788 * SEL_H;
const SEL_TIP_X = SEL_CUR_L + TIP_X;
const SEL_TIP_Y = SEL_CUR_T + TIP_Y;

// Sparkle positions derived from Figma inset + rotation values
const SPARKLES = [
  { top: 0.3981 * SEL_H, left: 0,             w: (1 - 0.8196) * SEL_W,            h: (1 - 0.3981 - 0.4970) * SEL_H, rotate: -19.57, src: "/cursors/cursor-sparkle-1.svg" },
  { top: 0.2528 * SEL_H, left: 0.0062 * SEL_W, w: (1 - 0.8258 - 0.0062) * SEL_W, h: (1 - 0.2528 - 0.6888) * SEL_H, rotate: 0,      src: "/cursors/cursor-sparkle-2.svg" },
  { top: 0,              left: 0.3862 * SEL_W, w: (1 - 0.5481 - 0.3862) * SEL_W,  h: (1 - 0.8509) * SEL_H,          rotate: -90,    src: "/cursors/cursor-sparkle-3.svg" },
  { top: 0.0583 * SEL_H, left: 0.0865 * SEL_W, w: (1 - 0.7336 - 0.0865) * SEL_W, h: (1 - 0.0583 - 0.8234) * SEL_H, rotate: -153.76, src: "/cursors/cursor-sparkle-4.svg" },
  { top: 0.1167 * SEL_H, left: 0.5104 * SEL_W, w: (1 - 0.3610 - 0.5104) * SEL_W, h: (1 - 0.1167 - 0.7234) * SEL_H, rotate: -65.92, src: "/cursors/cursor-sparkle-5.svg" },
];

function isInteractive(el: Element | null): boolean {
  return !!el?.closest("button, a, input, select, textarea, [role='button'], label");
}

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const offsetX = state === "select" ? SEL_TIP_X : TIP_X;
    const offsetY = state === "select" ? SEL_TIP_Y : TIP_Y;

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      if (containerRef.current) {
        containerRef.current.style.left = `${e.clientX - offsetX}px`;
        containerRef.current.style.top = `${e.clientY - offsetY}px`;
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      setState(s => {
        if (s === "select") return s;
        return isInteractive(e.target as Element) ? "hover" : "default";
      });
    };

    const onDown = () => setState("select");
    const onUp = (e: MouseEvent) => {
      setState(isInteractive(e.target as Element) ? "hover" : "default");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [state, visible]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        display: visible ? "block" : "none",
        position: "fixed",
        width: state === "select" ? SEL_W : CW,
        height: state === "select" ? SEL_H : CH,
        overflow: "visible",
      }}
    >
      {state === "select" ? (
        <>
          {SPARKLES.map((sp, i) => (
            <img
              key={i}
              src={sp.src}
              alt=""
              style={{
                position: "absolute",
                top: sp.top,
                left: sp.left,
                width: sp.w,
                height: sp.h,
                transform: `rotate(${sp.rotate}deg)`,
                transformOrigin: "center",
                overflow: "visible",
              }}
            />
          ))}
          <img
            src="/cursors/cursor-hover.svg"
            alt=""
            style={{
              position: "absolute",
              left: SEL_CUR_L,
              top: SEL_CUR_T,
              width: CW,
              height: CH,
            }}
          />
        </>
      ) : (
        <img
          src={state === "hover" ? "/cursors/cursor-hover.svg" : "/cursors/cursor-default.svg"}
          alt=""
          style={{ width: CW, height: CH }}
        />
      )}
    </div>
  );
}
