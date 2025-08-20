import result from "~/json/result.json"
import BundleLink from "./BundleLink"
const Pages = ({pages, highlight}:{pages: () => typeof result, highlight?: ()=> string}) => {
  return (
    <div>
        {pages().map(r => 
        <div class="border-1 border-zinc-700 p-5 rounded mb-2 overflow-hidden"> 
            <p>{r.name}</p>
            <a class="text-blue-800" href={`https://tahlildadeh.com${r.url}`} target="_blank">{r.url}</a>
            <div>
                css:
                {r.css.map(c => <BundleLink u={c} type="css" highlight={highlight}/>)}
                js:
                {r.js.map(c => <BundleLink u={c} type="js" highlight={highlight}/>)}
            </div>
        </div>
        )}
    </div>
  )
}

export default Pages