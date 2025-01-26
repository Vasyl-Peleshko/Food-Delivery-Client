import { Delivery } from "./delivery";
import { Time } from "./time";


export interface Restaurant {
    name: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    tags: string[];
    delivery: Delivery;
    time: Time;
  }