const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("coderslab", todoSchema);

// get all todo
router.get("/", async (req, res) => {
  try {
    const data = await Todo.find();
    res.status(200).json({
      result: data,
      message: "Todo was send successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "There was a Server Side Error!" });
  }
});

// get a todos
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Todo was send successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "There was a Server Side Error!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newVote = new Todo(req.body);
    await newVote.save();

    res.status(200).json({
      newVote,
      message: "Vote was inserted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server-side error",
    });
  }
});

// post multiple todos
router.post("/all", (req, res) => {
  Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).send({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "todo was inserted successfully",
      });
    }
  });
});

// put todo

router.patch("/:id", async (req, res) => {
  console.log(req.body);
  try {
    const doc = await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({ message: "Todo Was Update successfully!" });
  } catch (error) {
    res.status(500).json({ error: "There was a Server Side Error!" });
  }
});

// delete one todo
router.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.status(200).json({
        message: "Vote is deleted successfully",
      });
    } else {
      res.status(404).json({
        error: "Vote not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "There was a server side error",
    });
  }
});

module.exports = router;

// router.delete("/:id", async (req, res) => {
//   try {
//     const result = await Vote.deleteOne({ _id: req.params.id });

//     if (result.deletedCount === 1) {
//       res.status(200).json({
//         message: "Vote is deleted successfully",
//       });
//     } else {
//       res.status(404).json({
//         error: "Vote not found",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       error: "There was a server side error",
//     });
//   }
// });

// post A Vote
// router.post("/", async (req, res) => {
//   try {
//     const newVote = new Vote(req.body);
//     await newVote.save();

//     res.status(200).json({
//       newVote,
//       message: "Vote was inserted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: "There was a server-side error",
//     });
//   }
// });
