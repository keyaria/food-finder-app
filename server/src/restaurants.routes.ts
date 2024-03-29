import express from "express";
import { getPlace, getPlaceInfo } from "./restaurants.controller";

const router = express.Router();

router.get("/place", getPlace);
router.get("/place/:id", getPlaceInfo);

module.exports = router;
