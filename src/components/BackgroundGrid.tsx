import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create drifting network nodes
    const nodeCount = Math.min(65, Math.floor((width * height) / 18000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Handles resizing correctly using a ResizeObserver style logic
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle grid overlay
      ctx.strokeStyle = "rgba(30, 41, 59, 0.35)"; // Slate-800 with transparency
      ctx.lineWidth = 1;
      const gridSize = 60;

      // Vertical lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw active proximity lighting / radar sweep under mouse
      if (mousePos.x !== -1000) {
        const gradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          250
        );
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.08)"); // Blue
        gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.03)"); // Purple
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Update and draw nodes & connecting lines
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on borders
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Update pulsing pulsePhase
        node.pulsePhase += node.pulseSpeed;
        const currentRadius = node.radius + Math.sin(node.pulsePhase) * 0.7;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connection threshold (120px)
          if (distance < 130) {
            const alpha = (1 - distance / 130) * 0.18;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`; // Slate-400 with alpha
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw mouse connecting link
        if (mousePos.x !== -1000) {
          const dx = node.x - mousePos.x;
          const dy = node.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 180) {
            const alpha = (1 - distance / 180) * 0.28;
            // Blue connection line
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.stroke();
          }
        }

        // Draw node center
        ctx.fillStyle = i % 5 === 0 ? "rgba(147, 51, 234, 0.6)" : "rgba(59, 130, 246, 0.6)"; // Purple or Blue accent
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Optional outer halo for some nodes
        if (i % 8 === 0) {
          ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mousePos]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020203] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      
      <canvas
        ref={canvasRef}
        id="bg-cyber-network"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
