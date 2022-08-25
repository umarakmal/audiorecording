const RecordInput = require("../models/record_input");
const multer = require("multer");
var path = require("path");
const { v4: uuidv4 } = require("uuid");

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads/files");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      uuidv4() + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

exports.upload = multer({ storage: storage });

exports.agentInput = async (req, res) => {
  try {
    // Create
    // const audio = req.file.filename
    var recordinput = await new RecordInput({
      name: req.body.name,
      mobile: req.body.mobile,
      audioURL: req.file.filename,
      //audioURL: req.file.filename,
    });
    // Save recording name and user details in the database

    await recordinput.save(recordinput);
    return res.status(200).send("Added Successfully!");
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred.",
    });
  }
};

// Retrieve all User from the database.
exports.allUsersRecordingDate = async (req, res) => {
  try {
    var startDate = req.body.date1;
    var endDate = req.body.date2;
    var data = await RecordInput.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

//Find all user details along with recordings

// Retrieve all User from the database.
exports.allUsersRecording = async (req, res) => {
  try {
    var data = await RecordInput.find();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

// Delete a User with the specified id in the request
exports.DeleteUser = (req, res) => {
  const id = req.params.id;
  RecordInput.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
