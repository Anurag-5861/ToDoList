package com.ToDoList.ToDoList.Controller;

import com.ToDoList.ToDoList.DTO.DeleteRequest;
import com.ToDoList.ToDoList.DTO.TaskRequest;
import com.ToDoList.ToDoList.DTO.UpdateRequest;
import com.ToDoList.ToDoList.Model.Task;
import com.ToDoList.ToDoList.Service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;
    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>>  getTasks(){
        List<Task> tasks = taskService.getAllTasks();
        if(tasks.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(tasks);
        }
    }

    @PostMapping
    public ResponseEntity<List<Task>> addTask(@RequestBody TaskRequest taskRequest){
        Task task = new Task();
        task.setTaskName(taskRequest.getInputTaskName());
        task.setStatus(false);
        Task savedTask = taskService.saveTask(task);
        List<Task> newTasks = taskService.getAllTasks();
        return ResponseEntity.status(HttpStatus.CREATED).body(newTasks);
    }

    @DeleteMapping
    public ResponseEntity<List<Task>> deleteTask(@RequestBody DeleteRequest deleteRequest){
        taskService.deleteTaskById(deleteRequest.getDeleteId());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping
    public ResponseEntity<List<Task>> updateCompletion(@RequestBody UpdateRequest updateRequest){
    taskService.updateTaskStatus(updateRequest.getUpdateId());
//    List<Task> newTasks = taskService.getAllTasks();
    return  ResponseEntity.status(HttpStatus.OK).build();
    }
}
