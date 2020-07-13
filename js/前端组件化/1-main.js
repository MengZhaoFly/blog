
function createElement(Cls, attributes, ...children) {

    let o = new Cls({
        timer: {}
    });

    for (let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }
    //console.log(children);
    for (let child of children) {
        o.children.push(child);
    }
    return o;
}

class Parent {
    constructor(config) {
        this.children = [];
    }
    set class(v) { //property
        console.log("Parent::class", v)
    }

    setAttribute(name, value) { //attribute
        console.log(name, value);
    }


}

class Child {

}

let component = <Parent id="a" class="b">
    <Child></Child>
    <Child></Child>
    <Child></Child>
</Parent>

component.class = "c";
/*
var component = createElement(
    Parent, 
    {
        id: "a",
        "class": "b"
    }, 
    createElement(Child, null), 
    createElement(Child, null), 
    createElement(Child, null)
);
*/

console.log(component);

//componet.setAttribute("id", "a");