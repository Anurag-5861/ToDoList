package com.ToDoList.ToDoList.Service;

import com.ToDoList.ToDoList.Controller.LoggingAspect;
import com.ToDoList.ToDoList.Model.Task;
import com.ToDoList.ToDoList.RepoOrDao.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private TaskRepo taskRepo;
    @Autowired
    private LoggingAspect log;
    public TaskService(TaskRepo taskRepo){
        this.taskRepo = taskRepo;
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll(Sort.by("id"));
    }

    public Task saveTask(Task task) {
        log.logNewTask(task.getTaskName());
        return taskRepo.save(task);
    }

//    public List<Task> deleteTaskById(Long id) {
//        taskRepo.deleteById(id);
//        List<Task> updatedTask = taskRepo.findAll();
//        taskRepo.saveAll(updatedTask);
//        return taskRepo.findAll();
//    }
public void deleteTaskById(Long id) {
    taskRepo.deleteById(id);
    List<Task> updatedTask = taskRepo.findAll();
    log.logDeletedTask(id);
    taskRepo.saveAll(updatedTask);

}

//    public void updateTaskStatus(Long id) {
////        Task taskNew = taskRepo.findById(id).orElseThrow(()-> new RuntimeException("Task not found"));
//        Task taskNew = taskRepo.findById(id).orElseThrow(()->  new RuntimeException("Not found"));
//        taskNew.setStatus(!taskNew.getStatus());
//        System.out.println(taskNew.getId());
//        taskRepo.save(taskNew);
//    }
    public void updateTaskStatus(Long id) {
//        Task taskNew = taskRepo.findById(id).orElseThrow(()-> new RuntimeException("Task not found"));
        Task taskNew = taskRepo.findById(id).orElseThrow(()->  new RuntimeException("Not found"));
        taskNew.setStatus(!taskNew.getStatus());
        log.logUpdateTask(id);
        taskRepo.save(taskNew);
    }
}
