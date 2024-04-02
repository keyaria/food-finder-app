import express from "express";
import {
  getPlace,
  getPlaceInfo,
  getSearchResults,
} from "./restaurants.controller";

const router = express.Router();

router.get("/place", getPlace);
router.get("/place/:id", getPlaceInfo);
router.get("/search", getSearchResults);

module.exports = router;
