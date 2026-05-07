"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "select";

// default + hover cursor: 54×72, index finger tip at (14.5, 12)
const CW = 54;
const CH = 72;
const TIP_X = 14.5;
const TIP_Y = 12;

// select cursor: 58×68, index finger tip at (15.5, 15)
const SEL_W = 58;
const SEL_H = 68;
const SEL_TIP_X = 15.5;
const SEL_TIP_Y = 15;

function isInteractive(el: Element | null): boolean {
  return !!el?.closest("button, a, input, select, textarea, [role='button'], label");
}

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      if (containerRef.current) {
        const tipX = state === "select" ? SEL_TIP_X : TIP_X;
        const tipY = state === "select" ? SEL_TIP_Y : TIP_Y;
        containerRef.current.style.left = `${e.clientX - tipX}px`;
        containerRef.current.style.top = `${e.clientY - tipY}px`;
      }
    };

    const onOver = (e: MouseEvent) => {
      setState(s => {
        if (s === "select") return s;
        return isInteractive(e.target as Element) ? "hover" : "default";
      });
    };

    const onDown = () => setState("select");
    const onUp = (e: MouseEvent) => setState(isInteractive(e.target as Element) ? "hover" : "default");
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [state, visible]);

  const src =
    state === "select" ? "/cursors/cursor-select.svg"
    : state === "hover" ? "/cursors/cursor-hover.svg"
    : "/cursors/cursor-default.svg";

  const w = state === "select" ? SEL_W : CW;
  const h = state === "select" ? SEL_H : CH;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed z-[9999]"
      style={{ display: visible ? "block" : "none", width: w, height: h }}
    >
      <img src={src} alt="" width={w} height={h} />
    </div>
  );
}
