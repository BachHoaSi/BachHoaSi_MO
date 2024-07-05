import { atom, selector } from "recoil";
import { filter } from "./constants/referrence";
import { createDummyStore } from "./dummy/utils";
import {
  Address,
  HeaderType,
  Product,
  ProductInfoPicked,
  Store,
  StoreOrder,
} from "./models";
import { getRandomInt } from "./utils";

export const storeState = selector<Store>({
  key: "store",
  get: () => {
    return createDummyStore();
  },
});

export const productState = atom<Product[]>({
  key: "product",
  default: [],
});

export const cartState = atom<StoreOrder>({
  key: "cart",
  default: {
    status: "pending",
    listOrder: [],
    date: new Date(),
  },
});

export const cartTotalPriceState = selector<number>({
  key: "cartTotalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    const products = get(productState);
    const result = cart.listOrder.reduce(
      (total, item) =>
        total +
        Number(item.order.quantity) *
          Number(products.find((product) => product.id === item.id)?.price),
      0
    );
    return result;
  },
});

export const headerState = atom<HeaderType>({
  key: "header",
  default: {},
});

export const searchProductState = atom<string>({
  key: "searchProduct",
  default: "",
});

export const activeCateState = atom<number>({
  key: "activeCate",
  default: 0,
});

export const activeFilterState = atom<string>({
  key: "activeFilter",
  default: filter[0].key,
});

export const addressState = atom<Address>({
  key: "address",
  default: {
    city: "",
    district: "",
    ward: "",
    detail: "",
  },
});

export const openProductPickerState = atom<boolean>({
  key: "openProductPicker",
  default: false,
});

export const initialProductInfoPickedState = {
  productId: -1,
  isUpdate: false,
};

export const productInfoPickedState = atom<ProductInfoPicked>({
  key: "productInfoPicked",
  default: initialProductInfoPickedState,
});

export const usernameState = atom<string>({
  key: "username",
  default: "",
});

export const passwordState = atom<string>({
  key: "password",
  default: "",
});

export const phoneNumberState = atom<string>({
  key: "phoneNumber",
  default: "",
});

export const nameState = atom<string>({
  key: "name",
  default: "",
});

export const addressStateSignup = atom<string>({
  key: "addressStateSignup",
  default: "",
});

export const storeIdState = atom<number>({
  key: "storeId",
  default: -1,
});
