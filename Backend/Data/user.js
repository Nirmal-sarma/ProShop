import bcrypt from 'bcryptjs';

const user=[
    {
        name:"Admin User",
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name:"John",
        email: 'John@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name:"Rahul",
        email: 'Rahul@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    }
]

export default user;