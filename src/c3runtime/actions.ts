
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.Genvidtech_PushNotification.Acts =
{
	Initialize(this: SDKInstanceClass, options: string)
	{
		this._postToDOM("initialize", {
			options: JSON.parse((options ?? "") !== "" ? options : "{}")
		});
	}
};
