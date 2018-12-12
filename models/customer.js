import faker from 'faker';

// function to generate fake user using faker
function User(id) {
    return {
        id: id,
        name: faker.name.findName(),
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        status: "Hot"
    };
}

// populate fake db, I add plus one so I don't have customer by id 0
let UsersDb = Array.from(Array(10), (_, i) => User(i + 1));

module.exports = app => {
    return {
        // Emulate how Sequlize ORM function look like to fetch customers
        findAll: () => {
            return new Promise((resolve, reject) => {
                resolve(UsersDb);
            });
        },
        batchCreate: () => {
            return new Promise((resolve, reject) => {
                UsersDb = Array.from(Array(10), (_, i) => User(i + 1));
                resolve(UsersDb);
            });
        },
        DeleteAll: () => {
            return new Promise((resolve, reject) => {
                UsersDb = [];
                resolve(UsersDb);
            });
        }
    };
};