export const FilterType = {
  all: "all",
  active: "active",
  completed: "completed",
} as const;

export type FilterValue = (typeof FilterType)[keyof typeof FilterType];

export interface Task {
  _id: string;
  title: string;
  status?: string;
  completedAt?: Date;
  createdAt: Date;
}

export const options = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "week",
    label: "This Week",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "all",
    label: "All",
  },
];

export const PAGE_SIZE = 5;
