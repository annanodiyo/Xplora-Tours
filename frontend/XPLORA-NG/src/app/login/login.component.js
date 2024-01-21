"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let LoginComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LoginComponent = _classThis = class {
        constructor(formBuilder, userAuth, userService, router) {
            this.formBuilder = formBuilder;
            this.userAuth = userAuth;
            this.userService = userService;
            this.router = router;
            this.errorMessage = '';
            this.email = '';
            this.name = '';
            this.successMessage = '';
            this.loggingIn = false;
            this.loggedInState = false;
            this.loggedIn = false;
            this.loginForm = this.formBuilder.group({
                email: ['', [forms_1.Validators.required]],
                password: ['', [forms_1.Validators.required]],
            });
        }
        loginUser() {
            return __awaiter(this, void 0, void 0, function* () {
                //retrieve user details from the form
                let user_details = this.loginForm.value;
                console.log(user_details);
                //method from userAuth to authenticate the user
                let response = yield this.userAuth.login(user_details);
                if (response.error) {
                    this.loggingIn = false;
                    this.errorMessage = response.error;
                    setTimeout(() => {
                        this.errorMessage = '';
                        this.loggingIn = false;
                    }, 3000);
                }
                else if (response.message) {
                    console.log(response.message);
                    this.loggedInState = true;
                    this.successMessage = response.message;
                    this.loggedIn = true;
                    let { role, name, email, phone_number, user_id } = yield this.userService.checkCredentials();
                    let xz = yield this.userService.checkCredentials();
                    console.log('respons is sdsadasd ', xz);
                    // console.log('user credentials from check credentials', cred);
                    localStorage.setItem('loggedIn', `${this.loggedIn}`);
                    localStorage.setItem('name', `${name}`);
                    localStorage.setItem('email', `${email}`);
                    localStorage.setItem('phone_number', `${phone_number}`);
                    localStorage.setItem('user_id', `${user_id}`);
                    console.log(role);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        this.successMessage = '';
                        this.loggedInState = false;
                        if (role === 'Admin') {
                            this.router.navigate(['admin']);
                        }
                        else {
                            this.router.navigate(['user']);
                        }
                    }), 3000);
                }
            });
        }
    };
    __setFunctionName(_classThis, "LoginComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoginComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoginComponent = _classThis;
})();
exports.LoginComponent = LoginComponent;
