import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";
import UserList from "../components/userList";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../firebase";

const UserListPage = () => {
  const currentUserUid = auth.currentUser.uid;
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          console.log("using effect");
          if (currentUserUid === uid) {
            console.log(uid);
            setIsAdmin(true);
            // The Object is foo[key]
            console.log(users[uid]);
            if (!users[uid].admin) {
              navigate("/tourlist");
            }

            //setFirstName(users[uid].firstName);
            //setSurname(users[uid].surname);
            //setMessage("Please Update Your Account Details Here");
            //setButtonMessage("Update Details");
          }
        });
      }
    });
  }, []);

  return (
    <>
      <NavigationDrawer title="All Users" />
      <Grid container justify="center">
        <Grid xs={4} />
        <Grid item xs={4} align="center">
          {isAdmin && <UserList />}
        </Grid>
        <Grid xs={4} />
      </Grid>
    </>
  );
};

export default UserListPage;
