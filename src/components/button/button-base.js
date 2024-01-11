import Borderless from '../shared/borderless.ts';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { className } from '../utlity.ts';
import styles from './button.scss?inline';

export class ButtonBase extends LitElement {
  static styles = css`${unsafeCSS(styles)}`
  static get properties() {
    return {
      url: {
        type: String,
        default: '',
      },
      color: {
        type: String,
        default: 'primary',
        validator: function (value) {
          return ['primary', 'secondary', 'tertiary'].indexOf(value) !== -1;
        },
      },
      size: {
        type: String,
        default: 'medium',
        validator: function (value) {
          return ['small', 'medium', 'large'].indexOf(value) !== -1;
        },
      },
      ...Borderless.props,
      full: {
        type: Boolean,
        default: false,
      },
      transparent: {
        type: Boolean,
        default: false,
      },
      light_font: {
        type: Boolean,
        default: false,
      },
      icon: {
        type: String,
        default: '',
      },
    };
  }

  classes() {
    let classes = ['bttn'];
    ['full', 'transparent', 'light_font'].forEach((prop) => {
      if (this[prop] === true) {
        console.log(prop, this[prop])
        classes.push(`bttn--${className(prop)}`);
      }
    });

    if (this.color) {
      classes.push(`bttn--${className(this.color)}`);
    }

    if (this.size) {
      classes.push(`bttn--${className(this.size)}`);
    }

    // if (this.defaultSlotElements().length === 0) {
    //   classes.push(`bttn--no-text`);
    // }

    Borderless.addBorderlessClass(classes, this);

    return classes.join(' ');
  }

  defaultSlotElements() {
    const slot = this.shadowRoot.querySelector('slot:not([name])');
    console.log(slot);
    return slot.assignedElements();
  }

  render() {
    // Interpolate the property into our template
    return html`
      <a
        class="${this.classes()}"
        href="${this.url}"
      >
        <slot></slot>
        <slot name="icon"></slot>
      </a>
    `;
  }
}
