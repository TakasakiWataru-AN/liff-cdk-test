import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import liff from "@line/liff";
import "./App.css";

const isNavigateAccess = (): boolean => {
  // ナビゲーションエントリーを取得
  const navigationEntries = window?.performance?.getEntriesByType("navigation");
  if (navigationEntries.length > 0 && navigationEntries[0] instanceof PerformanceNavigationTiming) {
    return (navigationEntries[0].type === "navigate");
  }
  return false;
}

const App = () => {
  // クエリーパラメータ取得
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paramHomeScreen = query.get("createHomeScreen") || "";

  // 開始メッセージ構築
  // クエリーパラメータ有り、かつ URL 指定起動（更新や戻るで移動していない）のものを選別
  const startMessage = (paramHomeScreen !== "" && isNavigateAccess()) ?
    "Started from home screen." :
    "Started from direct access.";
  
  // 初期メッセージ組み込み
  const [message, setMessage] = useState(startMessage);
  const [error, setError] = useState("");

  const handleClick = async () => {
    // ショートカット URL 作成（クエリーパラメータ付与）
    liff.createShortcutOnHomeScreen({ url: `https://miniapp.line.me/${import.meta.env.VITE_LIFF_ID}?createHomeScreen=1`})
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
