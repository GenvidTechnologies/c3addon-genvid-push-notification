
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

C3.Plugins.Genvidtech_PushNotification.Acts =
{
	Initialize(this: SDKInstanceClass)
	{
		// Post a message to the domSide.js script to update the document title.
		this._postToDOM("initialize");
	}
};
