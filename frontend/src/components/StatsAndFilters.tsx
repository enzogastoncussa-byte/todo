import React from "react";
import { FilterType, type FilterValue } from "../lib/data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

interface StatsAndFiltersProps {
  completedTasksCount?: number;
  activeTasksCount?: number;
  filter?: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const StatsAndFilters: React.FC<StatsAndFiltersProps> = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = FilterType.all,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeTasksCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success"
        >
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {(Object.keys(FilterType) as FilterValue[]).map((key) => (
          <Button
            key={key}
            variant={filter === key ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
            onClick={() => onFilterChange(key)}
          >
            <Filter className="size-4" />
            {FilterType[key]}
          </Button>
        ))}
      </div>
    </div>
  );
};
