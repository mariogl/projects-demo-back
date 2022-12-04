import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
