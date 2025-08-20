import { useParams } from "@solidjs/router"
import { createSignal, onMount, Show } from "solid-js"
import pages from "~/json/result.json"
import bundleInfo from "~/json/bundles.json"
import Pages from "~/components/Pages"

const js = () => {
  const {type} = useParams<{type: "css" | "js"}>()
  const [name, setName] = createSignal("")
  const [Oname, setOName] = createSignal("")
  const [isBundle, setIsBundle] = createSignal(true)

  onMount(() => {
    let name =localStorage.getItem(type) 
    if (!name) return
    setOName(name)
    if (name.match(/\?v=.*$/)) {
      setIsBundle(true)
      name = name.replace(/\?v=.*$/, "")
    }
    setName(`~${name}`)
  })

  const bundleKey = () => (name() in bundleInfo ? name() as keyof typeof bundleInfo : undefined)

  return (
    <div class="space-y-5">
        <div class="border-1 border-black p-5 rounded">
            {isBundle() && <div class="bg-blue-300 rounded p-2 w-max inline-block mr-5">
              bundle name: 
            </div>}
            <span class="text-bold">{name()}</span>
            <div>
            <p class="text-sm text-zinc-800 my-2">
              Inner Files:
            </p>
            <Show when={bundleKey()}>
              {a => bundleInfo[a()].map(b => <p>{b}</p>)}
            </Show>
            </div>
        </div>
        <Pages pages={() => pages.filter(r => r[type].includes(Oname()) )}/>
    </div>
  )
}

export default js