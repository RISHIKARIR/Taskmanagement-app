import { MdLogout } from "react-icons/md";




export default function Navbar({handleLogout,username}){
return(
<>


<div className="bg-gray-800 h-20 w-full border-white flex items-center px-5 justify-between">
<div className="flex items-center justify-center">
<img className="h-15" src="./src/assets/logotag.png"></img><h1 className="text-white text-md font-serif font-bold">Primetrade.AI</h1>

</div>


<button onClick={()=>{console.log("LOGOUT CLICKED");handleLogout();}} className="text-white font-serif font-semibold text-sm cursor-pointer flex "><MdLogout/> Logout</button>


</div>





</>



)


}