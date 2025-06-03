import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskMenuProps{
  task:{
    id: string,
    title: string
  }
  onEdit: () => void,
  onDelete: (id:string) => void
}
 export const TaskMenu = ({task, onEdit, onDelete}: TaskMenuProps) =>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>{
      setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () =>{
      setAnchorEl(null);
    }
return(
  <>
   <IconButton
        edge="end"
        onClick={handleMenuOpen}
        aria-label="task-menu"
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            minWidth: 120,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            onEdit();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Редактировать
        </MenuItem>
        <MenuItem 
          onClick={() => {
            onDelete(task.id);
            handleMenuClose();
          }}
          sx={{ color: '#ff3d3d' }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Удалить
        </MenuItem>
      </Menu>
    </>
  )
 }