const router = require("express").Router();
const Journal = require("../models/Journal.model");

router.put("/journals/:slug/toggle-public", async (req, res) => {
  try {
    const slug = req.params.slug;
    const newIsPublic = req.body.isPublic; // Check if the checkbox is checked
    const journal = await Journal.findOne({ slug: slug });
    if (!journal) {
      res.status(404).send("Journal not found");
    } else {
      // Update the visibility of the journal
      journal.isPublic = newIsPublic;
      await journal.save();
      console.log(journal.newIsPublic);
      //  res.redirect('/journals');
      res.status(200).json({ updatedvisibility: journal.isPublic });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router
