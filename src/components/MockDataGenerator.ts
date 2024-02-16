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
    patientId:  faker.helpers.arrayElement([
        'Emma', 'Liam', 'Olivia', 'Noah', 'Ava',
        'Isabella', 'Sophia', 'Jackson', 'Lucas', 'Aiden',
        'Mia', 'Ethan', 'Amelia', 'Harper', 'Evelyn',
        'Abigail', 'Emily', 'Ella', 'Benjamin', 'Logan',
        'Alexander', 'Grace', 'Avery', 'Lily', 'Zoe',
        'Charlotte', 'Mila', 'Chloe', 'Luna']),
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
