import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'ngx-particles',
    standalone: true,
    template: `
    <div #canvasContainerRef class="position-absolute animate-fade-in" aria-hidden="true">
        <canvas #canvasRef></canvas>
    </div>
    `,
    styles: [
        'div { inset: 0; z-index: -10 }'
    ]
})
export class CanvasParticlesComponent implements OnInit, OnChanges {

    @Input({ required: true }) prop!: ParticlesProps;
    @Input({required: true}) mousePosition: { x: number; y: number } = { x: 0, y: 0 };

    @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('canvasContainerRef', { static: true }) canvasContainerRef!: ElementRef<HTMLDivElement>;
    context!: CanvasRenderingContext2D | null;
    circles: any[] = [];
    mouse: { x: number; y: number } = { x: 0, y: 0 };
    canvasSize: { w: number; h: number } = { w: 0, h: 0 };
    dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

    @HostListener('window:resize', ['$event']) onMouseChange(event: MouseEvent) {
		this.initCanvas();
	}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['mousePosition'].currentValue) {
            this.onMouseMove();
        }
    }

    ngOnInit(): void {
        if (this.canvasRef.nativeElement) {
            this.context = this.canvasRef.nativeElement.getContext("2d");
        }
        this.initCanvas();
        this.animate();
    }

    clearContext() {
        if (this.context) {
            this.context.clearRect(
                0,
                0,
                this.canvasSize.w,
                this.canvasSize.h,
            );
        }
    };


    initCanvas() {
        this.resizeCanvas();
        this.drawParticles();
    };

    onMouseMove() {
        if (this.canvasRef.nativeElement) {
            const rect = this.canvasRef.nativeElement.getBoundingClientRect();
            const { w, h } = this.canvasSize;
            const x = this.mousePosition.x - rect.left - w / 2;
            const y = this.mousePosition.y - rect.top - h / 2;
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
            if (inside) {
                this.mouse.x = x;
                this.mouse.y = y;
            }
        }
    };

    resizeCanvas() {
        if (this.canvasContainerRef.nativeElement && this.canvasRef.nativeElement && this.context) {
            this.circles.length = 0;
            this.canvasSize.w = this.canvasContainerRef.nativeElement.offsetWidth - 20;
            this.canvasSize.h = this.canvasContainerRef.nativeElement.offsetHeight - 20;
            this.canvasRef.nativeElement.width = this.canvasSize.w * this.dpr;
            this.canvasRef.nativeElement.height = this.canvasSize.h * this.dpr;
            this.canvasRef.nativeElement.style.width = `${this.canvasSize.w}px`;
            this.canvasRef.nativeElement.style.height = `${this.canvasSize.h}px`;
            this.context.scale(this.dpr, this.dpr);
        }
    };

    circleParams(): Circle {
        const x = Math.floor(Math.random() * this.canvasSize.w);
        const y = Math.floor(Math.random() * this.canvasSize.h);
        const translateX = 0;
        const translateY = 0;
        const size = Math.floor(Math.random() * 2) + 0.1;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.5 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.7;
        const dy = (Math.random() - 0.5) * 0.2;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism,
        };
    };

    drawCircle(circle: Circle, update = false) {
        if (this.context) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            this.context.translate(translateX, translateY);
            this.context.beginPath();
            this.context.arc(x, y, size, 0, 2 * Math.PI);
            this.context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            this.context.fill();
            this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

            if (!update) {
                this.circles.push(circle);
            }
        }
    };

    drawParticles() {
        this.clearContext();
        const particleCount = this.prop.quantity ?? 300;
        for (let i = 0; i < particleCount; i++) {
            const circle = this.circleParams();
            this.drawCircle(circle);
        }
    };

    remapValue(
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number,
    ): number {
        const remapped =
            ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    };

    animate() {
        this.clearContext();
        this.circles.forEach((circle: Circle, i: number) => {
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size, // distance from left edge
                this.canvasSize.w - circle.x - circle.translateX - circle.size, // distance from right edge
                circle.y + circle.translateY - circle.size, // distance from top edge
                this.canvasSize.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = parseFloat(
                this.remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
            );
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }
            circle.x += circle.dx;
            circle.y += circle.dy;
            circle.translateX +=
                (this.mouse.x / (this.prop.staticity ?? 60 / circle.magnetism) - circle.translateX) /
                (this.prop.ease ?? 50);
            circle.translateY +=
                (this.mouse.y / (this.prop.staticity ?? 60 / circle.magnetism) - circle.translateY) /
                (this.prop.ease ?? 50);
            // circle gets out of the canvas
            if (
                circle.x < -circle.size ||
                circle.x > this.canvasSize.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > this.canvasSize.h + circle.size
            ) {
                // remove the circle from the array
                this.circles.splice(i, 1);
                // create a new circle
                const newCircle = this.circleParams();
                this.drawCircle(newCircle);
                // update the circle position
            } else {
                this.drawCircle(
                    {
                        ...circle,
                        x: circle.x,
                        y: circle.y,
                        translateX: circle.translateX,
                        translateY: circle.translateY,
                        alpha: circle.alpha,
                    },
                    true,
                );
            }
        });
        window.requestAnimationFrame(this.animate.bind(this));
    };
}

type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
};

interface ParticlesProps {
    quantity?: number;
    staticity?: number;
    ease?: number;
}