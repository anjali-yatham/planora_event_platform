import React, { useEffect, useRef, useState } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [useVideo, setUseVideo] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Create animated particles
  const particles = useRef([]);
  
  useEffect(() => {
    // Initialize particles
    particles.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.1,
      hue: Math.random() * 60 + 200, // Blue to purple range
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationFrameId;
    let startTime = Date.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reposition particles on resize
      particles.current.forEach(particle => {
        if (particle.x > canvas.width) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = canvas.height;
      });
    };

    const drawParticles = () => {
      const time = (Date.now() - startTime) * 0.001;
      
      particles.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.1;
        particle.y += particle.vy + Math.cos(time + index * 0.1) * 0.1;
        
        // Wrap around screen
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;
        
        // Animate opacity
        particle.opacity = 0.1 + Math.sin(time * 2 + index * 0.5) * 0.2;
        
        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue + Math.sin(time + index) * 20}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const drawGradient = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      const time = (Date.now() - startTime) * 0.0008;
      
      // Create multiple moving gradients
      const gradient1 = ctx?.createRadialGradient(
        canvas.width * (0.3 + Math.sin(time) * 0.2),
        canvas.height * (0.2 + Math.cos(time * 0.7) * 0.1),
        0,
        canvas.width * (0.3 + Math.sin(time) * 0.2),
        canvas.height * (0.2 + Math.cos(time * 0.7) * 0.1),
        canvas.width * 0.8
      );

      // Enhanced gradient colors
      gradient1?.addColorStop(0, 'rgba(147, 51, 234, 0.15)'); // Purple
      gradient1?.addColorStop(0.6, 'rgba(79, 70, 229, 0.1)'); // Indigo
      gradient1?.addColorStop(1, 'rgba(79, 70, 229, 0)');

      const gradient2 = ctx?.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 1.3) * 0.15),
        canvas.height * (0.6 + Math.sin(time * 0.9) * 0.2),
        0,
        canvas.width * (0.7 + Math.cos(time * 1.3) * 0.15),
        canvas.height * (0.6 + Math.sin(time * 0.9) * 0.2),
        canvas.width * 0.7
      );

      gradient2?.addColorStop(0, 'rgba(59, 130, 246, 0.12)'); // Blue
      gradient2?.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)'); // Sky
      gradient2?.addColorStop(1, 'rgba(14, 165, 233, 0)');

      const gradient3 = ctx?.createRadialGradient(
        canvas.width * (0.1 + Math.sin(time * 1.1) * 0.1),
        canvas.height * (0.8 + Math.cos(time * 0.6) * 0.15),
        0,
        canvas.width * (0.1 + Math.sin(time * 1.1) * 0.1),
        canvas.height * (0.8 + Math.cos(time * 0.6) * 0.15),
        canvas.width * 0.6
      );

      gradient3?.addColorStop(0, 'rgba(16, 185, 129, 0.1)'); // Emerald
      gradient3?.addColorStop(0.4, 'rgba(34, 197, 94, 0.06)'); // Green
      gradient3?.addColorStop(1, 'rgba(34, 197, 94, 0)');

      // Base dark gradient background
      const baseGradient = ctx?.createLinearGradient(0, 0, 0, canvas.height);
      baseGradient?.addColorStop(0, 'rgba(15, 23, 42, 0.95)'); // slate-900
      baseGradient?.addColorStop(1, 'rgba(30, 41, 59, 0.9)'); // slate-700
      
      ctx.fillStyle = baseGradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Apply the moving gradients
      ctx.fillStyle = gradient1;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
      
      ctx.fillStyle = gradient2;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      ctx.fillStyle = gradient3;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
    };

    const animate = () => {
      drawGradient();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const handleVideoError = () => {
    setVideoError(true);
    setUseVideo(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Video Background */}
      {useVideo && !videoError && (
        <iframe
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          src="/assets/background-video.html"
          style={{ zIndex: 1, border: 'none' }}
          onError={handleVideoError}
        />
      )}
      
      {/* CSS Animation Background as fallback */}
      <div className="absolute inset-0 opacity-40" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-emerald-900/50 animate-pulse"></div>
        <div className="absolute inset-0 animate-gradient-shift"></div>
      </div>
      
      {/* Canvas Animation Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2 }}
      />
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0" style={{ zIndex: 3 }}>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full animate-particle-float"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full animate-particle-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full animate-float-up" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 right-10 w-12 h-12 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full animate-float-up" style={{ animationDelay: '3s' }}></div>
        
        {/* Floating lines */}
        <div className="absolute top-1/4 left-1/4 w-64 h-0.5 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-0.5 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Additional animated elements */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;