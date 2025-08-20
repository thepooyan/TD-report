import { useNavigate } from "@solidjs/router"

const BundleLink = ({type, u}:{type:"css" | "js",u: string}) => {

  const nv = useNavigate()
  const openBundle = (name: string) => {
    let uri = encodeURIComponent(name)
    nv(`/bundle/${type}/${uri}`)
  }

  return (
     <div class="text-zinc-800 text-sm cursor-pointer hover:text-blue-700" onclick={() => openBundle(u)}>
        {u}
    </div>
  )
}

export default BundleLink