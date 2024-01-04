import Cpf from "../../../../common/domain/value-objects/cpf.vo";
import { Customer, CustomerId } from "../customer.entity"

test('Must create a customer', () => {
    const customer = Customer.create({
        name: 'Customer 1',
        cpf: '166.695.020-36',
    });
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.id).toBeInstanceOf(CustomerId)
    expect(customer.name).toBe('Customer 1');
    expect(customer.cpf.value).toBe('16669502036');


    const customer2 = new Customer({
        id: new CustomerId(customer.id.value),
        name: 'Customer 2',
        cpf: new Cpf('097.063.360-28'),
    });
    console.log(customer.equals(customer2));
});