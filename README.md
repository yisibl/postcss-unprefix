# PostCSS Unprefix

TODO

## Input

.foo {
  -webkit-transition: padding .5s;
  -moz-transition: padding .5s;
}

## Output

.foo {
  -webkit-transition: padding .5s;
  -moz-transition: padding .5s;
  transition: padding .5s;
}


## Test

```console
npm install
npm test
```
