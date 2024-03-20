import type { Dispatch, SetStateAction } from "react";

export default function ColorPlatter({
  setColor,
}: {
  setColor: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <button
        className="h-6 w-6 rounded-full bg-[#FFC85D] hover:outline focus:outline"
        onClick={() => setColor("#FFC85D")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#F3935D] hover:outline focus:outline"
        onClick={() => setColor("#F3935D")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#F1922A] hover:outline focus:outline"
        onClick={() => setColor("#F1922A")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#FF8E9C] hover:outline focus:outline"
        onClick={() => setColor("#FF8E9C")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#FE6E6E] hover:outline focus:outline"
        onClick={() => setColor("#FE6E6E")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#C3C3C3] hover:outline focus:outline"
        onClick={() => setColor("#C3C3C3")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#EFABD8] hover:outline focus:outline"
        onClick={() => setColor("#EFABD8")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#C47FE4] hover:outline focus:outline"
        onClick={() => setColor("#C47FE4")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#9C7FF0] hover:outline focus:outline"
        onClick={() => setColor("#9C7FF0")}
      />
      <button
        className="h-6 w-6 rounded-full bg-[#6997F0] hover:outline focus:outline"
        onClick={() => setColor("#6997F0")}
      />
    </>
  );
}
