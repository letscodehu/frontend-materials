registerPaint('letsGradient', class {
    paint(ctx, size, properties) {
        let gradient = ctx.createLinearGradient(size.width,size.height, 0,0);
        gradient.addColorStop(0, "#000");
        gradient.addColorStop(1, "#464870");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0, size.width, size.height);
    }
});