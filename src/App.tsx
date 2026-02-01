import { useState } from "react";
import "./App.css";

type Heart = {
  id: number;
  left: number;
};

function App() {
  const [message, setMessage] = useState("");
  const [noPos, setNoPos] = useState({ top: 50, left: 60 });
  const [yesScale, setYesScale] = useState(1);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const moveNoButton = () => {
    setNoPos({
      top: Math.random() * 70,
      left: Math.random() * 70,
    });
    setYesScale((s) => s + 0.2);
    setMessage("Hey! That's not allowed 😜");
  };

  const yesClicked = () => {
    setMessage("YAY! 💕 You made my day 😍");

    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts([]);
    }, 2000);
  };

  return (
    <div className="app">
      {/* TEXT LAYER */}
      <div className="text-layer">
        <h1>Will you be my Valentine? 💖</h1>
        {message && <p className="message">{message}</p>}
      </div>

      {/* BUTTON LAYER */}
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
