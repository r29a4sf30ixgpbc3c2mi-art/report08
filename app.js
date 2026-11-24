
const express = require('express');
const app = express();

const PORT = 30101;

app.get('/', async (req, res) => {
  try {
    const response = await fetch(
      'https://dog.ceo/api/breeds/image/random'
    );

    if (!response.ok) {
      throw new Error('APIの取得に失敗しました');
    }

    const data = await response.json();

    res.send(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>Dog API アプリ</title>
      </head>
      <body>
        <h1>Dog APIで犬の画像を表示</h1>
        <p>REST APIを利用して取得した犬の画像です。</p>
        <img src="${data.message}" alt="犬の画像" width="400">
        <p><a href="/">別の犬の画像を見る</a></p>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('犬の画像を取得できませんでした。');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

