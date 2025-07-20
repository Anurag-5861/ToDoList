import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import {fetchTasks,addTasks,updateStatus,deleteTask} from './features/tasks/tasksSlice'
import { useDispatch, useSelector } from 'react-redux'


function App() {

  const dispatch = useDispatch();
  const tasks = useSelector((state)=>state.tasks.taskList);
  const [newTask,setNewTask] = useState("");

  useEffect(()=>{
    dispatch(fetchTasks());
  },[dispatch])
  
  const handleAddTask=()=>{
    if(newTask.trim()!==""){
      dispatch(addTasks(newTask));
      dispatch(fetchTasks());
      setNewTask("");
    }
  }

  const handleStatusUpdate=(id)=>{
    dispatch(updateStatus(id));
    setNewTask("");
    dispatch(fetchTasks());
  }

  const handleTaskDeletion=(id)=>{
    dispatch(deleteTask(id));
    setNewTask("");
    dispatch(fetchTasks());
  }


  return(
  <>
    <div className='container my-4'>
        <div className='text-center mt-4'>
            <h1>ToDo Application</h1>
        </div>
        <div className='col-lg-12 col-md-6 col-sm-6 mt-1'>
            <div className='mb-4 d-flex gap-2'>
                <input type="text" className='form-control' placeholder='Enter your task here' onChange={(e)=>setNewTask(e.target.value)} value={newTask}/>
                <button type="button" className="btn btn-light" onClick={handleAddTask}>Light</button>
            </div>
        </div>
        <div className='col-lg-12 col-md-6 col-sm-6 mt-1'>
          <div className="row">
            {tasks.length===0 ? 
            (
              <div className='text-center mt-5'>
                  <p className='text-muted'>You have no Tasks yet ✨</p>
              </div>
            ) : 
            (
              tasks.map(task=>(
                <div className='col-lg-12 mb-3' key={task.id}>
                    <div className='p-3 broder rounded shadow-sm d-flex justify-content-between align-items-cneter'>
                          <p className='mb-0' style={{textDecoration: task.status ? 'line-through':'none'}}>{task.taskName}</p>
                          <div className='d-flex gap-2'>
                              <button type="button" className="btn btn-success" onClick={()=>handleStatusUpdate(task.id)}>
                                  {task.status ? "Finished" : "Complete"}
                              </button>
                              <button type="button" className="btn btn-danger" onClick={()=>handleTaskDeletion(task.id)}>Delete</button>
                          </div>
                    </div>
                </div>
              ))
            )
          }
          </div>

        </div>
    </div>
  
  </>
  )
  // const [tasks, setTask] = useState([]);
  // const [newTask, setNewTask] = useState("");
  // const [status, setStatus] = useState(true);
  // const [deleteId, setDeleteId] = useState(null);

  // const api = "http://localhost:8080/task";
  // const apiCall = async () => {
  //   const resData = (await axios.get(api)).data;
  //   console.log(resData);
  //   setTask(resData);
  // }
  // const handleNewTask = (e) => {
  //   setNewTask(e.target.value);
  // }
  // const handleAddClick = async () => {
  //   console.log(newTask);
  //   axios.post(api,
  //     {
  //       "inputTaskName": newTask
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   ).then(() => {
  //     setNewTask("");
  //     apiCall();
  //   })
  // }
  // const handleStatusUpdate = (e) => {
  //   axios.put(api,
  //     {
  //       "updateId": parseInt(e.target.value)
  //     }
  //   ).then(() => {
  //     apiCall();
  //   })
  //   console.log(e.target.value + "Button clicked");
  // }
  // const hanldeTaskDeletion = (e) => {
  //   axios.delete(api, {
  //     data: { "deleteId": parseInt(e.target.value) }
  //   }).then(() => {
  //     apiCall();
  //   })
  // }
  // useEffect(() => {
  //   apiCall();
  // }, [])

  // return (
  //   <>
  //     <div className="container my-4">
  //       <div className='text-center mb-4'>
  //         <h1>ToDoList Application</h1>
  //       </div>
  //       {/* <div className="addTask"> */}
  //         <div className='col-lg-12 col-md-6 col-sm-6 mt-1'>
  //           <div className="mb-4 d-flex gap-2">
  //             <input type='text' className='form-control' onChange={handleNewTask} value={newTask} placeholder='Please Enter Your Next Task Here'/>
  //             <button type="button" class="btn btn-primary" onClick={handleAddClick}>Add</button>
  //           </div>
  //         </div>
  //         <div className='col-lg-12 col-md-6 col-sm-6 mt-1'>
  //           <div className="row">
  //             {tasks.length === 0 ? (
  //               <div className="text-center mt-5">
  //                 <p className="text-muted">You have no tasks yet ✨</p>
  //               </div>
  //             ) : (
  //               tasks.map(task => (
  //                 <div className="col-lg-12 col-md-6 col-sm-6 mb-3" key={task.id}>
  //                   <div className="col-lg-12 col-md-6 col-sm-6 p-3 border rounded shadow-sm" style={{display:'flex',flexDirection:'row'}}>
  //                     {/* <div className="taskname"> */}
  //                       <p className="col-lg-10 col-md-4 col-sm-1 mb-3" style={{display:'flex',alignContent:'start',textDecoration: task.status ===true ? 'line-through' : 'none'}}>{task.taskName}</p>
  //                     {/* </div> */}
  //                     <div className="d-flex gap-2">
  //                       <button type="button" className="btn btn-success flex-fill" onClick={handleStatusUpdate} value={task.id}>{task.status == true ? "Finished" : "Complete"}</button>
  //                       <button type="button" className="btn btn-danger flex-fill" onClick={hanldeTaskDeletion} value={task.id}>Delete</button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               )).sort((a,b)=>b-a)
  //             )}
  //             {/* {tasks.map(task => (
  //                 <div className='col-lg-6 col-md-6 col-sm-6 mb-4 mt-2' key={task.id}>
  //                   <div className="form-control">
  //                     <h3>{task.task_name}</h3>
  //                     <button type="button" class="btn btn-success" onClick={handleStatusUpdate} value={task.id}>{task.status == true ? "Finished" : "Complete"}</button>
  //                     <button type="button" class="btn btn-danger" onClick={hanldeTaskDeletion} value={task.id}>Delete</button>
  //                   </div>
  //                 </div>
  //               ))
  //             } */}
  //           </div>
  //         </div>
  //       </div>
  //     {/* </div> */}

}

export default App
