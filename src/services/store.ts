// import api from "./api";
// import { StoreUpdateRequest, ResponseObject } from "../models";

// const updateStore = async (
//   storeData: StoreUpdateRequest
// ): Promise<ResponseObject> => {
//   try {
//     const response = await api.put(`/stores/${storeData.id}`, storeData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating store:", error);
//     throw error;
//   }
// };

// const getStore = async (storeId: number): Promise<ResponseObject> => {
//   try {
//     const response = await api.get(`/stores/${storeId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching store:", error);
//     throw error;
//   }
// };

// export { updateStore, getStore };
