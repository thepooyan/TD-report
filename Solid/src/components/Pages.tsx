import result from "~/json/result.json"
import BundleLink from "./BundleLink"
const Pages = ({pages}:{pages: () => typeof result}) => {
  return (
    <div>
        {pages().map(r => 
        <div class="border-1 border-zinc-700 p-5 rounded mb-2 overflow-hidden"> 
            <p>{r.name}</p>
            <a class="text-blue-800" href={`https://tahlildadeh.com${r.url}`} target="_blank">{r.url}</a>
            <div>
                css:
                {r.css.map(c => <BundleLink u={c} type="css"/>)}
                js:
                {r.js.map(c => <BundleLink u={c} type="js"/>)}
            </div>
        </div>
        )}
    </div>
  )
}

export default Pages