import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"
import { PartnerSchema } from "./schemas"
import { Partner } from "../../domain/entities/partner.entity";

test('Must create a partner', async () => {
    const orm = await MikroORM.init<MySqlDriver>({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        dbName: 'events',
        entities: [PartnerSchema],
        forceEntityConstructor: true
    });

    await orm.schema.refreshDatabase();
    const em = orm.em.fork();

    const partner = Partner.create({name: 'Partner 1'});
    console.log(partner);

    em.persist(partner);
    await em.flush();
    em.clear()

    const partnerFound = await em.findOne(Partner, {id: partner.id});
    console.log(partnerFound);

    await orm.close();
})