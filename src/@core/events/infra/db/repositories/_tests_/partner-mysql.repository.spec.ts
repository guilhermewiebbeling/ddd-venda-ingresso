import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"
import { PartnerSchema } from "../../schemas";
import { Partner } from "src/@core/events/domain/entities/partner.entity";
import { PartnerMysqlRepository } from "../partner-mysql.repository";

test('Partner repository', async () => {

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
    const partnerRepo = new PartnerMysqlRepository(em);

    const partner = Partner.create({name: 'Parceiro 1'});
    await partnerRepo.add(partner);
    await em.flush();
    await em.clear();

    let partnerFound = await partnerRepo.findById(partner.id);
    expect(partnerFound.id.equals(partner.id)).toBeTruthy();
    expect(partnerFound.name).toBe(partner.name);

    partner.changeName('Parceiro 2');
    await partnerRepo.add(partner);
    await em.flush();
    await em.clear();

    partnerFound = await partnerRepo.findById(partner.id);
    expect(partnerFound.id.equals(partner.id)).toBeTruthy();
    expect(partnerFound.name).toBe(partner.name);

    console.log(await partnerRepo.findAll());

    partnerRepo.delete(partner);
    await em.flush();

    console.log(await partnerRepo.findAll());

    await orm.close();
})