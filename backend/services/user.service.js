const usermodel = require('../models/user.models');
const user = require('../models/user.models');


module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are require')
    }
    const user = usermodel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}