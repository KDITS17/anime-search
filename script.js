const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

// Cargar animes populares al iniciar
window.onload = () => {
    cargarPopulares();
};

async function cargarPopulares() {
    const url = "https://api.jikan.moe/v4/top/anime?limit=12";
    mostrarAnimes(url);
}

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value;
    if (value.length > 2) {
        mostrarAnimes(`https://api.jikan.moe/v4/anime?q=${value}&limit=12`);
    }
});

async function mostrarAnimes(url) {
    results.innerHTML = "⏳ Cargando...";

    const response = await fetch(url);
    const data = await response.json();

    results.innerHTML = "";

    data.data.forEach(anime => {
        results.innerHTML += `
<div class="card">
    <img src="${anime.images.jpg.image_url}">
    <div class="card-content">
        <h3>${anime.title}</h3>
        <button onclick='guardarFavorito(${JSON.stringify(anime)})'>❤️</button>
        <a href="anime.html?id=${anime.mal_id}">Ver más</a>
    </div>
</div>
        `;
    });
}


function guardarFavorito(anime) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.some(f => f.mal_id === anime.mal_id)) {
        alert("Ya está en favoritos");
        return;
    }

    favoritos.push({
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url
    });

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert("❤️ Anime guardado");
}

function toggleTheme() {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
        document.getElementById("themeBtn").textContent = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        document.getElementById("themeBtn").textContent = "🌙";
    }
}

// Cargar tema guardado
window.addEventListener("load", () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        document.getElementById("themeBtn").textContent = "☀️";
    }
});
