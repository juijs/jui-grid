import $ from 'jquery'
import jui from '../src/main.js'
import XTableComp from '../src/components/xtable.js'
import graph from 'juijs-chart';
import ClassicTheme from 'juijs-chart/src/theme/classic';
import StackBar from './stackbar2';
import Range from './range';
import './index.less'

jui.use(XTableComp);
graph.use(ClassicTheme, StackBar, Range)

function getRandomData(count) {
    var data = [];

    for(var i = 0; i < count; i++) {
        data.push({ "min":{value: i},"max":21.55,"count":1,"sumCpu":0,"hash":1495461794,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":77.66,"sumTime":21.55,"name":"<b>/db2sql.jsp</b>","avgTime":21.55,"success":0 })
    }

    return data;
}

function createBarChart(elem, domain) {
    return graph.create('chart.builder', elem, {
        theme : "classic",
        width: '100%',
        height : 14,
        padding: 0,
        axis : {
            data : [
                { blank: 10, method: 0, sql: 10, externalCall: 0, batchJob: 10 },
            ],
            y : {
                domain : [ '' ],
                hide: true
            },
            x : {
                type : 'range',
                domain : domain,
                hide: true
            }
        },
        brush: {
            type : 'stackbar2',
            target : ['blank', 'method', 'sql', 'externalCall', 'batchJob'],
            colors: [ 'transparent', '#7931a5', '#9ed5ff', '#ffdc04', '#49d484']
        },
        style: {
            gridXAxisBorderWidth : 0,
            gridYAxisBorderWidth : 0,
            gridTickBorderSize : 0,
            gridTickBorderWidth : 0,
            gridTickPadding : 0,
        }
    });
}

function createGrid(elem, domain) {
    return graph.create('chart.builder', elem, {
        theme : "classic",
        width: '100%',
        height : 14,
        padding: 0,
        axis : {
            x : {
                type : 'range',
                domain : domain,
                line: 'solid'
            },
            y : {
                domain : [''],
                hide: true
            }
        },
        brush: [{
            type: 'range',
            domain : domain,
            splitCount: 10
        }],
        style: {
            gridXAxisBorderWidth : 0,
            gridYAxisBorderWidth : 0,
            gridTickBorderSize : 0,
            gridTickBorderWidth : 0,
            gridTickPadding : 0,
            gridXFontSize: 0,
            gridBorderWidth: 0,
        }
    });
}

const domain = [0, 100];

jui.ready([ "util.base", "grid.xtable" ], function(_, xtableUI) {    
    window.xtable = xtableUI("#xtable", {
        fields: [ null, "min.value", "max", "count", "hash", "failure", "sumTime", "avgTime", "name" ],
        csvNumber: [ 1, 2, 3, 4, 5, 6, "avgTime" ],
        sort: [ "min.value", 2, 3, 4, 5, 6, "avgTime" ],
        sortLoading: true,
        width: 800,
        scrollWidth: 600,
        scrollHeight: 290,
        rowHeight: 25,
        buffer: "vscroll",
        resize: true,
        colshow: [ 0, 1, 2, 4, 7, 8 ],
        event: {
            colmenu: function(column, e) {
                this.toggleColumnMenu(e.pageX - 25);
            },
            select: function(row, e) {
                //console.log(row);

                if(row.children.length > 0) {
                    if (row.type == "fold") {
                        this.open(row.index);
                    } else {
                        this.fold(row.index);
                    }
                }
            },
            colresize: function(col) {
                console.log("resize", col, this.grid);

                if (!col && !this.grid) {
                    const newElem = document.createElement('span');
                    newElem.style = 'display: inline-block; width: 100%;';
                    $(this.root).children('.head').find("th.chart").append(newElem);
                    this.grid = createGrid(newElem, domain);
                }
                
                if (col && col.name === 'max') {
                    this.next();
                    this.grid.render();
                }
            },
            next: function(rows) {
                rows.forEach(row => {
                    const newElem = document.createElement('span');
                    newElem.style = 'display: inline-block; width: 100%;';

                    $(row.element).children('td.chart').append(newElem);
                    createBarChart(newElem, domain);
                });
            }
        }
    });

    document.getElementById('btn').addEventListener('click', function() {
        xtable.update(getRandomData(333));
        xtable.append("3", getRandomData(3));
        xtable.append("3.1", getRandomData(2));
    });

    // _.resize(function() {
    //     xtable.scrollWidth($("body").width(), true);
    // });
});