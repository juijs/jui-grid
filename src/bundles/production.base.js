import jui from '../main.js'
import TableComp from '../components/table.js'
import XTableComp from '../components/xtable.js'

jui.use(TableComp, XTableComp);
window.jui = window.JUI = jui;