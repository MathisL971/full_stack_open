"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patientService_1 = __importDefault(require("../services/patientService"));
router.get("/", (_req, res) => {
    res.json(patientService_1.default.getNonSensitivePatients());
});
router.post("/", (_req, res) => {
    res.json(patientService_1.default.addPatient());
});
exports.default = router;
