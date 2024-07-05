import Joi from "joi";
import { ReactNode } from "react";

export enum OrderStatus {
  PENDING,
  ACCEPTED,
  PICKED_UP,
  IN_TRANSIT,
  DELIVERED,
  CANCELLED,
}

export type Options = {
  name: string;
  title: string;
  option: {
    value: string;
    label: string;
    checked?: boolean;
  }[];
};

export type CartProduct = {
  id: number;
  order: {
    quantity: number;
    note: string;
    [key: string]: any;
  };
};

export type Product = {
  id: number;
  imgProduct: string;
  nameProduct: string;
  salePrice: number | string;
  retailPrice: number | string;
  description: string;
  options: Options[];
};

export type Store = {
  id: number;
  logoStore: string;
  bannerStore: string;
  nameStore: string;
  followers: number;
  address: string;
  type: "personal" | "business";
  categories: string[];
  listProducts: Product[];
};

export type StoreOrder = {
  status: OrderStatus;
  listOrder: CartProduct[];
  date: Date;
  address?: Address;
};

export type SectionProductsProps = {
  id?: number;
  title: string;
  watchMore?: boolean;
  pathBanner?: string;
  direction?: "vertical" | "horizontal";
  colPercentage?: number;
  children?: (data: Product | Store) => ReactNode;
  data: any;
  onChoose?: () => void;
};

export type OrderStoreProps = {
  keyStore: number;
  listPickupItems: { keyItem: number; quantity: number }[];
};

export type Address = {
  city: string;
  district: string;
  ward: string;
  detail: string;
};

export type HeaderType = {
  route?: string;
  hasLeftIcon?: boolean;
  title?: string;
  customTitle?: ReactNode;
  type?: "primary" | "secondary";
  rightIcon?: ReactNode;
};

export type AddressFormType = {
  name: "detail" | "city" | "district" | "ward";
  label: string;
  type: "text" | "select";
  placeholder: string;
  isValidate: boolean;
  errorMessage?: string;
};

export type ProductInfoPicked = {
  productId: number;
  isUpdate?: boolean;
};

type Cart = {
  cartProductMenuId: string;
  itemId: string;
  cartId: string;
  storeId: string;
  productId: string;
  quantity: string;
  createdDate: string;
  updatedDate: string;
}

export type CartRequest = Pick<Cart, 'cartProductMenuId' | 'storeId' | 'cartId' | 'productId' | 'quantity'>;

export type CartDeleteRequest = Pick<Cart, 'itemId' | 'cartId' | 'storeId'>;

export type CartResponse = Pick<Cart, 'cartId' | 'createdDate' | 'updatedDate'>;

export type CartProductMenuResponse = Pick<Cart, 'quantity'> & {
  id: string;
  product: ProductMenuResponse;
}

export type ProductResponse = {
  productCode: string;
  name: string;
  basePrice: number;
  description: string;
  stockQuantity: number;
  urlImage: string;
  categoryCode: string;
  categoryName: string;
};

export type ProductMenuResponse = {
  id: number;
  product: ProductResponse;
  price: number;
};

export enum PayingMethod {
  COD,
  BANKING
}

type Order = {
  storeId: string;
  orderId: string;
  payingMethod: PayingMethod;
} & Pick<Cart, 'cartId'>;

export type OrderRequest = Pick<Order, 'cartId' | 'payingMethod' | 'storeId'>;

export type FeedbackRequest = Pick<Order, 'storeId' | 'orderId'> 
& {
  orderFeedback: string;
  deliveryFeedback: string;
}

type StoreData = {
  id: number;
  name: string;
  location: string;
  phoneNumber: string;
  zaloId: string;
}

export type StoreCreateRequest = Omit<StoreData, 'id'>;

export type StoreUpdateRequest = Omit<StoreData, 'zaloId'>;

export type StoreDetailsResponse = {
  name: string;
  storeType: string;
  point: number;
  phoneNumber: string;
  location: string;
  storeLevel: number;
};

export type OrderResponse = {
  orderId: number;
  totalPrice: number;
  payingMethod: PayingMethod;
  orderStatus: OrderStatus;
  point: number;
  storeName: string;
  storeAddress: string;
  orderFeedback: string;
  deliveryFeedback: string;
  createdDate: Date;
};

export type ResponseWrapper <T = any> = {
  data: T;
  code: string;
  isSuccess: boolean;
  status: string;
  message: string | null;
}

export type PaginationResponseWrapper <T = any> = {
  content: T[];
  pageNo: number;
  pageSize: number;
  totalElement: number;
  totalPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export type ErrorResponse = ResponseWrapper<null>;