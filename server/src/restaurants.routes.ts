import express from "express";
import {
  getPhotos,
  getPlace,
  getPlaceInfo,
  getSearchResults,
} from "./restaurants.controller";

const router = express.Router();

router.get("/place", getPlace);
router.get("/place/:id", getPlaceInfo);
router.get("/search", getSearchResults);
//router.get("/photo", getPhotos)

module.exports = router;
