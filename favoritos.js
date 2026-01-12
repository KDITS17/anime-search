const favResults = document.getElementById("favResults");
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

if (favoritos.length === 0) {
    favResults.innerHTML = "❌ No tienes favoritos";
}

favoritos.forEach(anime => {
    favResults.innerHTML += `
    <div class="card">
        <img src="${anime.image}">
        <div class="card-content">
            <h3>${anime.title}</h3>
        </div>
    </div>
    `;
});
