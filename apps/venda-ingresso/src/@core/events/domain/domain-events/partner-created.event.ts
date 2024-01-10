import { IDomainEvent } from "../../../../@core/common/domain/domain-event";
import { PartnerId } from "../entities/partner.entity";

export class PartnerCreatedEvent implements IDomainEvent {
    readonly event_version: number = 1;
    readonly occurred_on: Date;

    constructor(readonly aggregate_id: PartnerId, readonly name: string) {
        this.occurred_on = new Date();
    }
}