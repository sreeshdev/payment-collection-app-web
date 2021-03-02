import React from "react";
import Header from "../../components/header";
import MenuBar from "../../components/menubar";

const Home = () => {
  return <div>
    <Header/>
    <MenuBar activeItem="home"/>
  </div>;
};

export default Home;
