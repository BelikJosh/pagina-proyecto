document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel img');

    setInterval(function () {
        currentIndex = (currentIndex + 1) % images.length;
        const translateValue = -currentIndex * 100;
        carousel.style.transform = `translateX(${translateValue}%)`;
    }, 5000);

    function abrirCarrito() {
        const carritoContenedor = document.getElementById("carritoContenedor");
        carritoContenedor.style.display = "block";
        actualizarListaCarrito();
    }

    function cerrarCarrito() {
        const carritoContenedor = document.getElementById("carritoContenedor");
        carritoContenedor.style.display = "none";
    }

    function agregarAlCarrito(producto) {
        const productoEnCarrito = carritoProductos.find(p => p.nombre === producto.nombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carritoProductos.push({ nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }

        actualizarListaCarrito();
    }

    const pagarAhoraBtn = document.getElementById("pagarAhoraBtn");
    pagarAhoraBtn.addEventListener("click", function () {
        // Realizar la redirección a la página de inicio
        window.location.href = "Usuarios.html"; //reedireccionar a creacion de usuarios

        // Limpiar el contenido del carrito
        carritoProductos = [];
        actualizarListaCarrito();
    });

    function eliminarDelCarrito(nombreProducto) {
        carritoProductos = carritoProductos.filter(producto => producto.nombre !== nombreProducto);
        actualizarListaCarrito();
    }

    function actualizarListaCarrito() {
        const listaCarrito = document.getElementById("listaCarrito");
        listaCarrito.innerHTML = "";

        if (carritoProductos.length === 0) {
            listaCarrito.innerHTML = "<p>El carrito está vacío</p>";
        } else {
            carritoProductos.forEach(producto => {
                const productoElemento = document.createElement("div");
                productoElemento.innerHTML = `
                    <p>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ${producto.precio * producto.cantidad}</p>
                    <button class="eliminar-producto" data-nombre="${producto.nombre}">Eliminar</button>
                `;
                listaCarrito.appendChild(productoElemento);
            });

            // Asociar eventos de clic a los botones de eliminar
            document.querySelectorAll('.eliminar-producto').forEach(button => {
                button.addEventListener('click', function () {
                    const nombreProducto = this.getAttribute('data-nombre');
                    eliminarDelCarrito(nombreProducto);
                });
            });
        }
    }

    const iconoCarrito = document.getElementById("carritoIcono");
    iconoCarrito.addEventListener("click", abrirCarrito);

    const cerrarCarritoBtn = document.getElementById("cerrarCarritoBtn");
    cerrarCarritoBtn.addEventListener("click", cerrarCarrito);

    document.querySelectorAll('.producto button').forEach(button => {
        button.addEventListener('click', function () {
            const productoContainer = this.closest('.producto');
            const nombre = productoContainer.querySelector('h3').textContent;
            const precioString = productoContainer.querySelector('p:nth-child(3)').textContent.replace('Precio: $', '');
            const precio = parseFloat(precioString);
            const duracionEnvioString = productoContainer.querySelector('p:nth-child(4)').textContent.replace('Tiempo de envío: ', '');
            const duracionEnvio = parseInt(duracionEnvioString);

            agregarAlCarrito({ nombre, precio, duracionEnvio });
        });
    });

    // Llamar a la función de inicialización del carrito
    inicializarCarrito();
});

let carritoProductos = [];

function mostrarPoliticasReembolso() {
    var contenidoPoliticas = `
        <h2>Políticas de Reembolso</h2>
        <p>Agradecemos tu compra en SoftPack. Nuestra prioridad es garantizar tu satisfacción con cada producto que adquieras.
         A continuación, te presentamos nuestra política de reembolso para las mochilas vendidas:</p>
        <ol>
            <li><strong>Condiciones para Solicitar un Reembolso:</strong>
                <ul>
                    <li>Producto Defectuoso: Si la mochila recibida presenta defectos de fabricación o daños significativos, podrás solicitar un reembolso.</li>
                    <li>Error en el Envío: En caso de que recibas una mochila diferente a la que ordenaste, procederemos con el reembolso correspondiente.</li>
                </ul>
            </li>

            <li><strong>Plazo para Solicitar un Reembolso:</strong>
                <ul>
                <li>Deberás informarnos sobre cualquier problema con tu compra dentro de los 30 días posteriores a la recepción del producto.</li>
                </ul>
            </li>

            <li><strong>Proceso de Reembolso:</strong>
                <ul>
                    <li>Contacta a nuestro servicio de atención al cliente a través de nuestro Facebook o WhatsApp para notificar el problema.</li>
                    <li>Proporciona detalles claros, incluyendo fotografías del defecto o error en el producto.</li>
                    <li>Evaluaremos tu solicitud y, si es aprobada, te proporcionaremos instrucciones sobre cómo devolver el producto.</li>
                </ul>
            </li>

            <li><strong>Condiciones de Devolución:</strong>
                <ul>
                    <li>La mochila debe estar en su estado original, sin usar y con todas las etiquetas y embalajes originales (En dado caso de haber sido removidas, incluirlas dentro de la mochila).</li>
                </ul>
            </li>

            <li><strong>Proceso de Reembolso:</strong>
                <ul>
                    <li>Una vez que recibamos la mochila devuelta y confirmemos que cumple con las condiciones establecidas, procesaremos tu reembolso.</li>
                    <li>El reembolso se realizará a través del mismo método de pago utilizado en la compra original.</li>
                </ul>
            </li>
        </ol>
    `;

    var contenidoInicio = document.getElementById("contenidoInicio");
    contenidoInicio.innerHTML = contenidoPoliticas;

    // Aplicar estilos directamente
    contenidoInicio.style.textAlign = "left";
    contenidoInicio.style.marginLeft = "20px"; // Puedes ajustar este valor según sea necesario
}




