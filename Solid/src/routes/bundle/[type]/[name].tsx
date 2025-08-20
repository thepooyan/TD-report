import { useParams } from "@solidjs/router"
import { createEffect, Show } from "solid-js"
import pages from "~/json/result.json"
import bundleInfo from "~/json/converted.json"
import Pages from "~/components/Pages"
import BundleLink from "~/components/BundleLink"

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

  
    const bundleItem = () => bundleInfo.find(b => b.bundleName.toLowerCase() === cleanName().toLowerCase())

  return (
    <div class="space-y-5">
        <div class="border-1 border-black p-5 rounded">
            {isBundle() && <div class="bg-blue-300 rounded p-2 w-max inline-block mr-5">
              bundle name: 
            </div> || <div class="bg-green-300 rounded p-2 w-max inline-block mr-5">
                file name:
            </div>}
            <span class="text-bold">{cleanName()}</span>
            <div>
            <Show when={bundleItem()}>
                {b => <>
                    <p class="  my-2">
                    Inner Files:
                    </p>
                    {b().bundleItems.map(b => <BundleLink type={params.type} u={b}/>)}
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