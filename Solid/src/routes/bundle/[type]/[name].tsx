import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import pages from "~/json/result.json"
import bundleInfo from "~/json/bundles.json"
import Pages from "~/components/Pages"
import BundleLink from "~/components/BundleLink"
import sassGraph from "~/json/sass-graph.json"

const js = () => {
    const params = useParams<{type: "css" | "js", name: string}>()
    
    let fileName = () =>  decodeURIComponent(params.name)
    let cleanName = () => {
        if (fileName().match(/\?v=.*$/)) {
            return fileName().replace(/\?v=.*$/, "")
        }
        return fileName()
    }
    let isBundle = () => fileName().match(/\?v=.*$/);

    const lowercaseSassGraph = Object.fromEntries(
      Object.entries(sassGraph).map(([key, value]) => [key.toLowerCase(), value])
    );

    const bundleItem = () => bundleInfo.find(b => b.bundleName.toLowerCase() === cleanName().toLowerCase())
    const graphItem = () => {
      let name = cleanName().toLocaleLowerCase()
      if (name.endsWith(".min.css")) name = name.replace(".min.css", ".scss")
      if (name in lowercaseSassGraph) return lowercaseSassGraph[name as keyof typeof sassGraph]
      return null
    }

  return (
    <div class="space-y-5">
        <div class="border-1 border-black p-5 rounded">
            {isBundle() && <div class="bg-blue-300 rounded p-2 w-max inline-block mr-5">
              Bundle name: 
            </div> || <div class="bg-green-300 rounded p-2 w-max inline-block mr-5">
                File name:
            </div>}
            <span class="text-bold">{cleanName()}</span>
            <div>
            <Show when={bundleItem()}>
                {b => <>
                    <p class="  my-2">
                    Bundle Files:
                    </p>
                    {b().bundleItems.map(b => <BundleLink type={params.type} u={b}/>)}
              </>}
            </Show>
            <Show when={graphItem()}>
              {g => <>
                <p class="  my-2">
                  SASS imports:
                </p>
                {g().map(str => <BundleLink type="css" u={str}/>)}
              </>}
            </Show>
            </div>
        </div>
        <h2>Used in:</h2>
        <Pages pages={() => pages.filter(r => r[params.type].includes(fileName()) )} highlight={() => fileName()}/>
    </div>
  )
}

export default js