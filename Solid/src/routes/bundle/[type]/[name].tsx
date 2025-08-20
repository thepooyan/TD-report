import { useParams } from "@solidjs/router"
import { Show } from "solid-js"
import pages from "~/json/result.json"
import bundleInfo from "~/json/converted.json"
import Pages from "~/components/Pages"

const js = () => {
    const {type, name} = useParams<{type: "css" | "js", name: string}>()
    let fileName = decodeURIComponent(name)
    let isBundle = false;
    let cleanName = fileName

    if (fileName.match(/\?v=.*$/)) {
        isBundle = true;
        cleanName = fileName.replace(/\?v=.*$/, "")
    }
  
    const bundleItem = bundleInfo.find(b => b.bundleName.toLowerCase() === cleanName.toLowerCase())

  return (
    <div class="space-y-5">
        <div class="border-1 border-black p-5 rounded">
            {isBundle && <div class="bg-blue-300 rounded p-2 w-max inline-block mr-5">
              bundle name: 
            </div> || <div class="bg-green-300 rounded p-2 w-max inline-block mr-5">
                file name:
            </div>}
            <span class="text-bold">{cleanName}</span>
            <div>
            <Show when={bundleItem}>
                {b => <>
                    <p class="text-sm text-zinc-800 my-2">
                    Inner Files:
                    </p>
                    {b().bundleItems.map(b => <p>{b}</p>)}
              </>}
            </Show>
            </div>
        </div>
        <h2>Used in:</h2>
        <Pages pages={() => pages.filter(r => r[type].includes(fileName) )}/>
    </div>
  )
}

export default js