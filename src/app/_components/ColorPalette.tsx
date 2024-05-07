import type { Dispatch, SetStateAction } from "react";

type ColorPlatterProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

export default function ColorPlatter({ color, setColor }: ColorPlatterProps) {
  return (
    <>
      <button
        className={`h-6 w-6 rounded-full bg-[#fabe4e] ${color === "#fabe4e" && "outline"}`}
        onClick={() => setColor("#fabe4e")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#C3C3C3] ${color === "#C3C3C3" && "outline"}`}
        onClick={() => setColor("#C3C3C3")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#EFABD8] ${color === "#EFABD8" && "outline"}`}
        onClick={() => setColor("#EFABD8")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#FF8E9C] ${color === "#FF8E9C" && "outline"}`}
        onClick={() => setColor("#FF8E9C")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#FE6E6E] ${color === "#FE6E6E" && "outline"}`}
        onClick={() => setColor("#FE6E6E")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#c1a7e5] ${color === "#c1a7e5" && "outline"}`}
        onClick={() => setColor("#c1a7e5")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#C47FE4] ${color === "#C47FE4" && "outline"}`}
        onClick={() => setColor("#C47FE4")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#9C7FF0] ${color === "#9C7FF0" && "outline"}`}
        onClick={() => setColor("#9C7FF0")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#6997F0] ${color === "#6997F0" && "outline"}`}
        onClick={() => setColor("#6997F0")}
      />
      <button
        className={`h-6 w-6 rounded-full bg-[#7683dd] ${color === "#7683dd" && "outline"}`}
        onClick={() => setColor("#7683dd")}
      />
    </>
  );
}
