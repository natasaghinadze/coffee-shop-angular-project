import { IProduct } from "../products/models/product.interface";


// კალათაში ვინახავთ მხოლოდ იმას, რაც საჭიროა ჩვენებისთვის
export type CartProduct = Pick<IProduct, 'id' | 'name' | 'description' | 'price' | 'image'>;

export interface ICartItem extends CartProduct {
  quantity: number;
}
