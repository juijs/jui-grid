import jui from '../src/main.js'
import TableComp from '../src/components/table.js'
import XTableComp from '../src/components/xtable.js'

jui.use(TableComp, XTableComp);

if(typeof(window) == "object") {
    window.jui = window.JUI = jui;
}