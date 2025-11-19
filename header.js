document.addEventListener('DOMContentLoaded', () => {
    // Detecta si estás dentro de /juegos/
    const isInJuegos = window.location.pathname.includes('/juegos/');
    const prefix = isInJuegos ? '../' : '';

    // Crea el encabezado
    const header = document.createElement('header');
    header.innerHTML = `
    <div class="header-container">
      <h1>🎮 GameVerse</h1>
      <button id="menu-toggle">☰</button>
      <nav id="main-nav">
        <a href="${prefix}index.html">Inicio</a>
        <a href="${prefix}galeria.html">Galería</a>
        <a href="${prefix}perfil.html">Perfil</a>
        <a href="${prefix}carrito.html">Carrito</a>
        <a href="${prefix}login.html">Login</a>
        <a href="${prefix}registro.html">Registro</a>
        <a href="${prefix}contacto.html">Contacto</a>
      </nav>
    </div>
  `;
    document.body.prepend(header);

    // Funcionalidad del menú hamburguesa
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    toggle.addEventListener('click', () => {
        nav.classList.toggle('visible');
    });
});