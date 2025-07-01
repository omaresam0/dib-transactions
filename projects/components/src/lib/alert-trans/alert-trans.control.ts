import { ControlType } from "@sassoftware/vi-api/config";

export const control = {
  category: "Fields",
  controlDescription: {
    defaultText: "alertTrans"
  },
  directiveName: "sol-alert-trans",
  displayName: {
    defaultText: "alertTrans"
  },
  name: "alertTrans",
  controlAttributes: {
    attributes: {},
    metadata: {
      renderAs: ControlType.WebComponent,
      states: {
        readOnly: true,
        required: true
      }
    }
  }
};
