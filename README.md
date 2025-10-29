# math-formula-game

このプロジェクトは、MarkdownやLaTeXで数式を再現して学ぶWebゲームです。  
ユーザーは表示された数式をMarkdown/LaTeX記法で入力し、正確に再現できればステージクリアとなります。

主な目的は、数式記法に親しむこと、さまざまな分野の数式に触れること、数式が登場する書籍やWeb記事への心理的ハードルを下げることです。

## 特徴

- 表示された数式をMarkdown/LaTeXで入力・再現
- 入力内容のリアルタイムプレビュー＆色分けハイライト
- ステージごとに新しい記法や分野を学べる
- ユーザー体験はクイズやタイピングゲーム風
- MVP段階ではユーザーデータ保存なし（LocalStorage対応予定）

## 今後の拡張予定

- 画像・エフェクト等によるゲーム演出の強化
- Firebase等を用いたユーザーデータ保存・ランキング
- 問題や分野の追加

## 技術スタック（予定）

- React＋Vite
- KaTeX（数式描画）
- Prism.js（ハイライト）
- GitHub Pagesデプロイ

## 開発計画（MVP）

1. ステージ選択・ゲーム画面のUI実装
2. 数式の表示と入力欄、プレビュー機能の実装
3. 正誤判定ロジック＆クリア画面
4. 問題データの仮実装


## 開発コンテナ（devcontainer）について

このリポジトリには VS Code の devcontainer 構成が含まれており、開発環境をコンテナ内で統一して起動できます。追加ファイルは `.devcontainer/` 配下にあります。

基本的な使い方:

- VS Code でリポジトリを開く
- コマンドパレットで「Remote-Containers: Reopen in Container」を実行
- コンテナ初回ビルド後、`npm install` が自動で実行されます（`postCreateCommand`）
- 開発サーバを起動するにはコンテナ内ターミナルで:

```powershell
npm run dev -- --host
```
-- --host オプションはコンテナ外部からのアクセスを可能にします。(重要：詰まりがちなポイント)

Vite のデフォルトポート 5173 をフォワードしています。ブラウザからは通常 `http://localhost:5173` でアクセスできます。

注意点（GitHub Pages への影響）:

- `.devcontainer/` のファイルは開発時のメタ情報であり、ビルド出力やデプロイ設定を直接上書きするものではありません。
- GitHub Pages へのデプロイは `vite build` の出力（`dist/` 等）や GitHub Actions 等で行われます。devcontainer を追加しても自動的に Pages の振る舞いは変わらないため、Pages 側の設定や Actions に明示的な変更がない限り影響はありません。

何か問題があれば devcontainer の設定を調整します（例えば Node バージョンの変更や追加ツールのインストール等）。