import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { LineSvgMotion } from './line-svg-motion';

@Component({
	selector: 'lib-svg-motion',
	template: `
		<div class='container'>
			<svg>
				<g transform="translate(10 10)">
					<path #box stroke="black" stroke-width="2" fill="transparent" d="M50,0L0,25L0,75L50,100L100,75L100,25L50,0M0,25L50,50M50,100L50,50M100,25L50,50"></path>
				</g>
			</svg>
			<svg>
				<g transform="translate(10 10)">
					<path #box2 stroke="black" stroke-width="20" fill="transparent" d="M0,0L250,0"></path>
				</g>
			</svg>
		</div>
	`,
	styles: [`.container{display: flex}`]
})
export class SvgMotionComponent implements OnInit, AfterViewInit {
	@ViewChild("box", { static: true }) private boxRef: ElementRef<HTMLElement>;
	@ViewChild("box2", { static: true }) private boxRef2: ElementRef<HTMLElement>;
	private lineSvgMotion: LineSvgMotion;

	constructor() {
	}

	ngOnInit() {
		this.lineSvgMotion = new LineSvgMotion();
	}

	ngAfterViewInit() {
		const mode = 'loading8';
		const time = 1000;
		
		this.lineSvgMotion.animateLineGroup(this.boxRef.nativeElement.getAttribute('d'), this.boxRef.nativeElement, {
			time: time,
			mode: mode
		});
		this.lineSvgMotion.animateLineGroup(this.boxRef2.nativeElement.getAttribute('d'), this.boxRef2.nativeElement, {
			time: time,
			mode: mode
		});
	}

}
