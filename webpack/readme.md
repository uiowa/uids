# Webpack UIDS build

The purpose of this webpack addition is to ingest the existing UIDS source sass files, wrap in a namespace to avoid collisions, and allow for es6 js imports.
This will allow external applications that typically use webpack and have other external constraints to use

1. npm run build:prod or build:dev
2. creates a build in 'build' folder in the location of your choices
3. the generated css is namespaced uids so prepend your code with uids to get the styling.
4. the included javascript is namespaced uidsUtils.{component}

## Features:
### Nav bar
The Navbar utilizes the navbar.js which is included in the uids.js

// target is a id on the element you want to dropDow
`uidsUtils.navbar.dropDown('target')`

```
    <div class="dropdown">
        <a class="dropbtn" href="javascript:void(0);" onclick="uidsUtils.navbar.dropDown('target')">
            <span class=""> user <i class="fa fa-caret-down"></i></span>
        </a>
        <div class="dropdown-content" id="target">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
    </div>
```

`uidsUtils.navbar.menuToggle()`

```
  <div class="toggle">
      <a href="javascript:void(0);" class="icon" onclick="uidsUtils.navbar.menuToggle()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
```
