import jui from '../src/main.js'
import TableComp from '../src/components/table.js'
import XTableComp from '../src/components/xtable.js'

jui.use(TableComp, XTableComp);
window.jui = window.JUI = jui;