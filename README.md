# JSElem

JSElem is a simple and light-weight JavaScript library with multiple features for HTML websites and NodeJS servers.




## Features

- Element addition during runtime
- File reading with automatic file extensions
- Usable on Website JavaScript and NodeJS


## Usage/Examples
```javascript
document.addEventListener("DOMContentLoaded", function() {
    const style = makeStyle();
    style.addElement(makeS("body","background-color","black"));
    style.addElement(makeS("h1","color","white","font-size","200%"));
    style.add();
});
```
```javascript
let pathName = "home";
pathName = jselem.getPath("src"+pathName);
let contentType = jselem.getContentTypeFix(pathName);
console.log(pathName+": "+contentType);
```


## Installation


```bash
npm install https://github.com/dokkonut/jselem
```
```javascript
const jselem = require("jselem");
//do something now
```
    
## Documentation

Documentation is inside of the JavaScript file. Will make a proper one later
