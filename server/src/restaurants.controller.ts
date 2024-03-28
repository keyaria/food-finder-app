import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { Client, PlaceInputType } from "@googlemaps/google-maps-services-js";

//const { sendServerError, sendOkResponse } = require("../../core/responses");
//const Reservation = require("./reservation.model");

dotenv.config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const client = new Client({});

export const getPlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { lat, lng } = req.query;

  client
    .placesNearby({
      params: {
        key: process.env.GOOGLE_MAPS_API_KEY!,
        location: `${lat},${lng}`,
        radius: 1500,
        type: "restaurant",
      },
      timeout: 1000,
    })
    .then((r) => {
      console.log(r.data);

      // Choose a random restaurant from the response
      const randomIndex = Math.floor(Math.random() * r.data.results.length);
      const randomRestaurant = r.data.results[randomIndex];
      res.json(randomRestaurant);
    })
    .catch((e) => {
      next(e);
      //res.json(e)
    });
};
