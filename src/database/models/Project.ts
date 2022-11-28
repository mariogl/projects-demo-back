import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  technologies: {
    type: [String],
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = model("Project", projectSchema, "projects");

export default Project;
