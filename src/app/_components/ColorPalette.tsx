import { Dispatch, SetStateAction} from "react";

export default function ColorPlatter({ 
  setColor 
}: {setColor: Dispatch<SetStateAction<string>>}) {

	return (
		<>
      <button className="bg-yellow-500 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("AE6E28")}/>
      <button className="bg-yellow-600 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("9F6747")}/>
      <button className="bg-yellow-700 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("8D6B57")}/>
      <button className="bg-pink-800 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("8B4C07")}/>
      <button className="bg-red-600 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("A24F4F")}/>
      <button className="bg-gray-300 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("93908B")}/>
      <button className="bg-purple-300 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("A696AC")}/>
      <button className="bg-purple-400 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("7B578C")}/>
      <button className="bg-indigo-400 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("6B73A2")}/>
      <button className="bg-pink-400 w-6 h-6 rounded-full hover:outline focus:outline" onClick={()=>setColor("B67F8B")}/>
    </>
	);
}
