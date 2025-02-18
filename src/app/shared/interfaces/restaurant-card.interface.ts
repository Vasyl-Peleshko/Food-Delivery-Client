interface BaseCardInterface {
    name: string;
    rating: number;
    feedbacks: number;
    id: string;
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

export interface FoodItemInterface {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    feedbacks: number;
    restaurantId: string;
    imgUrl: string;
    ingredients?: string[];
    addons?: {
      name: string;
      price: number;
      countable: boolean;
    }[];
}

export interface CartItemInterface {
    id: string;
    name: string;
    imgUrl: string;
    price: number;
    quantity: number;
    addon?: string | null;
    addons?: { name: string; price: number }[]; 
}
