import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
  roomId: String,
  authorId: String,
  members: [String],
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
