class LineSvgMotion {
    constructor() {
        this.lineAnimations = [];
    }
    getLineAnimations() {
        return this.lineAnimations;
    }
    static drawLineGroupToVolume(dAttribute, element, volume, reverse = false) {
        const pointGroups = this.generatePointGroups(dAttribute);
        for (let i = 0; i < pointGroups.length; i++) {
            if (reverse) {
                pointGroups[i] = pointGroups[i].reverse();
            }
            dAttribute = this.drawLineToVolume(pointGroups[i], i + 1, dAttribute, element, volume);
        }
        return dAttribute;
    }
    animateLineGroup(dAttribute, element, { time: time = 1000, step: step = 100, isReversed: isReversed = false, mode: mode = 'EXPAND' }, finishCallback = null) {
        mode = mode.toUpperCase();
        const lineAnimationId = this.pushNewLineAnimation();
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
    calcMotionTrigonometricEquations(x) {
        return Math.sin((Math.PI / 2) * Math.pow(x, 6));
    }
    generateLineAnimationId() {
        return Symbol();
    }
    removeLineAnimation(id) {
        const index = this.lineAnimations.indexOf(id);
        if (index !== -1) {
            this.lineAnimations.splice(index, 1);
        }
    }
    existLineAnimation(id) {
        return this.lineAnimations.indexOf(id) !== -1;
    }
    pushNewLineAnimation() {
        const key = this.generateLineAnimationId();
        this.lineAnimations.push(key);
        return key;
    }
    handleAnimationLoadingMode(animationId, dAttribute, element, step, time, isReversed) {
        const speed = time / step;
        this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, () => {
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, !isReversed, () => {
                this.handleAnimationLoadingMode(animationId, dAttribute, element, step, time, isReversed);
            });
        });
    }
    handleAnimationLoading2Mode(animationId, dAttribute, element, step, time, isReversed) {
        const speed = time / step;
        this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, () => {
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, isReversed, () => {
                this.handleAnimationLoading2Mode(animationId, dAttribute, element, step, time, isReversed);
            });
        });
    }
    handleAnimationLoading3Mode(animationId, dAttribute, element, step, time, isReversed) {
        const speed = time / step;
        this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, !isReversed, () => {
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, () => {
                this.handleAnimationLoading3Mode(animationId, dAttribute, element, step, time, isReversed);
            });
        });
    }
    handleAnimationLoading4Mode(animationId, dAttribute, element, step, time, isReversed) {
        const speed = time / step;
        this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, isReversed, () => {
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, !isReversed, () => {
                this.handleAnimationLoading4Mode(animationId, dAttribute, element, step, time, isReversed);
            });
        });
    }
    handleAnimationCollapseMode(animationId, dAttribute, element, step, time, isReversed, finishCallback) {
        this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, (time / step), 100, false, isReversed, finishCallback);
    }
    handleAnimationNormalMode(animationId, dAttribute, element, step, time, isReversed, finishCallback) {
        this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, (time / step), 0, true, isReversed, finishCallback);
    }
    recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, currentStep, isExpand, isReversed, finishCallback) {
        if (this.existLineAnimation(animationId)) {
            LineSvgMotion.drawLineGroupToVolume(dAttribute, element, 100 * this.calcMotionTrigonometricEquations(currentStep / step), isReversed);
            if ((isExpand && currentStep === step) ||
                (!isExpand && currentStep === 0)) {
                if (finishCallback != null) {
                    finishCallback();
                }
            }
            else {
                if (isExpand) {
                    currentStep++;
                }
                else {
                    currentStep--;
                }
                setTimeout(() => (this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, currentStep, isExpand, isReversed, finishCallback)), speed);
            }
        }
    }
    static generatePointGroups(dAttribute) {
        const pointGroupStrings = dAttribute.split("M");
        const pointGroups = [];
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
        }
        else {
            alert("not found M");
        }
        return pointGroups.length > 0 ? pointGroups : null;
    }
    static countOccurrences(text, search) {
        return text.split(search).length - 1;
    }
    static getRangeOf(text, search, no) {
        if (this.countOccurrences(text, search) >= no) {
            let startIndex = 0;
            let endIndex = 0;
            let n = 0;
            while (n < no) {
                startIndex = text.indexOf(search, startIndex) + search.length;
                n++;
            }
            endIndex = (text.indexOf(search, startIndex) === -1) ? text.length : text.indexOf(search, startIndex);
            return [
                startIndex,
                endIndex
            ];
        }
        else {
            return null;
        }
    }
    static getPointsDistance(point1, point2) {
        return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
    }
    static getLineLength(pointGroup) {
        let length = 0.0;
        for (let i = 1; i < pointGroup.length; i++) {
            length += this.getPointsDistance(pointGroup[i - 1], pointGroup[i]);
        }
        return length;
    }
    static roundPoint(point) {
        point[0] = Math.round((point[0] + Number.EPSILON) * 1000) / 1000;
        point[1] = Math.round((point[1] + Number.EPSILON) * 1000) / 1000;
        return point;
    }
    static changePointGroupAtLength(pointGroup, length) {
        let currentLength = 0;
        const newPointGroup = [pointGroup[0]];
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
    static getPointGroupStringMissing(pointGroupString, pointGroupNo) {
        const pointGroupNum = this.countOccurrences(pointGroupString, 'M');
        let pointGroupMissingNum = 0;
        let pointGroupMissingString = '';
        if (pointGroupNo - pointGroupNum > 1) {
            pointGroupMissingNum = pointGroupNo - pointGroupNum - 1;
        }
        for (let i = 0; i < pointGroupMissingNum; i++) {
            pointGroupMissingString += 'M0,0';
        }
        return pointGroupMissingString;
    }
    static drawLineToVolume(pointGroup, pointGroupNo, dAttribute, element, volume) {
        if (volume >= 0 && volume <= 100) {
            const length = this.getLineLength(pointGroup) / 100 * volume;
            const newPointGroup = this.changePointGroupAtLength(pointGroup, length);
            let workRange = this.getRangeOf(dAttribute, 'M', pointGroupNo);
            let lineString = '';
            for (let i = 0; i < newPointGroup.length; i++) {
                lineString += lineString == '' ? '' : 'L';
                lineString += `${newPointGroup[i][0]},${newPointGroup[i][1]}`;
            }
            if (workRange === null) {
                dAttribute = `${dAttribute}${this.getPointGroupStringMissing(dAttribute, pointGroupNo)}M${lineString}`;
            }
            else {
                dAttribute = dAttribute.substring(0, workRange[0]) + lineString + dAttribute.substring(workRange[1], dAttribute.length);
            }
            element.setAttribute('d', dAttribute);
            return dAttribute;
        }
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { LineSvgMotion };
//# sourceMappingURL=svg-motion.js.map
