import Queue from "../models/queueModel.js";

export const createQueue = async (req, res) => {
  try {
    const queueData = req.body
    const telepon = queueData.telepon

    // const getQueue = await Queue.findOne({ telepon });
    const getQueue = await Queue.find({telepon})
    
    // Check if queue null
    if(getQueue.length == 0) {
      const firsQueue = {...queueData, status: "In Queue"}
      const newQueue = new Queue(firsQueue);
      const queue = await newQueue.save();
      
      const response = {
        status: 201,
        message: "success create queue",
        data: queue
      }
      return res.status(201).json(response);
    }

    const lastQueue = getQueue[getQueue.length-1];

    // Check if queue already exists
    if (lastQueue.status == "In Queue") {
      return res.status(409).json({ message: "Queue already exists" });
    }
    
    const newQueue = new Queue({...queueData, status: "In Queue"});

    const queue = await newQueue.save();
    const response = {
      status: 201,
      message: "success create queue",
      data: queue
    }

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getQueues = async (req, res) => {
  try {
    const queues = await Queue.find();
    res.status(200).json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getQueueByUser = async (req, res) => {
  try {
    const queue = await Queue.find({ telepon: req.query.telepon });
    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateQueue = async (req, res) => {
  try {
    const queueId = req.body.id;
    const queue = await Queue.findByIdAndUpdate(queueId, {status: "Success"}, { new: true });
    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}