# Webpack UIDS build

a build with this will create a

1. npm run build:prod or build:dev
2. creates a build in 'build' folder
3. the generated css is namespaced uids so prepend your code with uids to get the styling.
4. the included javascript is namespaced uidsUtils.

## Features:
### Nav bar
The Navbar utilizes the navbar.js which is included in the uids.js

// target is a id on the element you want to dropDow
`uidsUtils.dropDown('target')`

```
    <div class="dropdown">
        <a class="dropbtn" href="javascript:void(0);" onclick="uidsUtils.dropDown('target')">
            <span class=""> user <i class="fa fa-caret-down"></i></span>
        </a>
        <div class="dropdown-content" id="target">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
    </div>
```

`uidsUtils.menuToggle()`

```
  <div class="toggle">
      <a href="javascript:void(0);" class="icon" onclick="uidsUtils.menuToggle()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
```
