interface BaseCardInterface {
    name: string;
    rating: number;
    feedbacks: number;
}

export interface DeliveryDataInterface {
    cost: string;
    time: string;
}
  
export interface ItemCardInterface extends BaseCardInterface {
    imgUrl?: string;
    categories?: string[];
    delivery?: DeliveryDataInterface;
    price?: number;
    description?: string;
}