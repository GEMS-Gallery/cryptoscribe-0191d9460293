import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface PostFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string, author: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = () => {
    const bodyHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onSubmit(title, bodyHtml, author);
    setTitle('');
    setAuthor('');
    setEditorState(EditorState.createEmpty());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Author"
          type="text"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostForm;
