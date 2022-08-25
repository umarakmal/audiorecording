const User = require("../models/user");

// Retrieve all User from the database.
exports.findAll = async (req, res) => {
  try {
    var data = await User.find();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

//Retrive a user by ID
exports.findOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await User.findById(userId);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    const { name, email, role, password } = req.body;

    const data = await User.findByIdAndUpdate(
      id,
      { name, email, role, password },
      { useFindAndModify: false }
    );
    return res.status(200).json("Updated Successfully!");
  } catch (err) {
    if (err.code == 11000) {
      return res.status(422).send({
        error: "Email already exists",
      });
    }
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

// Delete a User with the specified id in the request
exports.Delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
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
