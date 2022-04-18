import React, { useEffect, useState } from "react";
import PageTemplate from "../components/pageTemplateList";
import Image from "../images/home_image.jpg";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

const AllPoisPage = (props) => {
  const currentUserUid = auth.currentUser.uid;
  const [pois, setPois] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const poiRef = db.ref("pois");
    poiRef.on("value", (snapshot) => {
      const poi = snapshot.val();
      const pois = [];
      for (let id in poi) {
        pois.push(poi[id]);
      }
      console.log(pois);
      setPois(pois);
    });
  }, []);

  return (
    <>{isAdmin && <PageTemplate title="All Destinations" props={pois} />}</>
  );
};

export default AllPoisPage;
