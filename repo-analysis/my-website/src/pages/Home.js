import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    return (
        <div className="home-container">
            <h1 className="home-title">Добро пожаловать!</h1>
            <div className="button-container">
                <Link to="/crossword" className="nav-button">Кроссворд</Link>
                <Link to="/examples" className="nav-button">Примеры</Link>
                <Link to="/files" className="nav-button">Файлы</Link>
            </div>
        </div>
    );
}

export default Home;
