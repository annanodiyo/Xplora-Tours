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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const navbar_component_1 = require("./navbar/navbar.component");
const forms_1 = require("@angular/forms");
const registration_component_1 = require("./registration/registration.component");
const http_1 = require("@angular/common/http");
const login_component_1 = require("./login/login.component");
const landing_page_component_1 = require("./landing-page/landing-page.component");
const destinations_component_1 = require("./destinations/destinations.component");
const notfound_component_1 = require("./notfound/notfound.component");
const footer_component_1 = require("./footer/footer.component");
const admin_component_1 = require("./admin/admin.component");
const asidebar_component_1 = require("./asidebar/asidebar.component");
const users_component_1 = require("./users/users.component");
const create_tours_component_1 = require("./create-tours/create-tours.component");
const tours_component_1 = require("./tours/tours.component");
let AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                registration_component_1.RegistrationComponent,
                login_component_1.LoginComponent,
                landing_page_component_1.LandingPageComponent,
                destinations_component_1.DestinationsComponent,
                notfound_component_1.NotfoundComponent,
                footer_component_1.FooterComponent,
                admin_component_1.AdminComponent,
                asidebar_component_1.AsidebarComponent,
                users_component_1.UsersComponent,
                create_tours_component_1.CreateToursComponent,
                tours_component_1.ToursComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
