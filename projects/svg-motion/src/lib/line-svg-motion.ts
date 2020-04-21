
export class LineSvgMotion {
	protected lineAnimations: symbol[] = [];

	constructor() { }

	public getLineAnimations(): symbol[] {
		return this.lineAnimations;
	}

	public drawLineGroupToVolume(dAttribute: string, element: HTMLElement, volume: number, reverse: boolean = false): string {
		const pointGroups: number[][][] = this.generatePointGroups(dAttribute);

		for (let i = 0; i < pointGroups.length; i++) {
			if (reverse) {
				pointGroups[i] = pointGroups[i].reverse();
			}

			dAttribute = this.drawLineToVolume(pointGroups[i], i + 1, dAttribute, element, volume);
		}

		return dAttribute;
	}

	public animateLineGroup(
		dAttribute: string,
		element: HTMLElement,
		{
			time: time = 1000,
			step: step = 100,
			isReversed: isReversed = false,
			mode: mode = 'EXPAND'
		},
		finishCallback: () => void = null
	): symbol {
		
		mode = mode.toUpperCase();
		const lineAnimationId: symbol = this.pushNewLineAnimation();

		switch (mode) {
			case 'COLLAPSE':
				this.handleAnimationCollapseMode(lineAnimationId, dAttribute, element, step, time, isReversed, finishCallback);
				break;

			case 'LOADING':
				this.handleAnimationLoadingMode(lineAnimationId, dAttribute, element, step, time, isReversed);
				break;

			case 'LOADING2':
				this.handleAnimationLoading2Mode(lineAnimationId, dAttribute, element, step, time, isReversed);
				break;

			case 'LOADING3':
				this.handleAnimationLoading3Mode(lineAnimationId, dAttribute, element, step, time, isReversed);
				break;

			case 'LOADING4':
				this.handleAnimationLoading4Mode(lineAnimationId, dAttribute, element, step, time, isReversed);
				break;

			default:
				this.handleAnimationNormalMode(lineAnimationId, dAttribute, element, step, time, isReversed, finishCallback);
				break;
		}

		return lineAnimationId;
	}


	protected calcMotionTrigonometricEquations(x: number): number {
		return Math.sin((Math.PI / 2) * Math.pow(x, 6));
	}


	protected generateLineAnimationId(): symbol {
		return Symbol();
	}

	protected removeLineAnimation(id: symbol) {
		const index: number = this.lineAnimations.indexOf(id);
		if (index !== -1) {
			this.lineAnimations.splice(index, 1);
		}
	}

	protected existLineAnimation(id: symbol) {
		return this.lineAnimations.indexOf(id) !== -1;
	}

	protected pushNewLineAnimation(): symbol {
		const key: symbol = this.generateLineAnimationId();

		this.lineAnimations.push(key);

		return key;
	}

