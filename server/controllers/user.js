import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const getUser = async (req, res) =>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
export const update = async (req, res) =>{
  // if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
    }
  // } else {
  //   return console.log(err);
  // }
};
export const deleteUser = async (req, res) =>{
  // if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.deleteMany({ userId: req.params.id });

      res.status(200).json("User delete");
    } catch (err) {
      console.log(err);
    }
  // } else {
  //   return console.log(err);
  // }
};

export const follow = async (req, res) =>{
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      // console.log(error)
    }
    res.status(200).json("following the user");
  } catch (err) {
    console.log(err);
  }
};
export const unFollow = async (req, res) =>{
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
    }
    res.status(200).json("unfollowing the user");
  } catch (err) {
    console.log(err);
  }
};
