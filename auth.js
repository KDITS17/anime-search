function login() {
    const username = document.getElementById("username").value;

    if (username === "") {
        alert("Escribe un nombre");
        return;
    }

    localStorage.setItem("usuario", username);
    window.location.href = "index.html";
}
