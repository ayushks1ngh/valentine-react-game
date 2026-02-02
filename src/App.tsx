import { useState } from "react";
import "./App.css";

type Heart = {
  id: number;
  left: number;
};

function App() {
  const [message, setMessage] = useState("");
  const [noPos, setNoPos] = useState({ top: 55, left: 55 });
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const moveNoButton = () => {
    const padding = 100;

    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    setNoPos({
      left: (x / window.innerWidth) * 100,
      top: (y / window.innerHeight) * 100,
    });

    setYesScale((s) => Math.min(s + 0.1, 1.8));
    setMessage("Hey! That's not allowed 😜");
  };

  const yesClicked = () => {
    setMessage("YAY! 💕 You made my day 😍");

    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
    }));

    setHearts(newHearts);

    setTimeout(() => setHearts([]), 2000);
  };

  return (
    <div className="app">
      {/* TEXT */}
      <div className="text-layer">
        <h1>Will you be my Valentine? 💖</h1>
        {message && <p className="message">{message}</p>}
      </div>

      {/* BUTTONS */}
      <div className="buttons">
        <button
          className="yes"
          style={{ transform: `scale(${yesScale})` }}
          onClick={yesClicked}
        >
          YES
        </button>

        <button
          className="no"
          style={{ top: `${noPos.top}%`, left: `${noPos.left}%` }}
          onMouseEnter={moveNoButton}
          onMouseMove={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
        >
          NO
        </button>
      </div>

      {/* HEARTS */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{ left: `${heart.left}%` }}
        >
          💖
        </div>
      ))}
    </div>
  );
}

export default App;
