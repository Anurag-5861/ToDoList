package com.ToDoList.ToDoList.Service;

import com.ToDoList.ToDoList.Model.Task;
import com.ToDoList.ToDoList.RepoOrDao.TaskRepo;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private TaskRepo taskRepo;
    public TaskService(TaskRepo taskRepo){
        this.taskRepo = taskRepo;
    }

    public List<Task> getAllTasks() {
        return taskRepo.findAll(Sort.by("id"));
    }

    public Task saveTask(Task task) {
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
        System.out.println(taskNew.getId());
        taskRepo.save(taskNew);
    }
}
