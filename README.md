# cdk から LIFF アプリをロードする環境

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## ファイル構成

以下のファイルを修正する際は扱うことになると考えられる。  
`iac`は cdk スタック定義ディレクトリ。
`LiffTest`ディレクトリは`npx @line/create-liff-app`によって自動生成されたもの。
```
\
┣ iac
┃ ┣ bin
┃ ┃ ┗ liff-cdk-test.ts：cdk 起動時に呼ばれるスクリプト
┃ ┗ lib
┃   ┗ liff-cdk-test-stack.ts：CloudFormation 構築スクリプト
┗ LiffTest：npx @line/create-liff-app が自動生成
  ┣ src
  ┃ ┣ App.css：画面のスタイルシート定義
  ┃ ┣ App.tsx：メイン画面詳細構築スクリプト
  ┃ ┣ main.tsx：メイン画面生成スクリプト
  ┃ ┗ vite-env.d.ts：env 定義用スクリプト
  ┣ .env：環境変数設定ファイル ← clone した場合、このファイルを用意すること
  ┗ index.html：メイン画面
```

## 環境変数設定について

LiffTest/.env に以下を用意してください。
```
VITE_LIFF_ID=LIFF ID
VITE_ENV=dev
```
- `VITE_LIFF_ID`：LIFF ID を入れること。LINE Developers コンソールから取得する。
- `VITE_ENV`：`prod`にすると VConsole を用意しない。

## 環境構築

ビルド・デプロイするときは以下。
```
npm run build
※AWS の asume role しておく
npm run bootstrap -w iac（※初回のみ）
npm run deploy -w iac
```
