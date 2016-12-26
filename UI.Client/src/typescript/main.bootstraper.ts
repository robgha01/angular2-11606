import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./main.app";
import { SearchBoxComponent } from "./components/search-box/search-box.component";
import { SimpleLoginFormComponent } from "./components/simple-login-form/simple-login-form.component";
import { LoginSignupComponent } from "./components/login-signup/login-signup.component";
import { LoginSignupCompleteComponent } from "./components/login-signup/login-signup-complete.component";
import { DetectDeviceService } from "./detectDevice.service";
import { WidgetSearchDirective } from "./widget-search.directive";

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        WidgetSearchDirective,
        LoginSignupComponent,
        LoginSignupCompleteComponent,
        SimpleLoginFormComponent,
        SearchBoxComponent
    ],
    providers: [
        { provide: Window, useValue: window },
        DetectDeviceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }