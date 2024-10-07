import { User } from '@angular-task/core-services';

export const MOCK_USERS: User[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        username: 'alicej',
        email: 'alice.johnson@example.com',
        phone: '555-1234',
        website: 'https://alicejohnson.com',
        company: {
            name: 'Johnson Technologies',
            catchPhrase: 'Innovating the Future',
            bs: 'Enterprise solutions',
        },
        address: {
            street: '123 Elm Street',
            suite: 'Suite 100',
            city: 'Springfield',
            zipcode: '62704',
            geo: {
                lat: '39.7817',
                lng: '-89.6501',
            },
        },
    },
    {
        id: 2,
        name: 'Bob Smith',
        username: 'bobsmith',
        email: 'bob.smith@example.com',
        phone: '555-5678',
        website: 'https://bobsmith.io',
        company: {
            name: 'Smith Industries',
            catchPhrase: 'Building the World',
            bs: 'Manufacturing and logistics',
        },
        address: {
            street: '456 Oak Avenue',
            suite: 'Suite 200',
            city: 'Metropolis',
            zipcode: '62960',
            geo: {
                lat: '37.1519',
                lng: '-88.7312',
            },
        },
    },
    {
        id: 3,
        name: 'Catherine Lee',
        username: 'catherinelee',
        email: 'catherine.lee@example.com',
        phone: '555-9876',
        website: 'https://catherinelee.com',
        company: {
            name: 'Lee Innovations',
            catchPhrase: 'Leading with Ideas',
            bs: 'Research and development',
        },
        address: {
            street: '789 Maple Drive',
            suite: 'Suite 300',
            city: 'Gotham',
            zipcode: '10001',
            geo: {
                lat: '40.7128',
                lng: '-74.0060',
            },
        },
    },
];
