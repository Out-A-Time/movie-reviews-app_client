import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";

function App() {
  //setMovies change the state of the movies variable. If movie change component is re-rendered by React
  const [movies, setMovies] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies"); //this is going to be attached to the baseURL
      console.log(response.data);
      setMovies(response.data);
    } catch (error) {
      console.log("THIS IS ERROR: ", error);
    } finally {
    }
  };

  //useEffect function is executed when the app component first loads
  useEffect(() => {
    getMovies();
  }, []);

  if (movies === undefined) {
    return <p>Something went wrong... {getMovies.error}</p>;
  }

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
