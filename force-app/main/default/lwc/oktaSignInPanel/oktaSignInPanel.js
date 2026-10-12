import { LightningElement, api } from "lwc";

export default class OktaSignInPanel extends LightningElement {
  @api heading = "Welcome to your customer portal";
  @api brandColor = "#4c6e9e";

  get safeBrandColor() {
    return /^#[0-9a-f]{6}$/i.test(this.brandColor)
      ? this.brandColor
      : "#4c6e9e";
  }

  get brandStyle() {
    return `--portal-accent: ${this.safeBrandColor}`;
  }
}
