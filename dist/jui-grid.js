/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _juijs = __webpack_require__(2);

var _juijs2 = _interopRequireDefault(_juijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _juijs2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jui;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

var _binder = __webpack_require__(7);

var _binder2 = _interopRequireDefault(_binder);

var _core = __webpack_require__(8);

var _core2 = _interopRequireDefault(_core);

var _dropdown = __webpack_require__(4);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.use(_core2.default, _dropdown2.default);

_jquery2.default.fn.jbinder = function (options) {
    var result = [],
        opts = _jquery2.default.extend({
        target: null,
        attr: "data-bind"
    }, options);

    (0, _jquery2.default)(this).each(function (i) {
        var binder = new _binder2.default(this, opts);
        result[i] = opts.target != null ? _jquery2.default.extend(opts.target, binder) : binder;
    });

    return result.length == 1 ? result[0] : result;
};

exports.default = {
    name: "grid.table",
    extend: "event",
    component: function component() {
        var _ = _main2.default.include("util.base");
        var dropdown = _main2.default.include("ui.dropdown");
        var Base = _main2.default.include("grid.base");
        var Row = _main2.default.include("grid.row");

        _.resize(function () {
            var call_list = _main2.default.get("grid.table");

            for (var i = 0; i < call_list.length; i++) {
                var ui_list = call_list[i];

                for (var j = 0; j < ui_list.length; j++) {
                    ui_list[j].resize();
                }
            }
        }, 1000);

        var UI = function UI() {
            var $obj = null,
                ddUi = null; // table/thead/tbody 구성요소, 컬럼 설정 UI (Dropdown)
            var selectedIndex = null,
                editableIndex = null,
                dragIndex = null,
                expandedIndex = null,
                checkedIndexes = {}; // TODO: 로우 객체 기반으로 변경하기 (#8)
            var is_resize = false;
            var vo = null;

            function getExpandHtml(self) {
                return "<tr class='expand' style='display: none;'><td id='EXPAND_" + self.timestamp + "'></td></tr>";
            }

            function getColumnIndexes(self, colkeys) {
                var indexList = [];

                for (var i = 0; i < colkeys.length; i++) {
                    if (typeof colkeys[i] == "string") {
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

                if (colkeys === true) {
                    self.options.colshow = colkeys = [];

                    for (var i = 0; i < len; i++) {
                        colkeys.push(i);
                    }
                } else {
                    colkeys = getColumnIndexes(self, colkeys);
                }

                for (var i = 0; i < len; i++) {
                    if (_jquery2.default.inArray(i, colkeys) == -1) self.uit.hideColumn(i);else self.uit.showColumn(i);
                }
            }

            function setColumnMenu(self) {
                var columns = self.listColumn(),
                    columnNames = [];

                for (var i = 0; i < columns.length; i++) {
                    columnNames.push((0, _jquery2.default)(columns[i].element).text());
                }

                var $ddObj = (0, _jquery2.default)(self.tpl.menu({ columns: columnNames }));

                (0, _jquery2.default)("body").append($ddObj);
                ddUi = dropdown($ddObj, { close: false });

                (0, _jquery2.default)(ddUi.root).find("input[type=checkbox]").each(function (i) {
                    if (columns[i].type == "show") this.checked = true;else this.checked = false;

                    self.addEvent(this, "click", function (e) {
                        var isExist = (0, _jquery2.default)(ddUi.root).find("input[type=checkbox]:checked") != null;

                        if (this.checked) {
                            self.showColumn(i, e);
                        } else {
                            if (isExist) {
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

                for (var i = thCount - 1; i >= 0; i--) {
                    var colInfo = self.getColumn(i),
                        thWidth = (0, _jquery2.default)(colInfo.element).outerWidth();

                    // 마지막 TD는 스크롤 사이즈를 차감
                    if ((0, _jquery2.default)(colInfo.element).css("display") == "none") {} else {
                        if (!isLastCheck) {
                            thWidth = thWidth - _.scrollWidth();
                            isLastCheck = true;
                        }
                    }

                    (0, _jquery2.default)(colInfo.list[0]).outerWidth(thWidth);
                }

                $obj.tbody.outerWidth(tableWidth);
            }

            function setScrollEvent(self) {
                if (!(0, _jquery2.default)(self.root).hasClass("table-scroll")) {
                    // 스크롤일 경우, 별도 처리
                    self.scroll();
                }

                $obj.tbody.off("scroll").scroll(function (e) {
                    if ($obj.tbody.scrollTop() + self.options.scrollHeight == $obj.tbody.get(0).scrollHeight) {
                        self.emit("scroll", e);
                        return false;
                    }
                });
            }

            function setUpdateInit(self, isInit) {
                if (self.uit.getRowCount() < 1) return;

                if (isInit) {
                    if (self.options.expand) {
                        $obj.tbody.prepend(getExpandHtml(self));
                    }

                    self.scroll();
                }

                if (self.options.scroll) {
                    // 스크롤 이벤트 처리
                    setScrollEvent(self);
                }

                self.setVo(); // TODO: 차후에 제거해야 함
            }

            function setEventRows(self, rows) {
                var rows = !rows ? self.uit.getRow() : rows;

                for (var i = 0; i < rows.length; i++) {
                    (function (row) {
                        if (row.element == null) return;

                        if (row.children.length > 0) {
                            setEventRow(self, row);
                            setEventRows(self, row.children);
                        } else {
                            setEventRow(self, row);
                        }
                    })(rows[i]);
                }
            }

            function setEventRow(self, row) {
                self.addEvent(row.element, "click", function (e) {
                    // 1. 공통 이벤트 발생
                    self.emit("select", [row, e]); // deprecated
                    self.emit("click", [row, e]);

                    // 2. 확장영역 자동 이벤트 처리
                    if (self.options.expand) {
                        if (self.options.expandEvent === false) return;

                        var expandedRow = expandedIndex instanceof Row ? expandedIndex : self.get(expandedIndex); // TODO: #8 가상스크롤 지원 이슈로 인한 사이드이펙트

                        if (expandedRow === row) {
                            self.hideExpand(e);
                        } else {
                            if (expandedIndex != null) {
                                self.hideExpand(e);
                            }

                            self.showExpand(row, undefined, e);
                        }
                    }
                });

                self.addEvent(row.element, "dblclick", function (e) {
                    self.emit("dblclick", [row, e]);
                });

                self.addEvent(row.element, "contextmenu", function (e) {
                    self.emit("rowmenu", [row, e]);
                    return false;
                });

                // 로우 수정 이벤트 설정
                if (self.options.editRow && self.options.editEvent) {
                    self.addEvent(row.element, "dblclick", function (e) {
                        if (e.target.tagName == "TD" || e.target.tagName == "TR") {
                            self.showEditRow(row.index, e);
                        }
                    });
                }

                // 로우 이동 이벤트 설정
                if (self.options.moveRow) {
                    var createLine = function createLine() {
                        return (0, _jquery2.default)("<tr class='dragline'><td colspan='" + row.list.length + "'></td></tr>");
                    };

                    var createRow = function createRow(element) {
                        var $clone = (0, _jquery2.default)("<table id='TABLE_LAYER_" + self.timestamp + "' class='" + (0, _jquery2.default)(self.root).attr("class") + " layer'></table>"),
                            $cloneRow = (0, _jquery2.default)(element).clone();

                        $clone.css({
                            position: "absolute",
                            width: (0, _jquery2.default)(self.root).width(),
                            display: "none"
                        });

                        $cloneRow.attr({
                            "class": "dragclone"
                        });

                        $clone.append($cloneRow);

                        return $clone;
                    };

                    var moveDragEnd = function moveDragEnd(end, e) {
                        $obj.tbody.find(".dragline").remove();

                        if (dragIndex != null) {
                            (0, _jquery2.default)("#TABLE_LAYER_" + self.timestamp).remove();

                            if (dragIndex != end) {
                                if (self.emit("move", [self.get(dragIndex), e]) !== false) {
                                    self.move(dragIndex, end);

                                    var row = self.get(dragIndex < end ? end - 1 : end);
                                    (0, _jquery2.default)(row.element).addClass("dragtarget");

                                    self.hideExpand(e);
                                    self.emit("moveend", [row, e]);
                                }
                            }

                            dragIndex = null;
                        }
                    };

                    // 드래그 시작 이벤트
                    self.addEvent(row.element, "mousedown", function (e) {
                        if (dragIndex != null) return;
                        dragIndex = row.index;

                        // 테이블 상태 초기화
                        $obj.tbody.find("tr").removeClass("dragtarget");
                        (0, _jquery2.default)(row.element).addClass("dragtarget");

                        (0, _jquery2.default)("body").append(createRow(row.element));
                    });

                    // 마우스 오버시 라인 위치 변경 이벤트
                    self.addEvent(row.element, "mouseover", function (e) {
                        if (dragIndex == null) return;

                        $obj.tbody.find(".dragline").remove();
                        createLine().insertBefore(row.element);
                    });
                    self.addEvent(document, "mouseover", function (e) {
                        if (dragIndex == null || e.target.tagName == "TD" || e.target.tagName == "TR") return;

                        $obj.tbody.find(".dragline").remove();
                        $obj.tbody.append(createLine());
                    });

                    // 마우스 이동시 클론 로우 위치 변경 이벤트
                    self.addEvent(row.element, "mousemove", function (e) {
                        if (dragIndex == null) return;

                        (0, _jquery2.default)("#TABLE_LAYER_" + self.timestamp).css({
                            left: e.pageX + 2,
                            top: e.pageY + 2,
                            display: "table"
                        });
                    });

                    // 마우스 드래그 완료시 처리 이벤트
                    self.addEvent(row.element, "mouseup", function (e) {
                        moveDragEnd(row.index, e);
                    });
                    self.addEvent($obj.thead, "mouseover", function (e) {
                        moveDragEnd(0, e);
                    });
                    self.addEvent(document, "mouseup", function (e) {
                        moveDragEnd(self.count(), e);
                    });
                }
            }

            function setEventEditCell(self, elem, row, colIndex, event, callback) {
                var column = self.getColumn(colIndex),
                    colkeys = self.options.editRow,
                    $input = null;

                if (!column.name || colkeys !== true && _jquery2.default.inArray(colIndex, getColumnIndexes(self, colkeys)) == -1) {
                    $input = (0, _jquery2.default)("<div class='edit'></div>").html((0, _jquery2.default)(elem).html() || "&nbsp;");
                    $input.attr("disabled", true);
                } else {
                    $input = (0, _jquery2.default)("<input type='text' class='edit' />").val(column.name ? column.data[row.index] : "");
                }

                (0, _jquery2.default)(elem).html($input.css("width", "100%"));

                // 클릭 엘리먼트에 포커스 맞추기
                if (event && event.target == elem) $input.focus();

                // 엔터 키 이벤트 발생시 업데이트
                self.addEvent($input, "keypress", function (e) {
                    if (e.which == 13) {
                        update();
                    }
                });

                // 포커스가 바뀌었을 경우 업데이트
                self.addEvent($obj.tbody, "mousedown", function (e) {
                    if (e.target.tagName == "TD" || e.target.tagName == "TR") {
                        update();
                    }
                });

                function update() {
                    if (editableIndex != null) {
                        callback();
                    }
                }
            }

            function setEventColumn(self) {
                var opts = self.options,
                    len = self.uit.getColumnCount();

                // 컬럼 컨텍스트 이벤트
                for (var i = 0; i < len; i++) {
                    var col = self.getColumn(i);

                    (function (index, column) {
                        if (!opts.fields || !opts.sort || opts.sortEvent !== true) {
                            self.addEvent(column.element, "click", function (e) {
                                self.emit("colclick", [column, e]);
                            });
                        }

                        self.addEvent(column.element, "dblclick", function (e) {
                            self.emit("coldblclick", [column, e]);
                        });

                        self.addEvent(column.element, "contextmenu", function (e) {
                            self.emit("colmenu", [column, e]);
                            return false;
                        });
                    })(i, col);
                }
            }

            function setEventSort(self) {
                var sortIndexes = self.options.sort,
                    len = sortIndexes === true ? self.uit.getColumnCount() : sortIndexes.length;

                for (var i = 0; i < len; i++) {
                    var colKey = sortIndexes === true ? i : sortIndexes[i],
                        col = self.getColumn(colKey);

                    if (col.element != null) {
                        (function (index, column) {
                            self.addEvent(column.element, "click", function (e) {
                                if ((0, _jquery2.default)(e.target).hasClass("resize")) return;

                                self.sort(index, undefined, e);
                                self.emit("colclick", [column, e]);
                            });
                        })(colKey, col);

                        (0, _jquery2.default)(col.element).css("cursor", "pointer");
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

                for (var i = 0; i < self.uit.getColumnCount() - 1; i++) {
                    var $colElem = (0, _jquery2.default)(self.getColumn(i).element),
                        $resizeBar = (0, _jquery2.default)("<div class='resize'></div>");
                    var pos = $colElem.offset(); // ie8 버그로 인해 position에서 offset으로 변경함

                    $resizeBar.css({
                        position: "absolute",
                        width: "8px",
                        height: $colElem.outerHeight(),
                        left: $colElem.outerWidth() + (pos.left - tablePos.left) - 1 + "px",
                        top: pos.top - tablePos.top + "px",
                        cursor: "w-resize",
                        "z-index": "1"
                    });

                    $colElem.append($resizeBar);

                    // Event Start
                    (function (index) {
                        self.addEvent($resizeBar, "mousedown", function (e) {
                            if (resizeX == 0) resizeX = e.pageX;

                            // 컬럼 객체 가져오기
                            col = self.getColumn(index);
                            colNext = getNextColumn(index);
                            colWidth = (0, _jquery2.default)(col.element).outerWidth();
                            colNextWidth = (0, _jquery2.default)(colNext.element).outerWidth();
                            colResize = this;
                            is_resize = true;

                            return false;
                        });
                    })(i);
                }

                self.addEvent(document, "mousemove", function (e) {
                    if (resizeX > 0) {
                        colResizeWidth(self, e.pageX - resizeX);
                    }
                });

                self.addEvent(document, "mouseup", function (e) {
                    if (resizeX > 0) {
                        resizeX = 0;

                        // 리사이징 바, 위치 이동
                        var left = (0, _jquery2.default)(col.element).offset().left - tablePos.left;
                        (0, _jquery2.default)(colResize).css("left", (0, _jquery2.default)(col.element).outerWidth() + left - 1);

                        self.emit("colresize", [col, e]);

                        // 리사이징 상태 변경 (delay)
                        setTimeout(function () {
                            is_resize = false;
                        }, 100);

                        return false;
                    }
                });

                function getNextColumn(index) {
                    for (var i = index + 1; i < self.uit.getColumnCount(); i++) {
                        var elem = self.getColumn(i).element;

                        if (!(0, _jquery2.default)(elem).is(':hidden')) {
                            return self.getColumn(i);
                        }
                    }
                }

                function colResizeWidth(self, disWidth) {
                    var colMinWidth = 30;

                    // 최소 크기 체크
                    if (colWidth + disWidth < colMinWidth || colNextWidth - disWidth < colMinWidth) return;

                    (0, _jquery2.default)(col.element).outerWidth(colWidth + disWidth);
                    (0, _jquery2.default)(colNext.element).outerWidth(colNextWidth - disWidth);

                    // 스크롤 옵션일 경우, 별도 처리
                    if (self.options.scroll) {
                        var colLastWidth = (0, _jquery2.default)(colNext.element).outerWidth() - (col.index == self.uit.getColumnCount() - 2 ? _.scrollWidth() : 0);

                        (0, _jquery2.default)(col.list[0]).outerWidth((0, _jquery2.default)(col.element).outerWidth());
                        (0, _jquery2.default)(colNext.list[0]).outerWidth(colLastWidth);
                    }
                }
            }

            function resetRowStatus(self, isChecked) {
                self.hideExpand();
                self.hideEditRow();
                self.unselect();

                if (!isChecked) {
                    self.uncheckAll();
                }
            }

            this.init = function () {
                var opts = this.options;

                // @Deprecated, 'rows'는 의미상 맞지 않아 차후 삭제
                opts.data = opts.rows != null ? opts.rows : opts.data;

                // UIHandler, 추후 코어에서 처리
                $obj = {
                    table: (0, _jquery2.default)(this.root).css({ "position": "relative" }),
                    thead: (0, _jquery2.default)(this.root).find("thead"),
                    tbody: (0, _jquery2.default)(this.root).find("tbody")
                };

                // UITable 객체 생성
                this.uit = new Base({
                    $obj: $obj, $tpl: this.tpl
                }, opts.fields); // 신규 테이블 클래스 사용

                if (opts.moveRow) {
                    $obj.tbody.css({
                        "-webkit-user-select": "none",
                        "-moz-user-select": "none",
                        "-ms-user-select": "none",
                        "-o-user-select": "none",
                        "user-select": "none"
                    });
                }

                if (opts.fields && opts.colshow) {
                    // 컬럼 보이기 초기값 설정
                    setColumnStatus(this);
                }

                if (opts.fields && this.tpl.menu && dropdown != null) {
                    // 컬럼 보이기/숨기기 메뉴 설정
                    setColumnMenu(this);
                }

                if (opts.resize) {
                    setColumnResize(this);
                }

                if (opts.fields && opts.sort && opts.sortEvent === true) {
                    setEventSort(this);
                }

                if (opts.data.length > 0) {
                    this.update(opts.data);
                } else {
                    this.setVo(); // TODO: 차후에 제거해야 함
                }

                if (opts.width > 0) {
                    $obj.table.outerWidth(opts.width);
                }

                if (!opts.fields) {
                    if (opts.sort || opts.colshow || opts.editRow) {
                        throw new Error("JUI_CRITICAL_ERR: 'fields' option is required");
                    }
                }

                setEventColumn(this);
            };

            /**
             * @method update
             * Updates the list of rows or modifies the row at a specified index.
             *
             * @param {Array} rows
             */
            this.update = function () {
                var dataList = arguments.length == 1 ? arguments[0] : arguments[1],
                    index = arguments.length == 2 ? arguments[0] : null;

                if (index != null) {
                    // 1. 단일 로우 업데이트
                    var tmpRow = this.uit.updateRow(index, dataList);
                    setEventRow(this, tmpRow);

                    // 첫번째 로우일 경우, 스크롤 다시 처리
                    if (parseInt(index) == 0) {
                        this.scroll();
                    }
                } else {
                    // 2. 로우 목록 업데이트
                    this.uit.removeRows();
                    this.scroll();
                    this.append(dataList);

                    // 정렬 인덱스가 옵션에 있을 경우, 해당 인덱스의 컬럼 정렬
                    if (this.options.sortIndex) {
                        this.sort(this.options.sortIndex, this.options.sortOrder, null);
                    }
                }
            };

            /**
             * @method updateTree
             * It is possible to configure a tree table using an object array with the index and data properties.
             *
             * @param {Array} rows
             */
            this.updateTree = function (rows) {
                // index & data 조합의 객체 배열
                var iParser = _.index();

                // 전체 로우 제거
                this.uit.removeRows();

                // 트리 로우 추가
                for (var i = 0; i < rows.length; i++) {
                    var pIndex = iParser.getParentIndex(rows[i].index);

                    if (pIndex == null) {
                        this.uit.appendRow(rows[i].data);
                    } else {
                        this.uit.appendRow(pIndex, rows[i].data);
                    }
                }

                setUpdateInit(this, true);
                setEventRows(this);
            };

            /**
             * @method append
             * Add a row or a child row to at a specified index.
             *
             * @param {RowObject} row
             */
            this.append = function () {
                var isInit = this.count() > 0 ? false : true;
                var dataList = arguments.length == 1 ? arguments[0] : arguments[1],
                    index = arguments.length == 2 ? arguments[0] : null;

                dataList = dataList.length == undefined ? [dataList] : dataList;

                for (var i = 0; i < dataList.length; i++) {
                    var tmpRow = null;

                    if (index != null) tmpRow = this.uit.appendRow(index, dataList[i]);else tmpRow = this.uit.appendRow(dataList[i]);

                    // 추가 로우 추가시 이벤트 걸기
                    if (!isInit) {
                        setEventRow(this, tmpRow);
                    }
                }

                setUpdateInit(this, isInit);
                if (isInit) setEventRows(this); // 최초에 데이터가 없을 경우에만 전체 이벤트 걸기
            };

            /**
             * @method insert
             * Adds a row at a specified index.
             *
             * @param {Integer} index
             * @param {RowObject} row
             */
            this.insert = function (index, dataList) {
                var isInit = this.count() > 0 ? false : true;
                var dataList = dataList.length == undefined ? [dataList] : dataList;

                for (var i = 0; i < dataList.length; i++) {
                    this.uit.insertRow(index, dataList[i]);
                }

                setUpdateInit(this, isInit);
                setEventRows(this);
            };

            /**
             * @method select
             * Adds a selected class to a row at a specified index and gets an instance of the applicable row.
             *
             * @param {Integer} index
             * @return {RowObject} row
             */
            this.select = function (index) {
                // 모든 로우 상태 초기화
                resetRowStatus(this);

                var row = this.get(index);

                (0, _jquery2.default)(row.element).parent().find(".selected").removeClass("selected");
                (0, _jquery2.default)(row.element).addClass("selected");

                selectedIndex = index;
                return row;
            };

            /**
             * @method unselect
             * Removes a selected class from a selected row and gets an instance of the row in question.
             *
             * @return {RowObject} row
             */
            this.unselect = function () {
                if (selectedIndex == null) return;
                var row = this.get(selectedIndex);

                (0, _jquery2.default)(row.element).removeClass("selected");
                selectedIndex = null;

                return row;
            };

            /**
             * @method check
             * Add a checked class to a row at a specified index.
             *
             * @param {Integer} index
             */
            this.check = function (index) {
                // 모든 로우 상태 초기화 (체크만 제외 )
                resetRowStatus(this, true);

                var row = this.get(index);

                // 초기화
                this.hideExpand();
                this.hideEditRow();
                this.unselect();

                checkedIndexes[index] = row;
                (0, _jquery2.default)(row.element).addClass("checked");
            };

            /**
             * @method uncheck
             * Removes a checked class from a row at a specified index.
             *
             * @param {Integer} index
             */
            this.uncheck = function (index) {
                if (checkedIndexes[index] == null) return;
                var row = this.get(index);

                checkedIndexes[index] = null;
                (0, _jquery2.default)(row.element).removeClass("checked");
            };

            /**
             * @method uncheckAll
             * Removes checked classes from all rows.
             */
            this.uncheckAll = function () {
                checkedIndexes = {};
                $obj.tbody.find(".checked").removeClass("checked");
            };

            /**
             * @method remove
             * Remove a row at a specified index.
             *
             * @param {Integer} index
             */
            this.remove = function (index) {
                if (index == null) return null;

                this.uit.removeRow(index);
                setEventRows(this);
                this.scroll();
            };

            /**
             * @method reset
             * Removes all rows.
             */
            this.reset = function () {
                selectedIndex = null;
                expandedIndex = null;
                editableIndex = null;
                dragIndex = null;
                checkedIndexes = {};

                this.uit.removeRows();
                this.scroll();
            };

            /**
             * @method move
             * Moves a row iat a specified index to the target index.
             *
             * @param {Integer} index
             * @param {Integer} targetIndex
             */
            this.move = function (index, targetIndex) {
                this.uit.moveRow(index, targetIndex);
                setEventRows(this);

                // 첫번째 로우일 경우, 스크롤 다시 처리
                if (parseInt(index) == 0 || parseInt(targetIndex) == 0) {
                    this.scroll();
                }
            };

            /**
             * @method sort
             * Moves a row iat a specified index to the target index.
             *
             * @param {Integer} index
             * @param {String} order  "asc" or "desc"
             */
            this.sort = function (index, order, e) {
                // index는 컬럼 key 또는 컬럼 name
                if (!this.options.fields || !this.options.sort || is_resize) return;
                var column = this.getColumn(index);

                if (typeof column.name == "string") {
                    column.order = order ? order : column.order == "asc" || column.order == null ? "desc" : "asc";

                    this.uit.setColumn(index, column);
                    this.uit.sortRows(column.name, column.order == "desc" ? true : false);
                    this.emit("sort", [column, e]);

                    setUpdateInit(this, true);
                    setEventRows(this);
                }
            };

            /**
             * @method scroll
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer} height
             */
            this.scroll = function (height) {
                if (!this.options.scroll) return;

                var self = this,
                    h = height && height > 0 ? height : this.options.scrollHeight,
                    h = h > 0 ? h : 200;

                this.options.scrollHeight = h;
                $obj.tbody.css("maxHeight", h + "px");

                setTimeout(function () {
                    if ($obj.tbody.outerHeight() < h) {
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
            };

            /**
             * @method open
             * Shows a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.open = function (index) {
                // 로트 제외, 하위 모든 노드 대상
                if (index == null) return;

                this.uit.openRow(index);
                this.emit("open", [this.get(index)]);
            };

            /**
             * @method fold
             * Hides a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.fold = function (index) {
                if (index == null) return;

                this.uit.foldRow(index);
                this.emit("fold", [this.get(index)]);
            };

            /**
             * @method openAll
             * Shows all child rows of a specified index.
             */
            this.openAll = function () {
                // 로트 포함, 하위 모든 노드 대상
                this.uit.openRowAll();
                this.emit("openall");
            };

            /**
             * @method foldAll
             * Hides all child rows of a specified index.
             */
            this.foldAll = function () {
                this.uit.foldRowAll();
                this.emit("foldall");
            };

            /**
             * @method resize
             * Resets the inner scroll and columns of a table.
             */
            this.resize = function () {
                this.scroll();

                if (this.options.resize) {
                    setColumnResize(this);
                }
            };

            /**
             * @method resizeColumns
             * Resets the sizes of all columns of a table.
             */
            this.resizeColumns = function () {
                var columns = this.listColumn();

                for (var i = 0; i < columns.length; i++) {
                    if (columns[i].width == null) {
                        (0, _jquery2.default)(columns[i].element).outerWidth("auto");
                    }
                }
            };

            /**
             * @method size
             * Gets the size of all the rows of a table.
             *
             * @return {Integer} size
             */
            this.size = function () {
                // 차후 수정 (컬럼 * 로우 개수 * 바이트)
                return this.uit.getRowCount();
            };

            /**
             * @method count
             * Gets the number of trows of a table.
             *
             * @return {Integer} count
             */
            this.count = function () {
                return this.uit.getRowCount();
            };

            /**
             * @method list
             * Gets all the rows of a table.
             *
             * @return {Array} rows
             */
            this.list = function () {
                return this.uit.getRow();
            };

            /**
             * @method listData
             * Gets the data of all the rows of a table.
             *
             * @return {Array} datas
             */
            this.listData = function () {
                var rows = this.list(),
                    data = [];

                for (var i = 0; i < rows.length; i++) {
                    data.push(rows[i].data);
                }

                return data;
            };

            /**
             * @method listAll
             * Gets all the rows of a table including child rows.
             *
             * @return {Array} rows
             */
            this.listAll = function () {
                return this.uit.getRowAll();
            };

            /**
             * @method listChecked
             * Gets all rows in a check state.
             *
             * @return {Array} rows
             */
            this.listChecked = function () {
                var list = [];

                for (var row in checkedIndexes) {
                    if (checkedIndexes[row] != null) {
                        list.push(checkedIndexes[row]);
                    }
                }

                return list;
            };

            /**
             * @method listColumn
             * Gets all columns.
             *
             * @return {Array} columns
             */
            this.listColumn = function () {
                return this.uit.getColumn();
            };

            /**
             * @method get
             * Gets the row at the specified index.
             *
             * @param {Integer} index
             * @return {RowObject} row
             */
            this.get = function (index) {
                if (index == null) return null;
                return this.uit.getRow(index);
            };

            /**
             * @method getAll
             * Gets all rows of at the specified index including child rows.
             *
             * @param {Integer} index
             * @return {Array} rows
             */
            this.getAll = function (index) {
                if (index == null) return null;
                return this.uit.getRowAll(index);
            };

            /**
             * @method getColumn
             * Gets the column at the specified index.
             *
             * @param {"Integer"/"String"} key index or column key
             * @return {ColumnObject} column
             */
            this.getColumn = function (index) {
                // index or columnName
                if (index == null) return null;else {
                    if (typeof index == "string") return this.uit.getColumn(_jquery2.default.inArray(index, this.options.fields));else return this.uit.getColumn(index);
                }
            };

            /**
             * @method showColumn
             * Shows the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.showColumn = function (index, e) {
                // index or columnName
                if (!this.options.fields) return;
                var column = this.getColumn(index);

                this.uit.showColumn(column.index);
                this.scroll();
                this.resizeColumns();

                if (this.options.resize) {
                    setColumnResize(this);
                }

                // 커스텀 이벤트 발생
                this.emit("colshow", [column, e]);
            };

            /**
             * @method hideColumn
             * Hides the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.hideColumn = function (index, e) {
                // index or columnName
                if (!this.options.fields) return;
                var column = this.getColumn(index);

                this.uit.hideColumn(column.index);
                this.scroll();
                this.resizeColumns();

                if (this.options.resize) {
                    setColumnResize(this);
                }

                // 커스텀 이벤트 발생
                this.emit("colhide", [column, e]);
            };

            /**
             * @method initColumns
             * It is possible to determine the index or name of the column to be shown in an array.
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.initColumns = function (keys) {
                if ((typeof keys === "undefined" ? "undefined" : _typeof(keys)) != "object") return;
                this.options.colshow = keys;

                setColumnStatus(this);
                this.scroll();
                this.resizeColumns();

                if (this.options.resize) {
                    setColumnResize(this);
                }
            };

            /**
             * @method showColumnMenu
             * Shows the Show/Hide Column menu at specified coordinates.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.showColumnMenu = function (x, y) {
                if (!this.options.fields || !ddUi) return;

                var columns = this.listColumn(),
                    offset = $obj.thead.offset(),
                    cx = _.typeCheck("integer", x) ? x : 0,
                    cy = _.typeCheck("integer", y) ? y : offset.top + $obj.thead.outerHeight();

                // 현재 체크박스 상태 설정
                (0, _jquery2.default)(ddUi.root).find("input[type=checkbox]").each(function (i) {
                    if (columns[i].type == "show") this.checked = true;else this.checked = false;
                });

                ddUi.move(cx, cy);
                ddUi.show();
            };

            /**
             * @method hideColumnMenu
             * Hides the Show/Hide Column menu.
             */
            this.hideColumnMenu = function () {
                if (!this.options.fields || !ddUi) return;
                ddUi.hide();
            };

            /**
             * @method toggleColumnMenu
             * Shows or hides the Show/Hide Column menu.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.toggleColumnMenu = function (x, y) {
                if (!this.options.fields || !ddUi) return;

                if (ddUi.type == "show") this.hideColumnMenu();else this.showColumnMenu(x, y);
            };

            /**
             * @method showExpand
             * Shows the extended row area of a specified index.
             *
             * @param {Integer} index
             */
            this.showExpand = function (index, obj, e) {
                if (!this.options.expand) return;

                // 모든 로우 상태 초기화
                resetRowStatus(this);

                var expandSel = "#EXPAND_" + this.timestamp,
                    row = index instanceof Row ? index : this.get(index),
                    obj = (typeof obj === "undefined" ? "undefined" : _typeof(obj)) != "object" ? _jquery2.default.extend({ row: row }, row.data) : obj,
                    $expand = (0, _jquery2.default)(expandSel).parent().show();

                $obj.tbody.find("tr").removeClass("open");
                $expand.insertAfter((0, _jquery2.default)(row.element).addClass("open"));

                (0, _jquery2.default)(expandSel).attr("colspan", $obj.thead.find("tr:last > th:visible").length).html(this.tpl["expand"](obj));

                // 스크롤 적용
                this.scroll();
                // TODO: 차후에 제거해야 함
                this.setVo();

                // 커스텀 이벤트 호출
                expandedIndex = index;
                this.emit("expand", [row, e]);
            };

            /**
             * @method hideExpand
             * Hides the extended row area of a specified index.
             */
            this.hideExpand = function (e) {
                if (expandedIndex == null) return;

                var row = expandedIndex instanceof Row ? expandedIndex : this.get(expandedIndex);

                (0, _jquery2.default)('#EXPAND_' + this.timestamp).parent().hide();
                $obj.tbody.find("tr").removeClass("open");

                // 스크롤 적용
                this.scroll();

                expandedIndex = null;
                this.emit("expandend", [row, e]);
            };

            /**
             * @method getExpand
             * Get a row in which the extended area is currently activated.
             *
             * @return {RowObject} row
             */
            this.getExpand = function () {
                if (expandedIndex == null) return null;

                return expandedIndex instanceof Row ? expandedIndex : this.get(expandedIndex);
            };

            /**
             * @method showEditRow
             * Shows the modified row area of a specified index.
             *
             * @param {Integer} index
             */
            this.showEditRow = function (index, e) {
                if (!this.options.editRow) return;

                // 모든 로우 상태 초기화
                resetRowStatus(this);

                var self = this,
                    row = this.get(index);
                var $cells = (0, _jquery2.default)(row.element).find("td");

                $cells.each(function (i) {
                    setEventEditCell(self, this, row, i, e, function () {
                        var data = {},
                            originData = row.data;

                        $cells.each(function (colIndex) {
                            var column = self.getColumn(colIndex);

                            if (column.name != null) {
                                var $edit = (0, _jquery2.default)(this).find("input.edit");

                                if ($edit.length == 1) {
                                    var value = $edit.val();
                                    data[column.name] = !isNaN(value) && value != null && value != "" ? parseFloat(value) : value;
                                }
                            }
                        });

                        // 변경된 값으로 데이터 갱신하기
                        row.data = _jquery2.default.extend(row.data, data);

                        // 콜백 결과 가져오기
                        var res = self.emit("editend", [row, e]);

                        // 이벤트 리턴 값이 false가 아닐 경우에만 업데이트
                        if (res !== false) {
                            self.hideEditRow(data);
                        } else {
                            row.data = originData;
                        }
                    });
                });

                editableIndex = index;
                self.emit("editstart", [row, e]);
            };

            /**
             * @method hideEditRow
             * Hides the modified row area of a specified index.
             */
            this.hideEditRow = function (data) {
                if (editableIndex == null) return;
                var row = this.get(editableIndex);

                editableIndex = null;
                this.update(row.index, !data ? row.data : data);
            };

            /**
             * @method getEditRow
             * Get a row in which the modified area is currently activated.
             *
             * @return {RowObject} row
             */
            this.getEditRow = function () {
                if (editableIndex == null) return null;
                return this.get(editableIndex);
            };

            /**
             * @method setCsv
             * Updates a table using a CVS string.
             */
            this.setCsv = function () {
                var opts = this.options;
                if (!opts.fields && !opts.csv) return;

                var csv = arguments.length == 1 ? arguments[0] : arguments[1],
                    key = arguments.length == 2 ? arguments[0] : null;

                var fields = _.getCsvFields(opts.fields, opts.csv),
                    csvNumber = opts.csvNumber ? _.getCsvFields(opts.fields, opts.csvNumber) : null,
                    dataList = _.csvToData(fields, csv, csvNumber);

                if (key == null) {
                    this.update(dataList);
                } else {
                    this.reset();

                    for (var i = 0; i < dataList.length; i++) {
                        var index = dataList[i][key];

                        if (index) {
                            this.insert(index, dataList[i]);
                        }
                    }
                }
            };

            /**
             * @method setCsvFile
             * Updates a table using a CVS file.
             */
            this.setCsvFile = function () {
                if (!this.options.fields && !this.options.csv) return;

                var self = this,
                    file = arguments.length == 1 ? arguments[0] : arguments[1],
                    key = arguments.length == 2 ? arguments[0] : null;

                _.fileToCsv(file, function (csv) {
                    if (key == null) self.setCsv(csv);else self.setCsv(key, csv);
                });
            };

            /**
             * @method getCsv
             * Gets the data of a table as a CSV string.
             *
             * @param {Boolean} isTree
             * @return {String} csv
             */
            this.getCsv = function (isTree) {
                if (!this.options.fields && !this.options.csv) return;

                var fields = _.getCsvFields(this.options.fields, this.options.csv);
                var dataList = [],
                    rows = isTree ? this.listAll() : this.list();

                for (var i = 0; i < rows.length; i++) {
                    dataList.push(rows[i].data);
                }

                return _.dataToCsv2({
                    fields: fields,
                    rows: dataList,
                    names: this.options.csvNames
                });
            };

            /**
             * @method getCsvBase64
             * Gets the data of a table as a CSV string encoded as base64.
             *
             * @param {Boolean} isTree
             * @return {String} base64
             */
            this.getCsvBase64 = function (isTree) {
                if (!this.options.fields && !this.options.csv) return;

                return _.csvToBase64(this.getCsv(isTree));
            };

            /**
             * @method downloadCsv
             * Downloads the data of a table as a CSV file.
             *
             * @param {String} name
             * @param {Boolean} isTree
             */
            this.downloadCsv = function (name, isTree) {
                if (_.typeCheck("string", name)) {
                    name = name.split(".")[0];
                }

                var a = document.createElement('a');
                a.download = name ? name + ".csv" : "table.csv";
                a.href = this.getCsvBase64(isTree);

                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            };

            /**
             * @method activeIndex
             * Gets the index of a row that is activated in an extended/modified/selected state.
             *
             * @return {Integer} index
             */
            this.activeIndex = function () {
                // 활성화된 확장/수정/선택 상태의 로우 인덱스를 리턴
                if (expandedIndex != null) {
                    return expandedIndex instanceof Row ? expandedIndex.index : expandedIndex;
                }

                return selectedIndex || editableIndex;
            };

            /**
             * @method setVo
             * Dynamically defines the template method of a UI
             *
             * @deprecated
             */
            this.setVo = function () {
                if (!this.options.vo) return;

                if (vo != null) vo.reload();
                vo = (0, _jquery2.default)(this.selector).jbinder();

                this.bind = vo;
            };
        };

        UI.setup = function () {
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
            };
        };

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
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(5);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "ui.dropdown",
    extend: "event",
    component: function component() {
        var _ = _main2.default.include("util.base");

        var hideAll = function hideAll() {
            var dd = getDropdown();

            if (dd != null) {
                dd.hide();
            }
        };

        var getDropdown = function getDropdown() {
            var call_list = _main2.default.get("ui.dropdown");

            for (var i = 0; i < call_list.length; i++) {
                var ui_list = call_list[i];

                for (var j = 0; j < ui_list.length; j++) {
                    if (ui_list[j].type == "show") return ui_list[j];
                }
            }

            return null;
        };

        (0, _jquery2.default)(function () {
            document.addEventListener("click", function (e) {
                var tn = e.target.tagName;

                if (tn != "LI" && tn != "INPUT" && tn != "A" && tn != "BUTTON" && tn != "I") {
                    hideAll();
                }
            });

            window.addEventListener("keydown", function (e) {
                var dd = getDropdown();

                if (dd != null) {
                    dd.wheel(e.which, function () {
                        e.preventDefault();
                    });
                }
            });
        });

        var UI = function UI() {
            var ui_list = null,
                index = -1;

            function setEventNodes(self) {
                var $list = (0, _jquery2.default)(ui_list.menu).find("li");

                // 이벤트 걸린거 초기화
                $list.off("click").off("hover");

                // 클릭 이벤트 설정
                self.addEvent($list, "click", function (e) {
                    if ((0, _jquery2.default)(this).hasClass("divider") || (0, _jquery2.default)(this).hasClass("title") || (0, _jquery2.default)(this).hasClass("disabled")) return;

                    var index = getTargetIndex(this),
                        text = (0, _jquery2.default)(this).text(),
                        value = (0, _jquery2.default)(this).attr("value");

                    self.emit("change", [{ index: index, value: value, text: text }, e]);

                    // close가 true일 경우, 전체 드롭다운 숨기기
                    if (self.options.close) hideAll();

                    // A 태그일 경우에는 이벤트 막기
                    if (e.target.tagName == "A") {
                        e.preventDefault();
                    }
                });

                // 마우스 오버시 hover 클래스 제거
                self.addEvent($list, "hover", function (e) {
                    $list.removeClass("active");
                });

                function getTargetIndex(elem) {
                    var result = 0;

                    $list.each(function (i) {
                        if (elem == this) {
                            result = i;
                        }
                    });

                    return result;
                }
            }

            function selectItem(self, callback) {
                var $list = ui_list.menu.find("li"),
                    $target = $list.eq(index);

                $list.removeClass("active");

                if ($target.val() != "" || $target.html() != "") {
                    $target.addClass("active");

                    if (self.options.height > 0) {
                        ui_list.menu.scrollTop(index * $target.outerHeight());
                    }
                } else {
                    if (typeof callback == "function") {
                        callback();
                    }
                }
            }

            this.init = function () {
                var opts = this.options;

                var $dd_root = (0, _jquery2.default)(this.root),
                    $dd_menu = $dd_root.find("ul"),
                    $dd_anchor = $dd_root.find(".anchor");

                // 메인 설정, 없을 경우에는 root가 메인이 됨
                $dd_menu = $dd_menu.length == 0 ? $dd_root : $dd_menu;

                // UI 객체 추가
                ui_list = { root: $dd_root, menu: $dd_menu, anchor: $dd_anchor };

                // Size
                ui_list.root.outerWidth(ui_list.menu.outerWidth());

                // Width
                if (opts.width > 0) {
                    $dd_menu.outerWidth(opts.width);
                }

                // Height
                if (opts.height > 0) {
                    $dd_menu.css({ "maxHeight": opts.height, "overflow": "auto" });
                }

                // Left
                if (opts.left > 0) {
                    $dd_root.css("left", opts.left);
                }

                // Top
                if (opts.top > 0) {
                    $dd_root.css("top", opts.top);
                }

                // Default Styles
                $dd_menu.css({ "display": "block" });
                $dd_root.css({ "position": "absolute", "display": "none" });

                // 드롭다운 목록 갱신
                if (opts.nodes.length > 0) {
                    this.update(opts.nodes);
                } else {
                    setEventNodes(this);
                }

                this.type = "hide"; // 기본 타입 설정
            };

            /**
             * @method update
             * Changes the dropdown list
             *
             * @param {Array} nodes Dropdown list
             */
            this.update = function (nodes) {
                if (!this.tpl.node) return;

                (0, _jquery2.default)(ui_list.menu).empty();

                for (var i = 0; i < nodes.length; i++) {
                    (0, _jquery2.default)(ui_list.menu).append(this.tpl.node(nodes[i]));
                }

                setEventNodes(this);
            };

            /**
             * @method hide
             * Hides the dropdown
             */
            this.hide = function () {
                ui_list.root.hide();

                this.emit("hide");
                this.type = "hide";
            };

            /**
             * @method show
             * Shows a dropdown at the specified coordinates
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.show = function (x, y) {
                hideAll();

                ui_list.root.show();

                // Anchor 옵션 처리
                if (ui_list.anchor.length > 0) ui_list.root.css("margin-top", "10px");

                // x, y 값이 있을 경우
                if (arguments.length == 2) {
                    this.move(x, y);
                }

                this.emit("show");
                this.type = "show";
            };

            /**
             * @method move
             * Moves a dropdown to the specified coordinates
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.move = function (x, y) {
                ui_list.root.css("left", x);
                ui_list.root.css("top", y);
            };

            /**
             * @method wheel
             * Changes a selected node upwards when the key is set to -1, or downwards when the key is set to 1. If the key is set to 0, the speciified node is selected
             *
             * @param {Integer} key
             * @param {Function} callback
             */
            this.wheel = function (key, callback) {
                if (!this.options.keydown) return;

                var self = this,
                    $list = ui_list.menu.find("li");

                // 탭을 눌렀을 경우, 드롭다운 숨기기
                if (key == 9) {
                    this.hide();
                    return;
                }

                if (key == 38 || key == -1) {
                    // up
                    if (index < 1) index = $list.length - 1;else index--;

                    selectItem(this, function () {
                        index--;
                        selectItem(self);
                    });

                    if (callback) callback();
                }

                if (key == 40 || key == 1) {
                    // down
                    if (index < $list.length - 1) index++;else index = 0;

                    selectItem(self, function () {
                        index++;
                        selectItem(self);
                    });

                    if (callback) callback();
                }

                if (key == 13 || key == 0 || !key) {
                    // enter
                    self.addTrigger($list.eq(index), "click");
                    index = -1;

                    if (callback) callback();
                }
            };

            /**
             * @method reload
             * Reloads the dropdown list
             */
            this.reload = function () {
                this.init();
                this.emit("reload");
            };
        };

        UI.setup = function () {
            return {
                /**
                 * @cfg {Boolean} [close=true]
                 * Closes the Auto when clicking on the dropdown list
                 */
                close: true,

                /**
                 * @cfg {Boolean} [keydown=false]
                 * It is possible to choose anything on the dropdown list with the arrow keys on the keyboard
                 */
                keydown: false,

                /**
                 * @cfg {Integer} [left=0]
                 * Sets the X coordinate of the dropdown list
                 */
                left: 0,

                /**
                 * @cfg {Integer} [top=0]
                 * Sets the Y coordinate of the dropdown list
                 */
                top: 0,

                /**
                 * @cfg {Integer} [width=0]
                 * Determines the horizontal size of a dropdown list
                 */
                width: 0,

                /**
                 * @cfg {Integer} [height=0]
                 * Determines the vertical size of a dropdown list
                 */
                height: 0,

                /**
                 * @cfg {Array} nodes
                 * Sets a dropdown list to data rather than markup
                 */
                nodes: []
            };
        };

        /**
         * @event change
         * Event that occurs when anything on the dropdown list is selected
         *
         * @param {Object} data
         * @param {EventObject} e The event object
         */

        /**
         * @event show
         * Event that occurs when a dropdown is shown
         */

        /**
         * @event hide
         * Event that occurs when a dropdown is hidden
         */

        /**
         * @event reload
         * Event that occurs when a dropdown is reloaded
         */

        return UI;
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _juijs = __webpack_require__(2);

var _juijs2 = _interopRequireDefault(_juijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _juijs2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

var _table = __webpack_require__(3);

var _table2 = _interopRequireDefault(_table);

var _xtable = __webpack_require__(11);

var _xtable2 = _interopRequireDefault(_xtable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.use(_table2.default, _xtable2.default);

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) == "object") {
    window.jui = window.JUI = _main2.default;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (root, options) {
    var self = this,
        auto = {};

    var def_methods = {
        get: true, val: true, destroy: true, close: true, reload: true
    };

    function init() {
        var funcList = [],
            bindList = [],
            autoList = [];

        (0, _jquery2.default)(root).find("[" + options.attr + "]").each(function (i) {
            var $this = (0, _jquery2.default)(this),
                tmpComm = $this.attr(options.attr),
                tmpCommArr = getParseCommandArr(tmpComm);

            var commArr = tmpCommArr.length > 0 ? tmpCommArr : [tmpCommArr];

            for (var j = 0, len = commArr.length; j < len; j++) {
                var command = commArr[j];

                if (!command.is_auto) {
                    if (!command.key) {
                        bindList.push({ name: command.func, elem: this });
                    } else {
                        funcList.push({ func: command.func, key: command.key, data: this });
                    }
                } else {
                    if (this.tagName == "INPUT" || this.tagName == "SELECT" || this.tagName == "TEXTAREA") {
                        autoList.push({ func: command.func, type: command.type, elem: this });
                    }
                }
            }

            if (funcList.length > 0) settingBindFunc(funcList);
            if (bindList.length > 0) settingBindMulti(bindList);
            if (autoList.length > 0) settingBindAuto(autoList);
        });
    }

    /**
     * data 속성의 value 파싱 함수
     *
     * @param {String} command
     */
    function getParseCommand(command) {
        var key = null,
            func = null,
            type = null;
        var is_auto = false;

        if (command) {
            if (command.indexOf('@') != -1) {
                var arr = command.split("@");
                func = arr[0], type = arr[1], is_auto = true;
            } else {
                if (command.indexOf('#') != -1) {
                    var arr = command.split("#");
                    type = arr[1], command = arr[0];
                }

                if (command.indexOf(':') != -1) {
                    var arr = command.split(":");
                    key = arr[1], func = arr[0];
                } else {
                    func = command;
                }
            }
        }

        return {
            key: key,
            func: func,
            type: type,
            is_auto: is_auto
        };
    }

    function getParseCommandArr(command) {
        if (command.indexOf(',') != -1) {
            //if(command.indexOf(':') != -1) throw new Error("JBINDER_BIND_ERR: bind array keys can not be used");

            var arr = command.split(","),
                commArr = new Array();

            for (var i = 0, len = arr.length; i < len; i++) {
                commArr.push(getParseCommand(arr[i]));
            }

            return commArr;
        }

        return getParseCommand(command);
    }

    /**
     * bind 태그일 경우,
     * 엘리먼트 유형에 따라 처리하는 함수
     *
     * @param {Element} elem
     * @param {String} value
     */
    function settingBindProc(func, elem, value) {
        var tmpComm = (0, _jquery2.default)(elem).attr(options.attr),
            tmpCommArr = getParseCommandArr(tmpComm),
            commArr = tmpCommArr.length > 0 ? tmpCommArr : [tmpCommArr];

        for (var i = 0, len = commArr.length; i < len; i++) {
            var comm = commArr[i];

            if (comm.func == func) {
                new ViewData(comm.type, elem).run(value);
            }
        }
    }

    /**
     * bind 태그일 경우,
     * 단일/멀티 유형에 따라 처리하는 함수
     *
     * @param {Array} bindList
     */
    function settingBindMulti(bindList) {
        var list = new Object();

        for (var i = 0, len = bindList.length; i < len; i++) {
            var obj = bindList[i];
            if (!list[obj.name]) list[obj.name] = [];

            list[obj.name].push(obj.elem);
        }

        for (var func in list) {
            (function (func) {
                self[func] = function (value) {
                    var elemList = list[func];

                    for (var j = 0, len = elemList.length; j < len; j++) {
                        var elem = elemList[j];

                        settingBindProc(func, elem, value);
                    }

                    return elemList.length > 1 ? elemList : elemList[0];
                };
            })(func);
        }
    }

    /**
     * bind 태그 메소드 세팅 함수
     * bind일 경우, settingBindProc 호출
     *
     * @param {Array} funcList
     */
    function settingBindFunc(funcList) {
        var _loop = function _loop() {
            func = funcList[i].func;


            (function (func) {
                self.funcMultiProc = function (key, value) {
                    var data = getFuncElem(funcList, func, key);
                    settingBindProc(func, data, value);

                    return data;
                };
            })(func);

            function getFuncElem(funcList, func, key) {
                for (var i = 0, len = funcList.length; i < len; i++) {
                    var obj = funcList[i];

                    if (obj.func == func && obj.key == key) {
                        return obj.data;
                    }
                }
            }

            self[func] = self.funcMultiProc;
        };

        for (var i = 0, len = funcList.length; i < len; i++) {
            var func;

            _loop();
        }
    }

    /**
     * bind 태그 이벤트 오토 세팅 함수
     *
     * @param {Array} autoList
     */
    function settingBindAuto(autoList) {
        for (var i = 0, len = autoList.length; i < len; i++) {
            var elem = autoList[i].elem,
                func = autoList[i].func,
                type = autoList[i].type;

            (0, _jquery2.default)(elem).unbind(type).on(type, function (e) {
                self[func]((0, _jquery2.default)(this).val());
            });
        }
    }

    /**
     * bind/tag/act, 엘리먼트 또는 데이터을 가져오는 메소드
     *
     * @param {String} key
     * @param {Boolean} is_elem
     */
    function _search(key, is_elem) {
        var sel = "[" + options.attr + "]",
            cmdList = [];

        (0, _jquery2.default)(root).find(sel).each(function (i) {
            var cmd_str = (0, _jquery2.default)(this).attr(options.attr),
                command = getParseCommandArr(cmd_str);
            command = !command.length ? [command] : command;

            for (var i = 0; i < command.length; i++) {
                if (key == command[i].func) {
                    cmdList.push({ cmd: command[i], elem: this });
                }
            }
        });

        function getData(data) {
            return new ViewData(data.cmd.type, data.elem).run();
        }

        return function (cmdList) {
            if (cmdList.length == 1 && !cmdList[0].cmd.key) {
                if (is_elem) return cmdList[0].elem;else return getData(cmdList[0]);
            } else {
                var list = new Object(),
                    index = 0;

                for (var i = 0, len = cmdList.length; i < len; i++) {
                    var cmd = cmdList[i].cmd;

                    if (cmd.key) {
                        key = cmd.key;
                    } else {
                        key = index;index++;
                    }

                    if (is_elem) list[key] = cmdList[i].elem;else list[key] = getData(cmdList[i]);
                }

                return list;
            }
        }(cmdList);
    }

    //-- Search API
    self.get = function (key) {
        return _search(key, true);
    };
    self.val = function (key) {
        return _search(key, false);
    };

    //-- Memory Returned API
    self.destroy = function () {
        (0, _jquery2.default)(root).off().remove();
        self.close(true);
    };

    self.close = function (isOff) {
        if (!isOff) (0, _jquery2.default)(root).off();
        for (var key in this) {
            delete this[key];
        }
    };

    self.reload = function () {
        for (var key in this) {
            if (!def_methods[key]) {
                delete this[key];
            }
        }

        init();
    };

    //-- Initialization
    init();
};

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ViewData(type, elem) {
    var $sel = (0, _jquery2.default)(elem);
    var dataType = 0,
        dataAttr = null;

    function isTypeHtml(elem) {
        if (elem.value == undefined || elem.tagName.toUpperCase() == 'BUTTON') return true;

        return false;
    }

    function init() {
        if (!type) {
            if (isTypeHtml(elem)) dataType = "html";else dataType = "value";
        } else {
            if (type.indexOf(".") != -1) {
                var arr = type.split(".");

                dataType = arr[0];
                dataAttr = arr[1];
            } else {
                dataType = "css";
                dataAttr = type;
            }
        }
    }

    this.run = function (_value) {
        var isSetter = typeof _value == "undefined" || _value == null ? false : true;

        var method = {
            "html": function html() {
                if (isSetter) $sel.html(_value);else return $sel.html();
            },
            "value": function value() {
                if (isSetter) $sel.val(_value);else return $sel.val();
            },
            "css": function css() {
                if (isSetter) {
                    if ((typeof _value === "undefined" ? "undefined" : _typeof(_value)) == "object") {
                        $sel.css(_value);
                    } else {
                        $sel.css(dataAttr, _value);
                    }
                } else return $sel.css(dataAttr);
            },
            "attr": function attr() {
                if (isSetter) {
                    if ((typeof _value === "undefined" ? "undefined" : _typeof(_value)) == "object") {
                        $sel.attr(_value);
                    } else {
                        $sel.attr(dataAttr, _value);
                    }
                } else return $sel.attr(dataAttr);
            }
        };

        return method[dataType]();
    };

    init();
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

var _column = __webpack_require__(9);

var _column2 = _interopRequireDefault(_column);

var _row = __webpack_require__(10);

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.use(_column2.default, _row2.default);

exports.default = {
    name: "grid.base",
    component: function component() {
        var _ = _main2.default.include("util.base");
        var Column = _main2.default.include("grid.column");
        var Row = _main2.default.include("grid.row");

        var Base = function Base(handler, fields) {
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

                $obj.thead.find("tr:last > th").each(function (i) {
                    tmpColumns.push(this);
                });

                for (var i = 0; i < tmpColumns.length; i++) {
                    var column = new Column(i);

                    if (columns[i]) {
                        column.element = columns[i].element;
                        column.order = columns[i].order;
                        column.name = columns[i].name;
                        column.data = columns[i].data;
                        column.list = columns[i].list;
                        column.type = columns[i].type;
                        column.width = columns[i].width;
                    } else {
                        column.element = tmpColumns[i];

                        if ((0, _jquery2.default)(column.element).attr("width") || (0, _jquery2.default)(column.element).attr("style") && (0, _jquery2.default)(column.element).attr("style").indexOf("width") != -1) {
                            column.width = (0, _jquery2.default)(column.element).outerWidth();
                        }

                        if (fields && fields[i]) {
                            column.name = fields[i];
                        }
                    }

                    for (var j = 0; j < rows.length; j++) {
                        column.list.push(rows[j].list[i]);
                        column.data.push(rows[j].data[column.name]);
                    }

                    columns[i] = column;
                }
            }

            function initColumnRows(type, row) {
                if (type == "reload" || type == "append") {
                    for (var i = 0; i < columns.length; i++) {
                        columns[i].list[row.index] = row.list[i];
                        columns[i].data[row.index] = row.data[columns[i].name];
                    }
                } else if (type == "remove") {
                    for (var i = 0; i < columns.length; i++) {
                        columns[i].list.splice(row.index, 1);
                        columns[i].data.splice(row.index, 1);
                    }
                } else {
                    initColumns();
                }
            }

            function createRow(data, no, pRow) {
                if (data instanceof Row) return data;

                var row = new Row();
                row.init(data, $tpl.row, pRow);
                row.setIndex(no);
                row.reload(columns);

                return row;
            }

            function setRowChildAll(dataList, row) {
                var child_rows = row.children;

                if (child_rows.length > 0) {
                    for (var i = 0; i < child_rows.length; i++) {
                        dataList.push(child_rows[i]);

                        if (child_rows[i].children.length > 0) {
                            setRowChildAll(dataList, child_rows[i]);
                        }
                    }
                }
            }

            function getRowChildLeaf(keys, row) {
                if (!row) return null;
                var tmpKey = keys.shift();

                if (tmpKey == undefined) {
                    return row;
                } else {
                    return getRowChildLeaf(keys, row.children[tmpKey]);
                }
            }

            function reloadRows() {
                var index = arguments[0],
                    callback = arguments[1];

                if (typeof index == "function") {
                    callback = index;
                    index = 0;
                } else {
                    index = !isNaN(index) ? index : 0;
                }

                for (var i = index; i < rows.length; i++) {
                    rows[i].setIndex(i);
                    rows[i].reload();
                    initColumnRows("reload", rows[i]);

                    if (typeof callback == "function") {
                        callback(i);
                    }
                }
            }

            function insertRowData(index, data) {
                var row = createRow(data, index),
                    preRows = row;

                if (rows.length == index && !(index == 0 && rows.length == 1)) {
                    var tRow = rows[index - 1];
                    (0, _jquery2.default)(row.element).insertAfter(tRow.children.length == 0 ? tRow.element : tRow.lastChildLeaf().element);
                } else {
                    (0, _jquery2.default)(row.element).insertBefore(rows[index].element);
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
                if (typeof $tpl.none != "function") return false;

                if (isNone) {
                    if (rows.length > 0) {
                        $obj.tbody.find("tr:first").remove();
                        isNone = false;
                    }
                } else {
                    if (rows.length == 0) {
                        $obj.tbody.html($tpl.none());
                        isNone = true;
                    }
                }

                return true;
            }

            function getIndexToRow(index) {
                for (var i = 0, len = rows.length; i < len; i++) {
                    if (rows[i].index == "" + index) {
                        return rows[i];
                        break;
                    }
                }

                return null;
            }

            this.appendRow = function () {
                var index = arguments[0],
                    data = arguments[1];
                var result = null;

                if (!data) result = appendRowData(index);else result = appendRowDataChild(index, data);

                toggleRowNone();
                return result;
            };

            this.insertRow = function (index, data) {
                var result = null;

                if (iParser.isIndexDepth(index)) {
                    result = insertRowDataChild(index, data);
                } else {
                    if (rows.length == 0 && parseInt(index) == 0) {
                        result = this.appendRow(data);
                    } else {
                        result = insertRowData(index, data);
                    }
                }

                toggleRowNone();
                return result;
            };

            this.updateRow = function (index, data) {
                var row = this.getRow(index);

                for (var key in data) {
                    row.data[key] = data[key];
                }

                row.reload();
                initColumnRows("reload", row);

                return row;
            };

            this.moveRow = function (index, targetIndex) {
                if (index == targetIndex) return;

                var rows = this.getRowAll(index),
                    row = rows[0],
                    data = _.clone(row.data);

                if (rows.length > 1) {
                    for (var i = 0; i < rows.length; i++) {
                        var index = iParser.changeIndex(rows[i].index, targetIndex, rows[0].index);
                        this.insertRow(index, rows[i].data);
                    }
                } else {
                    this.insertRow(targetIndex, data);
                }

                this.removeRow(row.index);
            };

            this.removeRow = function (index) {
                var row = this.getRow(index);

                if (!iParser.isIndexDepth(index)) {
                    row.destroy();

                    initColumnRows("remove", rows[index]);
                    rows.splice(index, 1);
                    reloadRows(index);
                } else {
                    row.destroy();
                }

                toggleRowNone();
            };

            this.openRow = function (index) {
                this.getRow(index).open();
                folds[index] = false;

                for (var key in folds) {
                    if (folds[key] !== false) {
                        var foldRow = this.getRow(folds[key]);
                        if (foldRow != null) foldRow.fold();
                    }
                }
            };

            this.openRowAll = function () {
                var tmpRows = this.getRowAll();

                for (var i = 0; i < tmpRows.length; i++) {
                    if (!tmpRows[i].isLeaf()) {
                        tmpRows[i].open();
                        folds[tmpRows[i].index] = false;
                    }
                }
            };

            this.foldRow = function (index) {
                this.getRow(index).fold();
                folds[index] = index;
            };

            this.foldRowAll = function () {
                var tmpRows = this.getRowAll();

                for (var i = 0; i < tmpRows.length; i++) {
                    if (!tmpRows[i].isLeaf()) {
                        tmpRows[i].fold();
                        folds[tmpRows[i].index] = tmpRows[i].index;
                    }
                }
            };

            this.removeRows = function () {
                rows = [];

                if (!toggleRowNone()) {
                    $obj.tbody.html("");
                }

                initColumnRows();
            };

            this.sortRows = function (name, isDesc) {
                var qs = _.sort(rows);

                if (isDesc) {
                    qs.setCompare(function (a, b) {
                        return getValue(a) > getValue(b) ? true : false;
                    });
                } else {
                    qs.setCompare(function (a, b) {
                        return getValue(a) < getValue(b) ? true : false;
                    });
                }

                qs.run();
                $obj.tbody.html("");

                reloadRows(function (i) {
                    $obj.tbody.append(rows[i].element);
                });

                function getValue(row) {
                    var value = row.data[name];

                    if (typeof value == "string") {
                        return value.toLowerCase();
                    } else {
                        if (!isNaN(value) && value != null) {
                            return value;
                        }
                    }

                    return "";
                }
            };

            this.appendColumn = function (tplType, dataList) {
                var columLength = columns.length,
                    $columnRows = (0, _jquery2.default)($tpl[tplType]({ rows: dataList }));
                var $theadTrList = $columnRows.filter("thead").find("tr");

                $theadTrList.each(function (i) {
                    var $tr = $obj.thead.find("tr").eq(i);

                    (0, _jquery2.default)(this).find("th").each(function (j) {
                        $tr.append(this);

                        if ($theadTrList.size() - 1 == i) {
                            columns.push({ element: this, list: [] });
                        }
                    });
                });

                for (var k = 0; k < rows.length; k++) {
                    $columnRows.filter("tbody").find("tr").eq(k).find("td").each(function (i) {
                        (0, _jquery2.default)(rows[k].element).append(this);

                        columns[columLength + i].list.push(this);
                        rows[k].list.push(this);

                        _jquery2.default.extend(rows[k].data, dataList[k]);
                    });
                }
            };

            this.removeColumn = function (index) {
                for (var i = 0; i < columns[index].list.length; i++) {
                    (0, _jquery2.default)(columns[index].element).remove();
                    (0, _jquery2.default)(columns[index].list[i]).remove();
                }

                for (var j = 0; j < rows.length; j++) {
                    rows[j].list.splice(index, 1);
                }

                columns.splice(index, 1);
            };

            this.hideColumn = function (index) {
                if (columns[index].type == "hide") return;

                var rows = this.getRowAll();
                for (var i = 0; i < rows.length; i++) {
                    rows[i].hideCell(index);
                }

                columns[index].hide();
            };

            this.showColumn = function (index) {
                if (columns[index].type == "show") return;

                var rows = this.getRowAll();
                for (var i = 0; i < rows.length; i++) {
                    rows[i].showCell(index);
                }

                columns[index].show();
            };

            this.getColumnCount = function () {
                return columns.length;
            };

            this.getRowCount = function () {
                return rows.length;
            };

            this.getColumn = function (index) {
                if (index == null) return columns;else return columns[index];
            };

            this.getRow = function (index) {
                if (index == null) {
                    return rows;
                } else {
                    var row = getIndexToRow(index);

                    if (!row) {
                        var keys = iParser.getIndexList(index),
                            row = getIndexToRow(keys[0]);

                        for (var i = 1, len = keys.length; i < len; i++) {
                            if (!row) break;
                            row = row.children[keys[i]];
                        }

                        return row;
                    } else {
                        return row;
                    }
                }
            };

            this.getRowAll = function (index) {
                var dataList = [],
                    tmpRows = index == null ? rows : [this.getRow(index)];

                for (var i = 0; i < tmpRows.length; i++) {
                    if (tmpRows[i]) {
                        dataList.push(tmpRows[i]);

                        if (tmpRows[i].children.length > 0) {
                            setRowChildAll(dataList, tmpRows[i]);
                        }
                    }
                }

                return dataList;
            };

            this.getRowParent = function (index) {
                if (!iParser.isIndexDepth(index)) return null;
                return this.getRow(iParser.getParentIndex(index));
            };

            this.setColumn = function (index, column) {
                columns[index] = column;
            };

            this.setRow = function (index, row) {
                rows[index] = row;
            };

            this.printInfo = function () {
                console.log(columns);
                console.log(rows);
            };

            init();
        };

        return Base;
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "grid.column",
    component: function component() {
        var Column = function Column(index) {
            /** @property {HTMLElement} [element=null] TH element of a specified column */
            this.element = null;

            /** @property {"asc"/"desc"/null} [order=null] Column sort state */
            this.order = null;

            /** @property {Integer} [name=null] Column name */
            this.name = null;

            /** @property {Array} data Data from all rows belonging for a specified column */
            this.data = [];

            /** @property {Array} list TD element of all rows belonging to a specified column */
            this.list = [];

            /** @property {Integer} index Column index */
            this.index = index;

            /** @property {"show"/"hide"/"resize"} [type="show"] The current column state */
            this.type = "show";

            /** @property {Integer} [width=null] Column width */
            this.width = null;

            this.hide = function () {
                this.type = "hide";
                (0, _jquery2.default)(this.element).hide();
            };

            this.show = function () {
                this.type = "show";
                (0, _jquery2.default)(this.element).show();
            };
        };

        return Column;
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "grid.row",
    component: function component() {
        var _ = _main2.default.include("util.base");

        var Base = function Base() {
            function setIndexChild(row) {
                var clist = row.children;

                for (var i = 0; i < clist.length; i++) {
                    clist[i].setIndex(i);
                    clist[i].reload();

                    if (!clist[i].isLeaf()) {
                        setIndexChild(clist[i]);
                    }
                }
            }

            function setElementCells(self) {
                self.list = [];

                (0, _jquery2.default)(self.element).find("td").each(function (i) {
                    self.list[i] = this;

                    if (self.hidden[i]) {
                        this.style.display = "none";
                    }
                });
            }

            function getElement(self, xssFilter) {
                if (!self.tpl) return self.element;

                // 로우 데이터 XSS 필터링
                if (xssFilter != null) {
                    replaceXssFilteredData(self, xssFilter);
                }

                var element = (0, _jquery2.default)(self.tpl(_jquery2.default.extend({
                    row: {
                        type: self.type,
                        index: self.index,
                        seq: self.seq,
                        data: self.data,
                        depth: self.depth,
                        children: self.children
                    }
                }, self.data))).get(0);

                return element;
            }

            function removeChildAll(row) {
                (0, _jquery2.default)(row.element).remove();

                for (var i = 0; i < row.children.length; i++) {
                    var c_row = row.children[i];

                    if (!c_row.isLeaf()) {
                        removeChildAll(c_row);
                    } else {
                        (0, _jquery2.default)(c_row.element).remove();
                    }
                }
            }

            function reloadChildAll(children) {
                for (var i = 0; i < children.length; i++) {
                    children[i].setIndex(i);
                    children[i].reload();
                }
            }

            function replaceXssFilteredData(self, xssFilter) {
                for (var key in self.data) {
                    if (xssFilter[key]) {
                        if (_.typeCheck("string", self.data[key])) {
                            self.data[key] = self.data[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        }
                    }
                }
            }

            this.setIndex = function (rownum) {
                this.rownum = !isNaN(rownum) ? rownum : this.rownum;
                this.seq = this.rownum + 1;

                if (!this.parent) {
                    this.index = "" + this.rownum;
                } else {
                    this.index = this.parent.index + "." + this.rownum;
                }

                if (this.parent && typeof this.index == "string") {
                    this.depth = this.index.split(".").length - 1;
                }

                if (!this.isLeaf()) {
                    setIndexChild(this);
                }
            };

            this.reload = function (columns, seq, xssFilter) {
                if (this.element != null) {
                    var newElem = getElement(this, xssFilter),
                        clsValue = (0, _jquery2.default)(this.element).attr("class");

                    (0, _jquery2.default)(newElem).addClass(clsValue).insertAfter(this.element);
                    (0, _jquery2.default)(this.element).remove();

                    this.element = newElem;
                } else {
                    this.element = getElement(this, xssFilter);
                }

                if (columns != null) {
                    for (var i = 0; i < columns.length; i++) {
                        if (columns[i].type == "hide") {
                            this.hideCell(i);
                        } else {
                            this.showCell(i);
                        }
                    }
                }

                if (seq != null) {
                    this.seq = seq;
                }

                setElementCells(this);
            };

            this.destroy = function () {
                if (this.parent != null) {
                    this.parent.removeChild(this.index);
                } else {
                    removeChildAll(this);
                    (0, _jquery2.default)(this.element).remove();
                }
            };

            this.isLeaf = function () {
                return this.children.length == 0 ? true : false;
            };

            this.fold = function () {
                this.type = "fold";

                for (var i = 0; i < this.children.length; i++) {
                    var c_row = this.children[i];
                    (0, _jquery2.default)(c_row.element).hide();

                    if (!c_row.isLeaf()) c_row.fold();
                }
            };

            this.open = function () {
                this.type = "open";

                for (var i = 0; i < this.children.length; i++) {
                    var c_row = this.children[i];
                    (0, _jquery2.default)(c_row.element).show();

                    if (!c_row.isLeaf()) c_row.open();
                }
            };

            this.appendChild = function (row) {
                var lastElem = this.isLeaf() ? this.element : this.lastChildLeaf().element;
                (0, _jquery2.default)(row.element).insertAfter(lastElem);

                this.children.push(row);
            };

            this.insertChild = function (rownum, row, isReload) {
                var lastElem = this.element;

                if (rownum > 0) {
                    var cRow = this.children[rownum - 1];

                    if (!cRow.isLeaf() || this.children.length == rownum + 1) {
                        lastElem = cRow.lastChildLeaf().element;
                    } else {
                        lastElem = cRow.element;
                    }
                }

                (0, _jquery2.default)(row.element).insertAfter(lastElem);

                var preRows = this.children.splice(0, rownum);
                preRows.push(row);

                this.children = preRows.concat(this.children);
                reloadChildAll(this.children);
            };

            this.removeChild = function (index) {
                for (var i = 0; i < this.children.length; i++) {
                    var row = this.children[i];

                    if (row.index == index) {
                        this.children.splice(i, 1); // �迭���� ����
                        removeChildAll(row);
                    }
                }

                reloadChildAll(this.children);
            };

            this.lastChild = function () {
                if (!this.isLeaf()) return this.children[this.children.length - 1];

                return null;
            };

            this.lastChildLeaf = function (lastRow) {
                var row = !lastRow ? this.lastChild() : lastRow;

                if (row.isLeaf()) return row;else {
                    return this.lastChildLeaf(row.lastChild());
                }
            };

            this.showCell = function (index) {
                this.hidden[index] = false;
                (0, _jquery2.default)(this.list[index]).show();
            };

            this.hideCell = function (index) {
                this.hidden[index] = true;
                (0, _jquery2.default)(this.list[index]).hide();
            };
        };

        /**
         * @class grid.row
         *
         * Grid's Row Class
         *
         * @alias Table Row
         * @requires jquery
         */
        var Row = function Row() {
            /** @property {Array} data Data of a specifiedrow. */
            this.data = null;

            /** @property {Integer} seq Data of a sequence. */
            this.seq = 0;

            /** @property {Integer} [rownum=null] The unique number of a child row under the specified parent row if a parent row exists. */
            this.rownum = null;

            /** @property {String/Integer} [index=null] Index of a specified row. In the case of a tree structure, a depth is given. */
            this.index = null;

            /** @property {HTMLElement} [element=null] TR element of a specified row. */
            this.element = null;

            /** @property {Array} list List of TD elements of a specified row. */
            this.list = [];

            /** @property {Object} list List of hidden TD element. */
            this.hidden = {};

            /** @property {uix.table.row} parent Variable that refers to the parent row. */
            this.parent = null;

            /** @property {Array} children List of child rows. */
            this.children = [];

            /** @property {Integer} [depth=0] The depth of the current row in the case of a tree structure. */
            this.depth = 0;

            /** @property {"open"/"fold"} [type="fold"] State value that indicates whether a child row is shown or hidden. */
            this.type = "fold";

            /** @property {Function} [type="null"] State value that indicates whether a child row is shown or hidden. */
            this.tpl = null;

            this.init = function (data, tplFunc, pRow) {
                this.data = data;
                this.tpl = tplFunc;
                this.parent = pRow;
            };
        };

        Row.prototype = new Base();

        return Row;
    }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(12);

var _lodash2 = _interopRequireDefault(_lodash);

var _main = __webpack_require__(1);

var _main2 = _interopRequireDefault(_main);

var _table = __webpack_require__(3);

var _table2 = _interopRequireDefault(_table);

var _dropdown = __webpack_require__(4);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _modal = __webpack_require__(14);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.use(_table2.default, _dropdown2.default, _modal2.default);

exports.default = {
    name: "grid.xtable",
    extend: "event",
    component: function component() {
        var _ = _main2.default.include("util.base");
        var modal = _main2.default.include("ui.modal");
        var table = _main2.default.include("grid.table");
        var Row = _main2.default.include("grid.row");

        _.resize(function () {
            var call_list = _main2.default.get("grid.xtable");

            for (var i = 0; i < call_list.length; i++) {
                var ui_list = call_list[i];

                for (var j = 0; j < ui_list.length; j++) {
                    ui_list[j].resize();
                }
            }
        }, 1000);

        var UI = function UI() {
            var head = null,
                body = null;
            var rows = [],
                c_rows = [],
                t_rows = [],
                o_rows = null; // 루트 rows, 루트 rows 인덱스, 자식 포함 rows, 자식 제외 + 필터 rows (리펙토링 필요함!!!)
            var ui_modal = null,
                page = 1;
            var is_loading = false,
                is_resize = false;
            var w_resize = 8,
                select_row = null;
            var iParser = _.index();
            var vscroll_info = null;
            var xss_filter_keys = null;
            var row_height = 0; // 최초 렌더링시 row_height를 구한다. 만약에 구하지 못하면 options.rowHeight 값으로 대체한다.

            function createRows(data, no, pRow, type) {
                var tmp_rows = [];

                for (var i = 0, len = data.length; i < len; i++) {
                    var row = new Row(),
                        rownum = no + i;

                    // row 객체 초기화
                    row.init(data[i], head.tpl["row"], pRow);
                    row.setIndex(rownum);

                    // row 상태 설정
                    if (type == "open" || type == "fold") {
                        row.type = type;
                    }

                    // 루트 row만 캐싱함
                    if (pRow == null) {
                        c_rows[rownum] = row;
                    }

                    tmp_rows.push(row);
                }

                return tmp_rows;
            }

            function createTableList(self) {
                var exceptOpts = ["buffer", "bufferCount", "csvCount", "sortLoading", "sortCache", "sortIndex", "sortOrder", "event", "rows", "scrollWidth", "width", "rowHeight", "xssFilter", "msort"];

                var $root = (0, _jquery2.default)(self.root);

                // 가상스크롤 모드일 때, 로우 높이는 고정되야 하므로 nowrap 클래스를 추가함
                if (self.options.buffer == "vscroll") {
                    if (!$root.hasClass("nowrap")) {
                        $root.addClass("nowrap");
                    }
                }

                // 스크롤 모드일 때, 무조건 scroll 클래스를 추가함
                if (self.options.buffer != "page") {
                    if (!$root.hasClass("scroll")) {
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
                if (self.options.xssFilter) {
                    var filterIndexes = self.options.xssFilter,
                        len = filterIndexes === true ? head.uit.getColumnCount() : filterIndexes.length;

                    xss_filter_keys = {};
                    for (var i = 0; i < len; i++) {
                        var colKey = filterIndexes === true ? i : filterIndexes[i],
                            col = head.getColumn(colKey);

                        xss_filter_keys[col.name] = true;
                    }
                }

                // 테이블 옵션 필터링 함수
                function getExceptOptions(self, exceptOpts) {
                    var options = {};

                    for (var key in self.options) {
                        if (_jquery2.default.inArray(key, exceptOpts) == -1) {
                            options[key] = self.options[key];
                        }
                    }

                    // 가로 스크롤 모드일 때, resize 옵션 막기
                    if (self.options.scrollWidth > 0) {
                        options.resize = false;
                    }

                    return options;
                }

                function setTableAllStyle(self) {
                    var opts = self.options;

                    if (opts.scrollWidth > 0) {
                        self.scrollWidth(opts.scrollWidth, true);
                    } else {
                        if (opts.width > 0) {
                            (0, _jquery2.default)(self.root).outerWidth(opts.width);
                        }
                    }
                }

                function setTableHeadStyle(self, head) {
                    (0, _jquery2.default)(head.root).wrap("<div class='head'></div>");
                    (0, _jquery2.default)(head.root).children("tbody").remove();
                }

                function setTableBodyStyle(self, body) {
                    var cols = body.listColumn();

                    // X-Table 바디 영역 스크롤 높이 설정
                    if (self.options.buffer != "page") {
                        var scrollHeight = self.options.scrollHeight;

                        if (self.options.buffer == "vscroll") {
                            (0, _jquery2.default)(body.root).wrap("<div class='body' style='max-height: " + scrollHeight + "px'><div></div></div>");

                            (0, _jquery2.default)(body.root).parent().parent().css({
                                "overflow-y": "scroll",
                                "transform": "translateZ(0)"
                            });
                        } else {
                            (0, _jquery2.default)(body.root).wrap("<div class='body' style='max-height: " + scrollHeight + "px'></div>");

                            (0, _jquery2.default)(body.root).parent().css({
                                "overflow-y": "scroll"
                            });
                        }
                    } else {
                        (0, _jquery2.default)(body.root).wrap("<div class='body'></div>");
                    }

                    // X-Table 바디 영역의 헤더라인은 마지막 노드를 제외하고 제거
                    (0, _jquery2.default)(body.root).find("thead > tr").outerHeight(0).not(":last-child").remove();

                    // X-Table 바디 영역의 헤더 설정
                    for (var i = 0; i < cols.length; i++) {
                        (0, _jquery2.default)(cols[i].element).html("").outerHeight(0);
                    }
                }
            }

            function setCustomEvent(self) {
                head.on("colresize", function (column, e) {
                    // 컬럼 리사이징 관련
                    var cols = head.listColumn(),
                        bodyCols = body.listColumn(),
                        isLast = false;

                    for (var j = cols.length - 1; j >= 0; j--) {
                        var hw = (0, _jquery2.default)(cols[j].element).outerWidth();

                        if (self.options.buffer != "page" && cols[j].type == "show" && !isLast) {
                            if (_.browser.msie) {
                                (0, _jquery2.default)(bodyCols[j].element).outerWidth(hw - getScrollBarWidth(self));
                            } else {
                                (0, _jquery2.default)(bodyCols[j].element).css({ "width": "auto" });
                            }

                            isLast = true;
                        } else {
                            (0, _jquery2.default)(cols[j].element).outerWidth(hw);
                            (0, _jquery2.default)(bodyCols[j].element).outerWidth(hw);
                        }
                    }

                    reloadScrollWidthResizeBar(500);
                    self.emit("colresize", [column, e]);
                });

                head.on("colshow", function (column, e) {
                    body.uit.showColumn(column.index);
                    self.resize();
                    self.emit("colshow", [column, e]);
                });

                head.on("colhide", function (column, e) {
                    body.uit.hideColumn(column.index);
                    self.resize();
                    self.emit("colhide", [column, e]);
                });

                head.on("colclick", function (column, e) {
                    self.emit("colclick", [column, e]);
                });

                head.on("coldblclick", function (column, e) {
                    self.emit("coldblclick", [column, e]);
                });

                head.on("colmenu", function (column, e) {
                    self.emit("colmenu", [column, e]);
                });

                head.on("sort", function (column, e) {
                    self.sort(column.index, column.order, false, e);
                    self.emit("sort", [column, e]);
                });

                body.on("select", function (obj, e) {
                    self.emit("select", [obj, e]);
                });

                body.on("click", function (obj, e) {
                    self.emit("click", [obj, e]);
                });

                body.on("dblclick", function (obj, e) {
                    self.emit("dblclick", [obj, e]);
                });

                body.on("rowmenu", function (obj, e) {
                    self.emit("rowmenu", [obj, e]);
                });

                body.on("expand", function (obj, e) {
                    self.emit("expand", [obj, e]);
                });

                body.on("expandend", function (obj, e) {
                    self.emit("expandend", [obj, e]);
                });
            }

            function setScrollEvent(self, width, height) {
                var opts = self.options,
                    lastScrollTop = 0;

                var $head = (0, _jquery2.default)(self.root).children(".head"),
                    $body = (0, _jquery2.default)(self.root).children(".body");

                // 스크롤 rAF 실행
                updateScrollStatus(self);

                // 스크롤 이벤트 설정
                $body[0].addEventListener("scroll", (0, _lodash2.default)(function (e) {
                    // 컬럼 메뉴는 스크롤시 무조건 숨기기
                    self.hideColumnMenu();

                    // 가로 스크롤
                    if (width > 0) {
                        $head[0].scrollLeft = this.scrollLeft;
                    }

                    if (opts.buffer == "scroll") {
                        // 무조건 scroll 타입일 때
                        var scrollTop = this.scrollTop + height,
                            scrollHeight = $body[0].scrollHeight;

                        if (scrollTop >= scrollHeight * 0.9) {
                            self.next();
                            self.emit("scroll", e);
                        }
                    } else if (opts.buffer == "vscroll") {
                        // 가로 스크롤 위치 갱신하기
                        if (vscroll_info.prev_scroll_left != this.scrollLeft) {
                            vscroll_info.prev_scroll_left = this.scrollLeft;
                        }
                    }

                    e.stopPropagation();
                }, 100));

                // 스크롤 키보드 이벤트 설정
                if (opts.buffer == "vscroll") {
                    (0, _jquery2.default)(self.root).hover(function () {
                        vscroll_info.is_focus = true;
                    }, function () {
                        vscroll_info.is_focus = false;
                    });

                    self.addEvent(document, "keydown", function (e) {
                        if (vscroll_info.is_focus) {
                            var top = $body.scrollTop(),
                                tick = getRowHeight(self);

                            if (e.which == 38 || e.which == 40) {
                                $body.scrollTop(top + (e.which == 38 ? -tick : tick));
                            } else if (e.which == 33 || e.which == 34) {
                                var newTick = tick * vscroll_info.scroll_count;
                                $body.scrollTop(top + (e.which == 33 ? -newTick : newTick));
                            }
                        }
                    });
                }

                // 가상스크롤 rAF 처리
                function updateScrollStatus(self) {
                    var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

                    var scrollTop = $body.scrollTop();

                    if (lastScrollTop === scrollTop) {
                        raf(function () {
                            updateScrollStatus(self);
                        });

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

                        raf(function () {
                            updateScrollStatus(self);
                        });
                    }
                }
            }

            function setScrollWidthResize(self) {
                var column = {},
                    width = {},
                    resizeX = 0;

                // 리사이즈 엘리먼트 삭제
                (0, _jquery2.default)(self.root).find("thead .resize").remove();

                for (var i = 0, len = head.uit.getColumnCount(); i < len; i++) {
                    var $colElem = (0, _jquery2.default)(head.getColumn(i).element),
                        $resizeBar = (0, _jquery2.default)("<div class='resize'></div>");

                    var pos = $colElem.position(),
                        left = $colElem.outerWidth() + pos.left - 1;

                    $resizeBar.css({
                        position: "absolute",
                        width: w_resize + "px",
                        height: $colElem.outerHeight(),
                        left: (i == len - 1 ? left - w_resize : left) + "px",
                        top: pos.top + "px",
                        cursor: "w-resize",
                        "z-index": "1"
                    });

                    $colElem.append($resizeBar);

                    // Event Start
                    (function (index, isLast) {
                        self.addEvent($resizeBar, "mousedown", function (e) {
                            if (resizeX == 0) {
                                resizeX = e.pageX;
                            }

                            // 컬럼 객체 가져오기
                            column = {
                                head: head.getColumn(index),
                                body: body.getColumn(index),
                                isLast: isLast
                            };

                            width = {
                                column: (0, _jquery2.default)(column.head.element).outerWidth(),
                                head: (0, _jquery2.default)(head.root).outerWidth(),
                                body: (0, _jquery2.default)(body.root).outerWidth(),
                                "max-width": parseInt((0, _jquery2.default)(head.root).parent().css("max-width"))
                            };

                            is_resize = true;

                            return false;
                        });
                    })(i, i == len - 1);
                }

                self.addEvent(document, "mousemove", function (e) {
                    if (resizeX > 0) {
                        colResizeWidth(e.pageX - resizeX);
                    }
                });

                self.addEvent(document, "mouseup", function (e) {
                    if (resizeX > 0) {
                        // 마지막 컬럼 크기를 0보다 크게 리사이징시 가로 스크롤 위치 조정
                        if (column.isLast) {
                            var scrollLeft = (0, _jquery2.default)(body.root).parent().scrollLeft(),
                                disWidth = e.pageX - resizeX;

                            if (disWidth > 0) {
                                (0, _jquery2.default)(head.root).parent().scrollLeft(scrollLeft + disWidth);
                                (0, _jquery2.default)(body.root).parent().scrollLeft(scrollLeft + disWidth);
                            }
                        }

                        // 스크롤 위치 초기화
                        resizeX = 0;

                        // 리사이징 바, 위치 이동
                        reloadScrollWidthResizeBar(500);
                        head.emit("colresize", [column.head, e]);

                        // 리사이징 상태 변경 (delay)
                        setTimeout(function () {
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
                    if (width.column + disWidth < colMinWidth) return;

                    (0, _jquery2.default)(column.head.element).outerWidth(width.column + disWidth);
                    (0, _jquery2.default)(column.body.element).outerWidth(width.column + disWidth);

                    (0, _jquery2.default)(head.root).outerWidth(width.head + disWidth);
                    (0, _jquery2.default)(body.root).outerWidth(width.body + disWidth);
                }
            }

            function reloadScrollWidthResizeBar(delay) {
                setTimeout(function () {
                    for (var i = 0, len = head.uit.getColumnCount(); i < len; i++) {
                        var $colElem = (0, _jquery2.default)(head.getColumn(i).element);

                        var pos = $colElem.position(),
                            left = $colElem.outerWidth() + pos.left - 1;

                        $colElem.find(".resize").css("left", (i == len - 1 ? left - w_resize : left) + "px");
                    }
                }, delay);
            }

            function getScrollBarWidth(self) {
                return self.options.buffer == "page" ? 0 : _.scrollWidth() + 1;
            }

            function renderVirtualScroll(scrollTop) {
                if (vscroll_info == null) return;

                if (scrollTop >= vscroll_info.max_scroll_top) {
                    scrollTop = vscroll_info.max_scroll_top;
                }

                (0, _jquery2.default)(body.root).css({ top: scrollTop + "px" });
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

                (0, _jquery2.default)(body.root).parent().height(vscroll_info.content_height > 0 ? vscroll_info.content_height : "auto");
            }

            function resetVirtualScrollInfo(self) {
                (0, _jquery2.default)(self.root).find(".body").scrollTop(0);
                (0, _jquery2.default)(body.root).css({ top: "0px" });
                (0, _jquery2.default)(body.root).parent().css({ height: "auto" });

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
                for (var i = 0; i < rows.length; i++) {
                    t_rows.push(rows[i]);

                    if (rows[i].type == "open" && rows[i].children.length > 0) {
                        setOpenChildRows(rows[i].children);
                    }
                }
            }

            function appendChildRows(p_row, data, type) {
                var no = p_row.children.length,
                    c_rows = createRows(_.typeCheck("array", data) ? data : [data], no, p_row, type);

                for (var i = 0, len = c_rows.length; i < len; i++) {
                    p_row.children.push(c_rows[i]);
                }
            }

            function calculateRows(self, isTree) {
                if (isTree) {
                    t_rows = [];
                    setOpenChildRows(rows);
                } else {
                    t_rows = rows;
                }

                // 데이터가 갱신되면 가상 스크롤 계산식을 수정해야 한다.
                if (self.options.buffer == "vscroll") {
                    setVirtualScrollInfo(self);
                }
            }

            function setEventMultiSort(self) {
                var sortIndexes = self.options.msort,
                    len = sortIndexes === true ? head.uit.getColumnCount() : sortIndexes.length,
                    msort_columns = [],
                    msort_orders = [];

                for (var i = 0; i < len; i++) {
                    var colKey = sortIndexes === true ? i : sortIndexes[i],
                        col = self.getColumn(colKey);

                    if (col.element != null) {
                        (function (index, column) {
                            self.addEvent(column.element, "click", function (e) {
                                if ((0, _jquery2.default)(e.target).hasClass("resize")) return;

                                if (column.order == "asc") {
                                    column.order = null;

                                    for (var j = 0; j < msort_columns.length; j++) {
                                        if (column.name == msort_columns[j]) {
                                            msort_columns.splice(j, 1);
                                            msort_orders.splice(j, 1);
                                        }
                                    }
                                } else {
                                    var colIndex = _.inArray(column.name, msort_columns);

                                    if (column.order == null) {
                                        column.order = "desc";
                                    } else if (column.order == "desc") {
                                        column.order = "asc";
                                    }

                                    if (colIndex == -1) {
                                        msort_columns.push(column.name);
                                        msort_orders.push(column.order);
                                    } else {
                                        msort_orders[colIndex] = column.order;
                                    }
                                }

                                self.emit("msort", [column, e]);
                                self.msort(msort_columns, msort_orders);
                                self.emit("colclick", [column, e]);
                            });
                        })(colKey, col);

                        (0, _jquery2.default)(col.element).css("cursor", "pointer");
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
                var direction = order_by[index] == "desc" ? 1 : 0,
                    key = columns[index],
                    aValue = getHierarchyValue(a, key),
                    bValue = getHierarchyValue(b, key);

                var is_numeric = !isNaN(+aValue - +bValue),
                    x = is_numeric ? +aValue : aValue,
                    y = is_numeric ? +bValue : bValue;

                if (!is_numeric) {
                    if (typeof x == "string") x = x.toLowerCase();
                    if (typeof y == "string") y = y.toLowerCase();
                }

                if (x < y) {
                    return direction == 0 ? -1 : 1;
                }

                if (x == y) {
                    return columns.length - 1 > index ? recursiveMultiSort(a, b, columns, order_by, index + 1) : 0;
                }

                return direction == 0 ? 1 : -1;
            }

            function getRowHeight(self) {
                return row_height == 0 ? self.options.rowHeight : row_height;
            }

            this.init = function () {
                var opts = this.options;

                // @Deprecated, 'rows'는 의미상 맞지 않아 차후 삭제
                opts.data = opts.rows != null ? opts.rows : opts.data;

                // 루트가 테이블일 경우, 별도 처리
                if (this.root.tagName == "TABLE") {
                    var $root = (0, _jquery2.default)(this.root).wrap("<div class='xtable'></div>");
                    this.root = $root.parent().get(0);
                }

                // 기본 설정
                createTableList(this);
                setCustomEvent(this);

                // 가로/세로 스크롤 설정
                setScrollEvent(this, opts.scrollWidth, opts.scrollHeight);

                // 멀티소트 이벤트 설정
                if (opts.msort && opts.sortEvent) {
                    setEventMultiSort(this);
                }

                // 데이터가 있을 경우
                if (opts.data) {
                    this.update(opts.data);
                }

                // 로딩 템플릿 체크 (opts.sortLoading으로 체크하지 않음)
                if (head.tpl["loading"] && modal != null) {
                    var $loading = (0, _jquery2.default)(head.tpl["loading"]());
                    (0, _jquery2.default)(this.root).append($loading);

                    ui_modal = modal($loading, {
                        target: this.selector,
                        opacity: 0.1,
                        autoHide: false
                    });

                    // 기본 로딩 시간 (ms)
                    opts.sortLoading = opts.sortLoading === true ? 500 : opts.sortLoading;
                }

                // 컬럼 리사이징 (기본)
                if (opts.resize) {
                    if (opts.scrollWidth > 0) {
                        setScrollWidthResize(this);
                    } else {
                        head.resizeColumns();
                        head.resize();
                    }
                }
            };

            this.render = function (isTree, isInit) {
                calculateRows(this, isTree);

                // 가상스크롤을 사용할 때, 데이터가 업데이트 될 경우에 대한 처리
                if (isInit === true && this.options.buffer == "vscroll") {
                    renderVirtualScroll(0);
                }

                this.next();
            };

            /**
             * @method select
             * Adds a selected class to a row at a specified index and gets an instance of the applicable row.
             *
             * @param {Integer} index
             * @return {RowObject} row
             */
            this.select = function (index) {
                if (select_row != null) {
                    (0, _jquery2.default)(select_row.element).removeClass("selected");
                }

                var row = this.get(index);
                select_row = row;

                if (row.element != null) {
                    (0, _jquery2.default)(row.element).addClass("selected");
                }

                return row;
            };

            /**
             * @method unselect
             * Removes a selected class from a selected row and gets an instance of the row in question.
             *
             * @return {RowObject} row
             */
            this.unselect = function () {
                if (select_row != null) {
                    (0, _jquery2.default)(select_row.element).removeClass("selected");
                    select_row = null;
                }
            };

            /**
             * @method update
             * Updates the list of rows or modifies the row at a specified index.
             *
             * @param {Array} rows
             */
            this.update = function (dataList) {
                this.reset();
                rows = createRows(dataList, 0, null);

                this.render(false, true);
                this.emit("update");
                head.emit("colresize");

                // 정렬 인덱스가 옵션에 있을 경우, 해당 인덱스의 컬럼 정렬 (not loading)
                if (this.options.sortIndex) {
                    if (this.options.sort) {
                        this.sort(this.options.sortIndex, this.options.sortOrder, true);
                    } else if (this.options.msort) {
                        this.msort(this.options.sortIndex, this.options.sortOrder, true);
                    }
                }
            };

            /**
             * @method updateTree
             * It is possible to configure a tree table using an object array with the index and data properties.
             *
             * @param {Array} rows
             */
            this.updateTree = function (tree) {
                this.reset();

                for (var i = 0; i < tree.length; i++) {
                    var pIndex = iParser.getParentIndex(tree[i].index);

                    if (pIndex == null) {
                        rows.push(createRows([tree[i].data], 0, null, tree[i].type)[0]);
                    } else {
                        var pRow = this.get(pIndex);

                        if (pRow) {
                            appendChildRows(pRow, tree[i].data, tree[i].type);
                        }
                    }
                }

                this.render(true, true);
                this.emit("updateTree");
            };

            /**
             * @method append
             * Add a row or a child row to at a specified index.
             *
             * @param {RowObject} row
             * @param {RowObject} row
             */
            this.append = function (index, data) {
                var row = this.get(index);

                if (row) {
                    appendChildRows(row, data);

                    this.clear();
                    this.render(true, true);
                    this.emit("append");
                }
            };

            /**
             * @method open
             * Shows a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.open = function (index) {
                // 로트 제외, 하위 모든 노드 대상
                var row = this.get(index);

                if (row) {
                    row.type = "open";

                    this.clear();
                    this.render(true);
                    this.emit("open", [row]);
                }
            };

            /**
             * @method fold
             * Hides a child row of a specified index.
             *
             * @param {Integer} index
             */
            this.fold = function (index) {
                var row = this.get(index);

                if (row) {
                    row.type = "fold";

                    this.clear();
                    this.render(true);
                    this.emit("fold", [row]);
                }
            };

            /**
             * @method openAll
             * Shows all child rows of a specified index.
             */
            this.openAll = function (index) {
                var list = [];

                this.findAll(index, list);

                if (list) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i].type = "open";
                    }

                    this.clear();
                    this.render(true);
                    this.emit("openall");
                }
            };

            /**
             * @method foldAll
             * Hides all child rows of a specified index.
             */
            this.foldAll = function (index) {
                var list = [];

                this.findAll(index, list);

                if (list) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i].type = "fold";
                    }

                    this.clear();
                    this.render(true);
                    this.emit("foldall");
                }
            };

            /**
             * @method next
             * Changes to the next page.
             */
            this.next = function () {
                var start = (page - 1) * this.options.bufferCount,
                    end = start + this.options.bufferCount;

                // 가상스크롤일 때만 처리
                if (this.options.buffer == "vscroll") {
                    body.reset();

                    if (vscroll_info.start_index < vscroll_info.end_index) {
                        start = vscroll_info.start_index;
                        end = vscroll_info.end_index;
                    }
                }

                // 마지막 페이지 처리
                end = end > t_rows.length ? t_rows.length : end;

                if (end <= t_rows.length) {
                    var tmpDataList = [];

                    for (var i = start; i < end; i++) {
                        var r = t_rows[i];

                        if (r) {
                            r.seq = i + 1;
                            r.reload(head.uit.getColumn(), null, xss_filter_keys);

                            tmpDataList.push(r);
                        }
                    }

                    body.append(tmpDataList);

                    // 가상스크롤이 아닐 경우에만 추가
                    if (this.options.buffer != "vscroll") {
                        this.emit("next", [page]);
                        if (tmpDataList.length > 0) page++;
                    }
                }

                // 최초에 한번만 row_height 구하기
                if (row_height == 0 && body.count() > 0) {
                    var row = body.get(0);

                    if (row && row.element) {
                        row_height = (0, _jquery2.default)(row.element).outerHeight();
                    }
                }
            };

            /**
             * @method page
             * Changes to the page of at a specified index.
             *
             * @param {Integer} index
             */
            this.page = function (pNo) {
                if (this.options.buffer == "scroll" || this.options.buffer == "vscroll") return false;

                if (this.getPage() == pNo) return false;

                this.clear();
                page = pNo < 1 ? 1 : pNo;
                this.render();
            };

            /**
             * @method sort
             * Moves a row iat a specified index to the target index.
             *
             * @param {Integer} index
             * @param {String} order  "asc" or "desc"
             */
            this.sort = function (index, order, isNotLoading, e) {
                // index는 컬럼 key 또는 컬럼 name
                if (!this.options.fields || !this.options.sort || this.options.msort || is_resize) return;

                var self = this,
                    column = head.getColumn(index);

                if (typeof column.name == "string") {
                    column.order = order ? order : column.order == "asc" || column.order == null ? "desc" : "asc";
                    head.uit.setColumn(index, column);

                    if (this.options.sortLoading && !isNotLoading) {
                        self.showLoading();

                        setTimeout(function () {
                            process();
                        }, this.options.sortLoading);
                    } else {
                        process();
                    }
                }

                // 소팅 후, 현재 소팅 상태 캐싱 처리
                if (this.options.sortCache) {
                    this.setOption({
                        sortIndex: column.index,
                        sortOrder: column.order
                    });
                }

                // 정렬 프로세싱 함수
                function process() {
                    rows.sort(function (a, b) {
                        return recursiveMultiSort(a.data, b.data, [column.name], [column.order], 0);
                    });

                    // 데이터 초기화 및 입력, 그리고 로딩
                    self.clear();
                    self.render(true);
                    self.emit("sortend", [column, e]);
                    self.hideLoading();
                }
            };

            /**
             * @method msort
             * Moves a row iat a specified index to the target index.
             *
             * @param {Array} index
             * @param {Array} order  "asc" or "desc"
             */
            this.msort = function (columns, order_by, isNotLoading) {
                if (!this.options.fields || !this.options.msort || this.options.sort) return;
                if (!_.typeCheck("array", columns) || !_.typeCheck("array", order_by) || columns.length != order_by.length) return;

                if (o_rows == null) o_rows = t_rows;else t_rows = o_rows;

                var self = this,
                    a_rows = t_rows.slice();

                if (this.options.sortLoading && !isNotLoading) {
                    self.showLoading();

                    setTimeout(function () {
                        process();
                    }, this.options.sortLoading);
                } else {
                    process();
                }

                // 소팅 후, 현재 소팅 상태 캐싱 처리
                if (this.options.sortCache) {
                    this.setOption({
                        sortIndex: columns,
                        sortOrder: order_by
                    });
                }

                function process() {
                    if (columns.length > 0) {
                        a_rows.sort(function (a, b) {
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
            };

            /**
             * @method filter
             * Filters columns at a specified to locate rows that contain keywords in the cell value.
             *
             * @param {Function} callback
             */
            this.filter = function (callback) {
                if (o_rows == null) o_rows = t_rows;else t_rows = o_rows;

                var a_rows = t_rows.slice(),
                    f_data = [];

                for (var i = 0, len = a_rows.length; i < len; i++) {
                    var d = a_rows[i].data;

                    if (typeof callback == "function" && callback(d) === true || !callback) {
                        f_data.push(d);
                    }
                }

                this.update(f_data);
                this.emit("filter", [f_data]);
                a_rows = null;
            };

            /**
             * @method rollback
             * Returns filtered rows to the original state.
             */
            this.rollback = function () {
                this.filter(null);
                o_rows = null;
            };

            /**
             * @method clear
             * Remove all row elements.
             */
            this.clear = function () {
                page = 1;
                body.uit.removeRows();
                body.scroll();
            };

            /**
             * @method clear
             * Remove all data
             */
            this.reset = function () {
                if (this.options.buffer == "vscroll") {
                    resetVirtualScrollInfo(this);
                }

                this.clear();

                rows = [];
                c_rows = [];
                t_rows = [];
                select_row = null;
            };

            /**
             * @method resize
             * Resets the inner scroll and columns of a table.
             */
            this.resize = function () {
                head.resizeColumns();
                head.resize();
                head.emit("colresize");
            };

            /**
             * @method scrollWidth
             * Sets the scroll based on the width of a table.
             *
             * @param {Integer} width
             */
            this.scrollWidth = function (scrollWidth, isInit) {
                // 최초에 스크롤 넓이가 설정되있어야만 메소드 사용 가능
                if (this.options.scrollWidth == 0) return;

                var width = this.options.width;

                if (width > 0) {
                    var w = scrollWidth >= width ? scrollWidth - getScrollBarWidth(this) : width;
                    (0, _jquery2.default)(this.root).outerWidth(w);
                } else {
                    (0, _jquery2.default)(this.root).outerWidth(scrollWidth - getScrollBarWidth(this));
                }

                if (scrollWidth > 0) {
                    var originWidth = (0, _jquery2.default)(this.root).outerWidth();
                    (0, _jquery2.default)(this.root).outerWidth(scrollWidth);

                    if (isInit) {
                        (0, _jquery2.default)(head.root).outerWidth(originWidth + getScrollBarWidth(this));
                        (0, _jquery2.default)(body.root).outerWidth(originWidth);

                        reloadScrollWidthResizeBar(1000);
                    }

                    (0, _jquery2.default)(head.root).parent().css("max-width", scrollWidth);
                    (0, _jquery2.default)(body.root).parent().css("max-width", scrollWidth);
                }
            };

            /**
             * @method scrollHeight
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer} height
             */
            this.scrollHeight = function (h) {
                if (this.options.buffer == "page") return;

                (0, _jquery2.default)(this.root).find(".body").css("max-height", h + "px").scrollTop(0);
                this.setOption("scrollHeight", h);

                // 기존의 로우 그릴 수 있는 형태로 계산하기
                calculateRows(this, true);

                // 가상스크롤 위치 초기화
                if (this.options.buffer == "vscroll") {
                    renderVirtualScroll(0);
                }

                this.next();
            };

            /**
             * @method scrollTop
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer|String} index
             * @param {Integer} dist
             */
            this.scrollTop = function (index, dist) {
                if (this.options.buffer != "vscroll") return;

                var $viewport = (0, _jquery2.default)(this.root).children(".body");

                // 기존의 로우 그릴 수 있는 형태로 계산하기
                calculateRows(this, true);

                for (var i = 0, len = t_rows.length; i < len; i++) {
                    var row = t_rows[i];

                    if ("" + index == row.index) {
                        var scrollTop = i * vscroll_info.height,
                            scrollHeight = $viewport.height(),
                            distTop = _.typeCheck("integer", dist) ? dist : 0;

                        if (scrollTop + distTop > scrollHeight) {
                            scrollTop += distTop;
                        }

                        $viewport.scrollTop(scrollTop);
                        this.clear();
                        this.next();

                        break;
                    }
                }
            };

            /**
             * @deprecated
             * @method height
             * Sets the scroll based on the height of a table.
             *
             * @param {Integer} height
             */
            this.height = function (h) {
                this.scrollHeight(h);
            };

            /**
             * @method size
             * Gets the size of all the rows of a table.
             *
             * @return {Integer} size
             */
            this.size = function () {
                // 차후 수정 (컬럼 * 로우 개수 * 바이트)
                return rows.length;
            };

            /**
             * @method count
             * Gets the number of trows of a table.
             *
             * @return {Integer} count
             */
            this.count = function () {
                return rows.length;
            };

            /**
             * @method list
             * Gets all the rows of a table.
             *
             * @return {Array} rows
             */
            this.list = function () {
                return rows;
            };

            /**
             * @method listColumn
             * Gets all columns.
             *
             * @return {Array} columns
             */
            this.listColumn = function () {
                return head.listColumn();
            };

            /**
             * @method listData
             * Gets the data of all the rows of a table.
             *
             * @return {Array} datas
             */
            this.listData = function () {
                var datas = [];

                for (var i = 0; i < rows.length; i++) {
                    datas.push(rows[i].data);
                }

                return datas;
            };

            /**
             * @method get
             * Gets the row at the specified index.
             *
             * @param {Integer|String} index
             * @return {RowObject} row
             */
            this.get = function (index) {
                if (index == null) {
                    return null;
                } else {
                    var row = c_rows[index];

                    if (!row) {
                        var keys = iParser.getIndexList(index),
                            row = c_rows[keys[0]];

                        for (var i = 1, len = keys.length; i < len; i++) {
                            if (!row) break;
                            row = row.children[keys[i]];
                        }

                        return row;
                    } else {
                        return row;
                    }
                }
            };

            /**
             * @method findAll
             * Gets all rows of at the specified index including child rows.
             *
             * @param {Integer} index
             * @param {Array} result
             */
            this.findAll = function (index, _result) {
                var row = this.get(index);

                if (row != null) {
                    if (!_.typeCheck("array", _result)) {
                        _result = [row];
                    }

                    for (var i = 0; i < row.children.length; i++) {
                        var child = row.children[i];
                        _result.push(child);

                        if (child.children.length > 0) {
                            this.findAll(child.index, _result);
                        }
                    }
                }
            };

            /**
             * @method getColumn
             * Gets the column at the specified index.
             *
             * @param {"Integer"/"String"} key index or column key
             * @return {ColumnObject} column
             */
            this.getColumn = function (index) {
                return head.getColumn(index);
            };

            /**
             * @method getData
             * Gets the data at the specified index.
             *
             * @param {"Integer"/"String"} key index
             * @return {ColumnObject} data
             */
            this.getData = function (index) {
                var row = this.get(index);
                return row ? row.data : null;
            };

            /**
             * @method showColumn
             * Shows the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.showColumn = function (index) {
                head.showColumn(index);
            };

            /**
             * @method hideColumn
             * Hides the column index (or column name).
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.hideColumn = function (index) {
                head.hideColumn(index);
            };

            /**
             * @method initColumns
             * It is possible to determine the index or name of the column to be shown in an array.
             *
             * @param {"Integer"/"String"} key index or column name
             */
            this.initColumns = function (keys) {
                head.initColumns(keys);
                body.initColumns(keys);
                head.emit("colresize");
            };

            /**
             * @method showColumnMenu
             * Shows the Show/Hide Column menu at specified coordinates.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.showColumnMenu = function (x, y) {
                head.showColumnMenu(x, y);
            };

            /**
             * @method hideColumnMenu
             * Hides the Show/Hide Column menu.
             */
            this.hideColumnMenu = function () {
                head.hideColumnMenu();
            };

            /**
             * @method toggleColumnMenu
             * Shows or hides the Show/Hide Column menu.
             *
             * @param {Integer} x
             * @param {Integer} y
             */
            this.toggleColumnMenu = function (x, y) {
                head.toggleColumnMenu(x, y);
            };

            /**
             * @method showExpand
             * Shows the extended row area of a specified index.
             *
             * @param {Integer} index
             */
            this.showExpand = function (index, obj) {
                body.showExpand(index, obj);
            };

            /**
             * @method hideExpand
             * Hides the extended row area of a specified index.
             */
            this.hideExpand = function (index) {
                if (index) body.hideExpand(index);else body.hideExpand();
            };

            /**
             * @method getExpand
             * Get a row in which the extended area is currently activated.
             *
             * @return {RowObject} row
             */
            this.getExpand = function () {
                return body.getExpand();
            };

            /**
             * @method showLoading
             * Shows the loading screen for the specified delay time.
             *
             * @param {Integer} delay
             */
            this.showLoading = function (delay) {
                if (!ui_modal || is_loading) return;

                ui_modal.show();
                is_loading = true;

                if (delay > 0) {
                    var self = this;

                    setTimeout(function () {
                        self.hideLoading();
                    }, delay);
                }
            };

            /**
             * @method hideLoading
             * Hides the loading screen.
             */
            this.hideLoading = function () {
                if (!ui_modal || !is_loading) return;

                ui_modal.hide();
                is_loading = false;
            };

            /**
             * @method isLoading
             */
            this.isLoading = function () {
                return is_loading;
            };

            /**
             * @method setCsv
             * Updates a table using a CVS string.
             */
            this.setCsv = function (csv) {
                var opts = this.options;
                if (!opts.fields && !opts.csv) return;

                var fields = _.getCsvFields(opts.fields, opts.csv),
                    csvNumber = opts.csvNumber ? _.getCsvFields(opts.fields, opts.csvNumber) : null;

                this.update(_.csvToData(fields, csv, csvNumber));
            };

            /**
             * @method setCsvFile
             * Updates a table using a CVS file.
             */
            this.setCsvFile = function (file) {
                if (!this.options.fields && !this.options.csv) return;

                var self = this;
                _.fileToCsv(file, function (csv) {
                    self.setCsv(csv);
                });
            };

            /**
             * @method getCsv
             * Gets the data of a table as a CSV string.
             *
             * @param {Boolean} isTree
             * @return {String} csv
             */
            this.getCsv = function () {
                if (!this.options.fields && !this.options.csv) return;

                var fields = _.getCsvFields(this.options.fields, this.options.csv),
                    len = rows.length > this.options.csvCount ? this.options.csvCount : rows.length;

                return _.dataToCsv2({
                    fields: fields,
                    rows: this.listData(),
                    count: len,
                    names: this.options.csvNames
                });
            };

            /**
             * @method getCsvBase64
             * Gets the data of a table as a CSV string encoded as base64.
             *
             * @param {Boolean} isTree
             * @return {String} base64
             */
            this.getCsvBase64 = function () {
                if (!this.options.fields && !this.options.csv) return;

                return _.csvToBase64(this.getCsv());
            };

            /**
             * @method downloadCsv
             * Downloads the data of a table as a CSV file.
             *
             * @param {String} name
             * @param {Boolean} isTree
             */
            this.downloadCsv = function (name) {
                if (_.typeCheck("string", name)) {
                    name = name.split(".")[0];
                }

                var a = document.createElement('a');
                a.download = name ? name + ".csv" : "table.csv";
                a.href = this.getCsvBase64();

                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
            };

            /**
             * @method rowFunc
             * Ir is possible to use a function for all row data applicable to the column (or column name) of a specified column (or column name). Currently only SUM and AVG are supported.
             *
             * @param {"sum"/"svg"} funcType
             * @param {Integer} columnIndex
             * @param {Function} callback
             */
            this.rowFunc = function (type, index, callback) {
                if (!this.options.fields) return;

                var isCallback = typeof callback == "function" ? true : false;
                var result = 0,
                    count = isCallback ? 0 : rows.length,
                    column = head.getColumn(index);

                if (column.name) {
                    for (var i = 0; i < rows.length; i++) {
                        var data = rows[i].data,
                            value = data[column.name];

                        if (!isNaN(value)) {
                            if (isCallback) {
                                if (callback(rows[i])) {
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
                if (type == "sum") return result;else if (type == "avg") return result / count;

                return null;
            };

            /**
             * @method getPage
             * Gets the current page of a table.
             *
             * @return {Integer} page
             */
            this.getPage = function () {
                return page - 1;
            };

            /**
             * @method activeIndex
             * Gets the index of a row that is activated in an extended/modified/selected state.
             *
             * @return {Integer} index
             */
            this.activeIndex = function () {
                if (!select_row) return null;
                return select_row.index;
            };

            /**
             * @method setTpl
             */
            this.setTpl = function (name, html) {
                head.setTpl(name, html);
            };
        };

        UI.setup = function () {
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
            };
        };

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
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function now() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

module.exports = throttle;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _main = __webpack_require__(5);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "ui.modal",
    extend: "event",
    component: function component() {
        var _ = _main2.default.include("util.base");

        var win_width = 0;
        var win_height = 0;

        _.resize(function () {
            if (win_width == (0, _jquery2.default)(window).width() && win_height == (0, _jquery2.default)(window).height()) return;

            var call_list = _main2.default.get("ui.modal");
            for (var i = 0; i < call_list.length; i++) {
                var ui_list = call_list[i];

                for (var j = 0; j < ui_list.length; j++) {
                    if (ui_list[j].type == "show") {
                        ui_list[j].resize();
                    }
                }
            }

            win_width = (0, _jquery2.default)(window).width();
            win_height = (0, _jquery2.default)(window).height();
        }, 300);

        var UI = function UI() {
            var $modal = {},
                $clone = null;
            var uiObj = null,
                uiTarget = null;
            var z_index = 5000;

            function setPrevStatus(self) {
                uiObj = {
                    "position": (0, _jquery2.default)(self.root).css("position"),
                    "left": (0, _jquery2.default)(self.root).css("left"),
                    "top": (0, _jquery2.default)(self.root).css("top"),
                    "z-index": (0, _jquery2.default)(self.root).css("z-index"),
                    "display": (0, _jquery2.default)(self.root).css("display")
                };

                uiTarget = {
                    "position": (0, _jquery2.default)(self.options.target).css("position")
                };
            }

            function getInnerModalPosition(target) {
                if (target == "body") {
                    return null;
                } else {
                    if ((0, _jquery2.default)(target).hasClass("msgbox") || (0, _jquery2.default)(target).hasClass("window")) {
                        return "absolute";
                    } else {
                        return "relative";
                    }
                }
            }

            function getModalInfo(self) {
                var target = self.options.target,
                    hTarget = target == "body" ? window : target,
                    pos = target == "body" ? "fixed" : "absolute",
                    tPos = getInnerModalPosition(target),
                    sLeft = (0, _jquery2.default)(target).scrollLeft();

                var x = (0, _jquery2.default)(hTarget).width() / 2 - (0, _jquery2.default)(self.root).width() / 2 + (0, _jquery2.default)(target).scrollLeft(),
                    y = (0, _jquery2.default)(hTarget).height() / 2 - (0, _jquery2.default)(self.root).height() / 2;

                var w = sLeft > 0 ? (0, _jquery2.default)(target).outerWidth() + sLeft : "100%",
                    h = (0, _jquery2.default)(target).outerHeight();

                // inner modal일 경우
                if (tPos != null) {
                    var sh = (0, _jquery2.default)(hTarget)[0].scrollHeight;

                    h = sh > h ? sh : h;
                    y = y + (0, _jquery2.default)(hTarget).scrollTop();

                    // global modal일 경우
                } else {
                    var sh = (0, _jquery2.default)(window).outerHeight();

                    h = h > sh ? h : sh;
                }

                return {
                    x: x, y: y, pos: pos, tPos: tPos, w: w, h: h
                };
            }

            function createModal(self, w, h) {
                var opts = self.options,
                    mi = self.timestamp,
                    parent = opts.parent != null ? opts.parent : opts.target;

                if ($modal[mi] != null) return;

                $modal[mi] = (0, _jquery2.default)("<div id='MODAL_" + self.timestamp + "'></div>").css({
                    position: "absolute",
                    width: w,
                    height: h,
                    left: 0,
                    top: 0,
                    opacity: self.options.opacity,
                    "background-color": self.options.color,
                    "z-index": z_index + self.options.index - 1
                });

                // 모달 추가
                (0, _jquery2.default)(parent).append($modal[mi]);

                // 루트 모달 옆으로 이동
                (0, _jquery2.default)(self.root).insertAfter($modal[mi]);

                // 모달 닫기 이벤트 걸기
                self.addEvent($modal[mi], "click", function (e) {
                    if (self.options.autoHide) {
                        self.hide();
                    }

                    return false;
                });
            }

            this.init = function () {
                setPrevStatus(this); // 이전 상태 저장

                // 대상의 기본 상태는 숨기기
                if (!this.options.clone) {
                    (0, _jquery2.default)(this.root).hide();
                }

                // 타입 프로퍼티 설정
                this.type = "hide";
            };

            /**
             * @method hide
             * Hides a modal
             */
            this.hide = function () {
                var opts = this.options,
                    mi = this.timestamp;

                // 모달 대상 객체가 숨겨진 상태가 아닐 경우..
                if (opts.clone) {
                    $clone.remove();
                    $clone = null;
                }

                (0, _jquery2.default)(opts.target).css("position", uiTarget.position);
                (0, _jquery2.default)(this.root).css(uiObj);

                if ($modal[mi]) {
                    $modal[mi].remove();
                    delete $modal[mi];
                }

                this.type = "hide";
            };

            /**
             * @method show
             * Shows a modal
             */
            this.show = function () {
                var opts = this.options,
                    info = getModalInfo(this);

                // 모달 대상 객체가 숨겨진 상태가 아닐 경우..
                if (opts.clone) {
                    $clone = (0, _jquery2.default)(this.root).clone();
                    $clone.insertAfter((0, _jquery2.default)(this.root));
                }

                // 위치 재조정
                (0, _jquery2.default)(this.root).appendTo(opts.target);
                this.resize();

                (0, _jquery2.default)(opts.target).css("position", info.tPos);
                (0, _jquery2.default)(this.root).show();

                createModal(this, info.w, info.h);
                this.type = "show";
            };

            /**
             * @method resize
             * Re-adjust the location of a modal
             */
            this.resize = function () {
                var info = getModalInfo(this),
                    mi = this.timestamp;

                (0, _jquery2.default)(this.root).css({
                    "position": info.pos,
                    "left": info.x,
                    "top": info.y,
                    "z-index": z_index + this.options.index
                });

                if ($modal[mi] != null) {
                    $modal[mi].height(info.h);
                }
            };
        };

        UI.setup = function () {
            return {
                /**
                 * @cfg {"black"/"gray"} [color="black"]
                 * Determines the color of a modal
                 */
                color: "black",

                /**
                 * @cfg {Float} [opacity=0.4]
                 * Sets the transparency of a modal
                 */
                opacity: 0.4,

                /**
                 * @cfg {String/DOMElement} [target="body"]
                 * Sets a selector on which a modal is shown
                 */
                target: "body",

                /**
                 * @cfg {String/DOMElement} [target="body"]
                 * Sets a selector on which a modal is shown
                 */
                parent: null,

                /**
                 * @cfg {Integer} [index=0]
                 * Determines the sequence (index) of a modal
                 */
                index: 0,

                /**
                 * @cfg {Boolean} [clone=false]
                 * Copies an existing modal and shows it
                 */
                clone: false,

                /**
                 * @cfg {Boolean} [autoHide=true]
                 * Automatically hides a modal when clicking on it
                 */
                autoHide: true
            };
        };

        return UI;
    }
};

/***/ })
/******/ ]);