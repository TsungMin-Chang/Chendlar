import { useRouter } from "next/navigation";
import useDummy from '@/hooks/useDummy';

export default function MonthCell({
  firstDayOfMonth,
  index
}: {
  firstDayOfMonth: Date,
  index: number
}) {

  const router = useRouter();
  const {dummy} = useDummy();
  
  return (
    <div 
      className="flex flex-col gap-y-1"
      onClick={() => router.push("/day")}
    >
      <div className="flex justify-center text-sm text-white">
        {index + 1 - firstDayOfMonth.getDay()}
      </div>
      <div className="rounded max-h-4 text-xs pl-1 bg-red-500">3.看電影</div>
      <div className="rounded max-h-4 text-xs pl-1 bg-pink-500">3.看電影</div>
      <div className="rounded max-h-4 text-xs pl-1 bg-blue-500">3.看電影</div>
      <div className="rounded max-h-4 text-xs pl-1 bg-purple-500">3.看電影</div>
      <div className="rounded max-h-4 text-xs pl-1 bg-yellow-500">3.看電影</div>
    </div>
  )
}