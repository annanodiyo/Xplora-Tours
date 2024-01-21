"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const landing_page_component_1 = require("./landing-page.component");
describe('LandingPageComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [landing_page_component_1.LandingPageComponent]
        });
        fixture = testing_1.TestBed.createComponent(landing_page_component_1.LandingPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
