const { ObjectId } = require('mongodb');

const handleRegister = async (req, res, client) => {
    const { event_id, code } = req.body;
    const { id } = req.params;
    const result1 = await client
        .db('Motorq_sidd')
        .collection('users')
        .findOne({ _id: ObjectId(id) });
    if (result1.events.includes(event_id)) {
        return res.json('already');
    }
    console.log(result1);
    result1.events.push(event_id);
    console.log(result1);
    const new_user = {
        name: result1.name,
        password: result1.password,
        events: result1.events,
    };
    const re = await client
        .db('Motorq_sidd')
        .collection('events')
        .findOne({ _id: ObjectId(event_id) });
    await client
        .db('Motorq_sidd')
        .collection('events')
        .updateOne(
            { _id: ObjectId(event_id) },
            { $set: { capacity: `${parseInt(re.capacity) - 1}` } }
        );
    await client.db('Motorq_sidd').collection('codes').insertOne({ code });
    console.log(re);
    const result = await client
        .db('Motorq_sidd')
        .collection('users')
        .updateOne(
            { _id: ObjectId(id) },
            { $set: { events: [...new_user.events, event_id] } }
        );
    await res.json(result);
};

const handleDeRegister = async (req, res, client) => {
    const { event_id } = req.body;
    const { id } = req.params;
    const result1 = await client
        .db('Motorq_sidd')
        .collection('users')
        .findOne({ _id: ObjectId(id) });
    console.log(result1);
    result1.events = result1.events.filter((event) => event !== event_id);
    console.log(result1);
    const new_user = {
        name: result1.name,
        password: result1.password,
        events: result1.events,
    };
    const re = await client
        .db('Motorq_sidd')
        .collection('events')
        .findOne({ _id: ObjectId(event_id) });
    await client
        .db('Motorq_sidd')
        .collection('events')
        .updateOne(
            { _id: ObjectId(event_id) },
            { $set: { capacity: `${parseInt(re.capacity) + 1}` } }
        );
    const result = await client
        .db('Motorq_sidd')
        .collection('users')
        .updateOne(
            { _id: ObjectId(id) },
            { $set: { events: [...new_user.events] } }
        );
    await res.json(result);
};

module.exports = {
    handleRegister,
    handleDeRegister,
};
