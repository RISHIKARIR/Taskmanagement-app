import Navbar from "../Components/Navbar"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Taskcard from "../Components/Taskcard";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";




export default function Dashboard(){

 const navigate = useNavigate();  
 const username = localStorage.getItem("user");
 


const [Tasks,settask] = useState([]);


const [newtask,setnewtask] = useState("");
const [editindex,seteditindex] = useState(null);
const [edittask,setedittask] = useState("")
const [editstatus,seteditstatus] = useState("")
const [searchQuery, setSearchQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("All");




const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
  navigate("/");
};




const filteredTasks = Tasks.filter((task) => {
  const matchesSearch = task.task
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === "All" || task.status === statusFilter;

  return matchesSearch && matchesStatus;
});


function startEdit(index) {
  seteditindex(index);
  setedittask(Tasks[index].task);
  seteditstatus(Tasks[index].status);
}





function addtask(){
    if(newtask.trim()==="")return;

const taskobject = {
    task:newtask,
    status:"Pending"

}



settask([...Tasks, taskobject]);
setnewtask("");
}


function saveEdit() {
  const updatedTasks = Tasks.map((item, index) =>
    index === editindex
      ? { ...item, task: edittask, status: editstatus }
      : item
  );

  settask(updatedTasks);
  seteditindex(null);
}




function deleteTask(indexToDelete) {
  const updatedtasks = Tasks.filter((_, index) => index !== indexToDelete);
  settask(updatedtasks);
}




return(
<>

<div className="h-screen bg-gray-900">
    <Navbar handleLogout = {handleLogout}/>



<div className="m-h-35 text-white gap-4 p-4 font-bold flex flex-col items-center justify-center rounded-md flex bg-gray-800 m-5 rounded-md">

<h2 className="text-white">Welcome Back {username}</h2>


<p>Add New Task</p>

<div className="flex gap-2">
    <FormControl size="small" sx={{
    minWidth: 120,
    "& .MuiInputLabel-root": {
      color: "#d1d5db", 
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#3b82f6",
    },
  }}>
  <InputLabel>Filter</InputLabel>
  <Select
    value={statusFilter}
    label="Status"
    onChange={(e) => setStatusFilter(e.target.value)}
  sx={{
      color: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#9ca3af", 
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#3b82f6",
      },
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    }}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="To do">To do</MenuItem>
    <MenuItem value="In progress">In progress</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
  </Select>
</FormControl>
<TextField value={newtask} onChange={(e)=>{setnewtask(e.target.value)}} sx=
{{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    input: {
      color: "white",
    },}}
     id="outlined-basic" label="Type Task Here" size="small"
 variant="outlined" />

 <Button onClick={addtask} sx={{
    minWidth: 0,
    padding: '2px 6px',
    fontSize: '0.7rem',
    lineHeight: 1.2,
  }} variant="contained">Add Task</Button>

</div>



<div className="flex gap-2">
<TextField
  size="small"
  label="Search task"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  sx={{
    minWidth: 200,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9ca3af",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3b82f6",
    },
    "& .MuiInputLabel-root": {
      color: "#d1d5db",
    },
    input: {
      color: "white",
    },
  }}
   />
 <Button onClick={addtask} size="small" variant="contained">Search</Button>
</div>


</div>


<div className="flex flex-col items-center text-white font-semibold">
<h2>Tasks</h2>

{filteredTasks.map((item,index)=>{
    return <Taskcard task={item.task} status={item.status} onDelete = {()=>deleteTask(index)}  onEdit={() => startEdit(index)}/>
    
    })}
 

{editindex !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-gray-800 p-4 rounded-md w-80 text-white flex flex-col gap-3">
      <h3 className="font-bold">Edit Task</h3>

      <TextField
        value={edittask}
        onChange={(e) => setedittask(e.target.value)}
        label="Task Name"
        size="small"
        variant="outlined"
        sx={{ input: { color: "white" }, label: { color: "white" } }}
      />

      <FormControl size="small">
  <InputLabel sx={{ color: "white" }}>Status</InputLabel>

  <Select
    value={editstatus}
    label="Status"
    onChange={(e) => seteditstatus(e.target.value)}
    sx={{
      color: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white",
      },
      "& .MuiSvgIcon-root": {
        color: "white",
      },
    }}
  >
    <MenuItem value="To do">To do</MenuItem>
    <MenuItem value="In progress">In progress</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
  </Select>
</FormControl>

      <div className="flex justify-end gap-2">
        <Button onClick={() => seteditindex(null)}>Cancel</Button>
        <Button onClick={saveEdit} variant="contained">Save</Button>
      </div>
    </div>
  </div>
)}


{filteredTasks.length === 0 && (
  <p className="text-gray-400 mt-4">No tasks found</p>
)}


</div>



</div>






</>

)



}