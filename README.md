## Getting Started

#### Loading resources
JUI library only requires the user to load a single package file.
Access to the jui class must then be configured in the markup.
```html
<link rel="stylesheet" href="dist/grid.min.css" />
<link rel="stylesheet" href="dist/grid-jennifer.min.css" />
<body class="jui">...</body>
```

As the script works only with jQuery 1.8 or higher, it is necessary to load the jQuery library first.
```html
<script src="lib/jquery-1.8.0.min.js"></script>
<script src="lib/core.min.js"></script>
<script src="dist/grid.min.js"></script>
```

#### Installing in command
```
npm install juijs-grid
bower install juijs-grid
jamjs install juijs-grid
```

#### To build the project
Build using a grunt in JUI Library
```
grunt       // Build all processes
grunt js    // Merge and Minifiy JavaScript files
grunt css   // Compile LESS files
grunt test  // Unit Tests
```
After the build output is shown below.
```
dist/grid.js
dist/grid.min.js
dist/grid.css
dist/grid.min.css
dist/grid-jennifer.css
dist/grid-jennifer.min.css
dist/grid-dark.css
dist/grid-dark.min.css
```

## Documentation

##### http://jui.io
##### http://uiplay.jui.io

## Maintainers

Created by Alvin and Jayden, Yoha

## License

MIT License 

Copyright (C) 2016 (```JenniferSoft Inc.```)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
