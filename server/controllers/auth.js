import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    const { password, ...othersData } = newUser._doc;
    res.status(200).json(othersData);
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return console.log("err");

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return console.log(err);

    const { password, ...othersData } = user._doc;

    res.status(200).json(othersData);
  } catch (err) {
    console.log(err);
  }
};
