import $ from "jquery"
import jui from "../main.js"

export default {
    name: "grid.column",
    component: function () {
        var Column = function(index) {
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

            this.hide = function() {
                this.type = "hide";
                $(this.element).hide();
            }

            this.show = function() {
                this.type = "show";
                $(this.element).show();
            }
        }

        return Column;
    }
}