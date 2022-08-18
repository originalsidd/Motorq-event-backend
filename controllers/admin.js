const { ObjectId } = require('mongodb');

const handleCreate = async (req, res, client) => {
    const { event_name, event_desc, start_time, end_time, location, capacity } =
        req.body;
    const new_event = {
        event_name,
        event_desc,
        start_time,
        end_time,
        location,
        capacity,
    };
    const result = await client
        .db('Motorq_sidd')
        .collection('events')
        .insertOne(new_event);
    return res.json(result);
};

const handleDelete = async (req, res, client) => {
    const { id } = req.params;
    const result = await client
        .db('Motorq_sidd')
        .collection('events')
        .deleteOne({ _id: ObjectId(id) });
    await res.json(result);
};

const handleUpdate = async (req, res, client) => {
    const updates = req.body;
    console.log(updates);
    const { id } = req.params;
    const result = await client
        .db('Motorq_sidd')
        .collection('events')
        .updateOne({ _id: ObjectId(id) }, { $set: updates });
    await res.json(result);
};

module.exports = {
    handleCreate,
    handleDelete,
    handleUpdate,
};
