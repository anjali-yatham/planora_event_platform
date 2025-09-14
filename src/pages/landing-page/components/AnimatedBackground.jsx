import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas?.width,
      y: Math.random() * canvas?.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() * 60 + 240 // Purple to blue range
    });

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(canvas?.width * canvas?.height / 15000));
      for (let i = 0; i < particleCount; i++) {
        particles?.push(createParticle());
      }
    };

    const updateParticles = () => {
      particles?.forEach(particle => {
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Subtle opacity animation
        particle.opacity += Math.sin(Date.now() * 0.001 + particle?.x * 0.01) * 0.01;
        particle.opacity = Math.max(0.1, Math.min(0.7, particle?.opacity));
      });
    };

    const drawParticles = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw gradient background
      const gradient = ctx?.createLinearGradient(0, 0, canvas?.width, canvas?.height);
      gradient?.addColorStop(0, '#fafafa');
      gradient?.addColorStop(0.5, '#f8fafc');
      gradient?.addColorStop(1, '#f1f5f9');
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Draw particles
      particles?.forEach(particle => {
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle?.hue}, 70%, 60%, ${particle?.opacity})`;
        ctx?.fill();
      });

      // Draw connections
      particles?.forEach((particle, i) => {
        particles?.slice(i + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = `hsla(250, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx?.stroke();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AnimatedBackground;