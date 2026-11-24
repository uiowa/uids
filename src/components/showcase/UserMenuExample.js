import UidsButton from '../button/Button.vue';
// The background, borderless and menu utilities the markup uses; the menu styles hide its list.
import '../../scss/components/_background.scss';
import '../../scss/components/_border.scss';
import '../../scss/components/menu.scss';
import './UserMenuExample.scss';

/**
 * Story-only faux HawkID user menu for the brand bar, shared by the Brand Bar stories and
 * Showcase › Application › Form. Not part of UIDS.
 */
export default {
  name: 'UserMenuExample',
  components: { UidsButton },
  template: `
    <div class="user-menu-toggle bg--gold">
      <uids-button transparent light_font borderless>
        <i style="color: var(--uiowa-color-brand-black)" class="fas fa-user"></i> HawkID <i style="color: var(--uiowa-color-brand-black)" class="fas fa-caret-down"></i>
      </uids-button>
      <ul class="menu">
        <li><a href="/">Sign out</a></li>
      </ul>
    </div>
  `,
};
