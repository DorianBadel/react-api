import React from "react";
import "./css/MainPage.css";

function MainPage({ name }: { name: string }) {
  return (
    <div className="title_card">
      <h1 className="title_text">Welcome </h1>
      <h1 className="title_text__user-name">{name}</h1>
    </div>
  );
}

export default MainPage;
