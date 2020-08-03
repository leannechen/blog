---
title: Angular 筆記—Part 1. Module & Component
date: 2019-11-11
featuredImage: ../img/article_angular.png
---

關於 Angular 2+ 的基本觀念，包括 module, component

## Basics

- Constructor: Reserve the constructor for simple initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything.
- `HeroService.getHeroes()` must have an asynchronous signature of some kind.
- Angular's `HttpClient` methods return RxJS `Observable`s.
- Angular (template) only binds to public component properties.
- An `Observable` does nothing until something subscribes.

### Component, Service 的分工

- Component 用來做 view 的呈現，Service 用來做資料的提供，並且可以跨 component
- Service 是怎麼區分還不清楚，推測是根據 data 的分類跟主體
- Service 之間為什麼可以做互相引入 (“service in service”)，或者說這樣的 practice 是否良好，這點還要再確認
- 資料只會有一個進入點，而且常會是 service。比如 mock hero data 就會進 hero service，此後其他元件需要這些資料就為透過 hero service 來取得跟修改

### CSS scope
CSS 的部分，各組件有自己的 local scope，即便是 element selector ex. `<h2>, <body>, <p>` 也可以放心大膽地下，轉譯後會變成 `body[_ngcontent-fvx-c0]` 這樣的 selector


## Module
 
`@NgModule` metadata 說明

### `declarations`
- 這個Module內部Components/Directives/Pipes的列表，聲明這個Module的內部成員＝「我底下有哪些成員」
- 一個 component 只能被宣告(declaration)在一個 module，不可以同時被多個 module 宣告。當有多個地方需要這個 component 時，應該 import 該 component 所屬 module。
- 其他 module 的 component 對此 component 一無所知。
- Angular 的應用程式全部以 module 為單位切分。
- Component, Directives, Pipes 都是這樣，只能屬於一個 module

### `import`
- 這個模組所需用到的 Angular 提供的或第三方提供的Angular資源庫（如FormsModule、HttpModule等）＝「我要使用的東西」
- 告訴這個 module 他需要哪些其他 module。比如 module 0 會需要 module A, B, C，就會寫在這裡
- 同時如果要用到其他 module 的 component, directive, pipe 等等，也是藉由在這裏引入做到

### `providers`
- 告訴這個 module 他有用到哪些 service＝「我要使用的 service」
- 在此宣告後所有下面的元件都可以直接使用這個服務。
- 如果是在 app.module 的話，就是全應用程式層級都可以使用

### `exports`

### `bootstrap`
- 這個屬性只有根模組需要設定，在此設定在一開始要進入的模組成員是那一個。＝「要從誰進入模組」
- 定義：
    - 告訴應用程式該用哪個 component 啟動，也被稱為 entry component
    - 被 Angular 建立並插入至 index.html 的 component
- 通常全站只會有一個地方需要此屬性，而且這 component 通常也就是 AppComponent
- 該 component 會是樹的根，啟動他就會創建所有他的子孫 component
> Each bootstrapped component is the base of its own tree of components. Inserting a bootstrapped component usually triggers a cascade of component creations that fill out that tree.
- 或是設定 `Entry Components`

### `exports:`
- 用來控制將哪些內部成員暴露給外部使用。＝「其他人可以用哪些我的成員」


## 類型 (Types of Feature Modules)

1. Domain module 
2. Routed
3. Routing
  - Lazy loading

- Shared modules
	- 共用 component 可以在其所屬 module `export`，讓別人可以使用
	- 預設做法特性：每個模組都會重新產生一次 service，都是不同的實體，造成資料難以在不同的模組之間透過 service 共用。解決方式：只在上層模組注入服務，而且不允許其他模組注入，確保只拿到一個實體。
- Feature Module：依照不同的類型將程式分割成不同模組
- Shared Module：將共用的程式組合成一個新的模組
- Core Module：當應用程式有 singleton 需求時，把所有 service 統一在此模組內，此方法在 Angular 6 後使用的機會開始漸漸減少


> **Singleton 單體模式**
> Singleton 的概念就是同一個 class 只能建立唯一一個實體物件（或稱為實例，instance）。當第二次使用同一個 class 建立新物件的時候，我們會得到和第一次建立時同一個物件


## Components

### Component metadata
- selector ：CSS Selector
- templateUrl: Template 位置
- styleUrls: Style 位置，可以多個
- providers

### Data binding
- `{{name}}`
- `[property]="value"`
- `(event)="handler"`
- `[(ng-model)]="property"`
- Pipe
- Directive
    - 結構型(Structural)：會影響到 DOM 顯示與否的，例如 `*ngFor`, `*ngIf`
    - 屬性型(Attribute)：只修改現有元素的外觀或行為的，例如 `[(ngModel)]`
- Life Cycle Hooks
    - A directive has the same set of lifecycle hooks.

## Component life Cycle

