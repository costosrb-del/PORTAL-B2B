import { useEffect, useRef } from 'react';

const UVBackground = () => {
    const canvasRef = useRef(null);
    const trailCanvasRef = useRef(null);
    const patternCanvasRef = useRef(null);
    const maskedCanvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Trail canvas (holds the fading light spots)
        const trailCanvas = document.createElement('canvas');
        const trailCtx = trailCanvas.getContext('2d');
        trailCanvasRef.current = trailCanvas;

        // Pattern canvas (holds the hidden text)
        const patternCanvas = document.createElement('canvas');
        const patternCtx = patternCanvas.getContext('2d');
        patternCanvasRef.current = patternCanvas;

        // Masked canvas (holds the composition of Text + Light)
        const maskedCanvas = document.createElement('canvas');
        const maskedCtx = maskedCanvas.getContext('2d');
        maskedCanvasRef.current = maskedCanvas;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let mouseX = -1000;
        let mouseY = -1000;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width;
            canvas.height = height;
            trailCanvas.width = width;
            trailCanvas.height = height;
            patternCanvas.width = width;
            patternCanvas.height = height;
            maskedCanvas.width = width;
            maskedCanvas.height = height;

            // Generate Pattern
            generatePattern(patternCtx, width, height);
        };

        const generatePattern = (ctx, w, h) => {
            ctx.clearRect(0, 0, w, h);

            ctx.font = '900 72px Inter, sans-serif'; // Increased 20%
            ctx.fillStyle = '#FFFFFF'; // White Text
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Draw rotated text grid
            const angle = -Math.PI / 6;
            ctx.save();

            const stepX = 750; // Optimized spacing
            const stepY = 250; // Optimized spacing

            for (let y = -400; y < h + 400; y += stepY) {
                for (let x = -400; x < w + 400; x += stepX) {
                    ctx.save();
                    ctx.translate(x + (y % (stepY * 2) === 0 ? 0 : stepX / 2), y);
                    ctx.rotate(angle);
                    ctx.fillText("ORIGEN BOTÁNICO", 0, 0);
                    ctx.restore();
                }
            }
            ctx.restore();
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            // Draw light on trail instantly
            const gradient = trailCtx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180); // Adjusted radius (180px)
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            trailCtx.globalCompositeOperation = 'source-over';
            trailCtx.fillStyle = gradient;
            trailCtx.beginPath();
            trailCtx.arc(mouseX, mouseY, 180, 0, Math.PI * 2);
            trailCtx.fill();
        };

        // Animation Loop
        const render = () => {
            if (!canvasRef.current) return;

            // 1. Fade out trail
            trailCtx.globalCompositeOperation = 'destination-out';
            trailCtx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Fade speed
            trailCtx.fillRect(0, 0, width, height);

            // 2. Prepare Masked Layer (Text clipped by Light)
            maskedCtx.clearRect(0, 0, width, height);

            maskedCtx.globalCompositeOperation = 'source-over';
            maskedCtx.drawImage(patternCanvas, 0, 0); // Draw full white text

            maskedCtx.globalCompositeOperation = 'destination-in';
            maskedCtx.drawImage(trailCanvas, 0, 0);   // Keep text only where light is

            // 3. Draw Main Canvas
            // Fill with solid Green Background
            ctx.fillStyle = '#064e3b'; // Solid Emerald Green (Slightly Darker for contrast)
            ctx.fillRect(0, 0, width, height);

            // Draw the masked text on top
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(maskedCanvas, 0, 0);

            requestAnimationFrame(render);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        handleResize(); // Init
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Dynamic Text Overlay */}
            <div className="absolute bottom-12 w-full text-center z-10 flex justify-center items-center gap-2 animate-pulse">
                <span className="material-symbols-outlined text-emerald-200/70 text-lg">auto_awesome</span>
                <p className="text-emerald-100/60 text-sm font-medium tracking-[0.3em] uppercase">
                    Descubre la magia
                </p>
                <span className="material-symbols-outlined text-emerald-200/70 text-lg">auto_awesome</span>
            </div>
        </div>
    );
};

export default UVBackground;
