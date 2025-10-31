import { Calendar, CheckCircle2, Circle, SquarePen, Trash } from "lucide-react";
import type { Task } from "../lib/data";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { cn } from "../lib/utils";
import api from "../lib/axios";
import { toast } from "sonner";
import { useState } from "react";

interface TaskCardProps {
  index: number;
  task: Task;
  handleTaskChange: () => void;
}

const TaskCard = ({ index, task, handleTaskChange }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully");
      handleTaskChange();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle,
        content: "none",
      });
      toast.success("Task updated successfully");
      handleTaskChange();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  const toggleTaskstatus = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success("Task completed successfully");
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success("Task activated successfully");
      }
      handleTaskChange();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update task");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskstatus}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/*Show or edit title */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              placeholder="To do ?"
              className="flex-1 w-full h-12 px-3 py-2 text-base bg-background border border-border/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                setIsEditing(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text- base transition-all durastion-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* Date */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground"></Calendar>
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/*edit & delete */}
        <div
          className={`gap-2 group-hover:inline-flex animate-slide-up ${isEditing ? "" : "hidden"}`}
        >
          {/*edit */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info",
              isEditing ? "text-info" : "",
            )}
            onClick={() => {
              setIsEditing(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>

          {/*delete */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
