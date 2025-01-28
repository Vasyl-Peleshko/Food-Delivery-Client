interface BaseCardInterface {
    name: string;
    rating: number;
    reviews: number;
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
  
export interface ItemCardInterface extends BaseCardInterface {
    imageUrl?: string;
    tags?: string[];
    delivery?: DeliveryDataInterface;
    time?: TimeInterface;
    price?: number;
    description?: string;
}