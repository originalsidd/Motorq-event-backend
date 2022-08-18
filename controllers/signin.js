const saltRounds = 10;

const handleSignin = async (req, res, client, bcrypt) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const new_user = {
        name,
    };
    const result = await client
        .db('Motorq_sidd')
        .collection('users')
        .findOne({ name: new_user.name });
    if (!result) {
        return res.json('invalid');
    }
    try {
        if (bcrypt.compareSync(password, result.password)) {
            res.json(result._id);
        } else {
            res.json('invalid');
        }
    } catch (e) {
        res.json('invalid');
        console.log(e);
    }
};

module.exports = {
    handleSignin,
};
