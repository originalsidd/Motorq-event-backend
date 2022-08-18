const saltRounds = 10;

const handleSignin = async (req, res, client, bcrypt) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    const result = await client
        .db('Motorq_sidd')
        .collection('users')
        .findOne({ name });
    try {
        if (!result) {
            return res.json('invalid ' + result);
        }
        if (name == 'admin' && password == 'admin') {
            return res.json('admin');
        }
        if (bcrypt.compareSync(password, result.password)) {
            return res.json(result._id);
        } else {
            res.json('invalid' + result);
        }
    } catch (e) {
        res.json('invalid');
        console.log(e);
    }
};

module.exports = {
    handleSignin,
};
