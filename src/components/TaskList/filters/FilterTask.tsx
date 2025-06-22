import { Button, ButtonGroup, TextField } from "@mui/material"
import type { Filter, Priority, Status } from "./types"
import styles from './filter.module.scss'
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



 type Props = {
  value: Filter;
  onChange: (newFilter: Filter) => void;
}

 export const FilterTasks = ({value, onChange}: Props) => {
  const priorities: Priority[] = ['all', 'low', 'medium', 'high'];
  const status: Status[] = ['all', 'active', 'complited']
  return(
   <div className={styles.box}>
    <TextField
    label='search by title'
    variant="outlined"
    value={value.query ?? ''}
    onChange={(e) => {
      onChange({
        ...value,
        query: e.target.value
      })
    }}
    fullWidth
    sx={{backgroundColor: 'rgb(243, 238, 228)'}}
    />
    <p className={styles.text}>task priority</p>
   <ButtonGroup 
   fullWidth
   variant="contained"
   >
    {priorities.map((level) => (
      <Button 
      className={styles.button}
      key={level}
      onClick={() => onChange({
        ...value,
        priority: level as Filter["priority"]
      })}
      variant={value.priority === level? 'contained' : 'outlined'}
      sx={{
         backgroundColor: value.priority === level? 'rgb(123, 192, 177)' : 'rgb(243, 238, 228)',
      }}
      >
      {level}
      </Button>  
    ))}
   </ButtonGroup>
   <p className={styles.text}>status of task</p>
   <ButtonGroup variant="contained" fullWidth>
      {status.map((option) => (
        <Button
        className={styles.button}
        key={option}
        onClick={() => onChange({
          ...value,
          status: option as Filter["status"]
        })}
        variant={value.status === option? 'contained' : 'outlined'}
        sx={{
         backgroundColor: value.status === option? 'rgb(123, 192, 177)' : 'rgb(243, 238, 228)',
      }}
        >
          {option}
        </Button>
      ))}
   </ButtonGroup>
   <p className={styles.text} style={{marginBottom: '-35px'}}>choose by deadline</p>
   <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className={styles.date}>
     <DatePicker
     label='start'
     value={value.date?.start}
     onChange={(newDate) => {
      onChange({
        ...value,
        date:{start: newDate, end: value.date?.end ?? null}
      })
     }}
    sx={{backgroundColor: 'rgb(196, 220, 208)'}}
     />
      <DatePicker
     label='end'
     value={value.date?.end}
     onChange={(newDate) => {
      onChange({
        ...value,
        date:{start: value.date?.start ?? null, end: newDate}
      })
     }}
    sx={{backgroundColor: 'rgb(196, 220, 208)',}}
     />
     <Button
     variant="contained"
     onClick={()=> {onChange({...value, date:{start: null, end: null}})}}
     >clear</Button>
     </div>
   </LocalizationProvider>
   <Button
   variant="contained"
   onClick={() => {
    onChange({
    ...value,
    date:{start: null, end: null},
    status: 'all',
    priority: 'all',
    query: ''
    })
   }}
   >clear all filters</Button>
   </div>
  )
 }