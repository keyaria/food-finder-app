export interface Restaurant {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos?: PhotosEntity[] | null;
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reviews?: Review[];
  scope: string;
  types?: string[] | null;
  user_ratings_total: number;
  vicinity: string;
}
export interface Geometry {
  location: NortheastOrSouthwestOrLocation;
  viewport: Viewport;
}
export interface NortheastOrSouthwestOrLocation {
  lat: number;
  lng: number;
}
export interface Viewport {
  northeast: NortheastOrSouthwestOrLocation;
  southwest: NortheastOrSouthwestOrLocation;
}
export interface OpeningHours {
  open_now: boolean;
}
export interface PhotosEntity {
  height: number;
  html_attributions?: string[] | null;
  photo_reference: string;
  width: number;
}
export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export interface RestaurantResponse {
  restaurant: Restaurant;
  photoStream: String[] | String;
}
