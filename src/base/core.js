import $ from "jquery"
import jui from "../main.js"
import ColumnMod from "./column.js"
import RowMod from "./row.js"

jui.use(ColumnMod, RowMod);

export default {
    name: "grid.base",
    component: function () {
        const _ = jui.include("util.base");
        const Column = jui.include("grid.column");
        const Row = jui.include("grid.row");

        var Base = function(handler, fields) {
            var self = this;

            var $obj = handler.$obj,
                $tpl = handler.$tpl;

            var columns = [],
                rows = [],
                folds = {};

            var isNone = false,
                iParser = _.index();

            function init() {
                toggleRowNone();
                initColumns();
            }

            function initColumns() {
                var tmpColumns = [];

                $obj.thead.find("tr:last > th").each(function(i) {
                    tmpColumns.push(this);
                });

                for(var i = 0; i < tmpColumns.length; i++) {
                    var column = new Column(i);

                    if(columns[i]) {
                        column.element = columns[i].element;
                        column.order = columns[i].order;
                        column.name = columns[i].name;
                        column.data = columns[i].data;
                        column.list = columns[i].list;
                        column.type = columns[i].type;
                        column.width = columns[i].width;
                    } else {
                        column.element = tmpColumns[i];

                        if($(column.element).attr("width") || (
                            $(column.element).attr("style") &&
                            $(column.element).attr("style").indexOf("width") != -1)) {
                            column.width = $(column.element).outerWidth();
                        }

                        if(fields && fields[i]) {
                            column.name = fields[i];
                        }
                    }

                    for(var j = 0; j < rows.length; j++) {
                        column.list.push(rows[j].list[i]);
                        column.data.push(rows[j].data[column.name]);
                    }

                    columns[i] = column;
                }
            }

            function initColumnRows(type, row) {
                if(type == "reload" || type == "append") {
                    for(var i = 0; i < columns.length; i++) {
                        columns[i].list[row.index] = row.list[i];
                        columns[i].data[row.index] = row.data[columns[i].name];
                    }
                } else if(type == "remove") {
                    for(var i = 0; i < columns.length; i++) {
                        columns[i].list.splice(row.index, 1);
                        columns[i].data.splice(row.index, 1);
                    }
                } else {
                    initColumns();
                }
            }

            function createRow(data, no, pRow) {
                if(data instanceof Row) return data;

                var row = new Row();
                row.init(data, $tpl.row, pRow);
                row.setIndex(no);
                row.reload(columns);

                return row;
            }

            function setRowChildAll(dataList, row) {
                var child_rows = row.children;

                if(child_rows.length > 0) {
                    for(var i = 0; i < child_rows.length; i++) {
                        dataList.push(child_rows[i]);

                        if(child_rows[i].children.length > 0) {
                            setRowChildAll(dataList, child_rows[i]);
                        }
                    }
                }
            }

            function getRowChildLeaf(keys, row) {
                if(!row) return null;
                var tmpKey = keys.shift();

                if(tmpKey == undefined) {
                    return row;
                } else {
                    return getRowChildLeaf(keys, row.children[tmpKey]);
                }
            }

            function reloadRows() {
                var index = arguments[0], callback = arguments[1];

                if(typeof(index) == "function") {
                    callback = index;
                    index = 0;
                } else {
                    index = (!isNaN(index)) ? index : 0;
                }

                for(var i = index; i < rows.length; i++) {
                    rows[i].setIndex(i);
                    rows[i].reload();
                    initColumnRows("reload", rows[i]);

                    if(typeof(callback) == "function") {
                        callback(i);
                    }
                }
            }

            function insertRowData(index, data) {
                var row = createRow(data, index), preRows = row;

                if(rows.length == index && !(index == 0 && rows.length == 1)) {
                    var tRow = rows[index - 1];
                    $(row.element).insertAfter((tRow.children.length == 0) ? tRow.element : tRow.lastChildLeaf().element);
                } else {
                    $(row.element).insertBefore(rows[index].element);
                }

                preRows = rows.splice(0, index);
                preRows.push(row);
                rows = preRows.concat(rows);

                // Rows UI
                reloadRows(index);

                return row;
            }

            function insertRowDataChild(index, data) {
                var keys = iParser.getIndexList(index);

                var pRow = self.getRowParent(index),
                    rownum = keys[keys.length - 1],
                    row = createRow(data, rownum, pRow);

                pRow.insertChild(rownum, row);

                return row;
            }

            function appendRowData(data) {
                var row = createRow(data, rows.length);
                rows.push(row);

                $obj.tbody.append(row.element);
                initColumnRows("append", row);

                return row;
            }

            function appendRowDataChild(index, data) {
                var pRow = self.getRow(index),
                    cRow = createRow(data, pRow.children.length, pRow);

                pRow.appendChild(cRow);

                return cRow;
            }

            function toggleRowNone() {
                if(typeof($tpl.none) != "function") return false;

                if(isNone) {
                    if(rows.length > 0) {
                        $obj.tbody.find("tr:first").remove();
                        isNone = false;
                    }
                } else {
                    if(rows.length == 0) {
                        $obj.tbody.html($tpl.none());
                        isNone = true;
                    }
                }

                return true;
            }

            function getIndexToRow(index) {
                for(var i = 0, len = rows.length; i < len; i++) {
                    if(rows[i].index == ("" + index)) {
                        return rows[i];
                        break;
                    }
                }

                return null;
            }

            this.appendRow = function() {
                var index = arguments[0], data = arguments[1];
                var result = null;

                if(!data) result = appendRowData(index);
                else result = appendRowDataChild(index, data);

                toggleRowNone();
                return result;
            }

            this.insertRow = function(index, data) {
                var result = null;

                if(iParser.isIndexDepth(index)) {
                    result = insertRowDataChild(index, data);
                } else {
                    if(rows.length == 0 && parseInt(index) == 0) {
                        result = this.appendRow(data);
                    } else {
                        result = insertRowData(index, data);
                    }
                }

                toggleRowNone();
                return result;
            }

            this.updateRow = function(index, data) {
                var row = this.getRow(index);

                for(var key in data) {
                    row.data[key] = data[key];
                }

                row.reload();
                initColumnRows("reload", row);

                return row;
            }

            this.moveRow = function(index, targetIndex) {
                if(index == targetIndex) return;

                var rows = this.getRowAll(index),
                    row = rows[0],
                    data = _.clone(row.data);

                if(rows.length > 1) {
                    for(var i = 0; i < rows.length; i++) {
                        var index = iParser.changeIndex(rows[i].index, targetIndex, rows[0].index);
                        this.insertRow(index, rows[i].data);
                    }
                } else {
                    this.insertRow(targetIndex, data);
                }

                this.removeRow(row.index);
            }

            this.removeRow = function(index) {
                var row = this.getRow(index);

                if(!iParser.isIndexDepth(index)) {
                    row.destroy();

                    initColumnRows("remove", rows[index]);
                    rows.splice(index, 1);
                    reloadRows(index);
                } else {
                    row.destroy();
                }

                toggleRowNone();
            }

            this.openRow = function(index) {
                this.getRow(index).open();
                folds[index] = false;

                for(var key in folds) {
                    if(folds[key] !== false) {
                        var foldRow = this.getRow(folds[key]);
                        if(foldRow != null) foldRow.fold();
                    }
                }
            }

            this.openRowAll = function() {
                var tmpRows = this.getRowAll();

                for(var i = 0; i < tmpRows.length; i++) {
                    if(!tmpRows[i].isLeaf()) {
                        tmpRows[i].open();
                        folds[tmpRows[i].index] = false;
                    }
                }
            }

            this.foldRow = function(index) {
                this.getRow(index).fold();
                folds[index] = index;
            }

            this.foldRowAll = function() {
                var tmpRows = this.getRowAll();

                for(var i = 0; i < tmpRows.length; i++) {
                    if(!tmpRows[i].isLeaf()) {
                        tmpRows[i].fold();
                        folds[tmpRows[i].index] = tmpRows[i].index;
                    }
                }
            }

            this.removeRows = function() {
                rows = [];

                if(!toggleRowNone()) {
                    $obj.tbody.html("");
                }

                initColumnRows();
            }

            this.sortRows = function(name, isDesc) {
                var qs = _.sort(rows);

                if(isDesc) {
                    qs.setCompare(function(a, b) {
                        return (getValue(a) > getValue(b)) ? true : false;
                    });
                } else {
                    qs.setCompare(function(a, b) {
                        return (getValue(a) < getValue(b)) ? true : false;
                    });
                }

                qs.run();
                $obj.tbody.html("");

                reloadRows(function(i) {
                    $obj.tbody.append(rows[i].element);
                });

                function getValue(row) {
                    var value = row.data[name];

                    if(typeof(value) == "string") {
                        return value.toLowerCase();
                    } else {
                        if(!isNaN(value) && value != null) {
                            return value;
                        }
                    }

                    return "";
                }
            }

            this.appendColumn = function(tplType, dataList) {
                var columLength = columns.length,
                    $columnRows = $($tpl[tplType]({ rows: dataList }));
                var $theadTrList = $columnRows.filter("thead").find("tr");

                $theadTrList.each(function(i) {
                    var $tr = $obj.thead.find("tr").eq(i);

                    $(this).find("th").each(function(j) {
                        $tr.append(this);

                        if($theadTrList.size() - 1 == i) {
                            columns.push({ element: this, list: [] });
                        }
                    });
                });

                for(var k = 0; k < rows.length; k++) {
                    $columnRows.filter("tbody").find("tr").eq(k).find("td").each(function(i) {
                        $(rows[k].element).append(this);

                        columns[columLength + i].list.push(this);
                        rows[k].list.push(this);

                        $.extend(rows[k].data, dataList[k]);
                    });
                }
            }

            this.removeColumn = function(index) {
                for(var i = 0; i < columns[index].list.length; i++) {
                    $(columns[index].element).remove();
                    $(columns[index].list[i]).remove();
                }

                for(var j = 0; j < rows.length; j++) {
                    rows[j].list.splice(index, 1);
                }

                columns.splice(index, 1);
            }

            this.hideColumn = function(index) {
                if(columns[index].type == "hide") return;

                var rows = this.getRowAll();
                for(var i = 0; i < rows.length; i++) {
                    rows[i].hideCell(index);
                }

                columns[index].hide();
            }

            this.showColumn = function(index) {
                if(columns[index].type == "show") return;

                var rows = this.getRowAll();
                for(var i = 0; i < rows.length; i++) {
                    rows[i].showCell(index);
                }

                columns[index].show();
            }

            this.getColumnCount = function() {
                return columns.length;
            }

            this.getRowCount = function() {
                return rows.length;
            }

            this.getColumn = function(index) {
                if(index == null) return columns;
                else return columns[index];
            }

            this.getRow = function(index) {
                if(index == null) {
                    return rows;
                } else {
                    var row = getIndexToRow(index);

                    if(!row) {
                        var keys = iParser.getIndexList(index),
                            row = getIndexToRow(keys[0]);

                        for(var i = 1, len = keys.length; i < len; i++) {
                            if(!row) break;
                            row = row.children[keys[i]];
                        }

                        return row;
                    } else {
                        return row;
                    }
                }
            }

            this.getRowAll = function(index) {
                var dataList = [],
                    tmpRows = (index == null) ? rows : [ this.getRow(index) ];

                for(var i = 0; i < tmpRows.length; i++) {
                    if(tmpRows[i]) {
                        dataList.push(tmpRows[i]);

                        if(tmpRows[i].children.length > 0) {
                            setRowChildAll(dataList, tmpRows[i]);
                        }
                    }
                }

                return dataList;
            }

            this.getRowParent = function(index) {
                if(!iParser.isIndexDepth(index)) return null;
                return this.getRow(iParser.getParentIndex(index));
            }

            this.setColumn = function(index, column) {
                columns[index] = column;
            }

            this.setRow = function(index, row) {
                rows[index] = row;
            }

            this.printInfo = function() {
                console.log(columns);
                console.log(rows);
            }

            init();
        }

        return Base;
    }
}