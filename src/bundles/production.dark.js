require('../styles/main.less')
require('../styles/theme/dark.less')

import jui from '../jui-grid.js'
import TableComp from '../components/table.js'
import XTableComp from '../components/xtable.js'

jui.use(TableComp, XTableComp);
window.jui = window.JUI = jui;