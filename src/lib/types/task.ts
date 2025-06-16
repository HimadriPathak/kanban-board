export type ColumnType = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnType;
  createdAt: number;
  updatedAt: number;
  tags: string[];
  color: string;
}
