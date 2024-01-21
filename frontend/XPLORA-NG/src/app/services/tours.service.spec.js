"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const tours_service_1 = require("./tours.service");
describe('ToursService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(tours_service_1.ToursService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
