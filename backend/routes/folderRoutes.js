const express = require("express");
const Folder = require("../models/Folder");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    const { name, parent } = req.body;
    try {
        const folder = new Folder({ name, parent, user: req.user.id });
        await folder.save();
        res.json(folder);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const folders = await Folder.find({ user: req.user.id });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
