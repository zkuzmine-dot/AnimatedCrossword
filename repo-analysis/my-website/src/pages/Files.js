import React from "react";
import { Link } from "react-router-dom";
import "../styles/Files.css"

function Files() {
    const files = [
        { name: "Презентация", link: "/files/presentation.pdf", icon: "📊" },
        { name: "Доклад", link: "/files/report.pdf", icon: "📄" },
        { name: "Примеры", link: "/files/examples.zip", icon: "📁" },
        { name: "Исходный код", link: "/files/source_code.zip", icon: "💻" }
    ];

    return (
        <div className="files-container">
            <nav className="navbar">
                <Link to="/" className="nav-link">Главная</Link>
                <Link to="/crossword" className="nav-link">Кроссворд</Link>
                <Link to="/examples" className="nav-link">Примеры</Link>
                <Link to="/files" className="nav-link active">Файлы</Link>
            </nav>

            <h1 className="files-title">Файлы для скачивания</h1>
            <ul className="files-list">
                {files.map((file, index) => (
                    <li key={index} className="file-item">
                        <a href={file.link} download className="file-link">
                            <span className="file-icon">{file.icon}</span>
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Files;
