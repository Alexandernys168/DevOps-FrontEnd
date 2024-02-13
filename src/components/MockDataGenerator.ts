import {Faker, faker} from '@faker-js/faker';

interface Event {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;
}

// Function to generate mock Event data
export const generateMockEvent = (): Event => ({
    id: faker.string.uuid(),
    patientId: faker.person.firstName(),
    result: faker.helpers.arrayElement(['positive', 'negative']),
    registeredAt: faker.date.between({from: '2020-01-01T00:00:00.000Z', to: '2024-03-01T00:00:00.000Z'}).getTime()
});

// Function to generate an array of mock Event data
export const generateMockEvents = (count: number): Event[] => {
    const events = [];
    for (let i = 0; i < count; i++) {
        events.push(generateMockEvent());
    }
    return events;
};
