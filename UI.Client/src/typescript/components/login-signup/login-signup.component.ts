import { Component, Inject, NgZone, ContentChild, TemplateRef, ViewContainerRef, Renderer, OnInit } from "@angular/core";

export enum LoginSignupViewState {
    None,
    LoginTemplate,
    SignupTemplate,
    ForgotPasswordTemplate
}

@Component({
    selector: "login-signup",
    template: `<template [ngTemplateOutlet]="getTemplate()" [ngOutletContext]="{ $implicit: this }"></template>`,
    styles: [require("./login-signup.scss").toString()]
})
export class LoginSignupComponent implements OnInit {
    @ContentChild("Login") loginTemplate: TemplateRef<any>;
    @ContentChild("Signup") signupTemplate: TemplateRef<any>;
    @ContentChild("ForgotPassword") forgotPasswordTemplate: TemplateRef<any>;
    viewState: LoginSignupViewState = LoginSignupViewState.LoginTemplate;

    constructor(
        @Inject(NgZone) protected ngZone: NgZone,
        @Inject(ViewContainerRef) protected viewContainerRef: ViewContainerRef,
        @Inject(Renderer) protected renderer: Renderer) {
    }

    getTemplate(): TemplateRef<any> {
        switch (this.viewState) {
            case LoginSignupViewState.LoginTemplate:
                return this.loginTemplate;
            case LoginSignupViewState.SignupTemplate:
                return this.signupTemplate;
            case LoginSignupViewState.ForgotPasswordTemplate:
                return this.forgotPasswordTemplate;
            default:
                return null;
        }
    }

    showLogin($event: Event): void {
        $event.preventDefault();
        this.ngZone.run(() => {
            this.viewState = LoginSignupViewState.LoginTemplate;
        });
    }
    
    showSignup($event: Event): void {
        $event.preventDefault();
        this.ngZone.run(() => {
            this.viewState = LoginSignupViewState.SignupTemplate;
        });
    }

    showForgotPassword($event: Event): void {
        $event.preventDefault();
        this.ngZone.run(() => {
            this.viewState = LoginSignupViewState.ForgotPasswordTemplate;
        });
    }

    ngOnInit(): void {}
}
