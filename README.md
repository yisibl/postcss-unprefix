# PostCSS Unprefix

TODO

http://blogs.msdn.com/b/ie/archive/2014/07/31/the-mobile-web-should-just-work-for-everyone.aspx
http://www.ghacks.net/2015/05/09/mozilla-adds-webkit-prefix-emulation-to-select-sites-in-firefox/

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
