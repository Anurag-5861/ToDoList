package com.ToDoList.ToDoList.Controller;


import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);

    @After("execution(public*com.ToDoList.ToDoList.Service.TaskService.save())")
public void logNewTask(String taskName){
    LOGGER.info(" new task added and the task that has been added is --> " + taskName);
}

@After("execution(public*com.ToDoList.ToDoList.Service.TaskService.deleteTaskById())")
    public void logDeletedTask(Long id){
    LOGGER.info(" Task Has been Deleted with id " + id);
}

@After("execution(public*com.ToDoList.ToDoList.Service.TaskService.updateTaskStatus())")
    public void logUpdateTask(Long id){
    LOGGER.info(" Task Has been Updated with ID " + id);
}
}
