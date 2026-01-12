const detail = document.getElementById("animeDetail");
const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

async function cargarAnime() {
    const url = `https://api.jikan.moe/v4/anime/${animeId}`;
    const response = await fetch(url);
    const data = await response.json();

    const anime = data.data;

    detail.innerHTML = `
        <img src="${anime.images.jpg.image_url}">
        <div class="info">
            <h1>${anime.title}</h1>
            <p><strong>⭐ Puntuación:</strong> ${anime.score}</p>
            <p><strong>📺 Estado:</strong> ${anime.status}</p>
            <p><strong>🎭 Géneros:</strong> ${anime.genres.map(g => g.name).join(", ")}</p>
            <p>${anime.synopsis}</p>
            <a href="index.html">⬅ Volver</a>
        </div>
    `;
}

cargarAnime();
