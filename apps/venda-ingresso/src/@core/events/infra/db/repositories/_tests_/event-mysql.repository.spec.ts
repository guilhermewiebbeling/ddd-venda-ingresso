import { MikroORM, MySqlDriver } from "@mikro-orm/mysql"
import { EventSchema, EventSectionSchema, EventSpotSchema, PartnerSchema } from "../../schemas";
import { EventMysqlRepository } from "../event-mysql.repository";
import { PartnerMysqlRepository } from "../partner-mysql.repository";
import { Partner } from "../../../../domain/entities/partner.entity";

test('Event repository', async () => {

    const orm = await MikroORM.init<MySqlDriver>({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        dbName: 'events',
        entities: [EventSchema, EventSectionSchema, EventSpotSchema, PartnerSchema],
        forceEntityConstructor: true,
        //debug: true
    });

    await orm.schema.refreshDatabase();
    const em = orm.em.fork();
    const partnerRepo = new PartnerMysqlRepository(em);
    const eventRepo = new EventMysqlRepository(em);

    const partner = Partner.create({name: 'Partner 1'});
    await partnerRepo.add(partner);
    
    const event = partner.initEvent({
        name: 'Event 1',
        description: 'Event description 1',
        date: new Date(),
    });

    event.addSection({
        name: 'Section 1',
        description: 'Section description',
        total_spots: 100,
        price: 1000
    });
  
    await eventRepo.add(event);
    await em.flush();
    await em.clear();

    const eventFound = await eventRepo.findById(event.id);
    console.log(eventFound);

    await orm.close();
})