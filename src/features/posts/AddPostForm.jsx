import React, { useState } from "react";

// to genrate a random id
import { nanoid } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./PostsSlice";
import { selectAllUsers } from "../Users/UserSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();

  // setting the states from the form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  // getting the user data "initialState" from UserSlice.jsx
  // so now we can fetch them any were in this component
  const users = useSelector(selectAllUsers);

  // handling the inputs change
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // handling the submit function
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  // setting the usersOptions
  const usersOptions = users.map((user) => (
    // option => is an html element that makes a down minu
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={onSavePostClicked}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
