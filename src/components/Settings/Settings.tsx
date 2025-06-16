import { Avatar, Box, Button, TextField } from "@mui/material"
import type { User } from "../../api/users";
import { useFormik } from "formik";
import styles from './Settings.module.scss'
import { EditPassword } from "./EditPassword/EditPassword";
import { useState } from "react";


interface EditUser{
user: User;
onSave: (updatedTask: User) => void
}

export const ProfilePage = () =>{
 const currentUserString = localStorage.getItem('currentUser')
  if(!currentUserString){
    return(
      <div>No user found</div>
    )
  }

const currentUser: User = JSON.parse(currentUserString)

const handleSave = (updatedUser: User) =>{
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  console.log('updated user:', updatedUser)
}
return(
  <Settings user={currentUser} onSave={handleSave}></Settings>
)
}

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  const [first, second] = name.split(' ');
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${first[0]}${second ? second[0] : ''}`,
  };
}

export const Settings = ({user, onSave}:EditUser) => {

  const [isEditingOpen, setisEditingOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: '',
      city: user.city,
      phone: user.phone,
      age: user.age
    },
    enableReinitialize: true,
    onSubmit: (values) =>{
       onSave({
        ...user,
        ...values
       })
    }
  })
  return(
    <div className={styles.screen}>
      <Box className={styles.box1}>
      <Avatar {...stringAvatar(user.username)}
      className={styles.photo}
      />
      <h2>{user.username}</h2>
      <span>{user.email}</span>
      </Box>
      <form onSubmit={formik.handleSubmit}className={styles.box2}>
        <h2>Profile settings</h2>
        <div className={styles.grid}>
        <TextField
        label='user name'
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        />
        <TextField
        label='email'
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        />
        <TextField
        label='city'
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        />
        <TextField
        label='phone number'
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        />
        <TextField
        label='age'
        name="age"
        value={formik.values.age}
        onChange={formik.handleChange}
        />
        <Button variant="outlined" className={styles.password} onClick={() => {setisEditingOpen(true)}}>Change password</Button>
        </div>
        <Button variant="contained" type="submit" className={styles.save}>Save changes</Button>
      </form>
      <EditPassword
      open={isEditingOpen}
      onClose={()=>{setisEditingOpen(false)}}
      user={user}
      onSave={(updatedUser)=>{
        onSave(updatedUser)
        setisEditingOpen(false)
      }}
      />
    </div>
  )
}