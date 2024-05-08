
// HTML Elements

/**
 * A class representing an HTML element inside of tags like <p> or <h1>
 */
class HElement {
    constructor(type, ...params) {
        this.type = type;
        this.params = params;
        this.children = new Array();
        this.domElement = document.createElement(this.type);
    }
    /**
     * Adds a child to the element
     * @param {HElement} child the child to add
     */
    addChild(child) {
        if(!(child instanceof HElement)){
            console.error("Child needs to be an Element type");
            return;
        }
        this.children.push(child);
        return this;
    }
    /**
     * Adds a class to the class list
     * @param {string} clazz the class to add
     */
    addClass(clazz){
        for (let index = 0; index < this.params.length; index+=2) {
            const element = this.params[index];
            let next = this.params[index+1];
            if(element == "class") {
                this.params[index+1] = next + " " + clazz;
            }
        }
        return this;
    }
    /**
     * Adds a parameter / attribute to the element
     * @param {string} name
     * @param {string} val
     */
    addParam(name, val) {
        this.params.push(name);
        this.params.push(val);
        return this;
    }
    /**
     * Converts the HElement into a DOMElement usable in an HTML document
     * @returns the DOMElement created
     */
    toThing() {
        for (let index = 0; index < this.params.length; index+=2) {
            const element = this.params[index];
            const element2 = this.params[index+1];
            if(element == "text"){
                this.domElement.textContent = element2;
            }else {
                this.domElement.setAttribute(element, element2);
            }
        }
        this.children.forEach(child => {
            this.domElement.appendChild(child.toThing());
        });
        return this.domElement;
    }
}
/**
 * Constructs an HElement
 * @param {string} type The type of the element. Example: "style" -> <style></style>
 * @param  {...string} params The parameters / attributes of the element
 * @returns 
 */
function makeH(type, ...params) {
    return new HElement(type, ...params);
}
/**
 * Adds an element to the body
 * @param {HElement} e The element to add
 */
function addToBody(e){
    if(!(e instanceof HElement)){
        console.error("Argument needs to be an HElement type");
        return;
    }
    document.body.appendChild(e.toThing());
}
/**
 * Adds an element to the head
 * @param {HElement} e The element to add
 */
function addToHead(e){
    if(!(e instanceof HElement)){
        console.error("Argument needs to be an HElement type");
        return;
    }
    document.head.appendChild(e.toThing());
}
/**
 * Removes the element from its parent
 * @param {HElement} e The element to remove
 * @returns 
 */
function remove(e){
    if(!(e instanceof HElement)){
        console.error("Argument needs to be an HElement type");
        return;
    }
    if(e.toThing().parentNode){
        e.toThing().parentNode.removeChild(e.toThing());
    }
}

// Style Elements

/**
 * A part of a style with a type, attributes and values
 */
class SElement {
    constructor(type, ...properties) {
        this.type = type;
        this.properties = properties;
    }
    /**
     * Add a property to the CSS
     * @param {string} name
     * @param {string} value
     */
    addProperty(name, value){
        this.properties.push(name);
        this.properties.push(value);
        return this;
    }
    /**
     * Converts this object to a string
     * @returns the string
     */
    toString() {
        let s = this.type+' {\n';
        for (let index = 0; index < this.properties.length; index+=2) {
            const element = this.properties[index];
            const element2 = this.properties[index+1];
            s += "\t"+element+": "+element2+";\n";
        }
        s += "}";
        return s;
    }
}
/**
 * A style that can have SElement as children
 */
class Style {
    constructor(...elements) {
        this.elements = elements;
        this.domElement = document.createElement("style");
        this.domElement.setAttribute("type", "text/css");
    }
    /**
     * Adds an element to the style
     * @param {SElement} e the element
     */
    addElement(e) {
        if(!(e instanceof SElement)){
            console.error("Argument needs to be an SElement type");
            return;
        }
        this.elements.push(e);
        return this;
    }
    /**
     * Converts this style to a <style> element
     * @returns the DOMElement
     */
    toThing(){
        let s = "\n";
        for (let index = 0; index < this.elements.length; index++) {
            const element = this.elements[index];
            s += element.toString();
        }
        this.domElement.textContent = s;
        return this.domElement;
    }
    /**
     * Adds this style to the document head
     */
    add(){
        document.head.appendChild(this.toThing());
    }
}
/**
 * Constructs a SElement
 * @param {string} type The name of the element. Example: "body" -> "body {"
 * @param  {...string} params the params of the style
 * @returns 
 */
