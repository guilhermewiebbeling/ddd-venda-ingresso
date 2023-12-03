import Cpf from "src/@core/common/domain/value-objects/cpf.vo";
import { Customer, CustomerId } from "../customer.entity"

test('Deve criar um cliente', () => {
    const customer = Customer.create({
        name: 'João',
        cpf: '166.695.020-36',
    });
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.id).toBeInstanceOf(CustomerId)
    expect(customer.name).toBe('João');
    expect(customer.cpf.value).toBe('16669502036');


    const customer2 = new Customer({
        id: new CustomerId(customer.id.value),
        name: 'João 2',
        cpf: new Cpf('097.063.360-28'),
    });
    console.log(customer.equals(customer2));
});