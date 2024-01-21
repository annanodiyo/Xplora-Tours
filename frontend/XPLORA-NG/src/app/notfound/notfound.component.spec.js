"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const notfound_component_1 = require("./notfound.component");
describe('NotfoundComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            declarations: [notfound_component_1.NotfoundComponent]
        });
        fixture = testing_1.TestBed.createComponent(notfound_component_1.NotfoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
