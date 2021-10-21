import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import "./DocumentItem.css";

export default function AddingDocumentItem(props: { onSaveDocumentItem: any }) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const onTitleChange = (event: any) => {
    setTitle((event as any)?.target.value)
  }

  const showInput = () => {
    setIsAdding(true)
  }

  const saveDocumentItem = () => {
    props.onSaveDocumentItem(title);
    setIsAdding(false)
  }

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      saveDocumentItem()
    }
  }

  return (
    <div className="adding-document-item-container">
        {
          isAdding ? 
          <FormControl variant="standard">
            <InputLabel htmlFor="title">
              Title
            </InputLabel>
            <Input
              id="title"
              autoFocus
              value={title}
              onKeyDown={onKeyDown}
              onChange={onTitleChange}

              endAdornment={
                <InputAdornment position="end">
                  <CheckIcon onClick={saveDocumentItem} />
                </InputAdornment>
              }
            />
          </FormControl>
          :
          <IconButton
              onClick={showInput}
              aria-label="add"
          >
              <AddIcon />
          </IconButton>
        }
    </div>
  );
}
