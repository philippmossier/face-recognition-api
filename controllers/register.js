
const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const { email, name, password } = req.body;
    if (!email | !name | !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => { // for help read in the knéx.js documents
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')// returns the new user within response, (insert and returning are knex commands)
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]); // returning response with new user data
                    })
            })
            .then(trx.commit)        // for help read in the knex.js documents
            .catch(trx.rollback)    // for help read in the knex.js documents
    })
        .catch(err => res.status(400).json("unable to register"))
}


module.exports = {
    handleRegister
}