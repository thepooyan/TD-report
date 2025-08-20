import result from "./result.json"

(() => {
    const links = document.querySelector(".links")
    if (!links) return

    links.innerHTML = `
        ${result.map(r => `
            <div class="border-1 border-zinc-700 p-5 rounded mb-2 overflow-hidden">
                <p>${r.name}</p>
                <a class="text-blue-800" href="https://tahlildadeh.com${r.url}" target="_blank">${r.url}</a>
                <div>
                    css:
                    ${r.css.map(c => `<p class="text-zinc-600 text-sm">${c}</p>`).join("")}
                    js:
                    ${r.js.map(c => `<p class="text-zinc-600 text-sm">${c}</p>`).join("")}
                </div>
            </div>
        `).join("")}
    `
})()