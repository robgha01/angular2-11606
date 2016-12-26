import { Directive, ElementRef, Inject, HostListener, OnInit } from "@angular/core";
import * as $ from "jquery";
import { DetectDeviceService } from "./detectDevice.service";

@Directive({ selector: "[widget-search]" })
export class WidgetSearchDirective implements OnInit {
    private inputEl: JQuery;
    private self: JQuery;

    constructor( @Inject(ElementRef) public el: ElementRef, @Inject(DetectDeviceService) public detectDeviceService: DetectDeviceService) { }

    @HostListener("click", ["$event"])
    public onClick($event: Event): void {
        this.initSearch($event);
    }

    @HostListener("touchstart", ["$event"])
    public onTouchStart($event: Event): void {
        this.initSearch($event);
    }

    initSearch($event: Event): void {
        // trim value
        let searchFor = this.inputEl.val().trim();
        this.inputEl.val(searchFor);

        if (!this.self.hasClass("search-open")) { // open it
            $event.preventDefault();
            this.open();
        } else if (this.self.hasClass("search-open") && /^\s*$/.test(searchFor)) { // close it
            $event.preventDefault();
            this.close();
        }
    }

    open(): void {
        this.self.addClass("search-open");
        if (!this.detectDeviceService.isMobile()) {
            this.inputEl.focus();
        }
    }

    close(): void {
        this.self.blur();
        this.self.removeClass("search-open");
    }

    ngOnInit(): void {
        this.self = $(this.el.nativeElement);
        this.inputEl = this.self.find("form > input.search-input").first();
        this.inputEl.on("click", ev => { ev.stopPropagation(); });
        this.inputEl.on("touchstart", ev => { ev.stopPropagation(); });

        $(document).on("click", ($event: Event) => {
            if (!$($event.target).closest(this.self).length) {
                // Hide the component.
                this.close();
            }
        });
    }
}
