## *進め方

* develop ブランチから最新のコードを取得する

* develop ブランチからブランチ（feature#2 など）を切る

* タスクの部分のコードをかく

* git にプッシュする

* PR（pull request）を送る

↓ こちらの記事がよくまとまっているので参考にしてみてください。

[Githubでチーム開発するためのマニュアル](https://qiita.com/siida36/items/880d92559af9bd245c34)

## *PR する時のルール

* error,warning に関してはできるだけ消す

* 見やすいように prettier などをつかってフォーマットをただす

* 他の人にわかるようにするためのコメント以外は基本消す

* 上記の記事では master ブランチを中心に開発をしていますが、今回は develop ブランチを中心に開発をします。


## *コーディングルール

* コンポーネントの名前は先頭大文字
```jsx
const TopPage = () => {
  return <h1>hello</h1>
};
```

* 定数は全部大文字
```js
const MAX_NUM = 100:
```

* 関数はスネークケース
```js
const handle_click = () => {};
```

