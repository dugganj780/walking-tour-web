import React from "react";
import PageTemplate from "../components/pageTemplateList";
import Image from "../images/home_image.jpg";

const PoiListPage = (props) => {
  /*
  const { data, error, isLoading, isError } = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  */

  const tours = [
    {
      id: "1",
      title: "UCC Tour",
      owner: "James Duggan",
      ownerid: "user1",
      image: Image,
      city: "Cork",
      country: "Ireland",
      orienteering: false,
      category: "Historical",
      pois: ["poi1", "poi2"],
    },
    {
      id: "2",
      title: "UCD Tour",
      owner: "James Cuggan",
      ownerid: "user2",
      image: Image,
      city: "Dublin",
      country: "Ireland",
      orienteering: false,
      category: "Historical",
    },
  ];

  const pois = [
    {
      uid: "poi1",
      poi: true,
      title: "Main Quad",
      owner: "James Duggan",
      ownerid: "user1",
      lat: 51.8938,
      long: -8.4923,
      image: Image,
      recording: "",
    },
    {
      uid: "poi2",
      poi: true,
      title: "Main Gate",
      owner: "James Duggan",
      ownerid: "user1",
      lat: 51.895454,
      long: -8.488992,
      image: Image,
      recording: "",
    },
  ];

  return <PageTemplate title="My Destinations" props={pois} />;
};

export default PoiListPage;
