const handleProfileGet = (req, res, db) => {
    const { id } = req.params; // Number is in a string !!!
    db
        .select('*')
        .from('users')
        .where({
            id: id
        })
        .then(user => {
            if (user.length) { // to check if there is an empty array. ( in js empty array is true, so we need to check the length in the array)
                res.json(user[0]);
            } else {
                res.status(400).json("not found")
            }
        })
        .catch(err => res.status(400).json("error getting user"))

}

module.exports = {
    handleProfileGet
}