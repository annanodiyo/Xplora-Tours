"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const registration_component_1 = require("./registration.component");
describe('RegistrationComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [registration_component_1.RegistrationComponent]
        });
        fixture = testing_1.TestBed.createComponent(registration_component_1.RegistrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
