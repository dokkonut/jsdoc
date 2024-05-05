class HElement {
    constructor(type, ...params) {
        this.type = type;
        this.params = params;
        this.children = new Array();
        this.domElement = document.createElement(this.type);
    }
    addChild(child) {
        if(!(child instanceof HElement)){
            console.error("Child needs to be an Element type");
            return;
        }
        this.children.push(child);
        return this;
    }
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
    addParam(name, val) {
        this.params.push(name);
        this.params.push(val);
        return this;
    }
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

function make(type, ...params) {
    return new HElement(type, ...params);
}
function add(e){
    if(!(e instanceof HElement)){
        console.error("Argument needs to be an Element type");
        return;
    }
    document.body.appendChild(e.toThing());
}
function remove(e){
    if(!(e instanceof HElement)){
        console.error("Argument needs to be an Element type");
        return;
    }
    if(e.toThing().parentNode){
        e.toThing().parentNode.removeChild(e.toThing());
    }
}