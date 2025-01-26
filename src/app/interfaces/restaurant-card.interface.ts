export interface RestaurantCardInterface {
    name: string;
    rating: number;
    reviews: number;
    imageUrl: string;
    tags: string[];
    delivery: DeliveryDataInterface;
    time: TimeInterface;
}

export interface TimeInterface {
    icon: string;
    text: string;
}

export interface DeliveryDataInterface {
    isFree: boolean;
    icon: string;
    text: string;
}
  