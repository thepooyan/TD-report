import result from "./result.json"

const App = () => {

  const allCss = result.map(r => r.css).flat()
  const alluniqeCss = new Set(allCss)

  return (
    <main class="p-5 bg-zinc-300 min-h-dvh text-xl  ">
        <h1 class="text-3xl mb-5">Tahlildadeh.com</h1>
        <div>
          {result.map(r => 
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
    </main>
  )
}

export default App