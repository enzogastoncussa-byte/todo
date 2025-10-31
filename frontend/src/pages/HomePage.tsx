import type React from "react";
import { Header } from "../components/Header";
import { AddTask } from "../components/AddTask";
import { Footer } from "../components/Footer";
import { StatsAndFilters } from "../components/StatsAndFilters";
import { TaskList } from "../components/TaskList";
import { TaskListPagination } from "../components/TaskListPagination";
import { DateTimeFilter } from "../components/DateTimeFilter";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { PAGE_SIZE, type FilterValue, type Task } from "../lib/data";
import api from "../lib/axios";

export default function HomePage(): React.ReactElement {
  const [taskBuffer, setTaskBuffer] = useState<Task[]>([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState<FilterValue>("all");
  const [dateQuery, setDateQuery] = useState<string>("today");
  const [page, setPage] = useState(1);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);

      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompletedTasksCount(res.data.completedCount);
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tasks");
    }
  }, [dateQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks: Task[] = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:
        return true;
    }
  });

  // Pagination
  const visibleTasks = filteredTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const totalPages = Math.ceil(filteredTasks.length / PAGE_SIZE);

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleTaskChange = () => {
    fetchTasks();
  };

  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter);
    //console.log(FilterType[newFilter]);
  };

  // const setDateQuery = (date: string) => {
  //   setDateQuery(date);
  // }

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChange} />

          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            filter={filter}
            onFilterChange={handleFilterChange}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChange={handleTaskChange}
          />

          {/* Phân trang và lọc theo Date */}
          {/* <TaskListPagination /> */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handlePageChange={handlePageChange}
              handleNext={handleNext}
              handlePrev={handlePrev}
              currentPage={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Footer */}
          <Footer
            completedTasksCount={completedTasksCount}
            activeTasksCount={activeTasksCount}
          />
        </div>
      </div>
    </div>
  );
}
