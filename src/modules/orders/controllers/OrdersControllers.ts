import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ListOrderService from "../services/ListOrderService";
import ShowOrderService from "../services/ShowOrderService";

class OrdersControllers {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrder = new ListOrderService();
    const orders = await listOrder.execute();

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ order_id })

    return response.json(order);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const createOrder = new CreateOrderService();
    const order = await createOrder.execute(request.body);

    return response.status(201).json(order);
  }
}


export default OrdersControllers;
