import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
import {
  setUserName,
  setName,
  setShowModal,
  setPassword,
  setAdmin,
} from "../Redux/features/userSlice";
export default function UserModal({ submitHandler, isAdmin }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { showModal, user } = useSelector((state) => state.todoHandle);
  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <form onSubmit={submitHandler}>
            <Box sx={style}>
              <h3>
                <Button
                  variant="outlined"
                  onClick={() => dispatch(setShowModal(false))}
                >
                  Close
                </Button>
              </h3>
              <p>Name:</p>
              <TextField
                onChange={(e) => dispatch(setName(e.target.value))}
                value={user.name}
              />

              <p>Username:</p>
              <TextField
                onChange={(e) => dispatch(setUserName(e.target.value))}
                value={user.username}
              />

              <p>Password:</p>
              <TextField
                onChange={(e) => dispatch(setPassword(e.target.value))}
                value={user.password}
              />

              {isAdmin && (
                <>
                  <p>Admin:</p>
                  <Select
                    labelId="Admin"
                    id="demo-simple-select"
                    label="Age"
                    onChange={(e) => dispatch(setAdmin(e.target.value))}
                    value={user.admin}
                  >
                    <MenuItem value={true}>Admin</MenuItem>
                    <MenuItem value={false}>Not an Admin</MenuItem>
                  </Select>
                </>
              )}

              <p>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </p>
            </Box>
          </form>
        </>
      </Modal>
    </div>
  );
}
