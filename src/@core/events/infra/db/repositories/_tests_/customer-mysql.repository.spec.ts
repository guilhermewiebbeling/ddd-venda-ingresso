import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"
import { CustomerSchema } from "../../schemas";
import { Customer } from "../../../../domain/entities/customer.entity";
import { CustomerMysqlRepository } from "../customer-mysql.repository";

test('Customer repository', async () => {

    const orm = await MikroORM.init<MySqlDriver>({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        dbName: 'events',
        entities: [CustomerSchema],
        forceEntityConstructor: true
    });

    await orm.schema.refreshDatabase();
    const em = orm.em.fork();
    const customerRepo = new CustomerMysqlRepository(em);

    const customer = Customer.create({
        name: 'Customer 1',
        cpf: '166.695.020-36'
    });
    await customerRepo.add(customer);
    await em.flush();
    await em.clear();

    let customerFound = await customerRepo.findById(customer.id);
    expect(customerFound.id.equals(customer.id)).toBeTruthy();
    expect(customerFound.name).toBe(customer.name);
    expect(customerFound.cpf.value).toBe('16669502036');

    customer.changeName('Customer 2');
    await customerRepo.add(customer);
    await em.flush();
    await em.clear();

    customerFound = await customerRepo.findById(customer.id);
    expect(customerFound.id.equals(customer.id)).toBeTruthy();
    expect(customerFound.name).toBe(customer.name);

    console.log(await customerRepo.findAll());

    customerRepo.delete(customer);
    await em.flush();

    console.log(await customerRepo.findAll());

    await orm.close();
})