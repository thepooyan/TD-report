import sassGraph from "~/json/sass-graph.json"
import bundleGraph from "~/json/bundles.json"
import { BiDirectionalGraph, Graph } from "./Graph"


const generateGraph = () => {
    let graph = {
        bunlde: new BiDirectionalGraph(),
        sass: new BiDirectionalGraph(),
    }

    Object.entries(sassGraph).forEach(([parent, children]) => {
        graph.sass.setOneToMany(parent, children)
    })
    bundleGraph.forEach(({bundleName,bundleItems}) => {
        graph.bunlde.setOneToMany(bundleName, bundleItems)
    })
    return graph
}

export const graph = generateGraph()