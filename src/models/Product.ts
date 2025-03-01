export interface Product {
  uid: string; // Firestore document ID (unique identifier)
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: number;
  // createdAt: string;
  // updatedAt?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}
