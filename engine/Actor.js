import GameObject from "./GameObject.js";

class Actor extends GameObject {
    constructor(name = "Actor") {
        super(name);
        // this.components = new Map();
        this.components = [];
    }

    update() {
        this.components.forEach(c => {
            c.update();
        });
    }

    getComponent(componentType) {
        // if (this.components.has(componentType)) {
        //     return this.components.get(componentType);
        // }
        // return null;
    }

    addComponent(component) {
        this.components.push(component);
        this.transform.addChild(component.GetComponent());
        // if (this.components.has(componentType)) {
        //     // warn. overriding existing component
        // }
        // this.components.set(componentType, new MeshRenderer());
    }

    removeComponent(component) {
        // if (this.components.has(componentType)) {
        //     this.components.delete(componentType);
        // } else {
        //     // Attempted to remove component that doesnt exist
        // }
    }
}

export default Actor;