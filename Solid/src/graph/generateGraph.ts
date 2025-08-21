import sassGraph from "~/json/sass-graph.json"
import bundleGraph from "~/json/bundles.json"
import { Graph } from "./Graph"

const generateGraph = () => {
    const graph = {
        childrenToParents: new Graph(),
        parentsToChildren: new Graph()
    }
    Object.entries(sassGraph).forEach(([parent, children]) => {
        children.forEach(child => {
            graph.childrenToParents.push(child.toLowerCase(), parent.toLowerCase())
            graph.parentsToChildren.push(parent.toLowerCase(), child.toLowerCase())
        })
    })
    bundleGraph.forEach(({bundleName,bundleItems}) => {
        bundleItems.forEach(item => {
            graph.childrenToParents.push(item.toLowerCase(), bundleName.toLowerCase())
            graph.parentsToChildren.push(bundleName.toLowerCase(), item.toLowerCase())
        })
    })
    return graph
}

export const graph = generateGraph()