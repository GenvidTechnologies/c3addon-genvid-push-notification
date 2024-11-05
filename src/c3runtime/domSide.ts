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
        ["initialize", () => this._OnInitialize()],
      ]);
    }

    _OnInitialize() {
	  const PN = (<any>globalThis)["PushNotification"];
	  if (typeof PN === "undefined") {
		console.info("Need to export as Cordova to be working.");
		return;
	  }
      console.debug("Initializing push notifications...");

      const push = (<any>globalThis)["PushNotification"].init({
        android: {},
        browser: {},
        ios: {},
      });

      push.on("registration", (data: any) => {
        console.debug("Push Notification registration:", { data });
        this.PostToRuntime("on-registration", data);
      });

      push.on("notification", (data: any) => {
        console.debug("Push Notification received:", { data });
        this.PostToRuntime("on-notification", data);
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });

      push.on("error", (e: Error) => {
        console.error("Push notification error:", e.message, { error: e });
        this.PostToRuntime("on-error", e.message);
      });
    }
  };

  globalThis.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
