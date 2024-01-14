import mongoose from "mongoose";

// const itemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please provide a name"],
//     trim: true,
//     maxlength: [20, "Name cannot be more than 20 characters"],
//   },
//   file: {
//     type: String,
//     required: [true, "Please provide a file"],
//   },
// });

// export default mongoose.model("Item", itemSchema);
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  file: {
    type: String,
    required: [true, "Please provide a file"],
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Item", itemSchema);
