"use strict";

{
  // Update the DOM_COMPONENT_ID to be unique to your plugin.
  // It must match the value set in instance.js as well.
  const DOM_COMPONENT_ID = "Genvidtech_PushNotification";

  // This class handles messages from the runtime, which may be in a Web Worker.
  const HANDLER_CLASS = class PushNotificationDOMHandler extends globalThis.DOMHandler {
    constructor(iRuntime: IRuntimeInterface) {
      super(iRuntime, DOM_COMPONENT_ID);

      // This provides a table of message names to functions to call for those messages.
      // For example the "Set document title" action posts a "set-document-title" message,
      // which will then call _OnSetDocumentTitle().
      this.AddRuntimeMessageHandlers([
        ["initialize", (e: JSONValue) => this._OnInitialize(e)],
      ]);
    }

    _OnInitialize(e: JSONValue) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PN = (<any>globalThis)["PushNotification"];
      if (typeof PN === "undefined") {
        console.info("Need to export as Cordova to be working.");
        return;
      }
      const { android, browser, ios, ...other } = ((e as JSONObject).options ??
        {}) as JSONObject;
      const push = PN.init({
        android: {
          icon: "push_icon",
          ...<JSONObject>(android ?? {}),
        },
        browser: browser ?? {},
        ios: ios ?? {},
        ...(other ?? {}),
      });

      push.on("registration", (data: JSONValue) => {
        this.PostToRuntime("on-registration", data);
      });

      push.on("notification", (data: JSONValue) => {
        this.PostToRuntime("on-notification", data);
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });

      push.on("error", (e: Error) => {
        const err = e.message ?? JSON.stringify(e);
        this.PostToRuntime("on-error", { error: err });
      });
    }
  };

  globalThis.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
