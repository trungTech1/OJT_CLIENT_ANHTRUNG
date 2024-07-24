import { Category } from "./category.interface";

export interface ProductInterface {
    id: number;
    productName: string;
    sku: number;
    status: boolean;
    category: Category;
    description: string;
    image: string;
    created_at: string;
    productDetails: ProductDetail[];
    brand: Brand;
    images : string[];
}


export interface ProductDetail {
    id: number;
    productDetailName: string;
    stock: number;
    unitPrice: number;
    status: boolean;
    image: string;
    color: Color;
    config: Config[];
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

export interface Config {
    id: number;
    configName: string;
    status: boolean;
}


export interface ProductForm {
    productName: string;
    sku: number;
    categoryId: number;
    description: string;
    images : string[];
    brandId: number;
}

export interface ProductDetailForm {
    productDetailName: string;
    stock: number;
    unitPrice: number;
    colorId: number;
    configId: number;
}

