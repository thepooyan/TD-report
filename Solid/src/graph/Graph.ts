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