| 順序    | Hook                  | Usage and Timing                                                                                                                                                               |
| ----- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | ngOnChanges           | - 一旦檢測到該元件(或指令)的輸入屬性發生了變化，Angular 就會呼叫它的 `ngOnChanges()` 方法<br>    - 抓不到 object.property 的改變，因為只抓得到 object 的 reference<br>- 可以拿到 previousValue, currentValue (`SimpleChanges`) |
| 2     | ngOnInit              | - 好像不是真正的 init，因為只要 input data change，就會觸發<br>- 還是說他是屬於 element 的初始化的意思，因為只要 element 中內容改變，他就得重新 render 一次，所以才會觸發 onInit？                                                      |
| 3-1   | ngDoCheck             | 檢查更新<br><br>- 使用 `DoCheck` 鉤子來檢測那些 Angular 抓不到的變更並採取行動<br>    - 所謂「抓不到」是指比如傳進 object 而只能抓到 reference 時，去強迫監聽<br>    - 效能開銷很可觀，要小心使用                                            |
| 3-2-1 | ngAfterContentInit    | - 當 Angular 把外部內容投影進元件/指令的檢視之後呼叫<br>- 只呼叫一次                                                                                                                                    |
| 3-2-2 | ngAfterContentChecked | - 每當 Angular 完成被投影元件內容的變更檢測之後呼叫。<br>- `@ContentChild`,                                                                                                                         |
| 3-3-1 | ngAfterViewInit       | 當 Angular 初始化完元件 view 及其子 view之後呼叫。                                                                                                                                            |
| 3-3-2 | ngAfterViewChecked    | 每當 Angular 做完元件 view 和子 view 的變更檢測之後呼叫<br><br>- 偵測 child view 變化<br>- 更新必須在 setTimeout(callback, 0) 中<br>- 單向資料流<br>- `@ViewChild`, `this.viewChild`                           |
| 4     | ngOnDestroy           | 每當 Angular 每次銷毀指令/元件之前呼叫並清掃。 在這裡反訂閱可觀察物件和分離事件處理器，以防記憶體洩漏。                                                                                                                      |


- `@ViewChild`, `this.viewChild`

Content:

```html
<after-content>
  <app-child></app-child>
</after-content>
```

View:

```html
<div>-- child view begins --</div>
  <app-child-view></app-child-view>
<div>-- child view ends --</div>`
```

### 關於結構的設計方式

- Module 作為模組的單位是最好的
    - Module 可能含有多個 component，用 module 包住 component
    - component 外層一定包有 module，透過 module 來輸出跟引入
    - 一個 component 有可能在多個 module 中被使用。如果不用 module 包起來的話，component 可能會執行兩次，Angular 會阻止你這麼做
    - 如果同個 module 中兩個 component 都要用到同一個 service，比較好的做法是在 module 注入 service（而不是 component 個別注入兩次）
- 使用 interface 來界定規格，如型別
- Reactive Form 的設計很棒，值得一看


## Components & Templates

### Component Interaction

1. Parent → Child
    - `@Input` Input binding 如何偵測跟改變該值？
        - 可以透過 setter (`set myValue`) 來改變 `@Input` 的值
        - Child 用 `ngOnChanges()` 偵測 input property changes 
1. Child → Parent
    - Parent 透過 EventEmitter 偵測 child event，Child 傳出 `@Output new EventEmitter()`，在 event handler 收值並 emit，讓 Parent 接到後拿來做事
1. Parent ↔ Child
    - Local Variable
        - Parent 可以透過 local variable (e.g. `html±<app-count-down-timer #timer>`) 代表 child component 能取用的方法或屬性
        - 缺點是 parent 沒有任何 access 知道 child 內部發生了什麼事跟有什麼值
    - `@ViewChild`
        - Parent 透過 `@ViewChild` 取用 child component 內部方法
        - 缺點感覺是 multiple source of truth
    - Service
        - 最靈活，可做很多事
        - If multiple components requires same source of behavior, use service.
        - Service should inject to parent component which makes child accessible too.
        - Parent and child component separated by view too. 
        - Mock data (missions, astronauts) are placed in parent component in this case, but might well be stored in service in real world app.


## Component Styles

- `:host` 用來 style 指定 component tag 本身的 style
- `:host-context` 
- 副檔名 .scss, .sass 沒差，Angular 都會自動幫你轉譯成 CSS，從 stylesUrl 引入就好了

> ### Related information
> - Shadow DOM
>   - 最大用處：封裝 encapsulation
>   - 可以想像成斗篷
>   - mode 可決定斗篷內東西是否開放給外界看跟查詢
>   - 其他操作跟一般的 DOM 沒有兩樣
>   - `.attachShadow()` = 建立並在 host element 附著一個 shadow root
>   - Browser 早已實作，比如 `<video>` 的 controls 按鈕
> - `encapsultaion:` component 設定：決定要真正變成 Shadow DOM（注意瀏覽器支援度）、模擬 Shadow DOM（預設）還是不要封裝

> ### 相關閱讀
> - https://medium.com/better-programming/angular-vs-react-change-detection-c54ae33139fe
> - https://ithelp.ithome.com.tw/articles/10188047
> - https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
> - https://dotblogs.com.tw/wellwind/2017/06/21/dynamic-component-with-component-factory-resolver 把 <ng-template> 說明的很清楚
