import { IRepository } from "src/@core/common/domain/repository-interface";
import { Customer } from "../entities/customer.entity";

export interface ICustomerRepository extends IRepository<Customer> {}