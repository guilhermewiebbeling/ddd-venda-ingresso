import { IIntegrationEvent } from "../../../common/domain/integration-event";
import { PartnerCreatedEvent } from "../domain-events/partner-created.event";

export class PartnerCreatedIntegrationEvent implements IIntegrationEvent {

    event_name: string;
    payload: any;
    event_version: number;
    occurred_on: Date;

    constructor(domainEvent: PartnerCreatedEvent) {
        this.event_name = PartnerCreatedEvent.name;
        this.payload = {
            id: domainEvent.aggregate_id.value,
            name: domainEvent.name
        };
        this.event_version = 1;
        this.occurred_on = domainEvent.occurred_on;
    }
}