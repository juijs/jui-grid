import $ from 'jquery'
import jui from '../main.js'
import TableComp from '../components/table.js'
import Styles from './index.less'

jui.use(TableComp);

jui.setup({
    template: {
        evaluate : /<\?([\s\S]+?)\?>/g,
        interpolate : /<\?=([\s\S]+?)\?>/g,
        escape : /<\?-([\s\S]+?)\?>/g
    }
});

jui.ready([ "grid.table" ], function(tableUI) {
    var table_data = [
        {"min,m":21.55,"max":21.55,"count":1,"sumCpu":0,"hash":1495461794,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":77.66,"sumTime":21.55,"name":"","avgTime":21.55,"success":0},
        {"min,m":0.004,"max":1.683,"count":32,"sumCpu":0,"hash":-1976684343,"sd":0.379,"tpmc":0,"avgCpu":0,"failure":27,"rate":16.321,"sumTime":4.529,"name":"/dup.jsp","avgTime":0.142,"success":5},
        {"min,m":0.062,"max":0.273,"count":8,"sumCpu":0,"hash":1886515434,"sd":0.068,"tpmc":0,"avgCpu":0,"failure":0,"rate":4.544,"sumTime":1.261,"name":"/oraclesql2.jsp","avgTime":0.158,"success":8},
        {"min,m":0.03,"max":0.12,"count":6,"sumCpu":0,"hash":1888362476,"sd":0.033,"tpmc":0,"avgCpu":0,"failure":0,"rate":1.236,"sumTime":0.343,"name":"/oraclesql4.jsp","avgTime":0.057,"success":6},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.001,"max":0.035,"count":11,"sumCpu":0,"hash":-758408983,"sd":0.01,"tpmc":0,"avgCpu":0,"failure":11,"rate":0.187,"sumTime":0.052,"name":"/ignoresqlexp.jsp","avgTime":0.005,"success":0},
        {"min,m":0.014,"max":0.014,"count":1,"sumCpu":0,"hash":1887438955,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":0.05,"sumTime":0.014,"name":"/oraclesql3.jsp","avgTime":0.014,"success":0}
    ];

    var table_data = [
        {"min,m":0,"max":21.55,"count":1,"sumCpu":0,"hash":1495461794,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":77.66,"sumTime":21.55,"name":"","avgTime":21.55,"success":0},
        {"min,m":1,"max":1.683,"count":32,"sumCpu":0,"hash":-1976684343,"sd":0.379,"tpmc":0,"avgCpu":0,"failure":27,"rate":16.321,"sumTime":4.529,"name":"/dup.jsp","avgTime":0.142,"success":5},
        {"min,m":2,"max":0.273,"count":8,"sumCpu":0,"hash":1886515434,"sd":0.068,"tpmc":0,"avgCpu":0,"failure":0,"rate":4.544,"sumTime":1.261,"name":"/oraclesql2.jsp","avgTime":0.158,"success":8},
        {"min,m":3,"max":0.014,"count":1,"sumCpu":0,"hash":1887438955,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":0.05,"sumTime":0.014,"name":"/oraclesql3.jsp","avgTime":0.014,"success":0}
    ];

    var table = tableUI("#table", {
        fields: [ null, "min,m", "max", "count", "hash", "failure", "sumTime", "avgTime", "name" ],
        csvNumber: [ 1, 2, 3, 4, 5, "avgTime" ],
        sort: true,
        resize: true,
        data: table_data,
        scroll: true,
        scrollHeight: 200,
        editRow: [ 2, 3, 4 ],
        editEvent: false,
        expand: true,
        expandEvent: false,
        moveRow: true,
        event: {
            click: function(row, e) {
                if($(e.target).hasClass("icon-edit")) {
                    this.showEditRow(row.index);
                } else if($(e.target)[0].tagName != "INPUT") {
                    if(this.getExpand() == row) {
                        this.hideExpand();
                    } else {
                        this.showExpand(row.index);
                    }
                }
            },
            editend: function(row) {
                //console.log("editend ----- start");
                //console.log(row.data);
                //console.log("editend ----- end");

                for(var key in row.data) {
                    if(key == "max" && isNaN(row.data[key])) {
                        alert("숫자만 입력할 수 있습니다.");
                        return false;
                    }
                }
            },
            expand: function(row, e) {
                $(row.list[0]).html("<i class='icon-right'></i>");
            },
            expandend: function(row, e) {
                //console.log("expandend ----- start");
                //console.log(row.data);
                //console.log("expandend ----- end");

                $(row.list[0]).html("<i class='icon-left'></i>");
            },
            move: function(row, e) {
                return confirm("drag ok?");
            },
            moveend: function(row, e) {
                console.log(this.listData());
            }
        }
    });

    $("#table_btn").change(function(e) {
        table.setCsvFile(e.target.files[0]);
    });
});