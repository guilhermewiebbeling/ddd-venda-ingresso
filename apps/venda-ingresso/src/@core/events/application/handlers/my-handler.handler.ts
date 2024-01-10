import { IDomainEventHandler } from "../../../../@core/common/application/domain-event-handler.interface";
import { PartnerCreatedEvent } from "../../domain/domain-events/partner-created.event";
import { IPartnerRepository } from "../../domain/repositories/partner-repository.interface";
import { DomainEventManager } from "../../../../@core/common/domain/domain-event-manager";

export class MyHandlerHandler implements IDomainEventHandler {

    constructor(private partnerRepo: IPartnerRepository, private domainEventManager: DomainEventManager) {}

    async handle(event: PartnerCreatedEvent) {
        console.log(event);
    }

    static listensTo(): string[] {
        return [PartnerCreatedEvent.name]
    }
}