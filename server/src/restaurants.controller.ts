import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { Client } from "@googlemaps/google-maps-services-js";

dotenv.config();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const client = new Client({});

/**
 * GET search for restaurants
 */

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
        radius: 500,
        type: "restaurant",
      },
      timeout: 1000,
    })
    .then(async (r) => {
      // Choose a random restaurant from the response
      const randomIndex = Math.floor(Math.random() * r.data.results.length);
      const randomRestaurant = r.data.results[randomIndex];

      if (randomRestaurant.photos && randomRestaurant.photos.length > 0) {
        const photoReference = randomRestaurant.photos[0].photo_reference;

        const photoResponse = await client.placePhoto({
          params: {
            key: API_KEY!,
            photoreference: photoReference,
            maxheight: 400,
          },
          responseType: "arraybuffer",
        });

        const imageBase64 = Buffer.from(photoResponse.data, "binary").toString(
          "base64",
        );

        res.json({ restaurant: randomRestaurant, photoStream: imageBase64 });
      } else {
        res.json({ restaurant: randomRestaurant });
      }
    })
    .catch((e) => {
      next(e);
    });
};

export const getPlaceInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;
  let photosArr = [] as string[];

  client
    .placeDetails({
      params: {
        key: API_KEY!,
        place_id: id,
        fields: ["name", "types", "rating", "reviews", "photos", "photo"],
      },
    })
    .then(async (r) => {
      const result = r.data.result;

      if (result.photos && result.photos.length > 0) {
        const photoPromises = result.photos.map(async (photo) => {
          const photoReference = photo.photo_reference;
          const photoResponse = await client.placePhoto({
            params: {
              key: API_KEY!,
              photoreference: photoReference,
              maxwidth: 1200,
            },
            responseType: "arraybuffer",
          });
          return Buffer.from(photoResponse.data, "binary").toString("base64");
        });

        // Wait for all photo promises to resolve
        const photoData = await Promise.all(photoPromises);

        res.json({ restaurant: r.data.result, photoStream: photoData });
      } else {
        res.json({ restaurant: r });
      }
    })
    .catch((e) => {
      next(e.data);
    });
};

export const getSearchResults = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { text, lat, lng } = req.query;

  await client
    .textSearch({
      params: {
        key: API_KEY!,
        query: text as string,
        location: `${lat},${lng}`,
        radius: 500,
      },
    })
    .then((r) => {
      return res.json(r.data.results);
    })
    .catch((e) => {
      next(e.data);
    });
};

export const getPhotos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.query;

  if (req.query.photos !== undefined) {
    const reference = (req.query.photos as any[])[0].photoreference;
    client
      .placePhoto({
        params: {
          key: API_KEY!,
          photoreference: reference,
          maxheight: 400,
        },
        responseType: "blob",
      })
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        next(e.data);
      });
  }
};
