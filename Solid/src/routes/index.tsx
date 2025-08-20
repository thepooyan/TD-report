import { useNavigate } from "@solidjs/router"
import Pages from "~/components/Pages"
import result from "~/json/result.json"

export default function Home() {

  const allCss = result.map(r => r.css).flat()
  const alluniqeCss = new Set(allCss)

  const alljs = result.map(r => r.js).flat()
  const allUniqeJs = new Set(alljs)
  const nv = useNavigate()

  const openBundle = (kind: "js" | "css", name: string) => {
    localStorage.setItem(kind, name)
    nv("/bundle/" + kind)
  }

  return (
    <main class="">
        <h1 class="text-3xl mb-5">Tahlildadeh.com</h1>
        <div class="border-1 border-black p-5 rounded mb-5 grid grid-cols-2">
          <h2 class="mb-5">
            CSS Files/Bundles:
          </h2>
          <h2>
            JS Files/Bundles:
          </h2>
          <div>
            {Array.from(alluniqeCss).map(u => <div class="text-zinc-800 text-sm cursor-pointer hover:text-blue-700" onclick={() => openBundle("css", u)}>
              {u}
            </div>)}
          </div>
          <div>
            {Array.from(allUniqeJs).map(u => <div class="text-zinc-800 text-sm cursor-pointer hover:text-blue-700" onclick={() => openBundle("js", u)}>
              {u}
            </div>)}
          </div>
        </div>
        <h2 class="mb-5">
          Website Pages:
        </h2>
        <Pages pages={() => result}/>
    </main>
  )
}
