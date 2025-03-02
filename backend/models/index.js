import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
    stage: { type: String, default: "Requested" },
    index: { type: Number, default: 0 },
    attachment: [{ url: String }]  // Removed unnecessary `type: String`
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },  // Added required validation
    description: { type: String, required: true },
    task: [taskSchema]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
