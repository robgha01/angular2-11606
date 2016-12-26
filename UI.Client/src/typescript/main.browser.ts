import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./main.bootstraper";

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule, { useDebug: true });
}

if (document.readyState === "complete") {
    main();
} else {
    document.addEventListener("DOMContentLoaded", main);
}

// Import assets.
import "./../sass/main.scss";
import "./../assets/stylesheets/ie10-viewport-bug-workaround.css";