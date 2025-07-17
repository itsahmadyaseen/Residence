import express from "express";
import {
  createResidency,
  getAllPlotResidencies,
  getAllRentalResidencies,
  getResidency,
} from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/allPlotResd", getAllPlotResidencies);
router.get("/allRentalResd", getAllRentalResidencies);
router.get("/:id", getResidency);
export { router as residencyRoute };
