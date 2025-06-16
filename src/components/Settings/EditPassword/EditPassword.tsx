import { useFormik } from "formik";
import type { User } from "../../../api/users";
import * as Yup from 'yup';
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import styles from './editPassword.module.scss'

interface editPasswordProps{
  user: User;
  open: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const validationSchema = Yup.object({
  password: Yup.string().min(6, 'min 6 symbols').required('requird field'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'password do not match').required('requird field')
})

export const EditPassword = ({user, open, onClose, onSave}: editPasswordProps) => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: () => {
      onSave({
        ...user,
        password: user.password
      })
      onClose()
    }
  })
  return(
    <Dialog open={open} onClose={onClose}>
      <form onChange={formik.handleSubmit} className={styles.form}>
        <DialogTitle>Chacge Password</DialogTitle>
      <TextField
      label='Enter new password'
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      />
       <TextField
      label='onfirm your password'
      name="confirmPassword"
      value={formik.values.confirmPassword}
      onChange={formik.handleChange}
      />
      <Button type="submit" variant="contained" className={styles.button}>Save changes</Button>
      </form>
    </Dialog>
  )
}