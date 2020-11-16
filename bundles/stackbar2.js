import jui from 'juijs-chart';
import BarBrush from 'juijs-chart/src/brush/bar'

jui.use(BarBrush);

export default {
    name: "chart.brush.stackbar2",
    extend: "chart.brush.bar",
    component: function() {
        var _ = jui.include("util.base");

        var StackBarBrush = function(chart, axis, brush) {
            var g, height, bar_height;

            this.getBarElement = function(dataIndex, targetIndex, width) {
                var style = this.getBarStyle(),
                    color = this.color(targetIndex),
                    value = this.getData(dataIndex)[this.brush.target[targetIndex]];

                var r = this.chart.svg.pathRect({
                    width: width,
                    height: bar_height,
                    fill : color,
                    stroke : style.borderColor,
                    "stroke-width" : style.borderWidth,
                    "stroke-opacity" : style.borderOpacity
                });

                // 데이타가 0이면 화면에 표시하지 않음.
                if (value == 0) {
                    r.attr({ display : 'none' });
                }

                if(value != 0) {
                    this.addEvent(r, dataIndex, targetIndex);
                }

                return r;
            }

            this.getTargetSize = function() {
                var height = this.axis.y.rangeBand();

                if(this.brush.size > 0) {
                    return this.brush.size;
                } else {
                    var size = height - this.brush.outerPadding * 2;
                    return (size < this.brush.minSize) ? this.brush.minSize : size;
                }
            }

            this.drawBefore = function() {
                g = chart.svg.group();
                height = axis.y.rangeBand();
                bar_height = this.getTargetSize();
            }

            this.draw = function() {
                if (this.axis.data.length === 0) return g;

                var data = this.axis.data[0],
                    elements = [];

                var offsetY = this.offset("y", 0),
                    startY = offsetY - bar_height / 2,
                    startX = axis.x(0),
                    value = 0,
                    sumValue = 0,
                    radius = bar_height / 2;

                for(var j = 0; j < brush.target.length; j++) {
                    var xValue = data[brush.target[j]] + value,
                        endX = axis.x(xValue),
                        width = Math.abs(startX - endX),
                        r = this.getBarElement(0, j, width);

                    elements.push({
                        r: r,
                        x: (startX < endX) ? startX : endX,
                        y: startY,
                        value: data[brush.target[j]],
                        width: width,
                        height: bar_height
                    });

                    startX = endX;
                    value = xValue;
                    sumValue += data[brush.target[j]];
                }

                for (let j = 1; j < elements.length; j++) {
                    if (elements[j].value > 0) {
                        elements[j].first = true;
                        break;
                    }
                }
                for (let j = elements.length - 1; j > 1; j--) {
                    if (elements[j].value > 0) {
                        elements[j].last = true;
                        break;
                    }
                }
                for (let j = 0; j < elements.length; j++) {
                    const elem = elements[j];
                    
                    if (j > 0) {
                        if (elem.first && elem.last)
                            elem.r.round(elem.width, elem.height, radius, radius, radius, radius);
                        else if (!elem.first && !elem.last)
                            elem.r.round(elem.width, elem.height, 0, 0, 0, 0);
                        else {
                            if (elem.first)
                                elem.r.round(elem.width, elem.height, radius, 0, 0, radius);
                            if (elem.last)
                                elem.r.round(elem.width - 1, elem.height, 0, radius, radius, 0);    
                        }
                    }

                    elem.r.translate(elem.x, elem.y)
                }

                return g;
            }
        }

        StackBarBrush.setup = function() {
            return {
                /** @cfg {Number} [outerPadding=15] Determines the outer margin of a stack bar. */
                outerPadding: 0,
            };
        }

        return StackBarBrush;
    }
}