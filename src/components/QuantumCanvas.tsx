import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  phase: number;
  phaseSpeed: number;
  isQuantumEntangled: boolean;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const QuantumCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      '#38bdf8', // cyan glow
      '#818cf8', // indigo
      '#c084fc', // purple
      '#22d3ee', // bright cyan
    ];

    // Initialize particles
    const particleCount = Math.min(Math.floor((width * height) / 14000), 100);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: 1.5 + Math.random() * 2.5,
        radius: 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.02 + Math.random() * 0.03,
        isQuantumEntangled: Math.random() > 0.7,
      });
    }

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      active: false,
    };

    const pulseWaves: PulseWave[] = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      pulseWaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 220,
        alpha: 0.8,
        color: Math.random() > 0.5 ? '#38bdf8' : '#c084fc',
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render pulse waves (wavefunction collapses)
      for (let i = pulseWaves.length - 1; i >= 0; i--) {
        const p = pulseWaves[i];
        p.radius += 4;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          pulseWaves.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = '#38bdf8';
        ctx.globalAlpha = Math.max(0, p.alpha * 0.5);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.phase += p.phaseSpeed;
        p.radius = p.baseRadius + Math.sin(p.phase) * 0.8;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction/gravity
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;

            // Draw quantum entanglement beam to mouse
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / mouse.radius) * 0.45;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.isQuantumEntangled ? 0.85 : 0.55;
        ctx.fill();

        // Subtle glow aura for entangled nodes
        if (p.isQuantumEntangled) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = 0.25;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw entanglement links between pairs
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = p.isQuantumEntangled && p2.isQuantumEntangled ? '#38bdf8' : '#475569';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = p.isQuantumEntangled && p2.isQuantumEntangled ? 1.2 : 0.7;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
