import messageCollection from "../model/messageModel.js";

export const allMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageCollection.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ msg: "Message added successfully." });
    }
    return res.json({ msg: "Failed to add message to the databse." });
  } catch (err) {
    next(err);
  }
};

export const getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageCollection
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (err) {
    next(err);
  }
};
