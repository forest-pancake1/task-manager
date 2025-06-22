import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik"
import * as Yup from 'yup';
import style from "./LogUp.module.scss"
import { registerUser } from "../../api/users/users";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object({
  username: Yup.string().min(2, 'min 2 symbols').required('required field'),
  email: Yup.string().email('incorrect email').required('required field'),
  password: Yup.string().min(6, 'min 6 symbols').required('required field'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'passwords do not match').required('required field')
})

export const LogUp = () =>{

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {username: '', email: '', password: '', confirmPassword: ''},
    validationSchema,
    onSubmit: async (values) => {
      const user = await registerUser({
      username: values.username,  
      email: values.email, 
      password: values.password
    });
      localStorage.setItem('currentUser', JSON.stringify(user))
      navigate('/home')
    }
  })

  return(
    <div className={style.screen}>
   <Box component='form' className={style.box} onSubmit={formik.handleSubmit}>
    <div>
    <h1>Welcome!</h1>
    <p className={style.text}>Please register to get started.</p>
    </div>
    <TextField
    fullWidth
    label ='user name'
    name="username"
    value={formik.values.username}
    onChange={formik.handleChange}
    error = {formik.touched.username && Boolean(formik.errors.username)}
    helperText = {formik.touched.username && Boolean(formik.errors.username)}
    />
    <TextField
    fullWidth
    label ='email'
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    error = {formik.touched.email && Boolean(formik.errors.email)}
    helperText = {formik.touched.email && Boolean(formik.errors.email)}
    />
    <TextField
    fullWidth
    label ='password'
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    error = {formik.touched.password && Boolean(formik.errors.password)}
    helperText = {formik.touched.password && Boolean(formik.errors.password)}
    />
    <TextField
    fullWidth
    label ='confirm password'
    name="confirmPassword"
    type="password"
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    error = {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
    helperText = {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
    />
    <Button type="submit" variant="contained" className={style.submit}>Submit</Button>
    <Button className={style.registr} onClick={() => {navigate('/')}}>back to login</Button>
   </Box>
   </div>
  )
}