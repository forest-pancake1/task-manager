import type { User } from "./types";
import { users } from "./mockUsers";
import { USE_MOCKS } from "./config";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const registerUser = async(data: Omit<User, 'id'>): Promise<User> =>{
  const newUser: User = {
    ...data,
    id: Date.now().toString()
  }
  users.push(newUser)
  return newUser
}

export async function getUsers(): Promise<User[]> {
if(USE_MOCKS) return users;
const res = await fetch(API_URL);
const data = await res.json(); 
return data.map((u:any) => ({
id: u.id.toString(),
username: u.username,
email: u.email,
city: u.adress?.city,
phone: u.phone,
age: u.age,
password: ""
}))
}

export async function getUser(id: string): Promise<User> {
  if(USE_MOCKS){
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('user not found')
      return user
  };
  const res = await fetch(`${API_URL} / ${id}`);
  const u = await res.json();
  return{
    id: u.id.toString(),
    username: u.username,
    email: u.email,
    city: u.adress?.city,
    phone: u.phone,
    age: u.age,
    password: "" 
  }
  
}

export async function updateUser(id: string, newData: Partial<User>): Promise<User> {
  if(USE_MOCKS){
    const user = users.find(u => u.id === id)
    if(!user) throw new Error('user not found')
    Object.assign(user, newData)
    return user
  }
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData)
  });
  const u =await res.json()
  return{
    id: u.id.toString(),
    username: u.username,
    email: u.email,
    city: u.adress?.city,
    phone: u.phone,
    age: u.age,
    password: ""  
  }
}

export { users };
