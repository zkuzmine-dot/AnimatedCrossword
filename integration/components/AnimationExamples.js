import React, { useState } from "react";
import "../styles/AnimationExamples.css";

export default function AnimationExamples() {
  const [activeExample, setActiveExample] = useState("transition");
  
  const examples = [
    { id: "transition", name: "CSS Transition" },
    { id: "keyframes", name: "Keyframes" },
    { id: "transform", name: "Transform" },
    { id: "opacity", name: "Opacity" },
    { id: "loader", name: "Loader" },
    { id: "timing", name: "Timing Function" },
    { id: "infinite", name: "Infinite Animation" }
  ];
  
  return (
    <div className="animation-examples">
      <h2 className="examples-title">Animation Examples</h2>
      
      <div className="examples-tabs">
        {examples.map(example => (
          <button 
            key={example.id}
            className={`tab-button ${activeExample === example.id ? 'tab-active' : ''}`}
            onClick={() => setActiveExample(example.id)}
          >
            {example.name}
          </button>
        ))}
      </div>
      
      <div className="example-content">
        {activeExample === "transition" && (
          <div className="example-container">
            <h3>CSS Transition Example</h3>
            <p>CSS transitions позволяют плавно анимировать изменение свойств элемента.</p>
            <div className="demo-container">
              <div className="transition-box"></div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`.transition-box {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  transition: transform 0.5s ease-in-out, 
              background-color 0.5s ease-in-out;
}

.transition-box:hover {
  transform: scale(1.2) rotate(45deg);
  background-color: #e74c3c;
}`}
              </pre>
            </div>
          </div>
        )}
        
        {activeExample === "keyframes" && (
          <div className="example-container">
            <h3>CSS Keyframes Example</h3>
            <p>@keyframes позволяют определить промежуточные шаги для создания сложных анимаций.</p>
            <div className="demo-container">
              <div className="keyframes-box"></div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`@keyframes colorChange {
  0% {
    background-color: #3498db;
    transform: translateX(0);
  }
  25% {
    background-color: #9b59b6;
    transform: translateX(100px);
  }
  50% {
    background-color: #e74c3c;
    transform: translateX(100px) translateY(100px);
  }
  75% {
    background-color: #2ecc71;
    transform: translateY(100px);
  }
  100% {
    background-color: #3498db;
    transform: translateX(0);
  }
}

.keyframes-box {
  width: 100px;
  height: 100px;
  animation: colorChange 4s infinite;
}`}
              </pre>
            </div>
          </div>
        )}
        
        {activeExample === "transform" && (
          <div className="example-container">
            <h3>CSS Transform Example</h3>
            <p>Transform позволяет вращать, масштабировать, наклонять или перемещать элемент.</p>
            <div className="demo-container">
              <div className="transform-demo">
                <div className="transform-box transform-translate"></div>
                <div className="transform-box transform-rotate"></div>
                <div className="transform-box transform-scale"></div>
                <div className="transform-box transform-skew"></div>
              </div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`.transform-translate {
  transform: translateX(50px) translateY(20px);
}

.transform-rotate {
  transform: rotate(45deg);
}

.transform-scale {
  transform: scale(1.5);
}

.transform-skew {
  transform: skew(20deg, 10deg);
}`}
              </pre>
            </div>
          </div>
        )}
        
        {activeExample === "opacity" && (
          <div className="example-container">
            <h3>CSS Opacity Example</h3>
            <p>Opacity управляет прозрачностью элемента и часто используется в анимациях.</p>
            <div className="demo-container">
              <div className="opacity-demo"></div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`.opacity-demo {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  animation: fadeInOut 3s infinite;
}

@keyframes fadeInOut {
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
}`}
              </pre>
            </div>
          </div>
        )}
        
        {activeExample === "loader" && (
          <div className="example-container">
            <h3>CSS Loader Example</h3>
            <p>Лоадеры часто используются для показа процесса загрузки с помощью анимаций.</p>
            <div className="demo-container">
              <div className="loader-demo">
                <div className="spinner"></div>
              </div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`.spinner {
  width: 40px;
  height: 40px;
  border: 5px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`}
              </pre>
            </div>
          </div>
        )}
        
        {activeExample === "timing" && (
          <div className="example-container">
            <h3>CSS Timing Function Example</h3>
            <p>Timing function определяет скорость анимации в разные моменты времени.</p>
            <div className="demo-container">
              <div className="timing-demo">
                <div className="timing-box timing-linear">linear</div>
                <div className="timing-box timing-ease">ease</div>
                <div className="timing-box timing-ease-in">ease-in</div>
                <div className="timing-box timing-ease-out">ease-out</div>
                <div className="timing-box timing-ease-in-out">ease-in-out</div>
              </div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`.timing-linear {
  transition-timing-function: linear;
}

.timing-ease {
  transition-timing-function: ease;
}

.timing-ease-in {
  transition-timing-function: ease-in;
}

.timing-ease-out {
  transition-timing-function: ease-out;
}

.timing-ease-in-out {
  transition-timing-function: ease-in-out;
}`}
              </pre>
            </div>
          </div>
        )}
        
        {activeExample === "infinite" && (
          <div className="example-container">
            <h3>CSS Infinite Animation Example</h3>
            <p>Значение infinite для animation-iteration-count заставляет анимацию повторяться бесконечно.</p>
            <div className="demo-container">
              <div className="infinite-demo">
                <div className="pulse-circle"></div>
              </div>
            </div>
            <div className="code-container">
              <pre className="code-block">
{`.pulse-circle {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.7;
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}