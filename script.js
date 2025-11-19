// === Registro de usuario ===
function registrarUsuario() {
    const usuario = document.getElementById('nuevoUsuario').value.trim();
    const correo = document.getElementById('nuevoCorreo').value.trim();
    const clave = document.getElementById('nuevaClave').value.trim();

    if (!usuario || !correo || !clave) {
        alert('Completa todos los campos.');
        return false;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        alert('Ese usuario ya está registrado.');
        return false;
    }

    usuarios.push({ usuario, correo, clave });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
    return false;
}

// === Login de usuario ===
function loginUsuario() {
    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);

    if (!encontrado) {
        alert('Usuario o contraseña incorrectos.');
        return false;
    }

    localStorage.setItem('usuarioActivo', usuario);
    alert(`Bienvenido, ${usuario}`);
    window.location.href = 'perfil.html';
    return false;
}

// === Cerrar sesión ===
function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    alert('Sesión cerrada.');
    window.location.href = 'login.html';
}

// === Validación de formulario de contacto ===
function validarFormulario() {
    const correo = document.getElementById('correo').value;
    if (!correo.includes('@')) {
        alert('Por favor ingresa un correo válido.');
        return false;
    }
    alert('Formulario enviado correctamente.');
    return true;
}

// === Carrito ===
function addToCart(name, price, genre) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, genre, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    renderCarritoDetalle();
}

function eliminarDelCarrito(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    renderCarritoDetalle();
}

function vaciarCarrito() {
    localStorage.removeItem('cart');
    renderCart();
    renderCarritoDetalle();
}

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.querySelectorAll('#cart-items');
    const totalDisplays = document.querySelectorAll('#total');
    cartItems.forEach(el => el.innerHTML = '');
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong><br>
      $${item.price.toLocaleString()} x ${item.quantity} = <strong>$${subtotal.toLocaleString()} COP</strong><br>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        cartItems.forEach(el => el.appendChild(li.cloneNode(true)));
    });

    totalDisplays.forEach(el => {
        el.innerHTML = `<strong>Total:</strong> $${total.toLocaleString()} COP`;
    });
}

function renderCarritoDetalle() {
    const carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const lista = document.getElementById('carrito-lista');
    const totalDisplay = document.getElementById('carrito-total');
    if (!lista || !totalDisplay) return;

    lista.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong><br>
      Precio: $${item.price.toLocaleString()} COP<br>
      Cantidad: ${item.quantity}<br>
      Subtotal: <strong>$${subtotal.toLocaleString()} COP</strong>`;
        lista.appendChild(li);
    });

    totalDisplay.innerHTML = `<strong>Total a pagar:</strong> $${total.toLocaleString()} COP`;
}

// === Perfil y reseñas ===
function cargarPerfil() {
    const usuario = localStorage.getItem('usuarioActivo');
    const bienvenida = document.getElementById('bienvenida');
    const reviewsList = document.getElementById('user-reviews');

    if (bienvenida && usuario) {
        bienvenida.textContent = `Bienvenida, ${usuario}`;
    }

    if (reviewsList && usuario) {
        let total = 0;
        let count = 0;
        for (let key in localStorage) {
            if (key.startsWith('reviews-')) {
                const game = key.replace('reviews-', '');
                const reviews = JSON.parse(localStorage.getItem(key));
                reviews.forEach(({ user, comment, rating }) => {
                    if (user.toLowerCase() === usuario.toLowerCase()) {
                        const li = document.createElement('li');
                        li.textContent = `${game}: “${comment}” (${rating} estrellas)`;
                        reviewsList.appendChild(li);
                        total += rating;
                        count++;
                    }
                });
            }
        }
        if (count > 0) {
            const avg = (total / count).toFixed(1);
            const summary = document.createElement('p');
            summary.textContent = `Promedio de tus reseñas: ${avg} / 5`;
            reviewsList.prepend(summary);
        }
    }
}

// === Carrito móvil deslizable ===
function activarCarritoMovil() {
    const abrir = document.getElementById('abrir-carrito');
    const cerrar = document.getElementById('cerrar-carrito');
    const panel = document.getElementById('carrito-movil');

    if (abrir && cerrar && panel) {
        abrir.addEventListener('click', () => {
            panel.classList.add('abierto');
        });

        cerrar.addEventListener('click', () => {
            panel.classList.remove('abierto');
        });
    }
}

// === Filtro por género en galería ===
function filtrarGenero(genero) {
    const cards = document.querySelectorAll('.gallery .card');
    cards.forEach(card => {
        if (genero === 'todos') {
            card.style.display = 'block';
        } else {
            card.style.display = card.classList.contains(genero) ? 'block' : 'none';
        }
    });
}

// === Inicialización global ===
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    renderCarritoDetalle();
    cargarPerfil();
    activarCarritoMovil();
});