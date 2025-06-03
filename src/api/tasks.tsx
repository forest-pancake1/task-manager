import { Task } from '@mui/icons-material';


 export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

let tasks: Task[] = [
  {id: '1', title: 'make some coffe',description: 'помыть кофеварку и кружку, залить воду, добавть кофе, поставить на плиту, налить кофе, добавть молоко', completed: true},
  {id: '2', title: 'make a bed',description: 'just once, just do it', completed: false},
  {id: '3', title: 'do tour morning routine',description: 'as usual', completed: true},
  {id: '4', title: 'create CRUD operations',description: 'i did it?', completed: false}
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
//create task
export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> =>{
  
  const newTask: Task = {
    ...taskData,
    id: Date.now().toString(),
    completed: false,
  };
  
  tasks = [...tasks, newTask];
  return newTask;

}

export const deleteTask = async (id: string): Promise<void> =>{
  tasks = tasks.filter(task => task.id !== id);
}
export const api = {
  fetchTask,
  createTask,
  updateTask,
  deleteTask
};


//   const response = await fetch('/api/tasks',{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       ...taskData,
//       id: Date.now().toString(),
//       complited: false
//     })
//  })
//  if(!response.ok) throw new Error('ошибка создания задачи');
//   return response.json()