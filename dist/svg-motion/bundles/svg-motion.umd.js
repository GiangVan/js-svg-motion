(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('svg-motion', ['exports'], factory) :
    (global = global || self, factory(global['svg-motion'] = {}));
}(this, (function (exports) { 'use strict';

    var LineSvgMotion = /** @class */ (function () {
        function LineSvgMotion() {
            this.lineAnimations = [];
        }
        LineSvgMotion.prototype.getLineAnimations = function () {
            return this.lineAnimations;
        };
        LineSvgMotion.prototype.drawLineGroupToVolume = function (dAttribute, element, volume, reverse) {
            if (reverse === void 0) { reverse = false; }
            var pointGroups = this.generatePointGroups(dAttribute);
            for (var i = 0; i < pointGroups.length; i++) {
                if (reverse) {
                    pointGroups[i] = pointGroups[i].reverse();
                }
                dAttribute = this.drawLineToVolume(pointGroups[i], i + 1, dAttribute, element, volume);
            }
            return dAttribute;
        };
        LineSvgMotion.prototype.animateLineGroup = function (dAttribute, element, _a, finishCallback) {
            var _b = _a.time, time = _b === void 0 ? 1000 : _b, _c = _a.step, step = _c === void 0 ? 100 : _c, _d = _a.isReversed, isReversed = _d === void 0 ? false : _d, _e = _a.mode, mode = _e === void 0 ? 'EXPAND' : _e;
            if (finishCallback === void 0) { finishCallback = null; }
            mode = mode.toUpperCase();
            var lineAnimationId = this.pushNewLineAnimation();
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
        };
        LineSvgMotion.prototype.calcMotionTrigonometricEquations = function (x) {
            return Math.sin((Math.PI / 2) * Math.pow(x, 6));
        };
        LineSvgMotion.prototype.generateLineAnimationId = function () {
            return Symbol();
        };
        LineSvgMotion.prototype.removeLineAnimation = function (id) {
            var index = this.lineAnimations.indexOf(id);
            if (index !== -1) {
                this.lineAnimations.splice(index, 1);
            }
        };
        LineSvgMotion.prototype.existLineAnimation = function (id) {
            return this.lineAnimations.indexOf(id) !== -1;
        };
        LineSvgMotion.prototype.pushNewLineAnimation = function () {
            var key = this.generateLineAnimationId();
            this.lineAnimations.push(key);
            return key;
        };
        LineSvgMotion.prototype.handleAnimationLoadingMode = function (animationId, dAttribute, element, step, time, isReversed) {
            var _this = this;
            var speed = time / step;
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, function () {
                _this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, !isReversed, function () {
                    _this.handleAnimationLoadingMode(animationId, dAttribute, element, step, time, isReversed);
                });
            });
        };
        LineSvgMotion.prototype.handleAnimationLoading2Mode = function (animationId, dAttribute, element, step, time, isReversed) {
            var _this = this;
            var speed = time / step;
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, function () {
                _this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, isReversed, function () {
                    _this.handleAnimationLoading2Mode(animationId, dAttribute, element, step, time, isReversed);
                });
            });
        };
        LineSvgMotion.prototype.handleAnimationLoading3Mode = function (animationId, dAttribute, element, step, time, isReversed) {
            var _this = this;
            var speed = time / step;
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, !isReversed, function () {
                _this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, isReversed, function () {
                    _this.handleAnimationLoading3Mode(animationId, dAttribute, element, step, time, isReversed);
                });
            });
        };
        LineSvgMotion.prototype.handleAnimationLoading4Mode = function (animationId, dAttribute, element, step, time, isReversed) {
            var _this = this;
            var speed = time / step;
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 100, false, isReversed, function () {
                _this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, 0, true, !isReversed, function () {
                    _this.handleAnimationLoading4Mode(animationId, dAttribute, element, step, time, isReversed);
                });
            });
        };
        LineSvgMotion.prototype.handleAnimationCollapseMode = function (animationId, dAttribute, element, step, time, isReversed, finishCallback) {
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, (time / step), 100, false, isReversed, finishCallback);
        };
        LineSvgMotion.prototype.handleAnimationNormalMode = function (animationId, dAttribute, element, step, time, isReversed, finishCallback) {
            this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, (time / step), 0, true, isReversed, finishCallback);
        };
        LineSvgMotion.prototype.recursiveAnimationLineGroup = function (animationId, dAttribute, element, step, speed, currentStep, isExpand, isReversed, finishCallback) {
            var _this = this;
            if (this.existLineAnimation(animationId)) {
                this.drawLineGroupToVolume(dAttribute, element, 100 * this.calcMotionTrigonometricEquations(currentStep / step), isReversed);
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
                    setTimeout(function () { return (_this.recursiveAnimationLineGroup(animationId, dAttribute, element, step, speed, currentStep, isExpand, isReversed, finishCallback)); }, speed);
                }
            }
        };
        LineSvgMotion.prototype.generatePointGroups = function (dAttribute) {
            var pointGroupStrings = dAttribute.split("M");
            var pointGroups = [];
            if (pointGroupStrings[0] === "") {
                for (var i = 1; i < pointGroupStrings.length; i++) {
                    var pointStrings = pointGroupStrings[i].split("L");
                    for (var j = 0; j < pointStrings.length; j++) {
                        var point = [
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
        };
        LineSvgMotion.prototype.countOccurrences = function (text, search) {
            return text.split(search).length - 1;
        };
        LineSvgMotion.prototype.getRangeOf = function (text, search, no) {
            if (this.countOccurrences(text, search) >= no) {
                var startIndex = 0;
                var endIndex = 0;
                var n = 0;
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
        };
        LineSvgMotion.prototype.getPointsDistance = function (point1, point2) {
            return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
        };
        LineSvgMotion.prototype.getLineLength = function (pointGroup) {
            var length = 0.0;
            for (var i = 1; i < pointGroup.length; i++) {
                length += this.getPointsDistance(pointGroup[i - 1], pointGroup[i]);
            }
            return length;
        };
        LineSvgMotion.prototype.roundPoint = function (point) {
            point[0] = Math.round((point[0] + Number.EPSILON) * 1000) / 1000;
            point[1] = Math.round((point[1] + Number.EPSILON) * 1000) / 1000;
            return point;
        };
        LineSvgMotion.prototype.changePointGroupAtLength = function (pointGroup, length) {
            var currentLength = 0;
            var newPointGroup = [pointGroup[0]];
            for (var i = 1; i < pointGroup.length; i++) {
                var currentLineLength = this.getPointsDistance(pointGroup[i - 1], pointGroup[i]);
                currentLength += currentLineLength;
                newPointGroup.push(pointGroup[i]);
                if (currentLength >= length) {
                    var newLineLength = length + currentLineLength - currentLength;
                    var betweenLengthRatio = newLineLength / currentLineLength;
                    newPointGroup[i] = this.roundPoint([
                        pointGroup[i - 1][0] + ((pointGroup[i][0] - pointGroup[i - 1][0]) * betweenLengthRatio),
                        pointGroup[i - 1][1] + ((pointGroup[i][1] - pointGroup[i - 1][1]) * betweenLengthRatio)
                    ]);
                    break;
                }
            }
            return newPointGroup;
        };
        LineSvgMotion.prototype.getPointGroupStringMissing = function (pointGroupString, pointGroupNo) {
            var pointGroupNum = this.countOccurrences(pointGroupString, 'M');
            var pointGroupMissingNum = 0;
            var pointGroupMissingString = '';
            if (pointGroupNo - pointGroupNum > 1) {
                pointGroupMissingNum = pointGroupNo - pointGroupNum - 1;
            }
            for (var i = 0; i < pointGroupMissingNum; i++) {
                pointGroupMissingString += 'M0,0';
            }
            return pointGroupMissingString;
        };
        LineSvgMotion.prototype.drawLineToVolume = function (pointGroup, pointGroupNo, dAttribute, element, volume) {
            if (volume >= 0 && volume <= 100) {
                var length_1 = this.getLineLength(pointGroup) / 100 * volume;
                var newPointGroup = this.changePointGroupAtLength(pointGroup, length_1);
                var workRange = this.getRangeOf(dAttribute, 'M', pointGroupNo);
                var lineString = '';
                for (var i = 0; i < newPointGroup.length; i++) {
                    lineString += lineString == '' ? '' : 'L';
                    lineString += newPointGroup[i][0] + "," + newPointGroup[i][1];
                }
                if (workRange === null) {
                    dAttribute = "" + dAttribute + this.getPointGroupStringMissing(dAttribute, pointGroupNo) + "M" + lineString;
                }
                else {
                    dAttribute = dAttribute.substring(0, workRange[0]) + lineString + dAttribute.substring(workRange[1], dAttribute.length);
                }
                element.setAttribute('d', dAttribute);
                return dAttribute;
            }
        };
        return LineSvgMotion;
    }());

    exports.LineSvgMotion = LineSvgMotion;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=svg-motion.umd.js.map
