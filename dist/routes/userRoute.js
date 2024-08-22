"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const { createCurrentUser, updateCurrentUser, getCurrentUser } = userController_1.userController;
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, getCurrentUser);
router.post("/", auth_1.jwtCheck, createCurrentUser);
router.put("/", upload.array("images", 5), auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, updateCurrentUser);
exports.default = router;
