import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createTask } from '../../api/tasks';
// import styles from './addTask.module.scss';
import { Dialog, TextField, Button, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import styles from './addTask.module.scss'

interface addTaskFormProps{
  open: boolean,
  onClose: () => void
}

const validationSchema = Yup.object({
  title: Yup.string()
  .min(3, 'min 3 symbols')
  .max(100, 'max 100 symbols')
  .required('fill out the form'),
  description: Yup.string()
  .max(5000, 'max 5000 symbols')
});

export const AddTaskForm = ({open, onClose}:addTaskFormProps) =>{

  const queryClient = useQueryClient();
  
  const {mutate: addTask} = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['tasks']})
      formik.resetForm()
      onClose()
    },
   onError: (_error) =>{
    alert('ошибка: ${error.message}')
   },
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema,
    onSubmit: (values) =>{
      addTask({
        title: values.title,
        description: values.description,
        completed: false,
        //тут потом можно так же добавить значимось и другие штуки
      })
    }
  })
  return(
     <Dialog open={open} onClose={onClose} className={styles.dialog}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create new task</DialogTitle>
          <DialogContent className={styles.content}>
             <TextField className={styles.text}
             fullWidth
             id='title'
             name='title'
             label="title"
             sx={{
                '& label.Mui-focused': {
                   color: '#357665',
                 },
                '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                     borderColor: '#357665',
                  },
                 },
               }}
             value={formik.values.title}
             onChange={formik.handleChange}
             error={formik.touched.title && Boolean(formik.errors.title)}
             helperText={formik.touched.title && formik.errors.title}
             />
             <TextField className={styles.text}
             fullWidth
             id='description'
             name='description'
             label="description"
             sx={{
                '& label.Mui-focused': {
                   color: '#357665',
                 },
                '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                     borderColor: '#357665',
                  },
                 },
               }}
             multiline
             rows={3}
             value={formik.values.description}
             onChange={formik.handleChange}
             error={formik.touched.description && Boolean(formik.errors.description)}
             helperText={formik.touched.description && formik.errors.description}
             />
             <DialogActions>
              <Button className={styles.cansel}onClick={onClose}>Cansel</Button>
              <Button className={styles.save}type='submit' variant='contained' disabled={!formik.isValid}>Save</Button>
             </DialogActions>
          </DialogContent>
        </form>
     </Dialog>
  )
}