import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from "@mikro-orm/mysql";
import { Module } from '@nestjs/common';
import { 
    CustomerSchema, 
    EventSchema, 
    EventSectionSchema, 
    EventSpotSchema, 
    OrderSchema, 
    PartnerSchema, 
    SpotReservationSchema 
} from '../@core/events/infra/db/schemas';
import { PartnerMysqlRepository } from '../@core/events/infra/db/repositories/partner-mysql.repository';
import { CustomerMysqlRepository } from '../@core/events/infra/db/repositories/customer-mysql.repository';
import { EventMysqlRepository } from '../@core/events/infra/db/repositories/event-mysql.repository';
import { OrderMysqlRepository } from '../@core/events/infra/db/repositories/order-mysql.repository';
import { SpotReservationMysqlRepository } from '../@core/events/infra/db/repositories/spot-reservation-mysql.repository';
import { PartnerService } from '../@core/events/application/partner.service';
import { IPartnerRepository } from '../@core/events/domain/repositories/partner-repository.interface';
import { CustomerService } from '../@core/events/application/customer.service';
import { EventService } from '../@core/events/application/event.service';
import { OrderService } from '../@core/events/application/order.service';
import { PaymentGateway } from '../@core/events/application/payment-gateway';
import { ICustomerRepository } from '../@core/events/domain/repositories/customer-repository.interface';
import { IEventRepository } from '../@core/events/domain/repositories/event-repository.interface';
import { IOrderRepository } from '../@core/events/domain/repositories/order-repository.interface';
import { ISpotReservationRepository } from '../@core/events/domain/repositories/spot-reservation-repository.interface';
import { IUnitOfWork } from '../@core/common/application/unit-of-work.interface';
import { PartnersController } from './partners/partners.controller';
import { CustomersController } from './customers/customers.controller';

@Module({
    imports: [
        MikroOrmModule.forFeature([
            CustomerSchema,
            PartnerSchema,
            EventSchema,
            EventSectionSchema,
            EventSpotSchema,
            OrderSchema,
            SpotReservationSchema,
        ])
    ],
    providers: [
        {
            provide: 'IPartnerRepository',
            useFactory: (em: EntityManager) => new PartnerMysqlRepository(em),
            inject: [EntityManager],
          },
        {
            provide: 'ICustomerRepository',
            useFactory: (em: EntityManager) => new CustomerMysqlRepository(em),
            inject: [EntityManager],
        },
        {
            provide: 'IEventRepository',
            useFactory: (em: EntityManager) => new EventMysqlRepository(em),
            inject: [EntityManager],
        },
        {
            provide: 'IOrderRepository',
            useFactory: (em: EntityManager) => new OrderMysqlRepository(em),
            inject: [EntityManager],
        },
        {
            provide: 'ISpotReservationRepository',
            useFactory: (em: EntityManager) => new SpotReservationMysqlRepository(em),
            inject: [EntityManager],
        },
        {
            provide: PartnerService,
            useFactory: (partnerRepo: IPartnerRepository, uow: IUnitOfWork) => new PartnerService(partnerRepo, uow),
            inject: ['IPartnerRepository', 'IUnitOfWork'],
        },
        {
            provide: CustomerService,
            useFactory: (customerRepo: ICustomerRepository, uow: IUnitOfWork) => new CustomerService(customerRepo, uow),
            inject: ['ICustomerRepository', 'IUnitOfWork'],
        },
        {
            provide: EventService,
            useFactory: (eventRepo: IEventRepository, partnerRepo: IPartnerRepository, uow: IUnitOfWork) => new EventService(eventRepo, partnerRepo, uow),
            inject: ['IEventRepository', 'IPartnerRepository', 'IUnitOfWork'],
        },
        PaymentGateway,
        {
            provide: OrderService,
            useFactory: (
                orderRepo: IOrderRepository,
                customerRepo: ICustomerRepository,
                eventRepo: IEventRepository,
                spotReservationRepo: ISpotReservationRepository,
                uow: IUnitOfWork,
                paymentGateway: PaymentGateway,
            ) =>
                new OrderService(
                    orderRepo,
                    customerRepo,
                    eventRepo,
                    spotReservationRepo,
                    uow,
                    paymentGateway,
                ),
            inject: [
                'IOrderRepository',
                'ICustomerRepository',
                'IEventRepository',
                'ISpotReservationRepository',
                'IUnitOfWork',
                PaymentGateway,
            ],
          },
    ],
    controllers: [PartnersController, CustomersController]
})
export class EventsModule {}
