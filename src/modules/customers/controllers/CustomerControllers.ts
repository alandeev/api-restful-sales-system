import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import GetCustomerService from "../services/GetCustomerService";
import ListCustomerService from "../services/ListCustomerService";

class CustomerControllers {
  public async get(request: Request, response: Response): Promise<Response> {
    const { customerId } = request.params;

    const getCustomer = new GetCustomerService();
    const customer = await getCustomer.execute({ customerId });

    return response.json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();
    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const createCustomerService = new CreateCustomerService();
    await createCustomerService.execute(request.body);

    return response.status(201).json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomerService = new DeleteCustomerService();
    await deleteCustomerService.execute({ customerId: request.params.customerId });

    return response.status(204).json();
  }
}


export default CustomerControllers;
