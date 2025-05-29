import { Task } from '@mui/icons-material';

 export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

let tasks: Task[] = [
  {id: '1', title: 'make some coffe', completed: true},
  {id: '2', title: 'make a bed', completed: false},
  {id: '3', title: 'do tour morning routine', completed: true},
  {id: '4', title: 'create CRUD operations', completed: false}
]
//get
export const fetchTask = async (): Promise<Task[]> => {
  await new Promise(resolve =>setTimeout(resolve, 1000))
  return [...tasks]
}
//put
export const updateTask = async (updateTask: Task): Promise<Task> => {
  await new Promise(resolve =>setTimeout(resolve, 100))
  tasks = tasks.map(task =>
    task.id === updateTask.id ? updateTask: task
  );
  return updateTask;
}