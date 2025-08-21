import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import pages from "~/json/result.json"
import Pages from "~/components/Pages"
import BundleLink from "~/components/BundleLink"
import { graph } from "~/graph/generateGraph"

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


    const bundleChildren = () => {
      return graph.bunlde.get(cleanName().toLowerCase(), "children")
    }
    const bundleParents = () => {
      return graph.bunlde.get(cleanName().toLocaleLowerCase(), "parents")
    }
    const sassChildren = () => {
      let name = cleanName().toLocaleLowerCase()
      if (name.endsWith(".min.css")) name = name.replace(".min.css", ".scss")
      return graph.sass.get(name, "children")
    }
    const sassParents = () => {
      let name = cleanName().toLocaleLowerCase()
      if (name.endsWith(".min.css")) name = name.replace(".min.css", ".scss")
      return graph.sass.get(name, "parents")
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
            <div class="grid grid-cols-2">
              <div>
                <Show when={bundleChildren()}>
                    {b => <>
                        <p class="  my-2">
                        Bundle children:
                        </p>
                        {b().map(b => <BundleLink type={params.type} u={b}/>)}
                  </>}
                </Show>
                <Show when={sassChildren()}>
                  {g => <>
                    <p class="  my-2">
                      SASS children:
                    </p>
                    {g().map(str => <BundleLink type="css" u={str}/>)}
                  </>}
                </Show>
              </div>
              <div>
                <Show when={bundleParents()}>
                    {b => <>
                        <p class="  my-2">
                        Bundle parents:
                        </p>
                        {b().map(b => <BundleLink type={params.type} u={b}/>)}
                  </>}
                </Show>
                <Show when={sassParents()}>
                  {g => <>
                    <p class="  my-2">
                      SASS parents:
                    </p>
                    {g().map(str => <BundleLink type="css" u={str}/>)}
                  </>}
                </Show>
              </div>
            </div>
        </div>
        <h2>Used in Pages:</h2>
        <Pages pages={() => pages.filter(r => r[params.type].includes(fileName()) )} highlight={() => fileName()}/>
    </div>
  )
}

export default js