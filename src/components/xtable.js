import $ from "jquery"
import throttle from "lodash.throttle";
import jui from "../main.js"
import TableComp from './table.js'
import DropdownComp from "juijs-ui/src/components/dropdown.js"
import ModalComp from "juijs-ui/src/components/modal.js"

jui.use(TableComp, DropdownComp, ModalComp);

export default {
    name: "grid.xtable",
    extend: "event",
    component: function () {
        const _ = jui.include("util.base");
        const modal = jui.include("ui.modal");
        const table = jui.include("grid.table");
        const Row = jui.include("grid.row");

        _.resize(function() {
            var call_list = jui.get("grid.xtable");

            for(var i = 0; i < call_list.length; i++) {
                var ui_list = call_list[i];

                for(var j = 0; j < ui_list.length; j++) {
                    ui_list[j].resize();
                }
            }
        }, 1000);

        var UI = function() {
            var head = null, body = null;
            var rows = [], c_rows = [],	t_rows = [], o_rows = null; // 루트 rows, 루트 rows 인덱스, 자식 포함 rows, 자식 제외 + 필터 rows (리펙토링 필요함!!!)
            var ui_modal = null, page = 1;
            var is_loading = false, is_resize = false;
            var w_resize = 8, select_row = null;
            var iParser = _.index();
            var vscroll_info = null;
            var xss_filter_keys = null;
            var row_height = 0; // 최초 렌더링시 row_height를 구한다. 만약에 구하지 못하면 options.rowHeight 값으로 대체한다.

            function createRows(data, no, pRow, type) {
                var tmp_rows = [];

                for(var i = 0, len = data.length; i < len; i++) {
                    var row = new Row(),
                        rownum = no + i;

                    // row 객체 초기화
                    row.init(data[i], head.tpl["row"], pRow);
                    row.setIndex(rownum);

                    // row 상태 설정
                    if(type == "open" || type == "fold") {
                        row.type = type;
                    }

                    // 루트 row만 캐싱함
                    if(pRow == null) {
                        c_rows[rownum] = row;
                    }

                    tmp_rows.push(row);
                }

                return tmp_rows;
            }

            function createTableList(self) {
                var exceptOpts = [
                    "buffer", "bufferCount", "csvCount", "sortLoading", "sortCache", "sortIndex", "sortOrder",
                    "event", "rows", "scrollWidth", "width", "rowHeight", "xssFilter", "msort"
                ];

                var $root = $(self.root);

                // 가상스크롤 모드일 때, 로우 높이는 고정되야 하므로 nowrap 클래스를 추가함
                if(self.options.buffer == "vscroll") {
                    if(!$root.hasClass("nowrap")) {
                        $root.addClass("nowrap");
                    }
                }

                // 스크롤 모드일 때, 무조건 scroll 클래스를 추가함
                if(self.options.buffer != "page") {
                    if(!$root.hasClass("scroll")) {
                        $root.addClass("scroll");
                    }
                }

                // 기본 테이블 마크업 복사해서 추가하기
                $root.append($root.children("table").clone());

                head = table($root.children("table:first-child"), getExceptOptions(self, exceptOpts)); // 헤더 테이블 생성
                setTableHeadStyle(self, head);

                body = table($root.children("table:last-child"), getExceptOptions(self, exceptOpts.concat("resize"))); // 바디 테이블 생성
                setTableBodyStyle(self, body); // X-Table 생성 및 마크업 설정

                // 공통 테이블 스타일 정의
                setTableAllStyle(self);

                // TODO: XSS 필터 대상 컬럼 설정 리펙토링 필요
                if(self.options.xssFilter) {
                    var filterIndexes = self.options.xssFilter,
                        len = (filterIndexes === true) ? head.uit.getColumnCount() : filterIndexes.length;

                    xss_filter_keys = {};
                    for(var i = 0; i < len; i++) {
                        var colKey = (filterIndexes === true) ? i : filterIndexes[i],
                            col = head.getColumn(colKey);

                        xss_filter_keys[col.name] = true;
                    }
                }

                // 테이블 옵션 필터링 함수
                function getExceptOptions(self, exceptOpts) {
                    var options = {};

                    for(var key in self.options) {
                        if($.inArray(key, exceptOpts) == -1) {
                            options[key] = self.options[key];
                        }
                    }

                    // 가로 스크롤 모드일 때, resize 옵션 막기
                    if(self.options.scrollWidth > 0) {
                        options.resize = false;
                    }

                    return options;
                }

                function setTableAllStyle(self) {
                    var opts = self.options;

                    if(opts.scrollWidth > 0) {
                        self.scrollWidth(opts.scrollWidth, true);
                    } else {
                        if(opts.width > 0) {
                            $(self.root).outerWidth(opts.width);
                        }
                    }
                }

                function setTableHeadStyle(self, head) {
                    $(head.root).wrap("<div class='head'></div>");
                    $(head.root).children("tbody").remove();
                }

                function setTableBodyStyle(self, body) {
                    var cols = body.listColumn();

                    // X-Table 바디 영역 스크롤 높이 설정
                    if (self.options.buffer != "page") {
                        var scrollHeight = self.options.scrollHeight;

                        if (self.options.buffer == "vscroll") {
                            $(body.root).wrap("<div class='body' style='max-height: " + scrollHeight + "px'><div></div></div>");

                            $(body.root).parent().parent().css({
                                "overflow-y": "scroll",
                                "transform": "translateZ(0)"
                            });
                        } else {
                            $(body.root).wrap("<div class='body' style='max-height: " + scrollHeight + "px'></div>");

                            $(body.root).parent().css({
                                "overflow-y": "scroll"
                            });
                        }
                    } else {
                        $(body.root).wrap("<div class='body'></div>");
                    }

                    // X-Table 바디 영역의 헤더라인은 마지막 노드를 제외하고 제거
                    $(body.root).find("thead > tr").outerHeight(0).not(":last-child").remove();

                    // X-Table 바디 영역의 헤더 설정
                    for(var i = 0; i < cols.length; i++) {
                        $(cols[i].element).html("").outerHeight(0);
                    }
                }
            }

            function setCustomEvent(self) {
                head.on("colresize", function(column, e) { // 컬럼 리사이징 관련
                    var cols = head.listColumn(),
                        bodyCols = body.listColumn(),
                        isLast = false;

                    for(var j = cols.length - 1; j >= 0; j--) {
                        var hw = $(cols[j].element).outerWidth();

                        if(self.options.buffer != "page" && cols[j].type == "show" && !isLast) {
                            if(_.browser.msie) {
                                $(bodyCols[j].element).outerWidth(hw - getScrollBarWidth(self));
                            } else {
                                $(bodyCols[j].element).css({ "width": "auto" });
                            }

                            isLast = true;
                        } else {
                            $(cols[j].element).outerWidth(hw);
                            $(bodyCols[j].element).outerWidth(hw);
                        }
                    }

                    reloadScrollWidthResizeBar(500);
                    self.emit("colresize", [ column, e ]);
                });

                head.on("colshow", function(column, e) {
                    body.uit.showColumn(column.index);
                    self.resize();
                    self.emit("colshow", [ column, e ]);
                });

                head.on("colhide", function(column, e) {
                    body.uit.hideColumn(column.index);
                    self.resize();
                    self.emit("colhide", [ column, e ]);
                });

                head.on("colclick", function(column, e) {
                    self.emit("colclick", [ column, e ]);
                });

                head.on("coldblclick", function(column, e) {
                    self.emit("coldblclick", [ column, e ]);
                });

                head.on("colmenu", function(column, e) {
                    self.emit("colmenu", [ column, e ]);
                });

                head.on("sort", function(column, e) {
                    self.sort(column.index, column.order, false, e);
                    self.emit("sort", [ column, e ]);
                });

                body.on("select", function(obj, e) {
                    self.emit("select", [ obj, e ]);
                });

                body.on("click", function(obj, e) {
                    self.emit("click", [ obj, e ]);
                });

                body.on("dblclick", function(obj, e) {
                    self.emit("dblclick", [ obj, e ]);
                });

                body.on("rowmenu", function(obj, e) {
                    self.emit("rowmenu", [ obj, e ]);
                });

                body.on("expand", function(obj, e) {
                    self.emit("expand", [ obj, e ]);
                });

                body.on("expandend", function(obj, e) {
                    self.emit("expandend", [ obj, e ]);
                });
            }

            function setScrollEvent(self, width, height) {
                var opts = self.options,
                    lastScrollTop = 0;

                var $head = $(self.root).children(".head"),
                    $body = $(self.root).children(".body");

                // 스크롤 rAF 실행
                updateScrollStatus(self);

                // 스크롤 이벤트 설정
                $body[0].addEventListener("scroll", throttle(function(e) {
                    // 컬럼 메뉴는 스크롤시 무조건 숨기기
                    self.hideColumnMenu();

                    // 가로 스크롤
                    if(width > 0) {
                        $head[0].scrollLeft = this.scrollLeft;
                    }

                    if(opts.buffer == "scroll") { // 무조건 scroll 타입일 때
                        var scrollTop = this.scrollTop + height,
                            scrollHeight = $body[0].scrollHeight;

                        if (scrollTop >= scrollHeight * 0.9) {
                            self.next();
                            self.emit("scroll", e);
                        }
                    } else if(opts.buffer == "vscroll") {
                        // 가로 스크롤 위치 갱신하기
                        if(vscroll_info.prev_scroll_left != this.scrollLeft) {
                            vscroll_info.prev_scroll_left = this.scrollLeft;
                        }
                    }

                    e.stopPropagation();
                }, 100));
                
                // 스크롤 키보드 이벤트 설정
                if(opts.buffer == "vscroll") {
                    $(self.root).hover(function() {
                        vscroll_info.is_focus = true;
                    }, function() {
                        vscroll_info.is_focus = false;
                    });

                    self.addEvent(document, "keydown", function (e) {
                        if(vscroll_info.is_focus) {
                            var top = $body.scrollTop(),
                                tick = getRowHeight(self);

                            if (e.which == 38 || e.which == 40) {
                                $body.scrollTop(top + ((e.which == 38) ? -tick : tick));
                            } else if (e.which == 33 || e.which == 34) {
                                var newTick = tick * vscroll_info.scroll_count;
                                $body.scrollTop(top + ((e.which == 33) ? -newTick : newTick));
                            }
                        }
                    });
                }

                // 가상스크롤 rAF 처리
                function updateScrollStatus(self) {
                    var raf = window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        window.oRequestAnimationFrame;

                    var scrollTop = $body.scrollTop();

                    if(lastScrollTop === scrollTop) {
                        raf(function() { updateScrollStatus(self); });

                        $body.css({ "will-change": "auto" });
                        $body.find("tbody").css({ "will-change": "auto", "filter": "blur(0px)" });

                        return;
                    } else {
                        $body.css({ "will-change": "transform" });
                        $body.find("tbody").css({ "will-change": "contents", "filter": "blur(1px)" });

                        lastScrollTop = scrollTop;

                        renderVirtualScroll(scrollTop);
                        self.next();
                        self.emit("scroll");

                        raf(function() { updateScrollStatus(self); });
                    }
                }
            }

            function setScrollWidthResize(self) {
                var column = {},
                    width = {},
                    resizeX = 0;

                // 리사이즈 엘리먼트 삭제
                $(self.root).find("thead .resize").remove();

                for(var i = 0, len = head.uit.getColumnCount(); i < len; i++) {
                    var $colElem = $(head.getColumn(i).element),
                        $resizeBar = $("<div class='resize'></div>");

                    var pos = $colElem.position(),
                        left = $colElem.outerWidth() + pos.left - 1;

                    $resizeBar.css({
                        position: "absolute",
                        width: w_resize + "px",
                        height: $colElem.outerHeight(),
                        left: ((i == len - 1) ? left - w_resize : left) + "px",
                        top: pos.top + "px",
                        cursor: "w-resize",
                        "z-index": "1"
                    });

                    $colElem.append($resizeBar);

                    // Event Start
                    (function(index, isLast) {
                        self.addEvent($resizeBar, "mousedown", function(e) {
                            if(resizeX == 0) {
                                resizeX = e.pageX;
                            }

                            // 컬럼 객체 가져오기
                            column = {
                                head: head.getColumn(index),
                                body: body.getColumn(index),
                                isLast: isLast
                            };

                            width = {
                                column: $(column.head.element).outerWidth(),
                                head: $(head.root).outerWidth(),
                                body: $(body.root).outerWidth(),
                                "max-width": parseInt($(head.root).parent().css("max-width"))
                            };

                            is_resize = true;

                            return false;
                        });
                    })(i, i == len - 1);
                }

                self.addEvent(document, "mousemove", function(e) {
                    if(resizeX > 0) {
                        colResizeWidth(e.pageX - resizeX);
                    }
                });

                self.addEvent(document, "mouseup", function(e) {
                    if(resizeX > 0) {
                        // 마지막 컬럼 크기를 0보다 크게 리사이징시 가로 스크롤 위치 조정
                        if(column.isLast) {
                            var scrollLeft = $(body.root).parent().scrollLeft(),
                                disWidth = e.pageX - resizeX;

                            if(disWidth > 0) {
                                $(head.root).parent().scrollLeft(scrollLeft + disWidth);
                                $(body.root).parent().scrollLeft(scrollLeft + disWidth);
                            }
                        }

                        // 스크롤 위치 초기화
                        resizeX = 0;

                        // 리사이징 바, 위치 이동
                        reloadScrollWidthResizeBar(500);
                        head.emit("colresize", [ column.head, e ]);

                        // 리사이징 상태 변경 (delay)
                        setTimeout(function() {
                            is_resize = false;
                        }, 100);

                        return false;
                    }
                });

                // 리사이징 바 위치 설정
                head.on("colshow", reloadScrollWidthResizeBar);
                head.on("colhide", reloadScrollWidthResizeBar);

                function colResizeWidth(disWidth) {
                    var colMinWidth = 30;

                    // 전체 최소 크기 체크
                    if (width.head + disWidth < width["max-width"]) {
                        return;
                    }

                    // 컬럼 최소 크기 체크
                    if (width.column + disWidth < colMinWidth)
                        return;

                    $(column.head.element).outerWidth(width.column + disWidth);
                    $(column.body.element).outerWidth(width.column + disWidth);

                    $(head.root).outerWidth(width.head + disWidth);
                    $(body.root).outerWidth(width.body + disWidth);
                }
            }

            function reloadScrollWidthResizeBar(delay) {
                setTimeout(function() {
                    for(var i = 0, len = head.uit.getColumnCount(); i < len; i++) {
                        var $colElem = $(head.getColumn(i).element);

                        var pos = $colElem.position(),
                            left = $colElem.outerWidth() + pos.left - 1;

                        $colElem.find(".resize").css("left", ((i == len - 1) ? left - w_resize : left) + "px");
                    }
                }, delay);
            }

            function getScrollBarWidth(self) {
                return self.options.buffer == "page" ? 0 : _.scrollWidth() + 1;
            }

            function renderVirtualScroll(scrollTop) {
                if(vscroll_info == null) return;

                if(scrollTop >= vscroll_info.max_scroll_top) {
                    scrollTop = vscroll_info.max_scroll_top;
                }

                $(body.root).css({ top: scrollTop + "px" });
                vscroll_info.start_index = parseInt(scrollTop * vscroll_info.index_rate);
                vscroll_info.end_index = vscroll_info.start_index + vscroll_info.scroll_count;
            }

            /**
             * 가상 스크롤 관련 계산식을 구하는 함수
             * 실행되는 조건은 다음과 같음
             *  - 데이터가 업데이트 되었을 때
             *  - 테이블 스크롤 높이가 변경되었을 때
             *
             * @param self
             */
            function setVirtualScrollInfo(self) {
                var screenCount = self.options.scrollHeight / getRowHeight(self);

                vscroll_info.height = getRowHeight(self);
                vscroll_info.scroll_height = self.options.scrollHeight;
                vscroll_info.content_height = t_rows.length * vscroll_info.height;

                vscroll_info.count = t_rows.length;
                vscroll_info.scroll_count = Math.ceil(screenCount); // 나누어 떨어지지 않으면 +1 한다.

                var maxScrollTop = vscroll_info.content_height - vscroll_info.scroll_height;
                vscroll_info.max_scroll_top = maxScrollTop >= 0 ? maxScrollTop : 0;
                vscroll_info.index_rate = (vscroll_info.count - vscroll_info.scroll_count) / vscroll_info.max_scroll_top;

                $(body.root).parent().height(vscroll_info.content_height > 0 ? vscroll_info.content_height : "auto");
            }

            function resetVirtualScrollInfo(self) {
                $(self.root).find(".body").scrollTop(0);
                $(body.root).css({ top: "0px" });
                $(body.root).parent().css({ height: "auto" });

                vscroll_info = {
                    height: 0,
                    scroll_height: 0,
                    content_height: 0,
                    count: 0,
                    scroll_count: 0,
                    max_scroll_top: 0,
                    start_index: 0,
                    end_index: 0,
                    prev_scroll_left: 0,
                    is_focus: true
                };
            }

            function setOpenChildRows(rows) {
                for(var i = 0; i < rows.length; i++) {
                    t_rows.push(rows[i]);

                    if(rows[i].type == "open" && rows[i].children.length > 0) {
                        setOpenChildRows(rows[i].children);
                    }
                }
            }

            function appendChildRows(p_row, data, type) {
                var no = p_row.children.length,
                    c_rows = createRows(_.typeCheck("array", data) ? data : [ data ], no, p_row, type);

                for(var i = 0, len = c_rows.length; i < len; i++) {
                    p_row.children.push(c_rows[i]);
                }
            }

            function calculateRows(self, isTree) {
                if(isTree) {
                    t_rows = [];
                    setOpenChildRows(rows);
                } else {
                    t_rows = rows;
                }

                // 데이터가 갱신되면 가상 스크롤 계산식을 수정해야 한다.
                if(self.options.buffer == "vscroll") {
                    setVirtualScrollInfo(self);
                }
            }

            function setEventMultiSort(self) {
                var sortIndexes = self.options.msort,
                    len = (sortIndexes === true) ? head.uit.getColumnCount() : sortIndexes.length,
                    msort_columns = [],
                    msort_orders = [];

                for(var i = 0; i < len; i++) {
                    var colKey = (sortIndexes === true) ? i : sortIndexes[i],
                        col = self.getColumn(colKey);

                    if(col.element != null) {
                        (function(index, column) {
                            self.addEvent(column.element, "click", function(e) {
                                if($(e.target).hasClass("resize")) return;

                                if(column.order == "asc") {
                                    column.order = null;

                                    for(var j = 0; j < msort_columns.length; j++) {
                                        if(column.name == msort_columns[j]) {
                                            msort_columns.splice(j, 1);
                                            msort_orders.splice(j, 1);
                                        }
                                    }
                                } else {
                                    var colIndex = _.inArray(column.name, msort_columns);

                                    if(column.order == null) {
                                        column.order = "desc";
                                    } else if(column.order == "desc") {
                                        column.order = "asc";
                                    }

                                    if(colIndex == -1) {
                                        msort_columns.push(column.name);
                                        msort_orders.push(column.order);
                                    } else {
                                        msort_orders[colIndex] = column.order;
                                    }
                                }

                                self.emit("msort", [ column, e ]);
                                self.msort(msort_columns, msort_orders);
                                self.emit("colclick", [ column, e ]);
                            });
                        })(colKey, col);

                        $(col.element).css("cursor", "pointer");
                    }
                }
            }

            function getHierarchyValue(data, key) {
                if (key.indexOf(".") != -1) {
                    var tokens = key.split("."),
                        newData = data[tokens.shift()];

                    if (tokens.length == 1) {
                        return newData[tokens[0]];
                    }

                    return getHierarchyValue(newData, tokens.join("."));
                }

                return data[key];
            }

            function recursiveMultiSort(a, b, columns, order_by, index) {
                var direction = (order_by[index] == "desc") ? 1 : 0,
                    key = columns[index],
                    aValue = getHierarchyValue(a, key),
                    bValue = getHierarchyValue(b, key);

                var is_numeric = !isNaN(+aValue - +bValue),
                    x = is_numeric ? +aValue : aValue,
                    y = is_numeric ? +bValue : bValue;

                if(!is_numeric) {
                    if(typeof(x) == "string") x = x.toLowerCase();
                    if(typeof(y) == "string") y = y.toLowerCase();
                }

                if(x < y) {
                    return direction == 0 ? -1 : 1;
                }

                if(x == y)  {
                    return columns.length-1 > index ? recursiveMultiSort(a,b,columns,order_by,index+1) : 0;
                }

                return direction == 0 ? 1 : -1;
            }

            function getRowHeight(self) {
                return row_height == 0 ? self.options.rowHeight : row_height;
            }

            this.init = function() {
                var opts = this.options;

                // @Deprecated, 'rows'는 의미상 맞지 않아 차후 삭제
                opts.data = (opts.rows != null) ? opts.rows : opts.data;

                // 루트가 테이블일 경우, 별도 처리
                if(this.root.tagName == "TABLE") {
                    var $root = $(this.root).wrap("<div class='xtable'></div>");
                    this.root = $root.parent().get(0);
                }

                // 기본 설정
                createTableList(this);
                setCustomEvent(this);

                // 가로/세로 스크롤 설정
                setScrollEvent(this, opts.scrollWidth, opts.scrollHeight);

                // 멀티소트 이벤트 설정
                if(opts.msort && opts.sortEvent) {
                    setEventMultiSort(this);
                }

                // 데이터가 있을 경우
                if(opts.data) {
                    this.update(opts.data);
                }

                // 로딩 템플릿 체크 (opts.sortLoading으로 체크하지 않음)
                if(head.tpl["loading"] && modal != null) {
                    var $loading = $(head.tpl["loading"]());
                    $(this.root).append($loading);

                    ui_modal = modal($loading, {
                        target: this.selector,
                        opacity: 0.1,
                        autoHide: false
                    });

                    // 기본 로딩 시간 (ms)
                    opts.sortLoading = (opts.sortLoading === true) ? 500 : opts.sortLoading;
                }

                // 컬럼 리사이징 (기본)
                if(opts.resize) {
                    if(opts.scrollWidth > 0) {
                        setScrollWidthResize(this);
                    } else {
                        head.resizeColumns();
                        head.resize();
                    }
                }
            }

            this.render = function(isTree, isInit) {
                calculateRows(this, isTree);

                // 가상스크롤을 사용할 때, 데이터가 업데이트 될 경우에 대한 처리
                if(isInit === true && this.options.buffer == "vscroll") {
                    renderVirtualScroll(0);
                }

                this.next();
            }

            /**
             * @method select
             * Adds a selected class to a row at a specified index and gets an instance of the applicable row.
             *
             * @param {Integer} index
             * @return {RowObject} row
             */
            this.select = function(index) {
                if(select_row != null) {
                    $(select_row.element).removeClass("selected");
                }

                var row = this.get(index);
                select_row = row;

                if(row.element != null) {
                    $(row.element).addClass("selected");
                }

                return row;
            }

            /**
             * @method unselect
             * Removes a selected class from a selected row and gets an instance of the row in question.
             *
             * @return {RowObject} row
             */
            this.unselect = function() {
                if(select_row != null) {
                    $(select_row.element).removeClass("selected");
                    select_row = null;
                }
            }

            /**
             * @method update
             * Updates the list of rows or modifies the row at a specified index.
             *
             * @param {Array} rows
             */
            this.update = function(dataList) {
                this.reset();
                rows = createRows(dataList, 0, null);

                this.render(false, true);
                this.emit("update");
                head.emit("colresize");

                // 정렬 인덱스가 옵션에 있을 경우, 해당 인덱스의 컬럼 정렬 (not loading)
                if(this.options.sortIndex) {
                    if(this.options.sort) {
                        this.sort(this.options.sortIndex, this.options.sortOrder, true);
                    } else if(this.options.msort) {
                        this.msort(this.options.sortIndex, this.options.sortOrder, true);
                    }
                }
            }

            /**
             * @method updateTree
             * It is possible to configure a tree table using an object array with the index and data properties.
             *
             * @param {Array} rows
             */
            this.updateTree = function(tree) {
                this.reset();

                for(var i = 0; i < tree.length; i++) {
                    var pIndex = iParser.getParentIndex(tree[i].index);

                    if(pIndex == null) {
                        rows.push(createRows([ tree[i].data ], 0, null, tree[i].type)[0]);
                    } else {
                        var pRow = this.get(pIndex);

                        if(pRow) {
                            appendChildRows(pRow, tree[i].data, tree[i].type);
                        }
                    }
                }

                this.render(true, true);
                this.emit("updateTree");
            }

            /**
             * @method append
             * Add a row or a child row to at a specified index.
             *
             * @param {RowObject} row
             * @param {RowObject} row
             */
            this.append = function(index, data) {
                var row = this.get(index);

                if(row) {
                    appendChildRows(row, data);

                    this.clear();
                    this.render(true, true);
                    this.emit("append");
                }
            }

            /**
             * @method open
             * Shows a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.open = function(index) { // 로트 제외, 하위 모든 노드 대상
                var row = this.get(index);

                if(row) {
                    row.type = "open";

                    this.clear();
                    this.render(true);
                    this.emit("open", [row]);
                }
            }

            /**
             * @method fold
             * Hides a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.fold = function(index) {
                var row = this.get(index);

                if(row) {
                    row.type = "fold";

                    this.clear();
                    this.render(true);
                    this.emit("fold", [row]);
                }
            }

            /**
             * @method openAll
             * Shows all child rows of a specified index.
             */
            this.openAll = function(index) {
                var list = [];

                this.findAll(index, list);

                if(list) {
                    for(var i = 0, len = list.length; i < len; i++) {
                        list[i].type = "open";
                    }

                    this.clear();
                    this.render(true);
                    this.emit("openall");
                }
            }

            /**
             * @method foldAll
             * Hides all child rows of a specified index.
             */
            this.foldAll = function(index) {
                var list = [];

                this.findAll(index, list);

                if(list) {
                    for(var i = 0, len = list.length; i < len; i++) {
                        list[i].type = "fold";
                    }

                    this.clear();
                    this.render(true);
                    this.emit("foldall");
                }
            }

            /**
             * @method next
             * Changes to the next page.
             */
            this.next = function() {
                var start = (page - 1) * this.options.bufferCount,
                    end = start + this.options.bufferCount;

                // 가상스크롤일 때만 처리
                if(this.options.buffer == "vscroll") {
                    body.reset();

                    if(vscroll_info.start_index < vscroll_info.end_index) {
                        start = vscroll_info.start_index;
                        end = vscroll_info.end_index;
                    }
                }

                // 마지막 페이지 처리
                end = (end > t_rows.length) ? t_rows.length : end;

                if(end <= t_rows.length) {
                    var tmpDataList = [];

                    for(var i = start; i < end; i++) {
                        var r = t_rows[i];

                        if(r) {
                            r.seq = i + 1;
                            r.reload(head.uit.getColumn(), null, xss_filter_keys);

                            tmpDataList.push(r);
                        }
                    }

                    body.append(tmpDataList);

                    // 가상스크롤이 아닐 경우에만 추가
                    if(this.options.buffer != "vscroll") {
                        this.emit("next", [ page ]);
                        if (tmpDataList.length > 0) page++;
                    }
                }

                // 최초에 한번만 row_height 구하기
                if(row_height == 0 && body.count() > 0) {
                    var row = body.get(0);

                    if(row && row.element) {
                        row_height = $(row.element).outerHeight();
                    }
                }
            }

            /**
             * @method page
             * Changes to the page of at a specified index.
             *
             * @param {Integer} index
             */
            this.page = function(pNo) {
                if(this.options.buffer == "scroll" || this.options.buffer == "vscroll")
                    return false;

                if(this.getPage() == pNo) return false;

                this.clear();
                page = (pNo < 1) ? 1 : pNo;
                this.render();
            }

            /**
             * @method sort
             * Moves a row iat a specified index to the target index.
             *
             * @param {Integer} index
             * @param {String} order  "asc" or "desc"
             */
            this.sort = function(index, order, isNotLoading, e) { // index는 컬럼 key 또는 컬럼 name
                if(!this.options.fields || !this.options.sort || this.options.msort || is_resize) return;

                var self = this,
                    column = head.getColumn(index);

                if(typeof(column.name) == "string") {
                    column.order = (order) ? order : (column.order == "asc" || column.order == null) ? "desc" : "asc";
                    head.uit.setColumn(index, column);

                    if(this.options.sortLoading && !isNotLoading) {
                        self.showLoading();

                        setTimeout(function() {
                            process();
                        }, this.options.sortLoading);
                    } else {
                        process();
                    }
                }

                // 소팅 후, 현재 소팅 상태 캐싱 처리
                if(this.options.sortCache) {
                    this.setOption({
                        sortIndex: column.index,
                        sortOrder: column.order
                    });
                }

                // 정렬 프로세싱 함수
                function process() {
                    rows.sort(function(a, b) {
                        return recursiveMultiSort(a.data, b.data, [ column.name ], [ column.order ], 0);
                    });

                    // 데이터 초기화 및 입력, 그리고 로딩
                    self.clear();
                    self.render(true);
                    self.emit("sortend", [ column, e ]);
                    self.hideLoading();
                }
            }

            /**
             * @method msort
             * Moves a row iat a specified index to the target index.
             *
             * @param {Array} index
             * @param {Array} order  "asc" or "desc"
             */
            this.msort = function(columns, order_by, isNotLoading) {
                if(!this.options.fields || !this.options.msort || this.options.sort) return;
                if(!_.typeCheck("array", columns) || !_.typeCheck("array", order_by) || columns.length != order_by.length) return;

                if(o_rows == null) o_rows = t_rows;
                else t_rows = o_rows;

                var self = this,
                    a_rows = t_rows.slice();

                if(this.options.sortLoading && !isNotLoading) {
                    self.showLoading();

                    setTimeout(function() {
                        process();
                    }, this.options.sortLoading);
                } else {
                    process();
                }

                // 소팅 후, 현재 소팅 상태 캐싱 처리
                if(this.options.sortCache) {
                    this.setOption({
                        sortIndex: columns,
                        sortOrder: order_by
                    });
                }

                function process() {
                    if(columns.length > 0) {
                        a_rows.sort(function(a, b) {
                            return recursiveMultiSort(a.data, b.data, columns, order_by, 0);
                        });
                    }

                    // 데이터 초기화 및 입력, 그리고 로딩
                    rows = a_rows;
                    self.clear();
                    self.render(true);
                    self.emit("msortend");
                    self.hideLoading();
                    a_rows = null;
                }
            }

            /**
             * @method filter
             * Filters columns at a specified to locate rows that contain keywords in the cell value.
             *
             * @param {Function} callback
             */
            this.filter = function(callback) {
                if(o_rows == null) o_rows = t_rows;
                else t_rows = o_rows;

                var a_rows = t_rows.slice(),
                    f_data = [];

                for(var i = 0, len = a_rows.length; i < len; i++) {
                    var d = a_rows[i].data;

                    if((typeof(callback) == "function" && callback(d) === true) || !callback) {
                        f_data.push(d);
                    }
                }

                this.update(f_data);
                this.emit("filter", [ f_data ]);
                a_rows = null;
            }

            /**
             * @method rollback
             * Returns filtered rows to the original state.
             */
            this.rollback = function() {
                this.filter(null);
                o_rows = null;
            }

            /**
             * @method clear
             * Remove all row elements.
             */
            this.clear = function() {
                page = 1;
                body.uit.removeRows();
                body.scroll();
            }

            /**
             * @method clear
             * Remove all data
             */
            this.reset = function() {
                if(this.options.buffer == "vscroll") {
                    resetVirtualScrollInfo(this);
                }

                this.clear();

                rows = [];
                c_rows = [];
                t_rows = [];
                select_row = null;
            }

            /**
             * @method resize
             * Resets the inner scroll and columns of a table.
             */
            this.resize = function() {
                head.resizeColumns();
                head.resize();
                head.emit("colresize");
            }

            /**
             * @method scrollWidth
             * Sets the scroll based on the width of a table.
             *
             * @param {Integer} width
             */
            this.scrollWidth = function(scrollWidth, isInit) {
                // 최초에 스크롤 넓이가 설정되있어야만 메소드 사용 가능
                if(this.options.scrollWidth == 0) return;

                var width = this.options.width;

                if(width > 0) {
                    var w = (scrollWidth >= width) ? scrollWidth - getScrollBarWidth(this) : width;
                    $(this.root).outerWidth(w);
                } else {
                    $(this.root).outerWidth(scrollWidth - getScrollBarWidth(this));
                }

                if(scrollWidth > 0) {
                    var originWidth = $(this.root).outerWidth();
                    $(this.root).outerWidth(scrollWidth);

                    if(isInit) {
                        $(head.root).outerWidth(originWidth + getScrollBarWidth(this));
                        $(body.root).outerWidth(originWidth);

                        reloadScrollWidthResizeBar(1000);
                    }

                    $(head.root).parent().css("max-width", scrollWidth);
                    $(body.root).parent().css("max-width", scrollWidth);
                }
            }

            /**
             * @method scrollHeight
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer} height
             */
            this.scrollHeight = function(h) {
                if(this.options.buffer == "page") return;

                $(this.root).find(".body").css("max-height", h + "px").scrollTop(0);
                this.setOption("scrollHeight", h);

                // 기존의 로우 그릴 수 있는 형태로 계산하기
                calculateRows(this, true);

                // 가상스크롤 위치 초기화
                if(this.options.buffer == "vscroll") {
                    renderVirtualScroll(0);
                }

                this.next();
            }

            /**
             * @method scrollTop
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer|String} index
             * @param {Integer} dist
             */
            this.scrollTop = function(index, dist) {
                if(this.options.buffer != "vscroll") return;

                var $viewport = $(this.root).children(".body");

                // 기존의 로우 그릴 수 있는 형태로 계산하기
                calculateRows(this, true);

                for(var i = 0, len = t_rows.length; i < len; i++) {
                    var row = t_rows[i];

                    if(("" + index) == row.index) {
                        var scrollTop = i * vscroll_info.height,
                            scrollHeight = $viewport.height(),
                            distTop = _.typeCheck("integer", dist) ? dist : 0;

                        if(scrollTop + distTop > scrollHeight) {
                            scrollTop += distTop;
                        }

                        $viewport.scrollTop(scrollTop);
                        this.clear();
                        this.next();

                        break;
                    }
                }
            }

            /**
             * @deprecated
             * @method height
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer} height
             */
            this.height = function(h) {
                this.scrollHeight(h);
            }

            /**
             * @method size
             * Gets the size of all the rows of a table.
             *
             * @return {Integer} size
             */
            this.size = function() { // 차후 수정 (컬럼 * 로우 개수 * 바이트)
                return rows.length;
            }

            /**
             * @method count
             * Gets the number of trows of a table.
             *
             * @return {Integer} count
             */
            this.count = function() {
                return rows.length;
            }

            /**
             * @method list
             * Gets all the rows of a table.
             *
             * @return {Array} rows
             */
            this.list = function() {
                return rows;
            }

            /**
             * @method listColumn
             * Gets all columns.
             *
             * @return {Array} columns
             */
            this.listColumn = function() {
                return head.listColumn();
            }

            /**
             * @method listData
             * Gets the data of all the rows of a table.
             *
             * @return {Array} datas
             */
            this.listData = function() {
                var datas = [];

                for(var i = 0; i < rows.length; i++) {
                    datas.push(rows[i].data);
                }

                return datas;
            }

            /**
             * @method get
             * Gets the row at the specified index.
             *
             * @param {Integer|String} index
             * @return {RowObject} row
             */
            this.get = function(index) {
                if(index == null) {
                    return null;
                } else {
                    var row = c_rows[index];

                    if(!row) {
                        var keys = iParser.getIndexList(index),
                            row = c_rows[keys[0]];

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

            /**
             * @method findAll
             * Gets all rows of at the specified index including child rows.
             *
             * @param {Integer} index
             * @param {Array} result
             */
            this.findAll = function(index, _result) {
                var row = this.get(index);

                if(row != null) {
                    if(!_.typeCheck("array", _result)) {
                        _result = [ row ];
                    }

                    for(var i = 0; i < row.children.length; i++) {
                        var child = row.children[i];
                        _result.push(child);

                        if(child.children.length > 0) {
                            this.findAll(child.index, _result);
                        }
                    }
                }
            }

            /**
             * @method getColumn
             * Gets the column at the specified index.
             *
             * @param {"Integer"/"String"} key index or column key
             * @return {ColumnObject} column
             */
            this.getColumn = function(index) {
                return head.getColumn(index);
            }

            /**
             * @method getData
             * Gets the data at the specified index.
             *
             * @param {"Integer"/"String"} key index
             * @return {ColumnObject} data
             */
            this.getData = function(index) {
                var row = this.get(index);
                return (row) ? row.data : null;
            }

            /**
             * @method showColumn
             * Shows the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.showColumn = function(index) {
                head.showColumn(index);
            }

            /**
             * @method hideColumn
             * Hides the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.hideColumn = function(index) {
                head.hideColumn(index);
            }

            /**
             * @method initColumns
             * It is possible to determine the index or name of the column to be shown in an array.
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.initColumns = function(keys) {
                head.initColumns(keys);
                body.initColumns(keys);
                head.emit("colresize");
            }

            /**
             * @method showColumnMenu
             * Shows the Show/Hide Column menu at specified coordinates.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.showColumnMenu = function(x, y) {
                head.showColumnMenu(x, y);
            }

            /**
             * @method hideColumnMenu
             * Hides the Show/Hide Column menu.
             */
            this.hideColumnMenu = function() {
                head.hideColumnMenu();
            }

            /**
             * @method toggleColumnMenu
             * Shows or hides the Show/Hide Column menu.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.toggleColumnMenu = function(x, y) {
                head.toggleColumnMenu(x, y);
            }

            /**
             * @method showExpand
             * Shows the extended row area of a specified index.
             *
             * @param {Integer} index
             */
            this.showExpand = function(index, obj) {
                body.showExpand(index, obj);
            }

            /**
             * @method hideExpand
             * Hides the extended row area of a specified index.
             */
            this.hideExpand = function(index) {
                if(index) body.hideExpand(index);
                else body.hideExpand();
            }

            /**
             * @method getExpand
             * Get a row in which the extended area is currently activated.
             *
             * @return {RowObject} row
             */
            this.getExpand = function() {
                return body.getExpand();
            }

            /**
             * @method showLoading
             * Shows the loading screen for the specified delay time.
             *
             * @param {Integer} delay
             */
            this.showLoading = function(delay) {
                if(!ui_modal || is_loading) return;

                ui_modal.show();
                is_loading = true;

                if(delay > 0) {
                    var self = this;

                    setTimeout(function() {
                        self.hideLoading();
                    }, delay);
                }
            }

            /**
             * @method hideLoading
             * Hides the loading screen.
             */
            this.hideLoading = function() {
                if(!ui_modal || !is_loading) return;

                ui_modal.hide();
                is_loading = false;
            }

            /**
             * @method isLoading
             */
            this.isLoading = function() {
                return is_loading;
            }

            /**
             * @method setCsv
             * Updates a table using a CVS string.
             */
            this.setCsv = function(csv) {
                var opts = this.options;
                if(!opts.fields && !opts.csv) return;

                var fields = _.getCsvFields(opts.fields, opts.csv),
                    csvNumber = (opts.csvNumber) ? _.getCsvFields(opts.fields, opts.csvNumber) : null;

                this.update(_.csvToData(fields, csv, csvNumber));
            }

            /**
             * @method setCsvFile
             * Updates a table using a CVS file.
             */
            this.setCsvFile = function(file) {
                if(!this.options.fields && !this.options.csv) return;

                var self = this;
                _.fileToCsv(file, function(csv) {
                    self.setCsv(csv);
                });
            }

            /**
             * @method getCsv
             * Gets the data of a table as a CSV string.
             *
             * @param {Boolean} isTree
             * @return {String} csv
             */
            this.getCsv = function() {
                if(!this.options.fields && !this.options.csv) return;

                var fields = _.getCsvFields(this.options.fields, this.options.csv),
                    len = (rows.length > this.options.csvCount) ? this.options.csvCount : rows.length;

                return _.dataToCsv2({
                    fields: fields,
                    rows: this.listData(),
                    count: len,
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
            this.getCsvBase64 = function() {
                if(!this.options.fields && !this.options.csv) return;

                return _.csvToBase64(this.getCsv());
            }

            /**
             * @method downloadCsv
             * Downloads the data of a table as a CSV file.
             *
             * @param {String} name
             * @param {Boolean} isTree
             */
            this.downloadCsv = function(name) {
                if(_.typeCheck("string", name)) {
                    name = name.split(".")[0];
                }

                var a = document.createElement('a');
                a.download = (name) ? name + ".csv" : "table.csv";
                a.href = this.getCsvBase64();

                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            }

            /**
             * @method rowFunc
             * Ir is possible to use a function for all row data applicable to the column (or column name) of a specified column (or column name). Currently only SUM and AVG are supported.
             *
             * @param {"sum"/"svg"} funcType
             * @param {Integer} columnIndex
             * @param {Function} callback
             */
            this.rowFunc = function(type, index, callback) {
                if(!this.options.fields) return;

                var isCallback = (typeof(callback) == "function") ? true : false;
                var result = 0,
                    count = (isCallback) ? 0 : rows.length,
                    column = head.getColumn(index);

                if(column.name) {
                    for(var i = 0; i < rows.length; i++) {
                        var data = rows[i].data,
                            value = data[column.name];

                        if(!isNaN(value)) {
                            if(isCallback) {
                                if(callback(rows[i])) {
                                    result += value;
                                    count++;
                                }
                            } else {
                                result += value;
                            }
                        }
                    }
                }

                // 현재는 합계와 평균만 지원함
                if(type == "sum") return result;
                else if(type == "avg") return result / count;

                return null;
            }

            /**
             * @method getPage
             * Gets the current page of a table.
             *
             * @return {Integer} page
             */
            this.getPage = function() {
                return page - 1;
            }

            /**
             * @method activeIndex
             * Gets the index of a row that is activated in an extended/modified/selected state.
             *
             * @return {Integer} index
             */
            this.activeIndex = function() {
                if(!select_row) return null;
                return select_row.index;
            }

            /**
             * @method setTpl
             */
            this.setTpl = function(name, html) {
                head.setTpl(name, html);
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
                 * @cfg {Array} [csvCount=10000]
                 * Sets the maximum number of rows when creating a CSV string.
                 */
                csvCount: 10000,

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
                 * @cfg {Boolean} [expand=false]
                 * Determines whether to use an extended row area.
                 */
                expand: false,

                /**
                 * @cfg {Boolean} [expandEvent=true]
                 * Shows the extended area automatically when clicking on a row.
                 */
                expandEvent: true,

                /**
                 * @cfg {Boolean} [resize=false]
                 * Determines whether to use the column resizing function.
                 */
                resize: false,

                /**
                 * @cfg {Integer} [rowHeight=26]
                 * Sets the reference height of a body area when using a table scroll.
                 */
                rowHeight: 26,

                /**
                 * @cfg {Integer} [scrollHeight=200]
                 * Sets the reference height of a body area when using a table scroll.
                 */
                scrollHeight: 200,

                /**
                 * @cfg {Integer} [scrollWidth=0]
                 * Sets the reference width of a body area when using a table scroll.
                 */
                scrollWidth: 0,

                /**
                 * @cfg {Integer} [width=0]
                 * Sets the area of a table.
                 */
                width: 0,

                /**
                 * @cfg {String} [buffer='scroll'/'page'/'s-page'/'vscroll']
                 * Sets the buffer type of a table.
                 */
                buffer: "scroll",

                /**
                 * @cfg {Integer} [bufferCount=100]
                 * Sets the number of rows per page.
                 */
                bufferCount: 100,

                /**
                 * @cfg {Boolean/Array} [msort=false]
                 * Determines whether to use the table sort function.
                 */
                msort: false,

                /**
                 * @cfg {Boolean/Array} [sort=false]
                 * Determines whether to use the table sort function.
                 */
                sort: false,

                /**
                 * @cfg {Boolean} [sortLoading=false]
                 * Determines whether to show the loading screen when sorting a table.
                 */
                sortLoading: false,

                /**
                 * @cfg {Boolean} [sortCache=false]
                 * Configures settings to ensure that the sort state can be maintained even when the table is updated.
                 */
                sortCache: false,

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
                 * @cfg {Boolean} [xssFilter=false]
                 * Activate the xss filter to set the column value.
                 */
                xssFilter: false,

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

        return UI;
    }
}