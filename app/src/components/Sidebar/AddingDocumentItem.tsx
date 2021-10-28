import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl, Input, InputAdornment, InputLabel,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import './DocumentItem.css';

export default function AddingDocumentItem(props: { onSaveDocumentItem: any }) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [error, setError] = React.useState('');

  const onTitleChange = (event: any) => {
    const newTitle: string = event.target.value;
    setError(!newTitle.length ? 'Please enter a valid title' : '');

    setTitle(newTitle);
  };

  const showInput = () => {
    setIsAdding(true);
  };

  const saveDocumentItem = () => {
    if (error || !title) return;
    props.onSaveDocumentItem(title);
    setIsAdding(false);
    setTitle('');
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      saveDocumentItem();
    }
  };

  return (
    <div className="adding-document-item-container">
      {
        isAdding
          ? (
            <FormControl variant="standard">
              <InputLabel htmlFor="title">
                                Title
              </InputLabel>
              <Input
                id="title"
                required
                error={!!error}
                autoFocus
                value={title}
                onKeyDown={onKeyDown}
                onChange={onTitleChange}

                endAdornment={(
                  <InputAdornment position="end">
                    <CheckIcon onClick={saveDocumentItem} />
                    <CloseIcon onClick={() => setIsAdding(false)} />
                  </InputAdornment>
                )}
              />
            </FormControl>
          )
          : (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <IconButton
                onClick={showInput}
                size="large"
                aria-label="add"
              >
                <AddIcon />
              </IconButton>
            </div>
          )
      }
    </div>
  );
}
