
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.Genvidtech_PushNotification.Exps =
{
	RegistrationId(this: SDKInstanceClass)
	{
		// This returns the copy of the document title held on the runtime side.
		return this._registration?.["registrationId"] ?? "";
	},
	RegistrationType(this: SDKInstanceClass)
	{
		return this._registration?.["registrationType"] ?? "";
	},
	Notification(this: SDKInstanceClass)
	{
		return JSON.stringify(this._notification);
	},
	Error(this: SDKInstanceClass)
	{
		return this._error;
	}
};
