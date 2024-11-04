import mongoose from "mongoose";

const queueSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  telepon: {
    type: String,
    require: true
  },
  queue: {
    type: String,
    require: true
  },
  startQueue: {
    type: String,
    require: true
  },
  estimationQueue: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: false
  }
});

const queue = mongoose.model("queue", queueSchema);

export default queue;