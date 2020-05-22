import jui from '../src/main.js'
import XTableComp from '../src/components/xtable.js'
import './index.less'

jui.use(XTableComp);

function getRandomData(count) {
    var data = [];

    for(var i = 0; i < count; i++) {
        data.push({ "min":{value: i},"max":21.55,"count":1,"sumCpu":0,"hash":1495461794,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":77.66,"sumTime":21.55,"name":"<b>/db2sql.jsp</b>","avgTime":21.55,"success":0 })
    }

    return data;
}

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
            colresize: function() {
                console.log("resize");
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