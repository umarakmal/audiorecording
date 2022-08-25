const express = require("express");
const router = express.Router();

const {
  agentInput,
  allUsersRecordingDate,
  upload,
  allUsersRecording,
  DeleteUser,
} = require("../controllers/recording");

router.post("/agentinput", upload.single("audioURL"), agentInput);
router.post("/allusersrecordingwithdate", allUsersRecordingDate);
router.get("/allusersrecordings", allUsersRecording);
router.delete("/userrecordings/:id", DeleteUser);
module.exports = router;
