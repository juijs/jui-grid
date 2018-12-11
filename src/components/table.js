import $ from "jquery"
import jui from "../main.js"
import JBinder from "../base/binder.js";
import BaseComp from "../base/core.js"
import DropdownComp from "juijs-ui/src/components/dropdown.js"

jui.use(BaseComp, DropdownComp);

$.fn.jbinder = function(options) {
    var result = [], opts = $.extend({
        target: null,
        attr: "data-bind"
    }, options);

    $(this).each(function(i) {
        var binder = new JBinder(this, opts);
        result[i] = (opts.target != null) ? $.extend(opts.target, binder) : binder;
    });

    return (result.length == 1) ? result[0] : result;
}

export default {
    name: "grid.table",
    extend: "event",
    component: function () {
        const _ = jui.include("util.base");
        const dropdown = jui.include("ui.dropdown");
        const Base = jui.include("grid.base");
        const Row = jui.include("grid.row");

        _.resize(function() {
            var call_list = jui.get("grid.table");

            for(var i = 0; i < call_list.length; i++) {
                var ui_list = call_list[i];

                for(var j = 0; j < ui_list.length; j++) {
                    ui_list[j].resize();
                }
            }
        }, 1000);

        var UI = function() {
            var $obj = null, ddUi = null; // table/thead/tbody 구성요소, 컬럼 설정 UI (Dropdown)
            var selectedIndex = null, editableIndex = null, dragIndex = null, expandedIndex = null, checkedIndexes = {}; // TODO: 로우 객체 기반으로 변경하기 (#8)
            var is_resize = false;
            var vo = null;

            function getExpandHtml(self) {
                return "<tr class='expand' style='display: none;'><td id='EXPAND_" + self.timestamp + "'></td></tr>";
            }

            function getColumnIndexes(self, colkeys) {
                var indexList = [];

                for(var i = 0; i < colkeys.length; i++) {
                    if(typeof(colkeys[i]) == "string") {
                        var column = self.getColumn(colkeys[i]);
                        indexList.push(column.index);
                    } else {
                        indexList.push(colkeys[i]);
                    }
                }

                return indexList;
            }

            function setColumnStatus(self) {
                var colkeys = self.options.colshow,
                    len = self.uit.getColumnCount();

                if(colkeys === true) {
                    self.options.colshow = colkeys = [];

                    for(var i = 0; i < len; i++) {
                        colkeys.push(i);
                    }
                } else {
                    colkeys = getColumnIndexes(self, colkeys);
                }

                for(var i = 0; i < len; i++) {
                    if($.inArray(i, colkeys) == -1)
                        self.uit.hideColumn(i);
                    else
                        self.uit.showColumn(i);
                }
            }

            function setColumnMenu(self) {
                var columns = self.listColumn(),
                    columnNames = [];

                for(var i = 0; i < columns.length; i++) {
                    columnNames.push($(columns[i].element).text());
                }

                var $ddObj = $(self.tpl.menu({ columns: columnNames }));

                $("body").append($ddObj);
                ddUi = dropdown($ddObj, { close: false });

                $(ddUi.root).find("input[type=checkbox]").each(function(i) {
                    if(columns[i].type == "show") this.checked = true;
                    else this.checked = false;

                    self.addEvent(this, "click", function(e) {
                        var isExist = $(ddUi.root).find("input[type=checkbox]:checked") != null;

                        if(this.checked) {
                            self.showColumn(i, e);
                        } else {
                            if(isExist) {
                                self.hideColumn(i, e);
                            } else {
                                this.checked = true;
                            }
                        }

                        self.hideExpand();
                        self.scroll();
                    });
                });
            }

            function setScrollResize(self) {
                var tableWidth = $obj.table.outerWidth(),
                    thCount = self.uit.getColumnCount(),
                    isLastCheck = false;

                for(var i = thCount - 1; i >= 0; i--) {
                    var colInfo = self.getColumn(i),
                        thWidth = $(colInfo.element).outerWidth();

                    // 마지막 TD는 스크롤 사이즈를 차감
                    if($(colInfo.element).css("display") == "none") {}
                    else {
                        if(!isLastCheck) {
                            thWidth = thWidth - _.scrollWidth();
                            isLastCheck = true;
                        }
                    }

                    $(colInfo.list[0]).outerWidth(thWidth);
                }

                $obj.tbody.outerWidth(tableWidth);
            }

            function setScrollEvent(self) {
                if(!$(self.root).hasClass("table-scroll")) { // 스크롤일 경우, 별도 처리
                    self.scroll();
                }

                $obj.tbody.off("scroll").scroll(function(e) {
                    if(($obj.tbody.scrollTop() + self.options.scrollHeight) == $obj.tbody.get(0).scrollHeight){
                        self.emit("scroll", e);
                        return false;
                    }
                });
            }

            function setUpdateInit(self, isInit) {
                if(self.uit.getRowCount() < 1) return;

                if(isInit) {
                    if(self.options.expand) {
                        $obj.tbody.prepend(getExpandHtml(self));
                    }

                    self.scroll();
                }

                if(self.options.scroll) { // 스크롤 이벤트 처리
                    setScrollEvent(self);
                }

                self.setVo(); // TODO: 차후에 제거해야 함
            }

            function setEventRows(self, rows) {
                var rows = (!rows) ? self.uit.getRow() : rows;

                for(var i = 0; i < rows.length; i++) {
                    (function(row) {
                        if(row.element == null) return;

                        if(row.children.length > 0) {
                            setEventRow(self, row);
                            setEventRows(self, row.children);
                        } else {
                            setEventRow(self, row);
                        }
                    })(rows[i])
                }
            }

            function setEventRow(self, row) {
                self.addEvent(row.element, "click", function(e) {
                    // 1. 공통 이벤트 발생
                    self.emit("select", [ row, e ]); // deprecated
                    self.emit("click", [ row, e ]);

                    // 2. 확장영역 자동 이벤트 처리
                    if(self.options.expand) {
                        if(self.options.expandEvent === false) return;

                        var expandedRow = (expandedIndex instanceof Row) ? expandedIndex : self.get(expandedIndex); // TODO: #8 가상스크롤 지원 이슈로 인한 사이드이펙트

                        if(expandedRow === row) {
                            self.hideExpand(e);
                        } else {
                            if(expandedIndex != null) {
                                self.hideExpand(e);
                            }

                            self.showExpand(row, undefined, e);
                        }
                    }
                });

                self.addEvent(row.element, "dblclick", function(e) {
                    self.emit("dblclick", [ row, e ]);
                });

                self.addEvent(row.element, "contextmenu", function(e) {
                    self.emit("rowmenu", [ row, e ]);
                    return false;
                });


                // 로우 수정 이벤트 설정
                if(self.options.editRow && self.options.editEvent) {
                    self.addEvent(row.element, "dblclick", function(e) {
                        if(e.target.tagName == "TD" || e.target.tagName == "TR") {
                            self.showEditRow(row.index, e);
                        }
                    });
                }

                // 로우 이동 이벤트 설정
                if(self.options.moveRow) {
                    // 드래그 시작 이벤트
                    self.addEvent(row.element, "mousedown", function(e) {
                        if(dragIndex != null) return;
                        dragIndex = row.index;

                        // 테이블 상태 초기화
                        $obj.tbody.find("tr").removeClass("dragtarget");
                        $(row.element).addClass("dragtarget");

                        $("body").append(createRow(row.element));
                    });

                    // 마우스 오버시 라인 위치 변경 이벤트
                    self.addEvent(row.element, "mouseover", function(e) {
                        if(dragIndex == null) return;

                        $obj.tbody.find(".dragline").remove();
                        createLine().insertBefore(row.element);
                    });
                    self.addEvent(document, "mouseover", function(e) {
                        if(dragIndex == null || e.target.tagName == "TD" || e.target.tagName == "TR") return;

                        $obj.tbody.find(".dragline").remove();
                        $obj.tbody.append(createLine());
                    });

                    // 마우스 이동시 클론 로우 위치 변경 이벤트
                    self.addEvent(row.element, "mousemove", function(e) {
                        if(dragIndex == null) return;

                        $("#TABLE_LAYER_" + self.timestamp).css({
                            left: e.pageX + 2,
                            top: e.pageY + 2,
                            display: "table"
                        });
                    });

                    // 마우스 드래그 완료시 처리 이벤트
                    self.addEvent(row.element, "mouseup", function(e) {
                        moveDragEnd(row.index, e);
                    });
                    self.addEvent($obj.thead, "mouseover", function(e) {
                        moveDragEnd(0, e);
                    });
                    self.addEvent(document, "mouseup", function(e) {
                        moveDragEnd(self.count(), e);
                    });

                    function createLine() {
                        return $("<tr class='dragline'><td colspan='" + row.list.length + "'></td></tr>");
                    }

                    function createRow(element) {
                        var $clone = $("<table id='TABLE_LAYER_" + self.timestamp + "' class='" + $(self.root).attr("class") + " layer'></table>"),
                            $cloneRow = $(element).clone();

                        $clone.css({
                            position: "absolute",
                            width: $(self.root).width(),
                            display: "none"
                        });

                        $cloneRow.attr({
                            "class": "dragclone"
                        });

                        $clone.append($cloneRow);

                        return $clone;
                    }

                    function moveDragEnd(end, e) {
                        $obj.tbody.find(".dragline").remove();

                        if(dragIndex != null) {
                            $("#TABLE_LAYER_" + self.timestamp).remove();

                            if (dragIndex != end) {
                                if (self.emit("move", [ self.get(dragIndex), e ]) !== false) {
                                    self.move(dragIndex, end);

                                    var row = self.get((dragIndex < end) ? end - 1 : end);
                                    $(row.element).addClass("dragtarget");

                                    self.hideExpand(e);
                                    self.emit("moveend", [ row, e ]);
                                }
                            }

                            dragIndex = null;
                        }
                    }
                }
            }

            function setEventEditCell(self, elem, row, colIndex, event, callback) {
                var column = self.getColumn(colIndex),
                    colkeys = self.options.editRow,
                    $input = null;

                if(!column.name || (colkeys !== true && $.inArray(colIndex, getColumnIndexes(self, colkeys)) == -1)) {
                    $input = $("<div class='edit'></div>").html($(elem).html() || "&nbsp;");
                    $input.attr("disabled", true);
                } else {
                    $input = $("<input type='text' class='edit' />").val((column.name) ? column.data[row.index] : "");
                }

                $(elem).html($input.css("width", "100%"));

                // 클릭 엘리먼트에 포커스 맞추기
                if(event && event.target == elem) $input.focus();

                // 엔터 키 이벤트 발생시 업데이트
                self.addEvent($input, "keypress", function(e) {
                    if(e.which == 13) {
                        update();
                    }
                });

                // 포커스가 바뀌었을 경우 업데이트
                self.addEvent($obj.tbody, "mousedown", function(e) {
                    if(e.target.tagName == "TD" || e.target.tagName == "TR") {
                        update();
                    }
                });

                function update() {
                    if(editableIndex != null) {
                        callback();
                    }
                }
            }

            function setEventColumn(self) {
                var opts = self.options,
                    len = self.uit.getColumnCount();

                // 컬럼 컨텍스트 이벤트
                for(var i = 0; i < len; i++) {
                    var col = self.getColumn(i);

                    (function(index, column) {
                        if(!opts.fields || !opts.sort || opts.sortEvent !== true) {
                            self.addEvent(column.element, "click", function (e) {
                                self.emit("colclick", [ column, e ]);
                            });
                        }

                        self.addEvent(column.element, "dblclick", function(e) {
                            self.emit("coldblclick", [ column, e ]);
                        });

                        self.addEvent(column.element, "contextmenu", function(e) {
                            self.emit("colmenu", [ column, e ]);
                            return false;
                        });
                    })(i, col);
                }
            }

            function setEventSort(self) {
                var sortIndexes = self.options.sort,
                    len = (sortIndexes === true) ? self.uit.getColumnCount() : sortIndexes.length;

                for(var i = 0; i < len; i++) {
                    var colKey = (sortIndexes === true) ? i : sortIndexes[i],
                        col = self.getColumn(colKey);

                    if(col.element != null) {
                        (function(index, column) {
                            self.addEvent(column.element, "click", function(e) {
                                if($(e.target).hasClass("resize")) return;

                                self.sort(index, undefined, e);
                                self.emit("colclick", [ column, e ]);
                            });
                        })(colKey, col);

                        $(col.element).css("cursor", "pointer");
                    }
                }
            }

            function setColumnResize(self) {
                var resizeX = 0,
                    tablePos = $obj.table.offset();
                var col = null,
                    colNext = null,
                    colWidth = 0,
                    colNextWidth = 0,
                    colResize = null;

                // 리사이즈 엘리먼트 삭제
                $obj.thead.find(".resize").remove();

                for(var i = 0; i < self.uit.getColumnCount() - 1; i++) {
                    var $colElem = $(self.getColumn(i).element),
                        $resizeBar = $("<div class='resize'></div>");
                    var pos = $colElem.offset(); // ie8 버그로 인해 position에서 offset으로 변경함

                    $resizeBar.css({
                        position: "absolute",
                        width: "8px",
                        height: $colElem.outerHeight(),
                        left: ($colElem.outerWidth() + (pos.left - tablePos.left) - 1) + "px",
                        top: (pos.top - tablePos.top) + "px",
                        cursor: "w-resize",
                        "z-index": "1"
                    });

                    $colElem.append($resizeBar);

                    // Event Start
                    (function(index) {
                        self.addEvent($resizeBar, "mousedown", function(e) {
                            if(resizeX == 0) resizeX = e.pageX;

                            // 컬럼 객체 가져오기
                            col = self.getColumn(index);
                            colNext = getNextColumn(index);
                            colWidth = $(col.element).outerWidth();
                            colNextWidth = $(colNext.element).outerWidth();
                            colResize = this;
                            is_resize = true;

                            return false;
                        });
                    })(i);
                }

                self.addEvent(document, "mousemove", function(e) {
                    if(resizeX > 0) {
                        colResizeWidth(self, e.pageX - resizeX);
                    }
                });

                self.addEvent(document, "mouseup", function(e) {
                    if(resizeX > 0) {
                        resizeX = 0;

                        // 리사이징 바, 위치 이동
                        var left = $(col.element).offset().left - tablePos.left;
                        $(colResize).css("left", $(col.element).outerWidth() + left - 1);

                        self.emit("colresize", [ col, e ]);

                        // 리사이징 상태 변경 (delay)
                        setTimeout(function() {
                            is_resize = false;
                        }, 100);

                        return false;
                    }
                });

                function getNextColumn(index) {
                    for(var i = index + 1; i < self.uit.getColumnCount(); i++) {
                        var elem = self.getColumn(i).element;

                        if(!$(elem).is(':hidden')) {
                            return self.getColumn(i);
                        }
                    }
                }

                function colResizeWidth(self, disWidth) {
                    var colMinWidth = 30;

                    // 최소 크기 체크
                    if(colWidth + disWidth < colMinWidth || colNextWidth - disWidth < colMinWidth)
                        return;

                    $(col.element).outerWidth(colWidth + disWidth);
                    $(colNext.element).outerWidth(colNextWidth - disWidth);

                    // 스크롤 옵션일 경우, 별도 처리
                    if(self.options.scroll) {
                        var colLastWidth = $(colNext.element).outerWidth() - ((col.index == self.uit.getColumnCount() - 2) ? _.scrollWidth() : 0);

                        $(col.list[0]).outerWidth($(col.element).outerWidth());
                        $(colNext.list[0]).outerWidth(colLastWidth);
                    }
                }
            }

            function resetRowStatus(self, isChecked) {
                self.hideExpand();
                self.hideEditRow();
                self.unselect();

                if(!isChecked) {
                    self.uncheckAll();
                }
            }

            this.init = function() {
                var opts = this.options;

                // @Deprecated, 'rows'는 의미상 맞지 않아 차후 삭제
                opts.data = (opts.rows != null) ? opts.rows : opts.data;

                // UIHandler, 추후 코어에서 처리
                $obj = {
                    table: $(this.root).css({ "position": "relative" }),
                    thead: $(this.root).find("thead"),
                    tbody: $(this.root).find("tbody")
                };

                // UITable 객체 생성
                this.uit = new Base({
                    $obj: $obj, $tpl: this.tpl
                }, opts.fields); // 신규 테이블 클래스 사용

                if(opts.moveRow) {
                    $obj.tbody.css({
                        "-webkit-user-select": "none",
                        "-moz-user-select": "none",
                        "-ms-user-select": "none",
                        "-o-user-select": "none",
                        "user-select": "none"
                    });
                }

                if(opts.fields && opts.colshow) { // 컬럼 보이기 초기값 설정
                    setColumnStatus(this);
                }

                if(opts.fields && this.tpl.menu && dropdown != null) { // 컬럼 보이기/숨기기 메뉴 설정
                    setColumnMenu(this);
                }

                if(opts.resize) {
                    setColumnResize(this);
                }

                if(opts.fields && opts.sort && opts.sortEvent === true) {
                    setEventSort(this);
                }

                if(opts.data.length > 0) {
                    this.update(opts.data);
                } else {
                    this.setVo(); // TODO: 차후에 제거해야 함
                }

                if(opts.width > 0) {
                    $obj.table.outerWidth(opts.width);
                }

                if(!opts.fields) {
                    if(opts.sort || opts.colshow || opts.editRow) {
                        throw new Error("JUI_CRITICAL_ERR: 'fields' option is required");
                    }
                }

                setEventColumn(this);
            }

            /**
             * @method update
             * Updates the list of rows or modifies the row at a specified index.
             *
             * @param {Array} rows
             */
            this.update = function() {
                var dataList = (arguments.length == 1) ? arguments[0] : arguments[1],
                    index = (arguments.length == 2) ? arguments[0] : null;

                if(index != null) { // 1. 단일 로우 업데이트
                    var tmpRow = this.uit.updateRow(index, dataList);
                    setEventRow(this, tmpRow);

                    // 첫번째 로우일 경우, 스크롤 다시 처리
                    if(parseInt(index) == 0) {
                        this.scroll();
                    }
                } else { // 2. 로우 목록 업데이트
                    this.uit.removeRows();
                    this.scroll();
                    this.append(dataList);

                    // 정렬 인덱스가 옵션에 있을 경우, 해당 인덱스의 컬럼 정렬
                    if(this.options.sortIndex) {
                        this.sort(this.options.sortIndex, this.options.sortOrder, null);
                    }
                }
            }

            /**
             * @method updateTree
             * It is possible to configure a tree table using an object array with the index and data properties.
             *
             * @param {Array} rows
             */
            this.updateTree = function(rows) { // index & data 조합의 객체 배열
                var iParser = _.index();

                // 전체 로우 제거
                this.uit.removeRows();

                // 트리 로우 추가
                for(var i = 0; i < rows.length; i++) {
                    var pIndex = iParser.getParentIndex(rows[i].index);

                    if(pIndex == null) {
                        this.uit.appendRow(rows[i].data);
                    } else {
                        this.uit.appendRow(pIndex, rows[i].data);
                    }
                }

                setUpdateInit(this, true);
                setEventRows(this);
            }

            /**
             * @method append
             * Add a row or a child row to at a specified index.
             *
             * @param {RowObject} row
             */
            this.append = function() {
                var isInit = (this.count() > 0) ? false : true;
                var dataList = (arguments.length == 1) ? arguments[0] : arguments[1],
                    index = (arguments.length == 2) ? arguments[0] : null;

                dataList = (dataList.length == undefined) ? [ dataList ] : dataList;

                for(var i = 0; i < dataList.length; i++) {
                    var tmpRow = null;

                    if(index != null) tmpRow = this.uit.appendRow(index, dataList[i]);
                    else tmpRow = this.uit.appendRow(dataList[i]);

                    // 추가 로우 추가시 이벤트 걸기
                    if(!isInit) {
                        setEventRow(this, tmpRow);
                    }
                }

                setUpdateInit(this, isInit);
                if(isInit) setEventRows(this); // 최초에 데이터가 없을 경우에만 전체 이벤트 걸기
            }

            /**
             * @method insert
             * Adds a row at a specified index.
             *
             * @param {Integer} index
             * @param {RowObject} row
             */
            this.insert = function(index, dataList) {
                var isInit = (this.count() > 0) ? false : true;
                var dataList = (dataList.length == undefined) ? [ dataList ] : dataList;

                for(var i = 0; i < dataList.length; i++) {
                    this.uit.insertRow(index, dataList[i]);
                }

                setUpdateInit(this, isInit);
                setEventRows(this);
            }

            /**
             * @method select
             * Adds a selected class to a row at a specified index and gets an instance of the applicable row.
             *
             * @param {Integer} index
             * @return {RowObject} row
             */
            this.select = function(index) {
                // 모든 로우 상태 초기화
                resetRowStatus(this);

                var row = this.get(index);

                $(row.element).parent().find(".selected").removeClass("selected");
                $(row.element).addClass("selected");

                selectedIndex = index;
                return row;
            }

            /**
             * @method unselect
             * Removes a selected class from a selected row and gets an instance of the row in question.
             *
             * @return {RowObject} row
             */
            this.unselect = function() {
                if(selectedIndex == null) return;
                var row = this.get(selectedIndex);

                $(row.element).removeClass("selected");
                selectedIndex = null;

                return row;
            }

            /**
             * @method check
             * Add a checked class to a row at a specified index.
             *
             * @param {Integer} index
             */
            this.check = function(index) {
                // 모든 로우 상태 초기화 (체크만 제외 )
                resetRowStatus(this, true);

                var row = this.get(index);

                // 초기화
                this.hideExpand();
                this.hideEditRow();
                this.unselect();

                checkedIndexes[index] = row;
                $(row.element).addClass("checked");
            }

            /**
             * @method uncheck
             * Removes a checked class from a row at a specified index.
             *
             * @param {Integer} index
             */
            this.uncheck = function(index) {
                if(checkedIndexes[index] == null) return;
                var row = this.get(index);

                checkedIndexes[index] = null;
                $(row.element).removeClass("checked");
            }

            /**
             * @method uncheckAll
             * Removes checked classes from all rows.
             */
            this.uncheckAll = function() {
                checkedIndexes = {};
                $obj.tbody.find(".checked").removeClass("checked");
            }

            /**
             * @method remove
             * Remove a row at a specified index.
             *
             * @param {Integer} index
             */
            this.remove = function(index) {
                if(index == null) return null;

                this.uit.removeRow(index);
                setEventRows(this);
                this.scroll();
            }

            /**
             * @method reset
             * Removes all rows.
             */
            this.reset = function() {
                selectedIndex = null;
                expandedIndex = null;
                editableIndex = null;
                dragIndex = null;
                checkedIndexes = {};

                this.uit.removeRows();
                this.scroll();
            }

            /**
             * @method move
             * Moves a row iat a specified index to the target index.
             *
             * @param {Integer} index
             * @param {Integer} targetIndex
             */
            this.move = function(index, targetIndex) {
                this.uit.moveRow(index, targetIndex);
                setEventRows(this);

                // 첫번째 로우일 경우, 스크롤 다시 처리
                if(parseInt(index) == 0 || parseInt(targetIndex) == 0) {
                    this.scroll();
                }
            }

            /**
             * @method sort
             * Moves a row iat a specified index to the target index.
             *
             * @param {Integer} index
             * @param {String} order  "asc" or "desc"
             */
            this.sort = function(index, order, e) {  // index는 컬럼 key 또는 컬럼 name
                if(!this.options.fields || !this.options.sort || is_resize) return;
                var column = this.getColumn(index);

                if(typeof(column.name) == "string") {
                    column.order = (order) ? order : (column.order == "asc" || column.order == null) ? "desc" : "asc";

                    this.uit.setColumn(index, column);
                    this.uit.sortRows(column.name, (column.order == "desc") ? true : false);
                    this.emit("sort", [ column, e ]);

                    setUpdateInit(this, true);
                    setEventRows(this);
                }
            }

            /**
             * @method scroll
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer} height
             */
            this.scroll = function(height) {
                if(!this.options.scroll) return;

                var self = this,
                    h = (height && height > 0) ? height : this.options.scrollHeight,
                    h = (h > 0) ? h : 200;

                this.options.scrollHeight = h;
                $obj.tbody.css("maxHeight", h + "px");

                setTimeout(function() {
                    if($obj.tbody.outerHeight() < h) {
                        $obj.table.css({
                            "table-layout": ""
                        });

                        $obj.tbody.css({
                            "display": "",
                            "overflow": ""
                        });
                    } else {
                        $obj.table.css({
                            "table-layout": "fixed"
                        });

                        $obj.tbody.css({
                            "display": "block",
                            "overflow": "auto"
                        });
                    }

                    setScrollResize(self);
                }, 10);
            }

            /**
             * @method open
             * Shows a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.open = function(index) { // 로트 제외, 하위 모든 노드 대상
                if(index == null) return;

                this.uit.openRow(index);
                this.emit("open", [ this.get(index) ]);
            }

            /**
             * @method fold
             * Hides a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.fold = function(index) {
                if(index == null) return;

                this.uit.foldRow(index);
                this.emit("fold", [ this.get(index) ]);
            }

            /**
             * @method openAll
             * Shows all child rows of a specified index.
             */
            this.openAll = function() { // 로트 포함, 하위 모든 노드 대상
                this.uit.openRowAll();
                this.emit("openall");
            }

            /**
             * @method foldAll
             * Hides all child rows of a specified index.
             */
            this.foldAll = function() {
                this.uit.foldRowAll();
                this.emit("foldall");
            }

            /**
             * @method resize
             * Resets the inner scroll and columns of a table.
             */
            this.resize = function() {
                this.scroll();

                if(this.options.resize) {
                    setColumnResize(this);
                }
            }

            /**
             * @method resizeColumns
             * Resets the sizes of all columns of a table.
             */
            this.resizeColumns = function() {
                var columns = this.listColumn();

                for(var i = 0; i < columns.length; i++) {
                    if(columns[i].width == null) {
                        $(columns[i].element).outerWidth("auto");
                    }
                }
            }

            /**
             * @method size
             * Gets the size of all the rows of a table.
             *
             * @return {Integer} size
             */
            this.size = function() { // 차후 수정 (컬럼 * 로우 개수 * 바이트)
                return this.uit.getRowCount();
            }

            /**
             * @method count
             * Gets the number of trows of a table.
             *
             * @return {Integer} count
             */
            this.count = function() {
                return this.uit.getRowCount();
            }

            /**
             * @method list
             * Gets all the rows of a table.
             *
             * @return {Array} rows
             */
            this.list = function() {
                return this.uit.getRow();
            }

            /**
             * @method listData
             * Gets the data of all the rows of a table.
             *
             * @return {Array} datas
             */
            this.listData = function() {
                var rows = this.list(),
                    data = [];

                for(var i = 0; i < rows.length; i++) {
                    data.push(rows[i].data);
                }

                return data;
            }

            /**
             * @method listAll
             * Gets all the rows of a table including child rows.
             *
             * @return {Array} rows
             */
            this.listAll = function() {
                return this.uit.getRowAll();
            }

            /**
             * @method listChecked
             * Gets all rows in a check state.
             *
             * @return {Array} rows
             */
            this.listChecked = function() {
                var list = [];

                for(var row in checkedIndexes) {
                    if(checkedIndexes[row] != null) {
                        list.push(checkedIndexes[row]);
                    }
                }

                return list;
            }

            /**
             * @method listColumn
             * Gets all columns.
             *
             * @return {Array} columns
             */
            this.listColumn = function() {
                return this.uit.getColumn();
            }

            /**
             * @method get
             * Gets the row at the specified index.
             *
             * @param {Integer} index
             * @return {RowObject} row
             */
            this.get = function(index) {
                if(index == null) return null;
                return this.uit.getRow(index);
            }

            /**
             * @method getAll
             * Gets all rows of at the specified index including child rows.
             *
             * @param {Integer} index
             * @return {Array} rows
             */
            this.getAll = function(index) {
                if(index == null) return null;
                return this.uit.getRowAll(index);
            }

            /**
             * @method getColumn
             * Gets the column at the specified index.
             *
             * @param {"Integer"/"String"} key index or column key
             * @return {ColumnObject} column
             */
            this.getColumn = function(index) { // index or columnName
                if(index == null) return null;
                else {
                    if(typeof(index) == "string")
                        return this.uit.getColumn($.inArray(index, this.options.fields));
                    else
                        return this.uit.getColumn(index);
                }
            }

            /**
             * @method showColumn
             * Shows the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.showColumn = function(index, e) { // index or columnName
                if(!this.options.fields) return;
                var column = this.getColumn(index);

                this.uit.showColumn(column.index);
                this.scroll();
                this.resizeColumns();

                if(this.options.resize) {
                    setColumnResize(this);
                }

                // 커스텀 이벤트 발생
                this.emit("colshow", [ column, e ]);
            }

            /**
             * @method hideColumn
             * Hides the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.hideColumn = function(index, e) { // index or columnName
                if(!this.options.fields) return;
                var column = this.getColumn(index);

                this.uit.hideColumn(column.index);
                this.scroll();
                this.resizeColumns();

                if(this.options.resize) {
                    setColumnResize(this);
                }

                // 커스텀 이벤트 발생
                this.emit("colhide", [ column, e ]);
            }

            /**
             * @method initColumns
             * It is possible to determine the index or name of the column to be shown in an array.
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.initColumns = function(keys) {
                if(typeof(keys) != "object") return;
                this.options.colshow = keys;

                setColumnStatus(this);
                this.scroll();
                this.resizeColumns();

                if(this.options.resize) {
                    setColumnResize(this);
                }
            }

            /**
             * @method showColumnMenu
             * Shows the Show/Hide Column menu at specified coordinates.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.showColumnMenu = function(x, y) {
                if(!this.options.fields || !ddUi) return;

                var columns = this.listColumn(),
                    offset = $obj.thead.offset(),
                    cx = _.typeCheck("integer", x) ? x : 0,
                    cy = _.typeCheck("integer", y) ? y : offset.top + $obj.thead.outerHeight();

                // 현재 체크박스 상태 설정
                $(ddUi.root).find("input[type=checkbox]").each(function(i) {
                    if(columns[i].type == "show") this.checked = true;
                    else this.checked = false;
                });

                ddUi.move(cx, cy);
                ddUi.show();
            }

            /**
             * @method hideColumnMenu
             * Hides the Show/Hide Column menu.
             */
            this.hideColumnMenu = function() {
                if(!this.options.fields || !ddUi) return;
                ddUi.hide();
            }

            /**
             * @method toggleColumnMenu
             * Shows or hides the Show/Hide Column menu.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.toggleColumnMenu = function(x, y) {
                if(!this.options.fields || !ddUi) return;

                if(ddUi.type == "show") this.hideColumnMenu();
                else this.showColumnMenu(x, y);
            }

            /**
             * @method showExpand
             * Shows the extended row area of a specified index.
             *
             * @param {Integer} index
             */
            this.showExpand = function(index, obj, e) {
                if(!this.options.expand) return;

                // 모든 로우 상태 초기화
                resetRowStatus(this);

                var expandSel = "#EXPAND_" + this.timestamp,
                    row = (index instanceof Row) ? index : this.get(index),
                    obj = (typeof(obj) != "object") ? $.extend({ row: row }, row.data) : obj,
                    $expand = $(expandSel).parent().show();

                $obj.tbody.find("tr").removeClass("open");
                $expand.insertAfter($(row.element).addClass("open"));

                $(expandSel)
                    .attr("colspan", $obj.thead.find("tr:last > th:visible").length)
                    .html(this.tpl["expand"](obj));

                // 스크롤 적용
                this.scroll();
                // TODO: 차후에 제거해야 함
                this.setVo();

                // 커스텀 이벤트 호출
                expandedIndex = index;
                this.emit("expand", [ row, e ]);
            }

            /**
             * @method hideExpand
             * Hides the extended row area of a specified index.
             */
            this.hideExpand = function(e) {
                if(expandedIndex == null) return;

                var row = (expandedIndex instanceof Row) ? expandedIndex : this.get(expandedIndex);

                $('#EXPAND_' + this.timestamp).parent().hide();
                $obj.tbody.find("tr").removeClass("open");

                // 스크롤 적용
                this.scroll();

                expandedIndex = null;
                this.emit("expandend", [ row, e ]);
            }

            /**
             * @method getExpand
             * Get a row in which the extended area is currently activated.
             *
             * @return {RowObject} row
             */
            this.getExpand = function() {
                if(expandedIndex == null) return null;

                return (expandedIndex instanceof Row) ? expandedIndex : this.get(expandedIndex);
            }

            /**
             * @method showEditRow
             * Shows the modified row area of a specified index.
             *
             * @param {Integer} index
             */
            this.showEditRow = function(index, e) {
                if(!this.options.editRow) return;

                // 모든 로우 상태 초기화
                resetRowStatus(this);

                var self = this,
                    row = this.get(index);
                var $cells = $(row.element).find("td");

                $cells.each(function(i) {
                    setEventEditCell(self, this, row, i, e, function() {
                        var data = {},
                            originData = row.data;

                        $cells.each(function(colIndex) {
                            var column = self.getColumn(colIndex);

                            if(column.name != null) {
                                var $edit = $(this).find("input.edit");

                                if($edit.length == 1) {
                                    var value = $edit.val();
                                    data[column.name] = (!isNaN(value) && value != null && value != "") ? parseFloat(value) : value;
                                }
                            }
                        });

                        // 변경된 값으로 데이터 갱신하기
                        row.data = $.extend(row.data, data);

                        // 콜백 결과 가져오기
                        var res = self.emit("editend", [ row, e ]);

                        // 이벤트 리턴 값이 false가 아닐 경우에만 업데이트
                        if(res !== false) {
                            self.hideEditRow(data);
                        } else {
                            row.data = originData;
                        }
                    });
                });

                editableIndex = index;
                self.emit("editstart", [ row, e ]);
            }

            /**
             * @method hideEditRow
             * Hides the modified row area of a specified index.
             */
            this.hideEditRow = function(data) {
                if(editableIndex == null) return;
                var row = this.get(editableIndex);

                editableIndex = null;
                this.update(row.index, !data ? row.data : data);
            }

            /**
             * @method getEditRow
             * Get a row in which the modified area is currently activated.
             *
             * @return {RowObject} row
             */
            this.getEditRow = function() {
                if(editableIndex == null) return null;
                return this.get(editableIndex);
            }

            /**
             * @method setCsv
             * Updates a table using a CVS string.
             */
            this.setCsv = function() {
                var opts = this.options;
                if(!opts.fields && !opts.csv) return;

                var csv = (arguments.length == 1) ? arguments[0] : arguments[1],
                    key = (arguments.length == 2) ? arguments[0] : null;

                var fields = _.getCsvFields(opts.fields, opts.csv),
                    csvNumber = (opts.csvNumber) ? _.getCsvFields(opts.fields, opts.csvNumber) : null,
                    dataList = _.csvToData(fields, csv, csvNumber);

                if(key == null) {
                    this.update(dataList);
                } else {
                    this.reset();

                    for(var i = 0; i < dataList.length; i++) {
                        var index = dataList[i][key];

                        if(index) {
                            this.insert(index, dataList[i]);
                        }
                    }
                }
            }

            /**
             * @method setCsvFile
             * Updates a table using a CVS file.
             */
            this.setCsvFile = function() {
                if(!this.options.fields && !this.options.csv) return;

                var self = this,
                    file = (arguments.length == 1) ? arguments[0] : arguments[1],
                    key = (arguments.length == 2) ? arguments[0] : null;

                _.fileToCsv(file, function(csv) {
                    if(key == null) self.setCsv(csv);
                    else self.setCsv(key, csv);
                });
            }

            /**
             * @method getCsv
             * Gets the data of a table as a CSV string.
             *
             * @param {Boolean} isTree
             * @return {String} csv
             */
            this.getCsv = function(isTree) {
                if(!this.options.fields && !this.options.csv) return;

                var fields = _.getCsvFields(this.options.fields, this.options.csv);
                var dataList = [],
                    rows = (isTree) ? this.listAll() : this.list();

                for(var i = 0; i < rows.length; i++) {
                    dataList.push(rows[i].data);
                }

                return _.dataToCsv2({
                    fields: fields,
                    rows: dataList,
                    names: this.options.csvNames
                });
            }

            /**
             * @method getCsvBase64
             * Gets the data of a table as a CSV string encoded as base64.
             *
             * @param {Boolean} isTree
             * @return {String} base64
             */
            this.getCsvBase64 = function(isTree) {
                if(!this.options.fields && !this.options.csv) return;

                return _.csvToBase64(this.getCsv(isTree));
            }

            /**
             * @method downloadCsv
             * Downloads the data of a table as a CSV file.
             *
             * @param {String} name
             * @param {Boolean} isTree
             */
            this.downloadCsv = function(name, isTree) {
                if(_.typeCheck("string", name)) {
                    name = name.split(".")[0];
                }

                var a = document.createElement('a');
                a.download = (name) ? name + ".csv" : "table.csv";
                a.href = this.getCsvBase64(isTree);

                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            }

            /**
             * @method activeIndex
             * Gets the index of a row that is activated in an extended/modified/selected state.
             *
             * @return {Integer} index
             */
            this.activeIndex = function() { // 활성화된 확장/수정/선택 상태의 로우 인덱스를 리턴
                if(expandedIndex != null) {
                    return (expandedIndex instanceof Row) ? expandedIndex.index : expandedIndex;
                }

                return selectedIndex || editableIndex;
            }

            /**
             * @method setVo
             * Dynamically defines the template method of a UI
             *
             * @deprecated
             */
            this.setVo = function() {
                if(!this.options.vo) return;

                if(vo != null) vo.reload();
                vo = $(this.selector).jbinder();

                this.bind = vo;
            }
        }

        UI.setup = function() {
            return {
                /**
                 * @cfg {Array} [fields=null]
                 * Sets the name of columns in the order of being displayed on the table screen.
                 */
                fields: null,

                /**
                 * @cfg {Array} [csv=null]
                 * Sets the column key shown when converted to a CSV string.
                 */
                csv: null,

                /**
                 * @cfg {Array} [csvNames=null]
                 * Sets the name of a column shown when converting to a CSV string, which must be defined in the same order as the CSV option.
                 */
                csvNames: null,

                /**
                 * @cfg {Array} [csvNumber=null]
                 * Sets the column key to be changed to a number form when converted to a CSV string.
                 */
                csvNumber: null,

                /**
                 * @cfg {Array} data
                 * Sets the initial row list of a table.
                 */
                data: [],

                /**
                 * @cfg {Array} rows
                 * Sets the initial row list of a table (@Deprecated).
                 */
                rows: null, // @Deprecated

                /**
                 * @cfg {Boolean/Array} [colshow=false]
                 * Sets a column index shown when the Show/Hide Column menu is enabled.
                 */
                colshow: false,

                /**
                 * @cfg {Boolean} [scroll=false]
                 * Determines whether to use a table scroll.
                 */
                scroll: false,

                /**
                 * @cfg {Integer} [scrollHeight=200]
                 * Sets the reference height of a body area when using a table scroll.
                 */
                scrollHeight: 200,

                /**
                 * @cfg {Integer} [width=0]
                 * Sets the area of a table.
                 */
                width: 0,

                /**
                 * @cfg {Boolean} [expand=false]
                 * Determines whether to use an extended row area.
                 */
                expand: false,

                /**
                 * @cfg {Boolean} [expandEvent=true]
                 * Sets the Show/Hide state of an extended row area when clicking on a row.
                 */
                expandEvent: true,

                /**
                 * @cfg {Boolean|Array} [editRow=false]
                 * Determines whether to use a modified row area.
                 */
                editRow: false,

                /**
                 * @cfg {Boolean} [editEvent=true]
                 * Sets the Show/Hide state of an extended row area when doubleclicking on a row/cell.
                 */
                editEvent: true,

                /**
                 * @cfg {Boolean} [resize=false]
                 * Determines whether to use the column resizing function.
                 */
                resize: false,

                /**
                 * @cfg {Boolean/Array} [sort=false]
                 * Determines whether to use the table sort function.
                 */
                sort: false,

                /**
                 * @cfg {Integer} [sortIndex=null]
                 * Determines whether to use the table sort function.
                 */
                sortIndex: null,

                /**
                 * @cfg {String} [sortOrder="asc"]
                 * Determines whether to use the table sort function.
                 */
                sortOrder: "asc",

                /**
                 * @cfg {Boolean} [sortEvent=true]
                 * Determines whether to use the sort function when you click on a column.
                 */
                sortEvent: true,

                /**
                 * @cfg {Boolean} [moveRow=false]
                 * Determines whether to use the move function when you fire row draggable event.
                 */
                moveRow: false,

                /**
                 * @cfg {Object} [vo=false]
                 * Configures a binding object of a markup
                 *
                 * @deprecated
                 */
                vo: false,

                /**
                 * @cfg {Object} [animate=false]
                 *
                 * @deprecated
                 */
                animate: false
            }
        }

        /**
         * @event select
         * Event that occurs when a row is selected (@Deprecated)
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event click
         * Event that occurs when a row is clicked
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event dblclick
         * Event that occurs when a row is double clicked
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event sort
         * Event that occurs when the table is sorted.
         *
         * @param {ColumnObject) column
         * @param {EventObject} e The event object
         */

        /**
         * @event scroll
         * Event that occurs when the scroll of a table is located at the lowermost position.
         *
         * @param {EventObject} e The event object
         */

        /**
         * @event rowmenu
         * Event that occurs when a row is right clicked.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event colclick
         * Event that occurs when a column is clicked.
         *
         * @param {ColumnObject) column
         * @param {EventObject} e The event object
         */

        /**
         * @event colshow
         * Event that occurs when shown column is selected.
         *
         * @param {ColumnObject) column
         * @param {EventObject} e The event object
         */

        /**
         * @event colhide
         * Event that occurs when hidden column is selected.
         *
         * @param {ColumnObject) column
         * @param {EventObject} e The event object
         */

        /**
         * @event colresize
         * Event that occurs when the column resizing is activated.
         *
         * @param {ColumnObject) column
         * @param {EventObject} e The event object
         */

        /**
         * @event editstart
         * Event that occurs when a row is in a modification state.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event editend
         * Event that occurs when the modification of a row is completed.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event expand
         * Event that occurs when the extended row area is enabled.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event expandend
         * Event that occurs when the extended row area is disabled.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event open
         * Event that occurs when a child row is shown.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event fold
         * Event that occurs when a child row is hidden.
         *
         * @param {RowObject) row
         * @param {EventObject} e The event object
         */

        /**
         * @event openall
         * Event that occurs when all child rows are shown.
         */

        /**
         * @event foldall
         * Event that occurs when all child rows are hidden.
         */

        return UI;
    }
}
