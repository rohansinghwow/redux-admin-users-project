import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import {
  addTodos,
  removeTodo,
  setShowModal,
  setName,
  setUserName,
  editTodo,
  setIsEditing,
  setIsAdmin,
  setIsLogin,
  setAdmin,
  setPassword,
} from "../Redux/features/userSlice";
import UserModal from "./UserModal";
export default function UserContainer({ isAdmin, currentUser }) {
  const { allUsers, user, showModal, isEditing } = useSelector(
    (state) => state.todoHandle
  );
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [editID, setEditID] = React.useState(null);

  function submitHandler(e) {
    e.preventDefault();
    if (user.name === "" && user.username === "") {
      dispatch(setShowModal(false));
      return;
    } else if (isEditing) {
      dispatch(editTodo(editID));
      dispatch(setShowModal(false));
      return;
    } else {
      dispatch(addTodos(user));
      dispatch(setShowModal(false));
    }
  }

  function handleEdit(row, idx) {
    dispatch(setShowModal(true));
    dispatch(setName(row.name));
    dispatch(setUserName(row.username));
    dispatch(setIsEditing(true));
    setEditID(idx);
  }

  function handleAdd() {
    dispatch(setShowModal(true));
    dispatch(setName(""));
    dispatch(setUserName(""));
    dispatch(setAdmin(null));
    dispatch(setPassword(""));
  }

  function handleDelete(idx) {
    dispatch(removeTodo(idx));
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <Table sx={{ width: 650, margin: "0 auto" }} aria-label="simple table">
      <UserModal submitHandler={submitHandler} />

      <TableHead>
        <h1>Welcome {currentUser}</h1>
        {isAdmin && (
          <p>
            <Button variant="contained" onClick={handleAdd} size="small">
              Add A User
            </Button>
          </p>
        )}
        <p>
          <Button href="/" onClick={() => dispatch(setIsLogin(false))}>
            Log Out
          </Button>
        </p>

        <TextField
          value={search}
          onChange={handleSearch}
          id="outlined-basic"
          label="Search Username/Name"
          variant="outlined"
        />

        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Username</TableCell>
          <TableCell align="left">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allUsers
          .filter(
            (obj) => obj.name.includes(search) || obj.username.includes(search)
          )
          .map((row, idx) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.username}</TableCell>

              <TableCell align="left">
                <Button onClick={() => handleEdit(row, idx)}>Edit</Button>
                {isAdmin && (
                  <Button onClick={() => handleDelete(idx)}>Delete</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
