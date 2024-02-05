"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
router.get("/", (_req, res) => {
    res.json(diagnoseService_1.default.getDiagnoses());
});
router.post("/", (_req, res) => {
    res.json(diagnoseService_1.default.addDiagnose());
});
exports.default = router;