function mostrarQuienesSomos() {
    var contenidoQuienesSomos = `
        <div style="text-align: left;">
            <h2>Quiénes Somos - SoftPack</h2>
            <p>Bienvenido/a a SoftPack, tu destino para descubrir mochilas de alta calidad con estilo y funcionalidad. Fundada en el año 2023, somos una empresa mexicana apasionada por ofrecer opciones de moda y practicidad a nivel local.</p>
            <h3>Nuestra Historia:</h3>
            <p>En el corazón de Aguascalientes, nació la idea de SoftPack con la misión de satisfacer las necesidades de nuestros clientes con mochilas que no solo reflejen su estilo, sino que también brinden durabilidad y comodidad. Desde nuestros inicios, hemos trabajado arduamente para construir una marca que combine la esencia de la moda con productos que se adaptan a la vida cotidiana.</p>
            <h3>Compromiso con la Calidad:</h3>
            <p>En SoftPack, entendemos la importancia de la calidad en cada detalle. Por ello, nos asociamos con diversas marcas reconocidas para ofrecerte una cuidada selección de mochilas que cumplen con estándares de excelencia. Nos enorgullece decir que cada producto que encontrarás en nuestra tienda ha sido seleccionado con atención a la calidad-precio.</p>
            <h3>Variedad de Marcas y Diseños:</h3>
            <p>Sabemos que cada persona tiene un estilo único, y es por eso que nuestro catálogo abarca una amplia gama de marcas y diseños. Ya sea que busques una mochila elegante para el trabajo, una opción práctica para la escuela o un accesorio llamativo para el tiempo libre, en SoftPack encontrarás la opción perfecta.</p>
            <h3>Compromiso Local:</h3>
            <p>Nos enorgullece ser una empresa mexicana arraigada en nuestra comunidad local. Creemos en el comercio local y en contribuir al crecimiento de nuestra economía. Cada compra en SoftPack no solo te brinda un excelente producto, sino que también apoya a emprendedores locales y a la economía de nuestra región.</p>
            <h3>Visión Futura:</h3>
            <p>Miramos hacia el futuro con emoción y compromiso. Nos esforzamos por expandir nuestra oferta, mantenernos actualizados con las últimas tendencias y proporcionar un servicio al cliente excepcional. En SoftPack, cada cliente es una parte fundamental de nuestra historia y estamos emocionados de tener la oportunidad de crecer juntos.</p>
            <p>Gracias por elegir SoftPack como tu destino de mochilas. Explora nuestro catálogo, descubre tu estilo y únete a nosotros en esta emocionante aventura.</p>
        </div>
    `;

    document.getElementById('contenidoInicio').innerHTML = contenidoQuienesSomos;
}

function mostrarImpactoAmbiental() {
    var contenidoImpactoAmbiental = `
        <div style="text-align: left;">
            <h2>Nuestro Impacto Ambiental</h2>
            <p>En SoftPack, estamos comprometidos con la sostenibilidad y el cuidado del medio ambiente. Nuestras acciones buscan reducir nuestro impacto ambiental y contribuir al bienestar del planeta. A continuación, te compartimos algunas de las iniciativas que llevamos a cabo:</p>
            <h3>Uso de Materiales Sostenibles:</h3>
            <p>Seleccionamos cuidadosamente materiales que minimizan el impacto ambiental. Priorizamos opciones reciclables y sostenibles en la fabricación de nuestras mochilas.</p>
            <h3>Embalaje Eco-Amigable:</h3>
            <p>Nuestro compromiso va más allá del producto. Utilizamos embalajes eco-amigables, fomentando el reciclaje y la reducción de residuos.</p>
            <h3>Programas de Reciclaje:</h3>
            <p>Fomentamos la responsabilidad ambiental y promovemos programas de reciclaje. Colaboramos con organizaciones locales para garantizar la correcta disposición de nuestros productos al final de su vida útil.</p>
            <h3>Educación Ambiental:</h3>
            <p>Creemos en la importancia de la educación. Trabajamos para concientizar a nuestros clientes sobre prácticas sostenibles y cómo pueden contribuir a cuidar nuestro planeta.</p>
        </div>
    `;

    document.getElementById('contenidoInicio').innerHTML = contenidoImpactoAmbiental;
}

function cargarInicio() {
    window.location.href = "inicio.html";
}

document.addEventListener('click', function (event) {
    // Cerrar el carrito al hacer clic fuera de él
    const carritoContenedor = document.getElementById("carritoContenedor");
    if (event.target !== iconoCarrito && event.target !== carritoContenedor && !carritoContenedor.contains(event.target)) {
        cerrarCarrito();
    }
});

// ... (código existente)
