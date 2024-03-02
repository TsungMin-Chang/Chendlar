// server side component

export default function EventItems() {
  return (
    <>
      {/* wil be using map function */}
      <div 
        className="flex flex-row items-center justify-center border-2 border-zinc-700 rounded-full p-2"
      >
        <div className="flex items-center pl-2">
          爬玉山
        </div>
        <div className="grow"></div>
        <div className="flex items-center text-sm pr-2">
          2023/3/1 - 2024/3/1
        </div>
      </div>

      <div className="flex flex-row items-center justify-center border-2 border-zinc-700 rounded-full p-2">
        <div className="flex items-center pl-2">
          爬玉山
        </div>
        <div className="grow"></div>
        <div className="flex items-center text-sm pr-2">
          2023/3/1 - 2024/3/1
        </div>
      </div>
    </>
  );
}
