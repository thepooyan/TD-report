import result from "~/json/result.json"
const Pages = ({pages}:{pages: () => typeof result}) => {
  return (
    <div>
        {pages().map(r => 
        <div class="border-1 border-zinc-700 p-5 rounded mb-2 overflow-hidden"> 
            <p>{r.name}</p>
            <a class="text-blue-800" href={`https://tahlildadeh.com${r.url}`} target="_blank">{r.url}</a>
            <div>
                css:
                {r.css.map(c => <p class="text-zinc-600 text-sm">{c}</p>)}
                js:
                {r.js.map(c => <p class="text-zinc-600 text-sm">{c}</p>)}
            </div>
        </div>
        )}
    </div>
  )
}

export default Pages