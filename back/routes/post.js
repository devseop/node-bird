const express = require("express");
const router = express.Router();

// post
router.post("/", (req, res) => {
  res.json({ id: 1, content: "hello" });
});

// delete
router.delete("/", (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
