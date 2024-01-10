import { IRepository } from "../../../common/domain/repository-interface";
import { Customer } from "../entities/customer.entity";

export interface ICustomerRepository extends IRepository<Customer> {}