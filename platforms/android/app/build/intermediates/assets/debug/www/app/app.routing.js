"use strict";
var router_1 = require('@angular/router');
var device_component_1 = require('./device/device.component');
var about_component_1 = require('./about/about.component');
var database_component_1 = require('./database/database.component');
var list_component_1 = require('./list/list.component');
exports.routes = [
    { path: '', component: about_component_1.AboutComponent },
    { path: 'device', component: device_component_1.DeviceComponent },
    { path: 'database', component: database_component_1.DatabaseComponent },
    { path: 'list', component: list_component_1.ListComponent },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map