"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const businessController_1 = require("../controllers/businessController");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});
const { getBusinessById, getAllBusinesses, deleteBusiness, updateBusiness, createBusiness, } = businessController_1.businessController;
router.get("/:businessId", getBusinessById);
router.get("/", getAllBusinesses);
router.post("/add", auth_1.jwtCheck, auth_1.jwtParse, upload.array("images", 5), createBusiness);
router.delete("/:businessId", auth_1.jwtCheck, auth_1.jwtParse, deleteBusiness);
router.put("/:businessId", updateBusiness);
exports.default = router;
