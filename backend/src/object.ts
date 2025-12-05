
export interface User {
    name: string,
    password: string,
    email: string,
    phone: string,
    userId: string
  }

export interface Buyer {
    buyerName: string;
    buyerABN: string;
    buyerAddress: string;
    buyerPostcode: string;
    buyerCity: string;
    buyerState: string;
    buyerCountry: string;
    buyerPhone: string;
    buyerEmail: string;
}

export interface Seller {
    sellerName: string;
    sellerABN: string;
    sellerAddress: string;
    sellerPostcode: string;
    sellerCity: string;
    sellerState: string;
    sellerCountry: string;
    sellerPhone: string;
    sellerEmail: string;
}

export interface Item {
    itemPrice: number;
    itemQuantity: number;
    itemDescription: string;
}

export interface Payment {
    accountName: string;
    bankName: string;
    accountNumber: string;
    BSB: string;
}

export interface Order {
    orderId: string;
    userId: string;
    buyer: Buyer;
    seller: Seller;
    items: Item[];
    payment: Payment;
    timestamp: string;
}

export interface JWTinfo {
    userId: string,
    email: string
}


export interface AuthRequest extends Request {
    user: {
        userId: string,
        email: string,
        token: string
    };
}

export interface monthlyCost {
    year: number,
    month: string,
    cost: number
}
