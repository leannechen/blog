---
title: Gatsby 圖片處理進路解說
date: 2020-07-25
featuredImage: ../img/gatsby.png
---

簡單說明在 Gatsby 中怎麼處理圖片 

<!-- endexcerpt -->

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

至於為什麼要安裝這麼多的外掛只為了處理圖片呢？

### Sharp 的功用

### `gatsby-image` 的功用


fluid, fixed 兩種
