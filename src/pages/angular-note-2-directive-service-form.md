---
title: Angular 筆記—Part 2. Directive, Service, Form
date: 2019-11-14
featuredImage: ../img/article_angular.png
---

關於 Angular 2+ 的 directive, service, form

<!-- endexcerpt -->

### Attribute Directives
- Directive 是 global 的
    - 直接在 HTML 中使用即可，不用跟 service 一樣另外引用
    - ex. “appCounter”這種名稱為了避免衝突
- `@HostListener`
    - Host 的 event listener
- Can attribute directives be applied to Angular component?


### `@Input` 的使用與否
Component 與他的 HTML 互相信任，所以 HTML 要使用 component 內 value 時可以不需要特別宣告 `@Input`。然而 directive 相關的 property 沒有這層信任關係，所以他的屬性必須要透過`@Input`宣告，才能被認出來跟使用。
例如：
```html
<p [appHighlightColor]="color">Hi</p>
```

`[appHighlightColor]` 是 directive 的屬性名稱，必須要宣告。而`color` 是 component 的 value，不需宣告。


## Structural Directives

- 總共有哪些
  - `*ngIf`
  - `*ngFor`
  - `*ngSwitch`
- 一個 HTML element 同時間只能有一個 structural directive
- Remove component from DOM tree for performance and memory
- 星號 prefix `*` 代表是結構性 directive，如果沒有星號就不是
- `*` 星號會被轉成`<ng-template>`，比如

```html
<div *ngIf="hero" class="name">{{hero.name}}</div>
```

會被轉成這樣：

```html
// 用 ng-template 包住原始 element
<ng-template [ngIf]="hero">
  <div class="name">{{hero.name}}</div>
</ng-template>
``` 
    

### 比較 template input variable 與 reference variable
1. template input variable, ex. `ngFor=”let hero of heroes”`
2. template reference variable, ex. `#var`

|            | template input variable | template reference variable                                                                                                  |
| ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Scope      | Local，只屬於該 iterate 實體                                     | Global.<br>A reference variable refers to its attached element, component or directive. It can be accessed anywhere in the entire template |
| Namespaces | 分開                                                        | 分開                                                                                                                                         |




### ngSwitch

- 組合：`ngSwitch`, `*ngSwitchCase`, `ngSwitchDefault`

### `<ng-container>` 使用時機與作用

- 不會被放進 DOM 裡
- 不要為了使用 structural directive 而開設新的 DOM


## Form

- 表單分為 Reactive Form 與 Template Driven Form
- 基本比較：
-  Reactive Form
	- sync
	- 可以直接碰觸到 FormControl 實體
	- 比較有彈性
	- Validator = functions
	- 好寫測試
	- Immutability 不變性：每次值改變時，FormControl 實體不會動到原本的值，而是會回傳新的一份 data model
	- 提供低層級的 API 與同步的存取，擴充性比較高
- Template Driven Form
	- Simplicity
	- 沒辦法直接觸碰到 FormControl 實體
	- Data source is template
	- Form Control 實體跟 ngModel 被綁在一起，自己做掉，然後才進入 component 中
	- Two way binding
	- Update value asynchronously
	- Validator = directives
	- 不好寫測試
	- Mutability 可變性：每次值改變時，data model 的更新是雙向繫結，所以沒有辦法很準確地預測他的更新狀況，重用性也比較低

> 名詞解釋
>- Form Model = FormControl instance
>- `valueChanges` observable
>- observable streams


### Reactive Forms

#### API

#### Form Model 作為值的來源，變化是在一個 observable stream 中的

Usage:

```javscript
name = new FormControl('Anna')
{{ name.value }}
name.setValue('Nancy')
name.untouched
```

#### Form Group

- 個別 field 都有自己的 FormControl
- 可以透過統一的 submit 送出 (ngSubmit)
- 可以拆組
- 更新值方法：
1. setValue
    - Use the `setValue()` method to set a new value for an individual control. The `setValue()` method strictly adheres to the structure of the form group and replaces the entire value for the control.
    - 必須要跟 form fields list 完全符合，否則會 throw error
2. patchValue
    - Use the `patchValue()` method to replace any properties defined in the object that have changed in the form model.
    - 比較鬆散，不會檢查
    - 只要 fields 裡面有的會去更新，沒有也不會報錯
- 一次建立 FormBuilder
    - `control()`
    - `group()`
    - `array()`
- form
    - status: valid, invalid


Validation
1. Template-Driven Form + Directives
2. Reactive Form + 在 component 內檢查（用 checker functions）


### Validation
- Template Driven Form + Directives：因為 template driven form 的 model 只會以 `html±[(ngModel)]="someVal"` 的形式存在於 template，component 中對有哪些值一無所知，所以一切驗證都得以 directive 的形式做在 template，無論現成格式 ex. required, minlength 或是自訂驗證都一樣。

- Reactive Form：因為 component 控制了值的一切（包括設定 initial value），所以可以在 component 中處理驗證。這種方式的可控性更高，validator 也只要以 function 存在即可，不需要加工成 directive。

#### 跨欄位驗證 (Cross-field Validation)

- Reactive Form: 將驗證規則放在 form level，這個 validator function 可以存取到整個 `FormGroup` control，再去 `javascript±.get('name')`, `javascript±.get('age')` 去做比較就可以了
- Template Driven Form: 將驗證規則的 directive 放在 form level 的 HTML，例如 `html±<form #heroForm="ngForm" appIdentityRevealed>` 。
- 其實跟 single field 的規則一樣，只是往上拉一個層級
- "Control" 可能是指「單一欄位(field)」的 control，也可能是指「整個表單」的 control
- Class ex. `UniqueAlterEgoValidator` 要讓他實體化，但 function ex. `identityRevealedValidator` 不用


### Dynamic Form

將所有問題集中在 service 中，其他元件或服務都不會碰觸到問題。這樣的好處是彈性很大，當表單內容有任何需求異動——新增、刪除、修改——的時候，只要去修改 service 就可以，不需要動到別的東西。 而真的需要新的 field component ex. checkbox 的時候，新增 Checkobx component 、並在 service 加入正確格式的項目就可以，就跟加入錯誤訊息一樣。
