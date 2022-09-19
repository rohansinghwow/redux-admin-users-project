import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserContainer from "./UserContainer";
import { setIsAdmin, setIsLogin } from "../Redux/features/todoSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";

const Login = () => {
  const dispatch = useDispatch();
  const { creds, allUsers, isLogin } = useSelector((state) => state.todoHandle);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = React.useState("");

  function loginHandler(e) {
    e.preventDefault();
    allUsers.map((user) => {
      if (user.admin) {
        if (
          formData.username === user.username &&
          formData.password === user.password
        ) {
          dispatch(setIsLogin(true));
          setCurrentUser(user.name);
          setIsAdmin(true);
        }
      } else if (
        formData.username === user.username &&
        formData.password === user.password
      ) {
        dispatch(setIsLogin(true));
        setCurrentUser(user.name);
      } else {
        return;
      }
    });
  }
  return (
    <>
      <form onSubmit={loginHandler}>
        {!isLogin && (
          <Card sx={{ maxWidth: 345, margin: "100px auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Enter your username
              </Typography>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username: e.target.value,
                  })
                }
              />
            </CardContent>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Enter your password
              </Typography>
              <Input
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />
            </CardContent>
            <CardActions>
              <Typography gutterBottom variant="h5" component="div">
                <Button type="submit">Submit</Button>
              </Typography>
            </CardActions>
          </Card>
        )}

        {isLogin && (
          <UserContainer currentUser={currentUser} isAdmin={isAdmin} />
        )}
      </form>
      <Card sx={{ maxWidth: 345, margin: "100px auto", overflow: "auto" }}>
        <CardContent>
          <Typography
            sx={{ display: "block" }}
            gutterBottom
            variant="p"
            component="div"
          >
            {allUsers.map((item) => (
              <li>{JSON.stringify(item, null, 3)}</li>
            ))}
          </Typography>
        </CardContent>
        <ul></ul>
      </Card>
    </>
  );
};

export default Login;
