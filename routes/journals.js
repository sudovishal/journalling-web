const router = require("express").Router();
const Journal = require("../models/Journal.model");

router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const journals = await Journal.find({ userId: userId }).sort({
      createdAt: "desc",
    });
    res.render("dashboard", { journals: journals });
  } catch (error) {
    console.log(error);
    res.render("error", { error: error });
  }
});

module.exports = router;
