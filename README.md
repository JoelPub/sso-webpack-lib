# sso-webpack-lib
https://sso-webpack-lib.onrender.com


```sh
npm init -y
npm install webpack webpack-cli html-webpack-plugin lodash express webpack-dev-middleware cors --save
```
```sh
npm install && node index.js
webpack-dev-middleware 替代了npx webpack 的build 工作所以不需要npm build
```
- 运行后可以刷新a和b两个站点嵌入js library
> https://webpack.js.org/guides/getting-started/ 
> https://webpack.js.org/guides/output-management/ 
> https://webpack.js.org/guides/development/ 
> https://webpack.js.org/guides/author-libraries/ 

- webpack 生成es module
> https://stackoverflow.com/questions/42237388/syntaxerror-import-declarations-may-only-appear-at-top-level-of-a-module
> https://webpack.docschina.org/configuration/output/ 
> https://juejin.cn/post/7140619769853509640 
> https://webpack.docschina.org/guides/ecma-script-modules/
