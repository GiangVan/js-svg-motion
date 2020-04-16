import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SvgMotion } from './svg-motion.service';

@Component({
	selector: 'lib-svg-motion',
	template: `
		<svg>
			<g transform="translate(10 10)">
				<path #box stroke="black" stroke-width="2" fill="transparent" d="M50,0L0,25L0,75L50,100L100,75L100,25L50,0M0,25L50,50M50,100L50,50M100,25L50,50"></path>
			</g>
		</svg>
	`,
	styles: []
})
export class SvgMotionComponent implements OnInit, AfterViewInit {
	@ViewChild("box", { static: true }) private boxRef: ElementRef<HTMLElement>;

	constructor(private svgMotion: SvgMotion) {
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.svgMotion.animateLineGroup(this.boxRef.nativeElement.getAttribute('d'), this.boxRef.nativeElement, {
			time: 1000,
			mode: 'loading'
		});
	}

}
