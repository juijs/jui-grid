import jui from 'juijs-chart';

export default {
    name: "chart.brush.range",
    extend: "chart.brush.core",
    component: function() {
        const RangeBrush = function() {
            this.createData = function() {
                const data = [];
                const min = this.brush.domain[0];
                const max = this.brush.domain[1];
                const acc = (max - min) / this.brush.splitCount;

                for (let i = min; i < max; i += acc) {
                    data.push(i);
                }
                data.push(max);

                return data;
            }

            this.draw = function() {
                const height = this.chart.axis(0).y.rangeBand();
                const startY = this.chart.axis(0).y(0) - height/2;
                const g = this.chart.svg.group();
                const data = this.createData();
                const borderColor = this.chart.theme('gridXAxisBorderColor');
                const fontColor = this.chart.theme('gridXFontColor');
                const fontSize = 12;
                const fontWeight = 'bold';

                data.forEach((value, i) => {
                    const x = this.chart.axis(0).x(value);

                    if (i > 0 && i < data.length - 1) {
                        g.append(this.chart.svg.line({
                            x1: x,
                            x2: x,
                            y1: startY,
                            y2: startY + height,
                            stroke: borderColor
                        }));
                    }

                    if (i < data.length - 1) {
                        g.append(this.chart.svg.text({
                            x: x,
                            y: height,
                            dx: this.brush.textPadding,
                            dy: -(fontSize/3),
                            fill: fontColor,
                            'font-size': fontSize,
                            'font-weight': fontWeight
                        }, value))
                    }
                });
                
                return g;
            }
        }

        RangeBrush.setup = function() {
            return {
                domain: [0, 100],
                splitCount: 10,
                textPadding: 8
            };
        }

        return RangeBrush;
    }
}