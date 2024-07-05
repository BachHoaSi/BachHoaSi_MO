import api from "./api";
import {
  OrderRequest,
  ResponseObject,
  FeedbackRequest,
  Pageable,
} from "../models";

const createOrder = async (
  orderData: OrderRequest
): Promise<ResponseObject> => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const getOrders = async (params: Pageable): Promise<ResponseObject> => {
  try {
    const response = await api.get("/orders", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

const provideFeedback = async (
  feedbackData: FeedbackRequest
): Promise<ResponseObject> => {
  try {
    const response = await api.post("/feedbacks", feedbackData);
    return response.data;
  } catch (error) {
    console.error("Error providing feedback:", error);
    throw error;
  }
};

export { createOrder, getOrders, provideFeedback };
