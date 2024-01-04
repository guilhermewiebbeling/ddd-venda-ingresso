import { Partner } from "../partner.entity";

test('Must create an event', () => {
    const partner = Partner.create({
        name: 'Partner 1',
    });

    const event = partner.initEvent({
        name: 'Event 1',
        description: 'Event description',
        date: new Date(),
    });

    console.log(event);
})