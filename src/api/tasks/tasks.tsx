import { Task } from '@mui/icons-material';


 export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: string;
  completed: boolean;
  userId: string;
}

let tasks: Task[] = [
  {id: '1', title: 'make some coffe',description: 'i cant do anything without coffee', priority: 'high', deadline: '24.06.2025', completed: true, userId: '2'},
  {id: '2', title: 'make a bed', priority: 'low',deadline: '24.06.2026', completed: false, userId: '2'},
  {id: '3', title: 'do tour morning routine',description: 'as usual', priority: 'medium', completed: true, userId: '2'},
  {id: '4', title: 'create CRUD operations', priority: 'high',deadline: '10.06.2025', completed: false, userId: '2'}
]
//get
export const fetchTask = async (userId: string): Promise<Task[]> => {
  await new Promise(resolve =>setTimeout(resolve, 1000))
  return tasks.filter(task => task.userId === userId)
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

