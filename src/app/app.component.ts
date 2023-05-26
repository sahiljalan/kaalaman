import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CanvasParticlesComponent } from './particles/particles.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CanvasParticlesComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Sahil Jalan';
	myIntroText = '';
	mousePosition: any;

	navigation = [
		{ name: "Projects", href: "/projects" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact", href: "/contact" },
	];

	constructor() {
		this.myIntroText = 'My name is Sahil, I am experienced in developing dynamic and responsive web applications using Angular and JavaScript. Proficient in creating reusable components, managing state with Angular, and integrating with RESTful APIs'
	}

	@HostListener('mousemove', ['$event']) onMouseChange(event: MouseEvent) {
		this.mousePosition = { x: event.clientX, y: event.clientY };
	}

}
