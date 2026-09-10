# MSE Superbrain OS v3｜交付前 QA

## 已通過

- HTML、JavaScript 與 manifest 靜態語法檢查
- 首頁四主鍵與六個單一任務畫面結構
- Prompt 必填、預設值、生成、複製與 Markdown 匯出邏輯
- 多模型至少一份回覆驗證與忠實彙整草稿
- 任務新增、完成、刪除、清除與純文字安全輸出
- 計時 1–180 分鐘邊界、暫停／繼續／重置與背景時間校正
- localStorage 自動保存、JSON 1 MB 上限與結構驗證
- 明亮／深色／跟隨裝置、三段字級、safe-area、320px CSS 斷點
- 無 inline 事件、無 API 金鑰、Firebase 預設移除
- PWA manifest、Service Worker、離線資產清單與 192／512 圖示
- 內建自我檢測與完整小白操作指南

## 仍需部署後實機確認

- iPhone Safari「加入主畫面」與音訊限制
- Samsung Flip 的底部安全區、震動回饋
- Netlify／GitHub Pages 的首次安裝與離線快取更新

測試環境嘗試啟動 Playwright，但瀏覽器核心下載因網路逾時／502 未能完成。因此本報告不把自動化瀏覽器 E2E 誤列為已通過；部署後請依 README 與 App 內建自我檢測做最後實機驗收。
