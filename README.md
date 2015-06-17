# PostCSS Unprefix

TODO

![Gif Deom](http://ww3.sinaimg.cn/bmiddle/534b48acgw1et7jyprmj3g20b40ciaes.gif)

## Input

```css
.foo {
  -webkit-transition: padding .5s;
  -moz-transition: padding .5s;
}
```

## Output

```css
.foo {
  -webkit-transition: padding .5s;
  -moz-transition: padding .5s;
  transition: padding .5s;
}
```


## Test

```console
npm install
npm test
```
