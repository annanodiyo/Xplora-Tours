"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const destinations_component_1 = require("./destinations.component");
describe('DestinationsComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [destinations_component_1.DestinationsComponent]
        });
        fixture = testing_1.TestBed.createComponent(destinations_component_1.DestinationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
