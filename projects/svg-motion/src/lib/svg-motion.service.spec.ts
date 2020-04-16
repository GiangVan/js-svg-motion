import { TestBed } from '@angular/core/testing';

import { SvgMotion } from './svg-motion.service';
import { SvgMotionComponent } from './svg-motion.component';

describe('SvgMotionService', () => {
	let component;
	
	beforeEach(() => { 
		TestBed.configureTestingModule({
			declarations: [SvgMotionComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		const a = TestBed.createComponent(SvgMotionComponent);
		component = a.componentInstance;
		a.detectChanges();
	})

	it('sss', () => {
		expect(component).toBeTruthy();
	})

	// it('should be created', () => {
	// 	const service: SvgMotion = TestBed.get(SvgMotion);
	// 	alert(service.getLineAnimations());
	// 	expect(service.getLineAnimations()).toBeTruthy();
	// });
});
