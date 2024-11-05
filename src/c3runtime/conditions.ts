
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.Genvidtech_PushNotification.Cnds =
{
	OnRegistration(this: SDKInstanceClass) {
		return true;
	},
	OnNotification(this: SDKInstanceClass) {
		return true;
	},
	OnError(this: SDKInstanceClass) {
		return true;
	}
};
