"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentsController = exports.deleteAppointment = exports.createAppointment = exports.getBusinessAppointment = void 0;
const User_1 = __importDefault(require("../models/User"));
const Pin_1 = __importDefault(require("../models/Pin"));
const Board_1 = __importDefault(require("../models/Board"));
const getBusinessAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        // Validate the businessId
        if (!businessId) {
            return res.status(400).json({ message: "Business ID is required" });
        }
        // Fetch appointments for the given businessId
        const appointments = yield Pin_1.default.find({ business_id: businessId });
        // Check if no appointments found
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this business" });
        }
        // Send response with the appointments
        res.status(200).json(appointments);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching appointments:", error.message);
            res.status(500).json({ message: "Error fetching appointments" });
        }
        else {
            console.error("Unknown error:", error);
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getBusinessAppointment = getBusinessAppointment;
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const { email, date } = req.body;
        // Validate request body
        if (!email || !date) {
            return res.status(400).json({ message: "Email and appointment date are required" });
        }
        // Validate and parse appointmentDate
        const appointmentDate = new Date(date);
        // Find the user and business in the database
        const user = yield User_1.default.findOne({ email: email });
        const business = yield Board_1.default.findById(businessId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        // Create the appointment
        const appointment = new Pin_1.default({
            user_id: user._id,
            business_id: businessId,
            appointment_date: date,
        });
        const response = yield appointment.save();
        console.log(response);
        return res.status(201).json(appointment);
    }
    catch (error) {
        console.error("Error creating appointment:", error);
        return res.status(500).json({ message: "Error creating appointment" });
    }
});
exports.createAppointment = createAppointment;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointment_id, businessId } = req.params; // Correct parameter names
        const { userId } = req;
        const appointment = yield Pin_1.default.findByIdAndDelete(appointment_id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        yield User_1.default.findByIdAndUpdate(userId, { $pull: { appointments: appointment._id } });
        yield Board_1.default.findByIdAndUpdate(businessId, { $pull: { appointments: appointment._id } });
        return res.status(200).json({ message: "Appointment removed successfully" });
    }
    catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Error deleting appointment" });
    }
});
exports.deleteAppointment = deleteAppointment;
exports.appointmentsController = {
    getBusinessAppointment: exports.getBusinessAppointment,
    createAppointment: exports.createAppointment,
    deleteAppointment: exports.deleteAppointment,
};
