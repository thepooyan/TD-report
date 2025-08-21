export class Graph {
    #map = new Map<string, string[]>()

    push(key: string, value: string) {
        if (!this.#map.has(key)) {
            this.#map.set(key, []);
        }
        this.#map.get(key)!.push(value);
    }
    set(key: string, value: string[]) {
        this.#map.set(key, value)
    }
    get(key: string) {
        return this.#map.get(key)
    }
}


export class BiDirectionalGraph {
    #graphUp = new Graph()
    #graphDown = new Graph()

    setOneToMany(parent: string, children: string[]) {
        children.forEach(child => {
            this.#graphDown.push(parent.toLowerCase(), child.toLowerCase())
            this.#graphUp.push(child.toLowerCase(), parent.toLowerCase())
        })
    }
    get(key: string, direction: "parents" | "children") {
        if (direction === "parents")
            return this.#graphUp.get(key)
        else return this.#graphDown.get(key)
    }
}
