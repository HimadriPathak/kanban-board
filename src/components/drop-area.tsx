import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { onDrop } from "@/lib/states/task.slice";
import type { ColumnType } from "@/lib/types/task";
import { useState } from "react";

interface Props {
  column: ColumnType;
  position: number;
}

export default function DropArea({ column, position }: Props) {
  const dispatch = useAppDispatch();
  const [showDropArea, setShowDropArea] = useState(false);
  const activeTaskIndex = useAppSelector(
    (state) => state.tasks.activeTaskIndex
  );

  const handleDrop = () => {
    dispatch(onDrop({ position, column }));
    setShowDropArea(false);
  };

  return (
    <section
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`w-full transition-all duration-200 overflow-hidden
        ${
          showDropArea
            ? "h-[100px] p-[15px] mb-[15px] opacity-100"
            : activeTaskIndex !== undefined
            ? "h-[6px] my-[6px] bg-neutral-800 dark:bg-neutral-200 opacity-70"
            : "h-0 opacity-0"
        }
        ${
          showDropArea
            ? "bg-[#dcdcdc] border border-dashed border-[#cfcfcf] rounded-[10px] flex items-center justify-center text-gray-800 font-semibold"
            : activeTaskIndex !== undefined
            ? "rounded-md"
            : ""
        }
      `}
    >
      {showDropArea && "Drop Here"}
    </section>
  );
}
