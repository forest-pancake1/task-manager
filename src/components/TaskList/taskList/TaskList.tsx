import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircularProgress, List, ListItem, Checkbox, Button } from "@mui/material";
import style from "./taskList.module.scss"
import { AddTaskForm } from "../../AddTaskForm/AddTaskForm";
import { TaskMenu } from "../TaskMenu";
import { EditTask } from "../EditTask/EditTask";
import { useState } from "react";
import { api } from "../../../api/tasks/tasks";
import { type Task } from "../../../api/tasks/tasks";
import type { Filter } from "../filters/types";

type props = {
  filter: Filter
};

export const TaskList = ({filter}: props) =>{

   const currentUser = JSON.parse(localStorage.getItem("currentUser")!) 

  const {
    data: tasks,
    isLoading,
    isError
  } = useQuery<Task[]>({
    queryKey: ['tasks', currentUser.id],
    queryFn: () => api.fetchTask(currentUser.id)
  });

  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false)

  

  const { mutate: toggleTask} = useMutation({
    mutationFn: api.updateTask,
    onMutate: async(updatedTask) => {
      await queryClient.cancelQueries({queryKey: ['tasks', currentUser.id]})
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', currentUser.id])

       queryClient.setQueryData<Task[]>(['tasks', currentUser.id], (old) =>
        old?.map(task => 
          task.id === updatedTask.id ? updatedTask: task
        )
      );
      return previousTasks
    },
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey: ['tasks', currentUser.id]})
    }
  })
  const handleToggle = (task: Task) =>{
    toggleTask({...task, completed: !task.completed})
  }

  const { mutate: updateTaskFull } = useMutation({
  mutationFn: (updatedTask: Task) => api.updateTask(updatedTask),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['tasks', currentUser.id]})
    setEditingTask(null);
  }
});

  const {mutate: deleteTaskMutation} = useMutation({
    mutationFn: api.deleteTask,
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey: ['tasks', currentUser.id]})
    }
  })
  if(isLoading){return <CircularProgress/>};
  if(isError){return <div>Ошибка загрузки задач</div>};
  if (!tasks || !filter) return null;
 
  const filteredTasks = tasks?.filter(task =>
    filter.priority === 'all' || task.priority === filter.priority
  ).filter(task => {
    if(filter.status === 'all') return true
    return filter.status === 'complited'? task.completed : !task.completed
}).filter(task => {
  const {start, end} = filter.date ?? {};
  if (!start || !end) return true;
  if (!task.deadline) return false;
  const deadLine = new Date(task.deadline)
  return deadLine >= start && deadLine <= end
}).filter(task => {
  if(!filter.query) return true;
  return task.title.toLowerCase().includes(filter.query.toLowerCase())
})
  return(
    <div className={style.container}>
    <Button variant="contained" className={style.button} onClick={() => setIsAddOpen(true)}>
     + Add new task
    </Button>
    <AddTaskForm open={isAddOpen} onClose={() => setIsAddOpen(false)}  />

    <List className={style.list}>
      {filteredTasks?.map(task => (
        <ListItem className={style.item}
        key={task.id}
        >
          <div className={style.content}>
          <span>{task.title}</span>
          <span className={style.deadline}>{task.deadline? `Due: ${new Date(task.deadline).toLocaleDateString()}`: "No deadline"}</span>
          <span>{task.description}</span>
          </div>

          <div className={style.task_buttons}>
            <span className={`${style.priority} ${style[task.priority]}`}>{task.priority}</span>
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

