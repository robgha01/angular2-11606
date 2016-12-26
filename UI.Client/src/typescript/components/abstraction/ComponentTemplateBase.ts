import { Component, ContentChild, TemplateRef } from "@angular/core";
import { DefaultViewState } from "../../enums/default-view-state-enum";
import { ITemplateBase } from "./ITemplateBase";

@Component({
    template: `<template [ngTemplateOutlet]="getTemplate()" [ngOutletContext]="{ $implicit: this }"></template>`
})
export abstract class ComponentTemplateBase implements ITemplateBase<DefaultViewState> {
    @ContentChild(TemplateRef) defaultTemplate: TemplateRef<any>;
    viewState: DefaultViewState = DefaultViewState.DefaultTemplate;

    getTemplate(): TemplateRef<any> {
        switch (this.viewState) {
            case DefaultViewState.DefaultTemplate:
                return this.defaultTemplate;
            default:
                return null;
        }
    }
}
