import express from "express";
import { getPlace } from "./restaurants.controller";

const router = express.Router();

router.get("/place", getPlace);

module.exports = router;
