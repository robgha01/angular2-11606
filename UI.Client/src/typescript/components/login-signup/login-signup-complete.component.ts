import { Component, Inject, NgZone, ContentChild, TemplateRef, ViewContainerRef, Renderer, OnInit } from "@angular/core";


export enum LoginSignupCompleteViewState {
    None,
    CompleteTemplate
}

@Component({
    selector: "login-signup-complete",
    template: `<template [ngTemplateOutlet]="getTemplate()" [ngOutletContext]="{ $implicit: this }"></template>`,
    styles: [require("./login-signup.scss").toString()]
})
export class LoginSignupCompleteComponent implements OnInit {
    @ContentChild(TemplateRef) template: TemplateRef<any>;
    viewState: LoginSignupCompleteViewState = LoginSignupCompleteViewState.None;
    
    constructor(
        @Inject(NgZone) protected ngZone: NgZone,
        @Inject(ViewContainerRef) protected viewContainerRef: ViewContainerRef,
        @Inject(Renderer) protected renderer: Renderer) {
    }

    getTemplate(): TemplateRef<any> {
        switch (this.viewState) {
            case LoginSignupCompleteViewState.CompleteTemplate:
                return this.template;
            default:
                return null;
        }
    }

    ngOnInit(): void {}
}