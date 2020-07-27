---
title: 什麼是 GatsbyJS
date: 2020-07-12
featuredImage: ../img/article_gatsby.png
---

這篇文章的重點在於介紹 Gatsby 核心概念、使用時機以及基本教學

<!-- endexcerpt -->

## I. 使用 Gatsby 的理由

### 什麼情況適合使用 Gatsby？
1. SEO 對你的網站來說很重要
1. 你想要順暢快速的使用者體驗

### Gatsby 的優點？
1. ES6 JavaScript + React + GraphQL + Webpack 等當代前端主流技術，學習曲線不陡峭
2. 可輕易串接 CMS 編輯好的內容。ex. WordPress、markdown。
3. 順暢的開發體驗，包括 React component 架構、 hot module reloading, 處理好的 webpack 設定等。
4. 優良的效能調校，包括 bundle splitting, asset prefetching, offline support, image optimization, 以及 server side rendering


### 運作原理跟特色
Gatsby 是一個 **static site generator**。相較一般的 SPA 有完整的 HTML markup，所以SEO效果優良。跟有同樣效果的 server side render(SSR) 不一樣的地方，在於 SSR 是在收到 request 之後，伺服器才產生需要的 HTML 給前端；而 static render 則是在 request 之前就已經將 HTML 產生好等待送出了。因為需要事先在 build time 產出頁面，所以適合頁面數量較少、規模較小的網站，例如個人網誌。如果是需要成千上萬頁面（例如大型電商平台），無法預測使用者輸入（例如搜尋引擎）的情況，就比較不適合。

在下面開始的教學，你會注意到 Gatsby 的主要指令有 `bash±gatsby develop` 與 `bash±gatsby build`。前者功能在於開發時期從 local 端起 webpack server，後者功能在啟動準備發佈前的建置作業。 

## II. 如何開始一個 Gatsby 專案？
1. 安裝 `gatsby-cli`

```bash
// yarn
yarn global add gatsby-cli

// 或是用 npm
npm install -g gatsby-cli
```

2. 新建一個 Gatsby 專案
```bash
gatsby new my-gatsby-project
```

也可以使用 Gatsby starter project 作為初始專案樣本，指令為
```bash
gatsby new gatsby-starter-default https://github.com/gatsbyjs/gatsby-starter-default
```
可以在[這裡]((https://www.gatsbyjs.org/starters/?v=2))找到其他 starters


3. 啟動開發用的 local server
```bash
// 進入資料夾
cd my-first-gatsby-project
// 啟動
gatsby develop
```
此時開啟瀏覽器，就可以在 http://localhost:8000 看到網站

4. 建置

建置一個 production build 版本，含有產生的靜態 HTML跟 by route 的 JavaScript bundle
```bash
gatsby build
```

檢視 production
```bash
gatsby serve
```
在本機檢視 production 版本，可在  http://localhost:9000 看到結果

如果你是用從 `gatsby-starter-default` 的話，可以看到這樣的檔案結構

```markdown
.
root
  ├──package.json
  ├──node_modules
  ├──gatsby-config.js
  └─src
    ├─ pages
    │   ├─ index.js
    │   └─ page-2.js
    ├─ components
    │     ├─ header.js
    │     └─ layout.js
    └─ images
         ├─ gatsby-astronaut.png
         └─ gatsby-icon.png
    ...
```

在這裏，`pages` 資料夾底下的 module（通常為 .js 或 .jsx）將被視為 page component，一個檔案就是一個頁面。所以這裡會有 index 與 page-2 兩頁。

Gatsby 會相應地產生他們的網址路徑，並且會做 code splitting。單位都是一個 page（這部分跟 Next 滿像的）。

順帶補充下，React Component 分為 page 跟 component 兩種性質。Page 是單一一個頁面，使用者在同個瀏覽器頁籤的一個網址下，只會看到一個頁面。以樹來比喻是枝幹。而 component 則可以在頁面上同時存在好幾個，例如 Header, Navigation, Modal, Button 都是。以樹來說像是葉子，生長在枝幹（頁面）上的葉子。
      在 Gatsby 中也不例外。我們會按照這個 component 的性質，決定他要分類在 page 或是 component。

### Styles
Gatsby 的 styles 有兩種進路，一種是 CSS modules，一種是 CSS-in-JS。

#### 1. CSS modules
在 classnames 上自動 prefix module name，避免與其他同名 class 衝突。例如

```css
/* page1.module.css */
.btn-blue {
  background-color: blue;
}
```

```jsx
// page1.jsx
import page1Styles from "./page1.module.css"
<button className={page1Styles.btnBlue}>送出</button>
```

編譯後會自動轉為像這樣的 class name

```html
<button class="page1-module--btn-blue--29dQa">送出</button>
```

#### 2. CSS-in-JS
CSS-in-JS 的方案常見的有 [Emotion](https://github.com/emotion-js/emotion) 與 [Styled Component](https://styled-components.com/)。主要特色是將 CSS styles 寫在 JS，無論是共享或繼承都是以 JavaScript object 的方式處理。
範例：

Emotion:
```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core'

let SomeComponent = props => {
  return (
    <div
      css={{
        color: 'hotpink'
      }}
      {...props}
    />
  )
}
```


Styled Component:

```jsx
const LinkButton = styled.a`
  display: inline-block;
  padding: 0.5rem 0;
  background: deepskyblue;
`

render(
  <LinkButton
    href="https://www.google.com"
    target="_blank"
    rel="noopener"
    primary
  >
    送出
  </LinkButton>
)

```

## III. 參考資料
- [GatsbyJS](https://www.gatsbyjs.org/)
- [Static vs. Server Rendering | Frontend Armory](https://frontarm.com/james-k-nelson/static-vs-server-rendering/)
