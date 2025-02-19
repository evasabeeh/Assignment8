const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../models/Image");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

// Multer middleware
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
});

// 🖼 Upload an Image
router.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
    const { name, folder } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const image = new Image({
            name,
            url: `/uploads/${req.file.filename}`,
            folder,
            user: req.user.id,
        });

        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// 📂 Get Images in a Folder
router.get("/folder/:folderId", authMiddleware, async (req, res) => {
    try {
        const images = await Image.find({ folder: req.params.folderId, user: req.user.id });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 🔍 Search Images by Name
router.get("/search", authMiddleware, async (req, res) => {
    const { query } = req.query;
    try {
        const images = await Image.find({
            user: req.user.id,
            name: { $regex: query, $options: "i" },
        });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
