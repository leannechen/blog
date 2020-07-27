---
title: Gatsby 圖片處理進路解說
date: 2020-07-25
featuredImage: ../img/article_tokyo-night-view.jpg
---

在 Gatsby 中如何處理圖片與各個套件用途解說 

<!-- endexcerpt -->

## 安裝套件

當你想在 Gatsby 頁面中插入圖片時，會需要安裝幾樣東西。
1. `gatsby-source-filesystem`：用來透過 GraphQL 取得檔案
1. `gatsby-plugin-sharp`：後端最佳化圖片工具—— [Sharp](https://github.com/lovell/sharp) 跟 Gatsby 間的橋樑
1. `gatsby-transformer-sharp`：讓你可以在 GraphQL 中透過 `ImageSharp` 這個欄位取得被 Sharp 最佳化後的圖片資源
1. `gatsby-image`：前端最佳化圖片的工具

安裝完以後，我們就可以下這樣的 query：

```js
export const query = graphql`
  query {
    fileName: file(relativePath: { eq: "images/myimage.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 250) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
```

然後在 view 中這樣使用：

```jsx
<Img fluid={data.fileName.childImageSharp.fluid} alt="" />
```

可能你會想問，為什麼要安裝這麼多的外掛只為了處理圖片呢？
其實 `gatsby-source-filesystem` 在取得圖片以外，主要是為了讀取得到本地的檔案系統的檔案。透過各種 "transform" plugin，不同的檔案可以被轉成 JSON 形式的資料，以 "Node" 方式被取得。比如 `gatsby-transformer-remark` 就是用來將 markdown 轉成 MarkdownRemark nodes，並且透過 GraphQL 取得(query)到。

## Sharp

Sharp 是個用來後端處理圖片的 NodeJS 套件。在這裡主要是處理 resize（改變圖片尺寸大小）與 quality（壓縮品質與速度）的工作。例如若設定某張圖片的 maxWidth 為 800px，則它會產生 200px, 400px, 800px, 1200px, 1600px 等不同尺寸，以提供裝置最適合大小的圖片。

有興趣研究背後運作的話，也可以參考 [詳細的 API 文件](https://sharp.pixelplumbing.com/)。


## gatsby-image

至於 `gatsby-image` 則是前端對圖片做各種優化處理的工具。比如以下功能
1. 對大於 container 的圖做 resize 好 fit in
2. 製作並提供給行動裝置較小尺寸的圖，以免下載到跟桌機版一樣大的檔案
3. Lazy loading（懶加載）：圖片進入視野時才去載入資源，以節省傳輸流量並加快速度
4. 使用 "blur-up"：在圖片載入期間使用模糊圖，提升使用者等待期間體驗
5. 在未載入時保留圖片 container 的空間：以免圖片從未載入轉到載入狀態時造成畫面跳動

上段提到的這些 issue `gatsby-image` 都幫你處理好了，用法也不難。基本寫法會長這樣：

```jsx
import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <div>
    <Img fixed={data.file.childImageSharp.fixed} />
  </div>
)
// GraphQL query
export const query = graphql`
  query {
    file(relativePath: { eq: "blog/avatars/kyle-mathews.jpeg" }) {
      childImageSharp {
        # 在這裏指定圖片的尺寸等參數
        fixed(width: 400, height: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
```

它的背後是使用 `html±<picture>` element 來套用不同的 `html±<source>`（或是 `html±<img>`，如果沒有符合指定 `media` 的話），以取得最適合的圖片資源。
至於要怎麼解決上面提到的 size 問題呢？`gatsby-image`的進路是將圖片分為兩種，一種是 fixed，一種是 fluid。


### 1. fixed 類型

如其名，意思是指定固定寬高的圖片。

```jsx
// in JSX
<Img fixed={data.file.childImageSharp.fixed} />
```

```graphql
# in GraphQL query
{
  imageSharp {
    # Other options include height (set both width and height to crop),
    # grayscale, duotone, rotate, etc.
    fixed(width: 400, height: 300) {
      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
      ...GatsbyImageSharpFixed
    }
  }
}
```

其中`fixed(width: 400, height: 300)`的意思是「我要指定 400(寬)x300(高) px 的圖片」。在這裏指定後，套件就會自動產生該尺寸的圖片，包括 Retina 螢幕與一般螢幕解析度的圖片資產。至於`GatsbyImageSharpFixed` 這個 GraphQL 的 fragment 則是直接套用寫好的 fixed 請求參數，不用自己手刻。


### 2. fluid 類型

圖片會延展或裁切，以配合它的容器。換句話說，容器有多大，圖片就會跟著多大——寬高皆是。在 responsive web design 的時候很好用，讓 mobile, tablet, desktop 等 device 的圖片都能照想要的容器大小縮放。

```jsx
// in JSX
<Img fluid={data.file.childImageSharp.fluid} />
```

```graphql
# in GraphQL query
{
  imageSharp {
    # 當容器的寬度是 700 px 的時候
    # 另外，你也可以設置 maxHeight（若同時設置 maxWidth 跟 maxHeight，圖片會據此做裁切）、灰階、duotone、旋轉等參數
    fluid(maxWidth: 700) {
      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
      ...GatsbyImageSharpFluid_noBase64
    }
  }
}
```

更多的參數可以參考[官網](https://www.gatsbyjs.org/packages/gatsby-image/?=gatsby-image#gatsby-image-props)

最後，在抉擇要使用哪一種圖片時，可以問自己「我是否知道這張圖片應該要呈現的精確大小？」——如果是的話，使用 `fixed`，如果否的話，則使用 `fluid`。


## 參考資料
- [Working with Images | GatsbyJS](https://www.gatsbyjs.org/docs/working-with-images/)
- [gatsby-image | GatsbyJS](https://www.gatsbyjs.org/packages/gatsby-image/)
- [gatsby-plugin-sharp | GatsbyJS](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/)

> 封面圖片來源：[東京タワーと都市夜景（フォトモンタージュ）のフリー素材](https://www.pakutaso.com/20191134331post-24352.html)
