import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "complete"],
        default: "active",
    },
    completedAt: {
        type: Date,
        default: null
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },

},
    {
        timestamps: true,
    });

const Task = mongoose.model("Task", tasksSchema);
export default Task;
