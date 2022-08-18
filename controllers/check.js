const handleCheckGet = (req, res, db) => {
    const { id } = req.params;
    let new_id = parseInt(id, 10) + 1;
    res.json(new_id);
};

module.exports = {
    handleCheckGet,
};
