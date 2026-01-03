import { TbEdit } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";



export default function Taskcard({task,status,onDelete,onEdit}){
return(
<>

<div className="m-h-15 min-w-xs  flex flex-wrap p-2 text-sm items-center rounded-md m-2 justify-evenly gap-5 text-white bg-gray-800">

<h2>{task}</h2>
<span className={status== "Completed" ? "rounded-full p-2 bg-green-400": status=="In progress" ? "rounded-full p-2 bg-yellow-400": "bg-gray-500 p-2 rounded-full" }>{status}</span>
<div className="flex text-lg gap-2">

 <TbEdit onClick={onEdit} className="text-gray-400 cursor-pointer" />
<RiDeleteBinFill onClick={onDelete} className="text-red-400 cursor-pointer"/>
</div>



</div>


</>

)



}