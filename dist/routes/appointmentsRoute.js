"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentsController_1 = require("../controllers/appointmentsController");
const router = express_1.default.Router();
const { getBusinessAppointment, createAppointment, deleteAppointment } = appointmentsController_1.appointmentsController;
router.get("/:businessId", getBusinessAppointment);
router.post("/:businessId", createAppointment);
router.delete("/:businessId", deleteAppointment);
exports.default = router;
