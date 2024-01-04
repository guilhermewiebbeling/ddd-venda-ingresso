import { Event } from "../event.entity";
import { PartnerId } from "../partner.entity";

test('Must create an event', () => {
    const event = Event.create({
        name: 'Event 1',
        description: 'Event description',
        date: new Date(),
        partner_id: new PartnerId()
    });

    event.addSection({
        name: 'Section 1',
        description: 'Section description',
        total_spots: 100,
        price: 1000
    });

    const [section] = event.sections;

    expect(event.sections.count()).toBe(1);
    expect(event.total_spots).toBe(100);
    expect(section.spots.count()).toBe(100);
    
    console.dir(event, {depth: 10});
});

test('Must publish all event items', () => {
    const event = Event.create({
        name: 'Event 1',
        description: 'Event description',
        date: new Date(),
        partner_id: new PartnerId()
    });

    event.addSection({
        name: 'Section 1',
        description: 'Section description',
        total_spots: 100,
        price: 1000
    });

    event.addSection({
        name: 'Section 2',
        description: 'Section 2 description',
        total_spots: 1000,
        price: 50
    });

    event.publishAll();

    expect(event.is_published).toBe(true);

    const [section1, section2] = event.sections.getItems();
    expect(section1.is_published).toBe(true);
    expect(section2.is_published).toBe(true);

    [...section1.spots, ...section2.spots].forEach((spot) => {
        expect(spot.is_published).toBe(true);
    });
})