import { TemplateRef } from "@angular/core";

export interface ITemplateBase<TViewState> {
    viewState: TViewState;
    getTemplate(): TemplateRef<any>;
}
