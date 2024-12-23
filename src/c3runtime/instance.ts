const C3 = globalThis.C3;

// Update the DOM_COMPONENT_ID to be unique to your plugin.
// It must match the value set in domSide.js as well.
const DOM_COMPONENT_ID = "Genvidtech_PushNotification";

class PushNotificationInstance extends globalThis.ISDKInstanceBase {
  _registration: any;
  _notification: any;
  _error: string;

  constructor() {
    // Note that DOM_COMPONENT_ID must be passed to the base class as an additional parameter.
    super({ domComponentId: DOM_COMPONENT_ID });

    // The document title is not directly accessible in a worker. Therefore keep a copy of the
    // current document title on the runtime side so it can be returned from an expression.
    this._registration = undefined;
    this._error = "";
    this._notification = null;

    this._addDOMMessageHandlers([
      ["on-registration", (e) => this._onRegistration(e)],
      ["on-notification", (e) => this._onNotification(e)],
      ["on-error", (e) => this._onError(e)],
    ]);
  }

  _onRegistration(e: JSONValue) {
    this._registration = e;

    // Dispatch script event so callers can use addEventListener("on-registration", ...)
    this.dispatchEvent(new C3.Event("on-registration", true));

    // Trigger 'On Registration' in the event system
    this._trigger(C3.Plugins.Genvidtech_PushNotification.Cnds.OnRegistration);
  }

  _onNotification(e: JSONValue) {
    this._notification = e;

    // Dispatch script event so callers can use addEventListener("on-notification", ...)
    this.dispatchEvent(new C3.Event("on-notification", true));

    // Trigger 'On Notification' in the event system
    this._trigger(C3.Plugins.Genvidtech_PushNotification.Cnds.OnNotification);
  }

  _onError(e: JSONValue) {
    this._error = (e as JSONObject)["error"] as string;

    // Dispatch script event so callers can use addEventListener("on-error", ...)
    this.dispatchEvent(new C3.Event("on-error", true));

    // Trigger 'On Error' in the event system
    this._trigger(C3.Plugins.Genvidtech_PushNotification.Cnds.OnError);
  }

  _release() {
    super._release();
  }

  _saveToJson() {
    return {
      // data to be saved for savegames
    };
  }

  _loadFromJson(o: JSONValue) {
    // load state for savegames
  }
}

C3.Plugins.Genvidtech_PushNotification.Instance = PushNotificationInstance;

export type { PushNotificationInstance as SDKInstanceClass };
