const saltRounds = 10;

const handleSignup = async (req, res, client, bcrypt) => {
    const { name, password, events } = req.body;
    if (!name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    const new_user = {
        name,
        password: hash,
        events,
    };
    const result = await client
        .db('Motorq_sidd')
        .collection('users')
        .insertOne(new_user);
    return res.json(result);
};

module.exports = {
    handleSignup,
};
