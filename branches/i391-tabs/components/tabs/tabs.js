/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*   This software or document includes material copied from or derived from
*   https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
*/
(function () {
  // For easy reference
  let keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46
  };

  // Add or substract depending on key pressed
  let direction = {
    37: -1,
    38: -1,
    39: 1,
    40: 1
  };
  let tabs_elements = document.querySelectorAll('.tabs');
  let tabs_array_dict = [];
  let delay = 0;

  generateArrays();

  function generateArrays () {
    tabs_elements.forEach(function(item, index) {
      item.id = 'tabs--' + index;
      let tablist = item.querySelectorAll('[role="tablist"]')[0];
      let tabs = item.querySelectorAll('[role="tab"]');
      let panels = item.querySelectorAll('[role="tabpanel"]');
      tabs_array_dict.push(
        {
          tablist: tablist,
          tabs:    tabs,
          panels:  panels
        }
      );
    });
  }

  // Bind listeners
  addListeners();

  function addListeners() {
    tabs_array_dict.forEach(function(item) {
      let tabs = item.tabs;
      for (let i = 0; i < item.tabs.length; ++i) {
        tabs[i].addEventListener('click', clickEventListener);
        tabs[i].addEventListener('keydown', keydownEventListener);
        tabs[i].addEventListener('keyup', keyupEventListener);

        // Build an array with all tabs (<button>s) in it
        tabs[i].index = i;
      }
    });
  }

  // When a tab is clicked, activateTab is fired to activate it
  function clickEventListener (event) {
    let tab = event.target;
    activateTab(tab, false);
  }

  // Activates any given tab panel
  function activateTab (tab, setFocus) {
    setFocus = setFocus || true;
    let parent = tab.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    // Deactivate all other tabs
    deactivateTabs(tab_group_id);

    // Remove tabindex attribute
    tab.removeAttribute('tabindex');

    // Set the tab as selected
    tab.setAttribute('aria-selected', 'true');

    // Get the value of aria-controls (which is an ID)
    let controls = tab.getAttribute('aria-controls');

    // Remove hidden attribute from tab panel to make it visible
    document.getElementById(controls).removeAttribute('hidden');

    // Set focus when required
    if (setFocus) {
      tab.focus();
    }
  }
  // Deactivate all tabs and tab panels
  function deactivateTabs (tab_group_id) {
      let tabs = tabs_array_dict[tab_group_id].tabs;
      for (let t = 0; t < tabs.length; t++) {
        tabs[t].setAttribute('tabindex', '-1');
        tabs[t].setAttribute('aria-selected', 'false');
        tabs[t].removeEventListener('focus', focusEventHandler);
      }

      let panels = tabs_array_dict[tab_group_id].panels;
      for (let p = 0; p < panels.length; p++) {
        panels[p].setAttribute('hidden', 'hidden');
      }
  }

  function focusEventHandler (event) {
    let target = event.target;

    setTimeout(checkTabFocus, delay, target);
  }

  // Only activate tab on focus if it still has focus after the delay
  function checkTabFocus (target) {
    let focused = document.activeElement;

    if (target === focused) {
      activateTab(target, false);
    }
  }

  // Handle keydown on tabs
  function keydownEventListener (event) {
    let key = event.keyCode;
    let parent = event.target.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    let tabs = tabs_array_dict[tab_group_id].tabs;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        activateTab(tabs[0]);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case keys.up:
      case keys.down:
        determineOrientation(event);
        break;
    }
  }

  // Handle keyup on tabs
  function keyupEventListener (event) {
    let key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        determineOrientation(event);
        break;
    }
  }

  // When a tablistâ€™s aria-orientation is set to vertical,
  // only up and down arrow should function.
  // In all other cases only left and right arrow function.
  function determineOrientation (event) {
    let key = event.keyCode;
    let parent = event.target.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    let tablist = tabs_array_dict[tab_group_id].tablist;
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
  //
  // Either focus the next, previous, first, or last tab
  // depening on key pressed
  function switchTabOnArrowPress (event) {
    let pressed = event.keyCode;
    let parent = event.target.parentElement.parentElement;
    let tab_group_id = parent.id.split('--')[parent.id.split('--').length-1];
    let tabs = tabs_array_dict[tab_group_id].tabs;

    for (let x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener('focus', focusEventHandler);
    }

    if (direction[pressed]) {
      let target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          focusLastTab(tabs);
        }
        else if (pressed === keys.right || pressed === keys.down) {
          focusFirstTab(tabs);
        }
      }
    }
  }

  // Make a guess
  function focusFirstTab (tabs) {
    tabs[0].focus();
  }

  // Make a guess
  function focusLastTab (tabs) {
    tabs[tabs.length - 1].focus();
  }
}());
