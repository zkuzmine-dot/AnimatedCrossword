import React from "react";
import { Link } from "react-router-dom";
import "../styles/Examples.css";

function Examples() {
    return (
        <div className="examples-container">
            <nav className="navbar">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/crossword" className="nav-link">Кроссворд</Link>
                <Link to="/examples" className="nav-link active">Примеры</Link>
                <Link to="/files" className="nav-link">Файлы</Link>
            </nav>

            <h1 className="examples-title">Примеры анимаций @keyframes.</h1>
            <div className="animations">
                <div className="animation-box color-change">Цвет</div>
                <div className="animation-box rotate">Вращение</div>
                <div className="animation-box move">Движение</div>

            </div>
            <h1 className="examples-title">Примеры анимаций Transition.</h1>
            <div className="animations">
                <div className="animation-box scale">Масштаб</div>
                <div className="animation-box fade">Прозрачность</div>
                <div className="animation-box rounded">Скругление</div>
            </div>
        </div>
    );
}

export default Examples;
