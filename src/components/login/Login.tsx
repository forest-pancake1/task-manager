import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { users } from '../../api/users/users';
import { Box, Button, TextField } from '@mui/material';
import styles from './Login.module.scss'


const validationSchema = Yup.object({
  email: Yup.string().email('incorrect email').required('requierd field'),
  password: Yup.string().required('requierd field')
})

export const Login = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema,
    onSubmit: async(values: {email: string; password: string}) =>{
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      )
      if(!user){
        alert('incorrect email or password')
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(user))
      navigate('/home')
    }
  })

  return(
    <div className={styles.screen}>
      <Box component="form" className={styles.box}onSubmit={formik.handleSubmit}>
        <div>
        <h1>Welcome!</h1>
        <p className={styles.text}>Please login to contunue</p>
        </div>
        <TextField
        fullWidth
        label= 'email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error= {formik.touched.email && Boolean(formik.errors.email)}
        helperText= {formik.touched.email && Boolean(formik.errors.email)}
        />
        <TextField
        fullWidth
        label= 'password'
        name='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        error= {formik.touched.password && Boolean(formik.errors.password)}
        helperText= {formik.touched.password && Boolean(formik.errors.password)}
        />
        <Button type='submit' className={styles.submit} variant='contained'>Continue</Button>
        <Button className={styles.registr} onClick={() => {navigate('/registration')}}>Registration</Button>
      </Box>
    </div>
  )
}