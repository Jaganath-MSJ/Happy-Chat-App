import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    username: {
        type: String,
        requied: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        requied: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        requied: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
});

const userCollection = mongoose.model("Users", useSchema);

export default userCollection;