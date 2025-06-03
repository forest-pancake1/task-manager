import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircularProgress, List, ListItem, Checkbox, Button } from "@mui/material";
import style from "./taskList.module.scss"
import { AddTaskForm } from "../AddTaskForm/AddTaskForm";
import { TaskMenu } from "./TaskMenu";
import { EditTask } from "./EditTask/EditTask";
import { useState } from "react";
import { api } from "../../api/tasks";
import { type Task } from "../../api/tasks";


export const TaskList = () =>{
  const {
    data: tasks,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: api.fetchTask
  });

  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false)

  

  const { mutate: toggleTask} = useMutation({
    mutationFn: api.updateTask,
    onMutate: async(updatedTask) => {
      await queryClient.cancelQueries({queryKey: ['tasks']})
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])

       queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map(task => 
          task.id === updatedTask.id ? updatedTask: task
        )
      );
      return previousTasks
    },
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  })
  const handleToggle = (task: Task) =>{
    toggleTask({...task, completed: !task.completed})
  }

  const { mutate: updateTaskFull } = useMutation({
  mutationFn: (updatedTask: Task) => api.updateTask(updatedTask),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['tasks']})
    setEditingTask(null);
  }
});

  const {mutate: deleteTaskMutation} = useMutation({
    mutationFn: api.deleteTask,
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  })
  if(isLoading){return <CircularProgress/>};
  if(isError){return <div>Ошибка загрузки задач</div>};

  return(
    <div className={style.container}>
    <Button variant="contained" className={style.button} onClick={() => setIsAddOpen(true)}>
     + Add new task
    </Button>
    <AddTaskForm open={isAddOpen} onClose={() => setIsAddOpen(false)} />

    <List className={style.list}>
      {tasks?.map(task => (
        <ListItem className={style.item}
        key={task.id}
        >
          <div className={style.content}>
          <span>{task.title}</span>
          <span>{task.description}</span>
          </div>

          <div className={style.task_buttons}>
          <Checkbox
          className={style.checkbox}
          checked={task.completed}
          onChange={() => handleToggle(task)}
          />
           <TaskMenu 
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={(id) => deleteTaskMutation(id)}
            />
            </div>
          
        </ListItem>
      ))}
   </List>
    {editingTask && (
      <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={(updatedTask) => {
            updateTaskFull(updatedTask);
          } } open={!!editingTask}      />
    )}
   </div>
  )
}

