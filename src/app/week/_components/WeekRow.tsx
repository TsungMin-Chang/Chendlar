import { useRouter } from "next/navigation";
import { Affair } from "@/lib/types";

export default function DayRow({
  data,
  rowDate
}: {
  data: Affair[] | null,
  rowDate: Date
}) {

  const days = [
    "SUN", 
    "MON", 
    "TUE", 
    "WED", 
    "THR", 
    "FRI", 
    "SAT"
  ];
  const router = useRouter();
  
  return (
    <div 
      key={rowDate.toLocaleDateString("en-US")}
      className="grid grid-cols-6"
    >
      {Array(6).fill(0).map((_, j) => (
        <div
          key={"cell" + j.toString()}
          className="flex justify-center items-center border border-[#4E4743]"
        >
          {j === 0 && (
            <div
              className="flex flex-col justify-center items-center text-gray-300 text-sm"
              onClick={() => router.push("/day")}
            >
              <div>{days[rowDate.getDay()]}</div>
              <div>
                {rowDate.getMonth() + 1}
                /
                {rowDate.getDate()}
              </div>
            </div>
          )}
          {j > 0 && data && data[j - 1] && (
            <div
              className="h-full w-full text-zinc-900"
              style={{backgroundColor: data[j - 1].color}}
            >
              {data[j - 1].title}
            </div>
          )}
          {j > 0 && (!data || !data[j - 1]) && (
            <div></div>
          )}
        </div>
      ))} 
    </div>
  );
}