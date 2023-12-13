import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"
import { CustomerSchema } from "../infra/db/schemas";
import { CustomerMysqlRepository } from "../infra/db/repositories/customer-mysql.repository";
import { Customer } from "../domain/entities/customer.entity";
import { CustomerService } from "./customer.service";
import { UnitOfWorkMikroOrm } from "src/@core/common/infra/unit-of-work-mikro-orm";


test('Deve listar os clientes', async () => {
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
    const unitOfWork = new UnitOfWorkMikroOrm(em);
    const customerRepo = new CustomerMysqlRepository(em);
    const customerService = new CustomerService(customerRepo, unitOfWork);

    const customer = Customer.create({
        name: 'João',
        cpf: '166.695.020-36'
    });
    await customerRepo.add(customer);
    await em.flush();
    await em.clear();

    let customers = await customerService.list();
    expect(customers.length).toBe(1);
    expect(customers[0].name).toBe('João');

    await orm.close();
});

test('Deve registrar um cliente', async () => {
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
    const unitOfWork = new UnitOfWorkMikroOrm(em);
    const customerRepo = new CustomerMysqlRepository(em);
    const customerService = new CustomerService(customerRepo, unitOfWork);

    const customer = await customerService.register({
        name: 'João',
        cpf: '166.695.020-36' 
   });

   expect(customer).toBeInstanceOf(Customer);
   expect(customer.id).toBeDefined();
   expect(customer.name).toBe('João');
   expect(customer.cpf.value).toBe('16669502036');

   await em.clear();

   const customerFound = await customerRepo.findById(customer.id);
   expect(customerFound).toBeInstanceOf(Customer);
   expect(customerFound.id).toBeDefined();
   expect(customerFound.name).toBe('João');
   expect(customerFound.cpf.value).toBe('16669502036');

   await orm.close();
});