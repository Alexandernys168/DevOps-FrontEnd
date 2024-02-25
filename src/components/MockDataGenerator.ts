import {Faker, faker} from '@faker-js/faker';

interface Event {
    id: string;
    patientId: string;
    result: string;
    registeredAt: number;
}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: Date;
    email:string;
    phoneNumber: string;

}

// Function to generate mock Event data
export const generateMockEvent = (): Event => ({

    id: faker.string.uuid(),
    patientId:  faker.person.fullName(),
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


export const generateMockEventForPatient = (firstName: string): Event => ({

    id: faker.string.uuid(),
    patientId:  firstName,
    result: faker.helpers.arrayElement(['positive', 'negative']),
    registeredAt: faker.date.between({from: '2020-01-01T00:00:00.000Z', to: '2024-03-01T00:00:00.000Z'}).getTime()
});

// Function to generate an array of mock Event data
export const generateMockEventsForPatient = (count: number, firstName: string): Event[] => {
    const events = [];
    for (let i = 0; i < count; i++) {
        events.push(generateMockEventForPatient(firstName));
    }
    return events;
};

export const generateMockPatient = (): Patient => ({

    id: faker.string.uuid(),
    name:  faker.person.fullName(),
    dateOfBirth: faker.date.birthdate(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number()

});

export const generateMockPatients= (count: number): Patient[] => {
    const patients = [];
    for (let i = 0; i< count; i++){
        patients.push(generateMockPatient())
    }
    return patients;
}