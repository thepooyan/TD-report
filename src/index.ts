import fs from "fs"
import {JSDOM} from "jsdom"
import pages from "./pages.json"
import tahaPages from "./pagess.json"

const EXCLUDED_SCRIPTS = [
    "https://www.googletagmanager.com/gtag/js?id=G-N901M1ZKXX",
]

const main = async () => {

    const urlBase = "https://www.tahlildadeh.com"

    type result = {
        name: string,
        url: string,
        css: string[],
        js: string[]
    }
    type tahaPage = {
        name: string,
        url: string,
        children?: tahaPage,
    }[]
    type page = {name: string, url: string}[]
    let toSearch:page = [];

    function flattenPages(pages: tahaPage) {
        pages.forEach(page => {
            toSearch.push({ name: page.name, url: page.url })
            if (page.children) {
                flattenPages(page.children)
            }
        })
    }
    
    flattenPages(tahaPages as tahaPage)

    console.log(toSearch)
    return

    let results:result[] = []

    const request = (url: string) => {
        return fetch(urlBase + url)
    }

    const proccessBody = (name:string, url:string, body: string) => {
        let dom = new JSDOM(body)

        let links = dom.window.document.getElementsByTagName("link")
        let css = Array.from(links).filter(l => l.rel === "stylesheet").map(l => l.href)

        let scripts = dom.window.document.getElementsByTagName("script")
        let js = Array.from(scripts).filter(l => l.src !== "" && !EXCLUDED_SCRIPTS.includes(l.src)).map(l => l.src)

        results.push({name, url,js, css})
    }

    for (const {name,url} of pages) {
        let result = await request(url)
        let body = await result.text()
        proccessBody(name, url, body)
    }

    fs.writeFile("./result.json", JSON.stringify(results, null, "\t"), (err) => {
        console.log(err)
    })
}
main()