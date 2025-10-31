import Task from "../../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // YYYY-MM-DD HH:mm
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : +1);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth, 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(400).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, content } = req.body;
    const task = new Task({ title, content });
    const newTask = await task.save();
    res.status(200).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }, // return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTask = await Task.findByIdAndDelete(id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ message: error.message });
  }
};
