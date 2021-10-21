import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./DocumentItem.css";

export default function DocumentItem(props: { title: string, onDelete: any }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    handleClose()
    props.onDelete();
  }

  return (
    <div className="document">
        <h5 className="document-title">{props.title}</h5>

        <IconButton
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            aria-label="delete"
        >
            <DeleteIcon />
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu>
    </div>
  );
}
