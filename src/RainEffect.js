import React, { useEffect, useRef } from "react";

const RainEffect = ({ enabled }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    let w = canvas.width, h = canvas.height;
    ctx.strokeStyle = "rgba(174,194,224,0.5)";
    ctx.lineWidth = 1;
    ctx.lineCap = "round";

    let particles = Array.from({ length: 1000 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random(),
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      });
      move();
    }

    function move() {
      particles.forEach(p => {
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      });
    }

    let interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, [enabled]);

  return enabled ? (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1
      }}
    />
  ) : null;
};

export default RainEffect;
