

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  city?: string;
  age?: string;
}

export let users: User[] = [
  {id: '1', username: 'alex',email: 'email1@gmail.com', password: 'blahblah10' },
  {id: '2', username: 'steve',email: 'email2@gmail.com', password: 'cotcotcott' }
]

export const registerUser = async(data: Omit<User, 'id'>): Promise<User> =>{
  const newUser: User = {
    ...data,
    id: Date.now().toString()
  }
  users.push(newUser)
  return newUser
}

// export const getUser = async(id: string): Promise<User> =>{
//   const user = users.find(u => u.id === id);
//   if(!user) throw new Error('user not found')
//     return user
// }

// export const updateUser = async(id: string, newData: Partial<User>): Promise<User> =>{
//   const user = users.find(u => u.id === id);
//   if(!user) throw new Error('user not found');
//   Object.assign(user, newData)
//   return user
// }