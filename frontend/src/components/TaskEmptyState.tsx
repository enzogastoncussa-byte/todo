import { Circle } from "lucide-react";
import { Card } from "./ui/card";
import { FilterType } from "../lib/data";

interface TaskEmptyStateProps {
  filter: string;
}

const TaskEmptyState = ({ filter }: TaskEmptyStateProps) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === FilterType.active
              ? "No tasks to do"
              : filter === FilterType.completed
                ? "No completed tasks"
                : "No tasks"}
          </h3>

          <p className="text-sm text-muted-foreground">
            {filter === FilterType.all
              ? "Add new task"
              : `Switch to ${FilterType.all} to see
                ${filter === FilterType.active ? "completed tasks" : "doing task"}`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskEmptyState;
