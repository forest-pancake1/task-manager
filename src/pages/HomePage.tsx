
import { useState } from "react"
import { FilterTasks } from "../components/TaskList/filters/FilterTask"
import { TaskList } from "../components/TaskList/taskList/TaskList"
import type { Filter} from "../components/TaskList/filters/types"
import { Box } from "@mui/material"

export const HomePage = () => {
  const [filter, setFilter] = useState<Filter>({ priority: 'all', status: 'all', date:{start: null, end: null}})
  return (
    <div style={{display: 'flex',
     flexDirection: 'row',
     alignItems: 'flex-start',
     gap: '16px',
     padding: '16px'
      }}>
    <Box sx={{ flex: 1 }}>
    <TaskList filter={filter} />
  </Box>
  <Box sx={{ width: 400 }}>
    <FilterTasks value={filter} onChange={setFilter} />
  </Box>
   </div>
  )
}