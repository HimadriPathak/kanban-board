import { useAppDispatch } from "@/lib/hooks/redux";
import { onDrop } from "@/lib/states/task.slice";
import type { ColumnType } from "@/lib/types/task";
import { useState } from "react";

interface Props {
  isListEmpty?: boolean;
  column: ColumnType;
  position: number;
}

export default function DropArea({
  isListEmpty = false,
  column,
  position,
}: Props) {
  const dispatch = useAppDispatch();
  const [showDropArea, setShowDropArea] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={() => {
        dispatch(onDrop({ position, column }));
        setShowDropArea(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      className={`transition-all overflow-hidden ${
        showDropArea
          ? "h-[100px] opacity-100 p-[15px] mb-[15px]"
          : `${isListEmpty ? "h-full" : "h-[10px]"}  opacity-0 p-0 mb-0`
      }  w-full bg-[#dcdcdc] border border-dashed border-[#cfcfcf] rounded-[10px] flex items-center justify-center text-gray-800 font-semibold`}
    >
      Drop Here
    </section>
  );
}
