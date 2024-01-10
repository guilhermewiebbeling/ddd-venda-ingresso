import { Partner } from "../partner.entity";
import { initOrm } from "./helper";

describe('Partner tests', () => {
    initOrm();
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
});