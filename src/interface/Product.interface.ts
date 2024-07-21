import { Category } from "./category.interface";

export interface ProductInterface {
    id: number;
    productName: string;
    price: number;
    sku: number;
    status: boolean;
    category: Category;
    description: string;
    image: string;
    created_at: string;
    productDetail: ProductDetail;
    brand: Brand;
}


export interface ProductDetail {
    id: number;
    productDetailName: string;
    stock: number;
    unitPrice: number;
    status: boolean;
    image: string;
    color: Color;
}

export interface Color {
    id: number;
    colorName: string;
    status: boolean;
}

export interface Brand {
    id: number;
    brandName: string;
    status: boolean;
    created_at: string;
    description : string;
}



