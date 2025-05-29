import { fetchTask, updateTask } from "../api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircularProgress, List, ListItem, Checkbox } from "@mui/material";
import type { Task } from "../api/tasks";

export const TaskList = () =>{
  const {
    data: tasks,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTask
  });

  const queryClient = useQueryClient();

  const { mutate: toggleTask} = useMutation({
    mutationFn: updateTask,
    onSuccess:() =>{
      queryClient.invalidateQueries({queryKey: ['tasks']})
    }
  })

  const handleToggle = (task: Task) =>{
    toggleTask({...task, completed: !task.completed})
  }
  if(isLoading){return <CircularProgress/>};
  if(isError){return <div>Ошибка загрузки задач</div>};

  return(
    <List>
      {tasks?.map(task => (
        <ListItem
        key={task.id}
        >

        <Checkbox
        checked={task.completed}
        onChange={() => handleToggle(task)}
        />
          <span>{task.title}</span>
        </ListItem>
      ))}
   </List>
  )
}