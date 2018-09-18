## Installation

### NPM
```bash
npm install juijs-grid
```

### Browser

```html
<link rel="stylesheet" href="../dist/jui-grid.classic.css" />
<script src="../dist/vendors.js"></script>
<script src="../dist/jui-grid.js"></script>
```

### ES Modules

The difference with the existing method is that you need to add the module directly using the 'use' function.

```js
import jui from 'juijs-grid'
import TableComp from 'juijs-grid/src/components/table.js'
import Styles from './index.less'

jui.use(TableComp);
```

Below is the index.less file. You can only use the style you want to bundle.

```less
.jui {
  @import "../node_modules/juijs-grid/src/styles/base/mixins.less";
  @import "../node_modules/juijs-grid/src/styles/common.less";
  @import "../node_modules/juijs-grid/src/styles/common.theme.less";
  @import "../node_modules/juijs-grid/src/styles/table.less";
  @import "../node_modules/juijs-grid/src/styles/table.theme.less";
  @import "../node_modules/juijs-grid/src/styles/theme/classic.less";
}
```

## Usage

```html
<body class="jui">
    <table id="table" class="table expand" style="width: 1024px;">
      <thead>
      <tr>
          <th></th>
          <th>Min</th>
          <th>Max</th>
          <th>Count</th>
          <th>Hash</th>
          <th>Failure</th>
          <th>SumTime</th>
          <th>AvgTime</th>
          <th>Name</th>
      </tr>
      </thead>
      <tbody>
      </tbody>
  </table>
  <script data-jui="#table" data-tpl="row" type="text/template">
    <tr>
        <td><!= row.seq !></td>
        <td><!= row.data["min,m"] !></td>
        <td><!= max !> <i class="icon-edit"></i></td>
        <td><!= count !></td>
        <td><!= hash !></td>
        <td><!= failure !></td>
        <td><!= sumTime !></td>
        <td><!= avgTime !></td>
        <td><!= name !></td>
    </tr>
  </script>
</body>
```

The UI component creation code is the same as the existing one.

```js
var table_data = [
    {"min,m":0,"max":21.55,"count":1,"sumCpu":0,"hash":1495461794,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":77.66,"sumTime":21.55,"name":"","avgTime":21.55,"success":0},
    {"min,m":1,"max":1.683,"count":32,"sumCpu":0,"hash":-1976684343,"sd":0.379,"tpmc":0,"avgCpu":0,"failure":27,"rate":16.321,"sumTime":4.529,"name":"/dup.jsp","avgTime":0.142,"success":5},
    {"min,m":2,"max":0.273,"count":8,"sumCpu":0,"hash":1886515434,"sd":0.068,"tpmc":0,"avgCpu":0,"failure":0,"rate":4.544,"sumTime":1.261,"name":"/oraclesql2.jsp","avgTime":0.158,"success":8},
    {"min,m":3,"max":0.014,"count":1,"sumCpu":0,"hash":1887438955,"sd":0,"tpmc":0,"avgCpu":0,"failure":1,"rate":0.05,"sumTime":0.014,"name":"/oraclesql3.jsp","avgTime":0.014,"success":0}
];

jui.ready([ "grid.table" ], function(table) {
    var obj = table("#table", {
        fields: [ null, "min,m", "max", "count", "hash", "failure", "sumTime", "avgTime", "name" ],
        sort: true,
        resize: true,
        scroll: true,
        scrollHeight: 200
    });
    
    obj.update(table_data);
});
```
