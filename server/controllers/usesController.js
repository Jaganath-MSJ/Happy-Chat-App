import userCollection from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await userCollection.findOne({ username });
    if (usernameCheck) {
      return res.json({ msj: "username already used", status: false });
    }
    const emailCheck = await userCollection.findOne({ email });
    if (emailCheck) {
      return res.json({ msj: "email already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userCollection.create({
      username,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username });
    if (!user) {
      return res.json({ msj: "Incorrect username", status: false });
    }
    const isPassworsValid = await bcrypt.compare(password, user.password);
    if (!isPassworsValid) {
      return res.json({ msj: "Incorrect passowrd", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await userCollection.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
    try {
      const users = await userCollection.find({_id: {$ne: req.params.id}}).select([
        "email","username","avatarImage","_id"
      ]);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  };
  