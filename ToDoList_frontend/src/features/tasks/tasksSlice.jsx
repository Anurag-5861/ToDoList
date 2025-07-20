import react from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

    const api="http://localhost:8080/task";

    const fetchTasks = createAsyncThunk('tasks/fetchTasks', async ()=>{
        const response = await axios.get(api);
        return response.data;
    }); 

    const addTasks = createAsyncThunk('tasks/addTask',async (taskName)=>{
        axios.post(api,{'inputTaskName':taskName});
        const response =await axios.get(api);
        return response.data;
    })

    const updateStatus = createAsyncThunk('tasks/updateStatus',async (updateId)=>{
        axios.put(api,{'updateId':updateId});
        const response = axios.get(api);
        return response.data;    
    })

    const deleteTask = createAsyncThunk('tasks/deleteTask',async  (deleteId)=>{
        axios.delete(api,{data:{'deleteId':deleteId}});
        const response = api.get(api);
        return response.data;
    })

    const taskSlice = createSlice({
        name: 'tasks',
        initialState:{
            taskList:[],
            status: 'idle',
            error: null
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder
                .addCase(fetchTasks.fulfilled,(state,action)=>{
                    state.taskList=action.payload;
                    state.status='succeded';
                })
                .addCase(addTasks.fulfilled,(state,action)=>{
                    state.addTasks=action.payload;
                })
                .addCase(updateStatus.fulfilled,(state,action)=>{
                    state.updateStatus=action.payload;
                })
                .addCase(deleteTask.fulfilled,(state,action)=>{
                    state.deleteTask=action.payload;
                })
        },
    })
    
export default taskSlice.reducer;
export {fetchTasks,addTasks,updateStatus,deleteTask} ;