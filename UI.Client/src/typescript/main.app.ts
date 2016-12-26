/* tslint:disable */
import { Component } from "@angular/core";

@Component({
    selector: "app", // this will ensure that angular controlls the whole page with only one root component.
    template: document.getElementById("mainAppContent").innerText // Currently we have no way of using existing html as per to https://github.com/angular/angular/issues/1858 so we use this hack.
})
export class AppComponent { }
