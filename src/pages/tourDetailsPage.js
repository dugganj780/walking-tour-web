import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TourList from "../components/tourList";
import MapView from "../components/mapViewPoi";
import PageTemplate from "../components/pageTemplateDetails";
import Image from "../images/home_image.jpg";
import { db } from "../firebase";

//import '../App.css';
//import '../index.css';

const TourDetailsPage = (props) => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);

  //const fooRef = rootRef.child("foo");

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(tours[uid]);
            setTour(tours[uid]);
          }
        });
      }
    });
  }, []);

  console.log(tour);

  /*
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const tours = [
    {
      id: "1",
      title: "UCC Tour",
      owner: "James Duggan",
      image: Image,
    },
    {
      id: "2",
      title: "UCD Tour",
      owner: "James Cuggan",
      image: Image,
    },
  ];

  const singlePoi1 = {
    uid: "poi2",
    poi: true,
    title: "UCC Main Gate",
    owner: "James Duggan",
    ownerid: "user1",
    city: "Cork",
    lat: 51.895454,
    lng: -8.488992,
    image: Image,
    recording: "",
  };

  const singlePoi2 = {
    uid: "poi3",
    poi: true,
    title: "UCC Main Quad",
    owner: "James Duggan",
    ownerid: "user1",
    city: "Cork",
    lat: 51.89351910516512,
    lng: -8.4921026871898,
    image: Image,
    recording: "",
  };

  const singleTour = {
    uid: "2",
    title: "UCD Tour",
    owner: "James Cuggan",
    ownerid: "user2",
    image: Image,
    city: "Dublin",
    country: "Ireland",
    orienteering: false,
    category: "Historical",
    pois: [singlePoi1, singlePoi2],
  };

  async function handleLogout() {
    await logout();
    navigate("/");
  }
*/

  return <>{tour && <PageTemplate title={tour.title} props={tour} />};</>;
};

export default TourDetailsPage;
