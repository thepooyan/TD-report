import { useNavigate } from "@solidjs/router"

const BundleLink = ({u}:{u: string}) => {

  const nv = useNavigate()
  const openBundle = (kind: "js" | "css", name: string) => {
    localStorage.setItem(kind, name)
    nv("/bundle/" + kind)
  }

  return (
     <div class="text-zinc-800 text-sm cursor-pointer hover:text-blue-700" onclick={() => openBundle("css", u)}>
        {u}
    </div>
  )
}

export default BundleLink