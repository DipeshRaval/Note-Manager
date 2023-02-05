const express = require("express");
const router = express.Router();
const Note = require("../model/Notes");
const fetchUser = require("../middleware/fetchUser");

//for valiadation imports
const { body, validationResult } = require("express-validator");

// get all note BY GET /note/getallnotes
router.get("/getallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    console.log(error);
    res.json(error).status(400);
  }
});

//create a note usinfg  POST -> /create
router.post(
  "/create",
  fetchUser,
  [
    body("title")
      .isLength({
        min: 3,
      })
      .withMessage("title must be at least 3 chars long"),
    // description must be at least 5 chars long
    body("description")
      .isLength({
        min: 5,
      })
      .withMessage("description must be at least 5 chars long"),
  ],
  async (req, res) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user.id,
      });

      return res.json(note);
    } catch (error) {
      console.log(error);
      res.json(error).status(400);
    }
  }
);

// update a note PUT - update
router.put("/update/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let updateObj = {};
    if (title) {
      updateObj.title = title;
    }
    if (description) {
      updateObj.description = description;
    }
    if (tag) {
      updateObj.tag = tag;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: updateObj },
      { new: true }
    );

    return res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res.json(error).status(400);
  }
});

// Delete a note : DELETE - del/:id
router.delete("/del/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit" });
    }

    note = await Note.findByIdAndDelete(req.params.id);
    return res.status(200).send(note);
  } catch (error) {
    console.log(error);
    res.json(error).status(400);
  }
});

module.exports = router;
