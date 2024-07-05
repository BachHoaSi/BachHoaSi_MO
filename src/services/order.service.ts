import axios from "axios";
import { ErrorResponse, OrderResponse, OrderStatus, PaginationResponseWrapper, ResponseWrapper } from "../models";
import Joi from "joi";

type OrderPaginationResponse = ResponseWrapper<PaginationResponseWrapper<OrderResponse>>;

export class OrderService {
    constructor(){}

    public static async getOrders(orderStatus: OrderStatus, storeId: number, page?: number, size?: number): Promise<void> {
        const data = await axios.get<OrderPaginationResponse>(`https://api-user.fams.college/api/v1/orders`,
        {
            params: {
                page: page || 0,
                size: size || 10,
                storeId: storeId,
                orderStatus
            },
            headers: {
                Authorization: `Bearer ${storeId}`
            }
        },
        );
    }
}