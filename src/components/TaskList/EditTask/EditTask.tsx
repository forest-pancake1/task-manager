import { useFormik } from "formik";
import type { Task } from "../../../api/tasks";
import { Dialog, TextField, Button, DialogActions, DialogContent, DialogTitle,  ToggleButton, ToggleButtonGroup} from '@mui/material';
import styles from './editTask.module.scss'

interface EditTaskProps{
  task: Task,
  open: boolean,
  onClose: () => void,
  onSave: (updatedTask: Task) => void
}

export const EditTask = ({task, open, onClose, onSave}:EditTaskProps) =>{
const formik = useFormik({
  initialValues: {
    title: task.title,
    description: task.description,
    priority: task.priority,
    deadline: task.deadline,
    complited: task.completed
  },
  onSubmit: (values) => {
      onSave({
        ...task, 
        ...values 
      });
    }
})
return(
<Dialog open={open} onClose={onClose}>
<DialogTitle>Edit task</DialogTitle>
<form onSubmit={formik.handleSubmit} className={styles.dialog}>
  <ToggleButtonGroup
      value={formik.values.priority}
      onChange={(_, newPriority) => {if(newPriority !== null) formik.setFieldValue('priority', newPriority)}}
      fullWidth
      exclusive
      className={styles.toggle_buttons}
      >
      <ToggleButton value="low" className={styles.low}
     sx={{'&.Mui-selected': {backgroundColor: 'rgb(137, 247, 140)',} }}
      >low</ToggleButton>
      <ToggleButton value="medium" className={styles.medium}
      sx={{'&.Mui-selected': {backgroundColor: 'rgb(250, 235, 152)',} }}
      >medium</ToggleButton>
      <ToggleButton value="high" className={styles.high}
      sx={{'&.Mui-selected': {backgroundColor: 'rgb(251, 152, 147)',} }}
      >high</ToggleButton>
  </ToggleButtonGroup>
  <TextField
          fullWidth
          name='deadline'
          label='deadline'
          id='deadline'
          value={formik.values.deadline}
          type='date'
          onChange={formik.handleChange}
          InputLabelProps={{shrink: true}}
          />
  <DialogContent>
  <TextField
  fullWidth
  name="title"
  label="add title"
  onChange={formik.handleChange}
  value={formik.values.title}
  margin="normal"
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
  />
  <TextField
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
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose} className={styles.cansel}>Cansel</Button>
    <Button type="submit" variant="contained" className={styles.save}>Save</Button>
  </DialogActions>
</form>
</Dialog>
)
}