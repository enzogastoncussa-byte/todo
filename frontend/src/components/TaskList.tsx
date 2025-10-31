import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
import type { FilterValue, Task } from "../lib/data";

export const TaskList = ({
  filteredTasks,
  filter,
  handleTaskChange,
}: {
  filteredTasks: Task[];
  filter: FilterValue;
  handleTaskChange: () => void;
}) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handleTaskChange={handleTaskChange}
        />
      ))}

      <p></p>
    </div>
  );
};
