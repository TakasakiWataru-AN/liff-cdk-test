import { useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    liff.createShortcutOnHomeScreen({ url: `https://miniapp.line.me/${import.meta.env.VITE_LIFF_ID}`})
      .then(() => {
        setMessage("createShortcutOnHomeScreen succeeded.");
      })
      .catch((e: Error) => {
        console.log(e);
        setMessage("createShortcutOnHomeScreen failed.");
        setError(`${e}`);
      });
    }

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      <p>
        <button onClick={handleClick}>リンクを作成</button>
      </p>
      {error && 
        <p>
          <code>{error}</code>
        </p>
      }
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </div>
  );
}

export default App;