	protected handleAnimationLoadingMode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean) {
		const speed: number = time / step;
		this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, () => {
			this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, !isReversed, () => {
				this.handleAnimationLoadingMode(animationId, dAttribute, element, step, time, isReversed);
			});
		});
	}

	protected handleAnimationLoading2Mode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean) {
		const speed: number = time / step;
		this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, () => {
			this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, isReversed, () => {
				this.handleAnimationLoading2Mode(animationId, dAttribute, element, step, time, isReversed);
			});
		});
	}

	protected handleAnimationLoading3Mode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean) {
		const speed: number = time / step;
		this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, !isReversed, () => {
			this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, () => {
				this.handleAnimationLoading3Mode(animationId, dAttribute, element, step, time, isReversed);
			});
		});
	}

	protected handleAnimationLoading4Mode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean) {
		const speed: number = time / step;
		this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, isReversed, () => {
			this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, !isReversed, () => {
				this.handleAnimationLoading4Mode(animationId, dAttribute, element, step, time, isReversed);
			});
		});
	}

	protected handleAnimationCollapseMode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean, finishCallback?: () => void) {
		this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, (time / step), 100, false, isReversed, finishCallback);
	}

	protected handleAnimationNormalMode(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, time: number, isReversed: boolean, finishCallback?: () => void) {
		this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, (time / step), 0, true, isReversed, finishCallback);
	}

	protected recursiveAnimationLineGroup(animationId: symbol, dAttribute: string, element: HTMLElement, step: number, speed: number, currentStep: number, isExpand, isReversed: boolean, finishCallback?: () => void) {
		if (this.existLineAnimation(animationId)) {
			this.drawLineGroupToVolume(dAttribute, element, 100 * this.calcMotionTrigonometricEquations(currentStep / step), isReversed);

			if (
				(isExpand && currentStep === step) ||
				(!isExpand && currentStep === 0)
			) {
				if (finishCallback != null) {
					finishCallback();
				}
			} else {
				if (isExpand) {
					currentStep++;
				} else {
					currentStep--;
				}

				setTimeout(
					() => (this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, currentStep, isExpand, isReversed, finishCallback))
					, speed
				);
			}
		}
	}

	protected generatePointGroups(dAttribute: string): null | number[][][] {
		const pointGroupStrings: string[] = dAttribute.split("M");
		const pointGroups: number[][][] = [];

		if (pointGroupStrings[0] === "") {
			for (let i = 1; i < pointGroupStrings.length; i++) {
				const pointStrings = pointGroupStrings[i].split("L");

				for (let j = 0; j < pointStrings.length; j++) {
					const point = [
						parseFloat(pointStrings[j].split(",")[0]),
						parseFloat(pointStrings[j].split(",")[1]),
					];
					if (pointGroups[i - 1] === undefined) {
						pointGroups[i - 1] = [];
					}

					pointGroups[i - 1][pointGroups[i - 1].length] = point;
				}
			}
		} else {
			alert("not found M");
		}

		return pointGroups.length > 0 ? pointGroups : null;
	}

	protected countOccurrences(text: string, search: string): number {
		return text.split(search).length - 1;
	}

	protected getRangeOf(text: string, search: string, no: number): number[] | null {
		if (this.countOccurrences(text, search) >= no) {
			let startIndex: number = 0;
			let endIndex: number = 0;
			let n: number = 0;

			while (n < no) {
				startIndex = text.indexOf(search, startIndex) + search.length;
				n++;
			}

			endIndex = (text.indexOf(search, startIndex) === -1) ? text.length : text.indexOf(search, startIndex);

			return [
				startIndex,
				endIndex
			];
		} else {
			return null;
		}
	}

	protected getPointsDistance(point1: number[], point2: number[]): number {
		return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
	}

	protected getLineLength(pointGroup: number[][]): number {
		let length: number = 0.0;

		for (let i = 1; i < pointGroup.length; i++) {
			length += this.getPointsDistance(pointGroup[i - 1], pointGroup[i]);
		}

		return length;
	}

	protected roundPoint(point: number[]): number[] {
		point[0] = Math.round((point[0] + Number.EPSILON) * 1000) / 1000;
		point[1] = Math.round((point[1] + Number.EPSILON) * 1000) / 1000;

		return point;
	}

	protected changePointGroupAtLength(pointGroup: number[][], length: number): number[][] {
		let currentLength: number = 0;
		const newPointGroup: number[][] = [pointGroup[0]];

		for (let i = 1; i < pointGroup.length; i++) {
			const currentLineLength = this.getPointsDistance(pointGroup[i - 1], pointGroup[i]);
			currentLength += currentLineLength;
			newPointGroup.push(pointGroup[i]);

			if (currentLength >= length) {
				const newLineLength = length + currentLineLength - currentLength;
				const betweenLengthRatio = newLineLength / currentLineLength;

				newPointGroup[i] = this.roundPoint([
					pointGroup[i - 1][0] + ((pointGroup[i][0] - pointGroup[i - 1][0]) * betweenLengthRatio),
					pointGroup[i - 1][1] + ((pointGroup[i][1] - pointGroup[i - 1][1]) * betweenLengthRatio)
				]);
				break;
			}
		}

		return newPointGroup;
	}

	protected getPointGroupStringMissing(pointGroupString: string, pointGroupNo: number): string {
		const pointGroupNum: number = this.countOccurrences(pointGroupString, 'M');
		let pointGroupMissingNum: number = 0;
		let pointGroupMissingString: string = '';

		if (pointGroupNo - pointGroupNum > 1) {
			pointGroupMissingNum = pointGroupNo - pointGroupNum - 1;
		}

		for (let i = 0; i < pointGroupMissingNum; i++) {
			pointGroupMissingString += 'M0,0';
		}

		return pointGroupMissingString;
	}

	protected drawLineToVolume(pointGroup: number[][], pointGroupNo: number, dAttribute: string, element: HTMLElement, volume: number): string {
		if (volume >= 0 && volume <= 100) {
			const length: number = this.getLineLength(pointGroup) / 100 * volume;
			const newPointGroup: number[][] = this.changePointGroupAtLength(pointGroup, length);
			let workRange: number[] = this.getRangeOf(dAttribute, 'M', pointGroupNo);
			let lineString: string = '';

			for (let i = 0; i < newPointGroup.length; i++) {
				lineString += lineString == '' ? '' : 'L';
				lineString += `${newPointGroup[i][0]},${newPointGroup[i][1]}`;
			}

			if (workRange === null) {
				dAttribute = `${dAttribute}${this.getPointGroupStringMissing(dAttribute, pointGroupNo)}M${lineString}`;
			} else {
				dAttribute = dAttribute.substring(0, workRange[0]) + lineString + dAttribute.substring(workRange[1], dAttribute.length);
			}

			element.setAttribute('d', dAttribute);
			return dAttribute;
		}
	}
}
