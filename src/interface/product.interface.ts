import { Brand } from "@/store/slices/brand.slice";
import { Category } from "@/store/slices/category.slice";
import { Color } from "@/store/slices/color.slice";
import { Config } from "@/store/slices/config.slice";

export interface ProductInterface {
  id: number;
  productName: string;
  sku: string;
  status: boolean;
  category: Category;
  description: string;
  image: string;
  created_at: string;
  productDetails: ProductDetail[];
  brand: Brand;
  images: string[];
}

export interface ProductDetail {
  id: number;
  productDetailName: string;
  stock: number;
  unitPrice: number;
  status: boolean;
  productDetailImages: image[];
  color: Color;
  config: Config;
}

export interface ProductDetailForm {
  productDetailName: string;
  stock: number;
  unitPrice: number;
  colorId: number;
  configId: number;
  images: string[];
}

export interface ProductForm {
  productName: string;
  sku?: string;
  categoryId: number;
  description: string;
  images: string[];
  brandId: number;
}

export interface ProductDetailForm {
  productDetailName: string;
  stock: number;
  unitPrice: number;
  colorId: number;
  configId: number;
  images: string[];
}

export interface Product {
  [x: string]: string | undefined;
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  rating?: number;
  reviewCount?: number;
}

interface image {
  id: number;
  image: string;
  status: boolean;
}
