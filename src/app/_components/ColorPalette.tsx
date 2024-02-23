import type { Dispatch, SetStateAction } from "react";

export default function ColorPlatter({
  setColor,
}: {
  setColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <button
        className="h-6 w-6 rounded-full bg-yellow-500 hover:outline focus:outline"
        onClick={() => setColor("#AE6E28")}
      />
      <button
        className="h-6 w-6 rounded-full bg-yellow-600 hover:outline focus:outline"
        onClick={() => setColor("#9F6747")}
      />
      <button
        className="h-6 w-6 rounded-full bg-yellow-700 hover:outline focus:outline"
        onClick={() => setColor("#8D6B57")}
      />
      <button
        className="h-6 w-6 rounded-full bg-pink-800 hover:outline focus:outline"
        onClick={() => setColor("#8B4C07")}
      />
      <button
        className="h-6 w-6 rounded-full bg-red-600 hover:outline focus:outline"
        onClick={() => setColor("#A24F4F")}
      />
      <button
        className="h-6 w-6 rounded-full bg-gray-300 hover:outline focus:outline"
        onClick={() => setColor("#999897")}
      />
      <button
        className="h-6 w-6 rounded-full bg-purple-300 hover:outline focus:outline"
        onClick={() => setColor("#A696AC")}
      />
      <button
        className="h-6 w-6 rounded-full bg-purple-400 hover:outline focus:outline"
        onClick={() => setColor("#7B578C")}
      />
      <button
        className="h-6 w-6 rounded-full bg-indigo-400 hover:outline focus:outline"
        onClick={() => setColor("#6B73A2")}
      />
      <button
        className="h-6 w-6 rounded-full bg-pink-400 hover:outline focus:outline"
        onClick={() => setColor("#B67F8B")}
      />
    </>
  );
}
