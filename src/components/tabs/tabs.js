/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*   This software or document includes material copied from or derived from
*   https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
*/
(function () {
  // For easy reference.
  let keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46
  };

  // Add or subtract depending on key pressed.
  let direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };

  // Select all 'Tabs' components.
  let tabs_elements = document.querySelectorAll('.tabs');
  // Define tabs_array_dict for later use.
  let tabs_array_dict = [];
  // this delay could be set by a function later if ever needed.
  let delay = 0;

  function Tabs() {
    // Generate array of Tabs elements dictionaries.
    // This way we have any Tabs component data at any time.
    this.generateArrays();
    // Functionally guarantee that no tabs have any control naming collision.
    this.distinctifyTabs();
    // Bind listeners
    this.addListeners();
  }

  // THis function generates the array of Tabs elements dictionaries.
  Tabs.prototype.generateArrays = function() {
    // For each .tabs element...
    tabs_elements.forEach(function(item, index) {
      // Give it a distinct ID...
      item.id = 'tabs--' + index;
      // Query the necessary nodelists from them...
      let tablist = item.querySelectorAll('[role="tablist"]')[0];
      let tabs = item.querySelectorAll('[role="tab"]');
      let panels = item.querySelectorAll('[role="tabpanel"]');
      // Put all of them in to an indexable dictionary and push that to the tabs_array_dict array.
      tabs_array_dict.push(
        {
          tablist: tablist,
          tabs:    tabs,
          panels:  panels
        }
      );
    });
  };

  // This function guarantees that no tabs have any control naming collision.
  Tabs.prototype.distinctifyTabs = function() {
    // For each Tabs component in the tabs_array_dict...
    tabs_array_dict.forEach(function(tabgroup, tabgroupIndex) {
      // For each tab defined in that component...
      tabgroup.tabs.forEach(function(tab) {
        // Give it an ID prefix based upon the Order the currentTab component is in the DOM.
        tab.id = 'tabgroup--' + tabgroupIndex + '-' + tab.id;
        // Make sure the Reference to the Panel it is linked to also has the prefix.
        tab.setAttribute('aria-controls','tabgroup--' + tabgroupIndex + '-' + tab.getAttribute('aria-controls'));
      });

      // For each panel defined in that component...
      tabgroup.panels.forEach(function(panel) {
        // Give it an ID prefix based upon the Order the currentTab component is in the DOM.
        panel.id = 'tabgroup--' + tabgroupIndex + '-' + panel.id;
        // Make sure the reference to the Tab it is linked to also has the prefix.
        panel.setAttribute('aria-labelledby','tabgroup--' + tabgroupIndex + '-' + panel.getAttribute('aria-labelledby'));
      });
    });
  };

  // This function adds listeners for events to every tab.
  Tabs.prototype.addListeners = function() {
    // For each Tabs component in the tabs_array_dict...
    tabs_array_dict.forEach(function(item) {
      // Set listeneners for all three necessary event types.
      let tabs = item.tabs;
      for (let i = 0; i < item.tabs.length; ++i) {
        tabs[i].addEventListener('click', clickEventListener);
        tabs[i].addEventListener('keydown', keydownEventListener);
        tabs[i].addEventListener('keyup', keyupEventListener);

        // Build an array with all tabs (<button>s) in it.
        tabs[i].index = i;
      }
    });
  };

  // When a tab is clicked, activateTab is fired to activate it.
  function clickEventListener(event) {
    let tab = event.target;
    activateTab(tab, false);
  }

  // This function activates any given tab panel.
  function activateTab(tab, setFocus) {
    setFocus = setFocus || true;
    let parent = tab.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    // Deactivate all other tabs.
    deactivateTabs(tab_group_id);

    // Remove tabindex attribute.
    tab.removeAttribute('tabindex');

    // Set the tab as selected.
    tab.setAttribute('aria-selected', 'true');

    // Get the value of aria-controls (which is an ID).
    let controls = tab.getAttribute('aria-controls');

    // Remove hidden attribute from tab panel to make it visible.
    document.getElementById(controls).removeAttribute('hidden');

    // Set focus when required.
    if (setFocus) {
      tab.focus();
    }
  }

  // Deactivate all tabs and tab panels.
  function deactivateTabs(tab_group_id) {
      // Get the necessary tabs nodelist.
      let tabs = tabs_array_dict[tab_group_id].tabs;
      // For each tab in tabs...
      for (let t = 0; t < tabs.length; t++) {
        // Remove the necessary accessibility attributes.
        tabs[t].setAttribute('tabindex', '-1');
        tabs[t].setAttribute('aria-selected', 'false');
        tabs[t].removeEventListener('focus', focusEventHandler);
      }

      // Get the necessary panels nodelist.
      let panels = tabs_array_dict[tab_group_id].panels;
      // For each panel in panels...
      for (let p = 0; p < panels.length; p++) {
        // Set the hidden attribute so that it cant be seen.
        panels[p].setAttribute('hidden', 'hidden');
      }
  }

  // This function will, on an event, check if the event target needs to be focused.
  function focusEventHandler(event) {
    let target = event.target;
    setTimeout(checkTabFocus, delay, target);
  }

  // Only activate tab on focus if it still has focus after the delay.
  function checkTabFocus(target) {
    let focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    }
  }

  // Handle keydown on tabs.
  function keydownEventListener(event) {
    let key = event.keyCode;
    // Get the tab_group_id for later use.
    let parent = event.target.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    // Get the correct tabs nodelist.
    let tabs = tabs_array_dict[tab_group_id].tabs;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab.
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab.
        activateTab(tabs[0]);
        break;

      // Up and down are in keydown.
      // Because we need to prevent page scroll.
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    }
  }

  // Handle keyup on tabs.
  function keyupEventListener(event) {
    let key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
    }
  }

  // When a tablist's aria-orientation is set to vertical,
  // only up and down arrow should function.
  // In all other cases only left and right arrow function.
  function determineOrientation(event) {
    let key = event.keyCode;
    // Get the tab_group_id for later use.
    let parent = event.target.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    // Get the correct tablist nodelist.
    let tablist = tabs_array_dict[tab_group_id].tablist;
    // Determine the tab orientation.
    let vertical = tablist.getAttribute('aria-orientation') === 'vertical';
    let proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      }
    }
    else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      }
    }

    if (proceed) {
      switchTabOnArrowPress(event);
    }
  }

  // Either focus the next, previous, first, or last tab
  // depening on key pressed
  function switchTabOnArrowPress(event) {
    let pressed = event.keyCode;
    // Get the tab_group_id for later use.
    let parent = event.target.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    // Get the correct tabs nodelist.
    let tabs = tabs_array_dict[tab_group_id].tabs;

    // For each tab in tabs...
    for (let x = 0; x < tabs.length; x++) {
      // Add a focus event handler.
      tabs[x].addEventListener('focus', focusEventHandler);
    }

    // If a pressed key is in the direction array.
    if (direction[pressed]) {
      // Focus the necessary tab...
      let target = event.target;
      if (target.index !== undefined) {
        // Left or right if just the left or right arrow key.
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        // Or the last tab if...
        // The left-most tab was focused and the left arrow was pressed...
        // OR...
        // The top-most tab was focused and the up arrow was pressed...
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab(tabs);
        }
        // Or the first tab if...
        // The right-most tab was focused and the right arrow was pressed...
        // OR...
        // The bottom-most tab was focused and the down arrow was pressed...
        else if (pressed === keys.right || pressed === keys.down) {
          focusFirstTab(tabs);
        }
      }
    }
  }

  // This function focuses the first tab in a tabs nodelist.
  function focusFirstTab(tabs) {
    tabs[0].focus();
  }

  // This function focuses the last tab in a tabs nodelist.
  function focusLastTab(tabs) {
    tabs[tabs.length - 1].focus();
  }

  // Create an object to avoid collision.
  window.UidsTabs = Tabs;
  // Instantiate the object.
  new UidsTabs();
}());
