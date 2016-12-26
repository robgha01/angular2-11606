import { Component, OnInit } from "@angular/core";
import { ComponentTemplateBase } from "../abstraction/ComponentTemplateBase";

// As the Component directive is not mergin its inherited properties from
// ComponentTemplateBase's "Component" directive this component template is undefined resulting in error.
// uncomment template for it to work, here we should somehow merge the properties to stick with the "Dry" principes.

@Component({
    selector: "simple-login-form"//,
    //template: `<template [ngTemplateOutlet]="getTemplate()" [ngOutletContext]="{ $implicit: this }"></template>`
})
export class SimpleLoginFormComponent extends ComponentTemplateBase implements OnInit {

    constructor()
    {
        super();
    }

    simpleLogin($event: Event) {
        $event.preventDefault();
    }

    ngOnInit(): void {}
}