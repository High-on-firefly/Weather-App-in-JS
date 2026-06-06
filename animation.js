export function animateInt(from, to, duration, onUpdate) {
    const start = performance.now();

    function frame(now) {
        const t = Math.min((now - start) / duration, 1);

        const value = Math.round(
            from + (to - from) * t
        );

        onUpdate(value);

        if (t < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}