function makeS(type, ...params) {
    return new SElement(type, ...params);
}
/**
 * Constructs a style
 * @param  {...SElement} elements the initial elements of the style
 * @returns the style
 */
function makeStyle(...elements) {
    return new Style(...elements);
}

// File System

/**
 * Checks a file's existence and if it doesn't exist, it adds common extensions;
 * @param {string} path The path to check
 * @returns The final path, or the original if not found
 */
function getPath(path) {
    var oPath = path;
    if(!existsFile(path)){
        path = oPath + "/index.html";
    }
    if(!existsFile(path)){
        path = oPath + ".html";
    }
    if(!existsFile(path)){
        path = oPath + ".css";
    }
    if(!existsFile(path)){
        path = oPath + ".js";
    }
    if(!existsFile(path)){
        path = oPath + ".png";
    }
    if(!existsFile(path)){
        path = oPath + ".jpg";
    }
    if(!existsFile(path)){
        path = oPath + ".jpeg";
    }
    if(!existsFile(path)){
        path = oPath + ".gif";
    }
    if(!existsFile(path)){
        path = oPath + ".ico";
    }
    if(!existsFile(path)){
        path = oPath + ".bin";
    }
    if(!existsFile(path)){
        path = oPath + ".pdf";
    }
    if(!existsFile(path)){
        path = oPath + ".json";
    }
    if(!existsFile(path)){
        path = oPath + ".xml";
    }
    if(!existsFile(path)){
        path = oPath + ".txt";
    }
    if(!existsFile(path)){
        path = oPath + ".md";
    }
    if(!existsFile(path)){
        path = oPath + ".mp3";
    }
    if(!existsFile(path)){
        path = oPath + ".wav";
    }
    if(!existsFile(path)){
        path = oPath + ".ogg";
    }
    if(!existsFile(path)){
        path = oPath + ".mp4";
    }
    if(!existsFile(path)){
        path = oPath + ".avi";
    }
    if(!existsFile(path)){
        path = oPath + ".mov";
    }
    if(!existsFile(path)){
        path = oPath;
    }
    return path;
}
/**
 * Checks if a file exists and is a File
 * @param {string} path The path
 * @returns if the file exists and is a file
 */
function existsFile(path) {
    const fs = require("fs");
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
}
/**
 * Checks if a file exists and is a Directory
 * @param {string} path The path
 * @returns if the file exists and is a directory
 */
function existsDirectory(path) {
    const fs = require("fs");
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}
/**
 * Checks if a file exists
 * @param {string} path The path
 * @returns if the file exists
 */
function exists(path) {
    const fs = require("fs");
    return fs.existsSync(path);
}
/**
 * Reads a file from the file system, adding extensions if needed
 * @param {string} path 
 * @returns the data of the file, if it exists
 */
function readFile(path) {
    const fs = require("fs");
    path = getPath(path);
    if(!existsFile(path)){
        return null;
    }
    return fs.readFileSync(path);
}
/**
 * Gets the content type of a path
 * @param {string} path The path
 */
function getContentType(path) {
    const fp = require("path");
    let contentType = "application/octet-stream";
    switch (fp.extname(path)) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpg';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.xml':
            contentType = 'application/xml';
            break;
        case '.md':
        case '.txt':
            contentType = 'text/plain';
            break;
        case '.bin':
            contentType = 'application/octet-stream';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
        case '.wav':
            contentType = 'audio/wave';
            break;
        case '.ogg':
            contentType = 'audio/ogg';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.avi':
            contentType = 'video/x-msvideo';
            break;
        case '.mov':
            contentType = 'video/quicktime';
            break;
    }
    return contentType;
}
/**
 * Gets the content type of a path, adding extensions
 * @param {string} path The path
 */
function getContentTypeFix(path) {
    return getContentType(getPath(path));
}
module.exports = {
    HElement,
    makeH,
    addToBody,
    addToHead,
    remove,
    SElement,
    Style,
    makeS,
    makeStyle,
    getPath,
    existsFile,
    existsDirectory,
    exists,
    readFile,
    getContentType,
    getContentTypeFix
}