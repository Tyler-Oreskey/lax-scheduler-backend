module.exports = {
    getAll: async (req, res, next) => {
        return res.status(200).json({ message: "Returned all games!" });
    }
}