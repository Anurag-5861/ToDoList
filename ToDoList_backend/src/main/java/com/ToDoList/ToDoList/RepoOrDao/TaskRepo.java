package com.ToDoList.ToDoList.RepoOrDao;

import com.ToDoList.ToDoList.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task,Long> {
//   void updateStatus(Long id);
}
