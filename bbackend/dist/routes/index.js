"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("../modules/projecttask/routes");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/project',
        router: routes_1.projectRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.router));
exports.default = router;
