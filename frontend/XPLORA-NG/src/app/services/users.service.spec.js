"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const users_service_1 = require("./users.service");
describe('UsersService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(users_service_1.UsersService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
