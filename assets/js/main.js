

// Función mejorada para los tabs
function showTab(tabId, event) {
    event.preventDefault();

    // Remover clase active de todos los tabs y enlaces
    document.querySelectorAll('.tab-pane').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('active');
    });

    // Agregar clase active al tab y enlace seleccionados
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');

    // Scroll suave para móviles
    if (window.innerWidth < 992) {
        setTimeout(() => {
            document.getElementById(tabId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('.tab-pane.active')) {
        document.querySelector('.tab-pane').classList.add('active');
        document.querySelector('.tab-link').classList.add('active');
    }

    // Ajustar altura del banner en móviles
    if (window.innerWidth < 768) {
        const banner = document.querySelector('.main-banner');
        banner.style.minHeight = 'calc(100vh - 80px)'; 
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover clase active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Añadir clase active al botón clickeado
            this.classList.add('active');

            // Ocultar todos los contenidos
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));

            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            // Aquí iría el código para enviar el formulario
            alert('Formulario enviado correctamente');
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select');

        inputs.forEach(input => {
            const errorElement = input.nextElementSibling;

            if (input.required && !input.value) {
                errorElement.textContent = 'Este campo es obligatorio';
                isValid = false;
            } else if (input.pattern && !new RegExp(input.pattern).test(input.value)) {
                errorElement.textContent = 'Formato incorrecto';
                isValid = false;
            } else if (input.id === 'fechaNacimiento' && new Date(input.value) > new Date()) {
                errorElement.textContent = 'Fecha no válida';
                isValid = false;
            } else {
                errorElement.textContent = '';
            }
        });

        return isValid;
    }

    // Validación en tiempo real
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', function () {
            const errorElement = this.nextElementSibling;
            errorElement.textContent = '';
        });
    });
});

// Actualizar año automáticamente
document.getElementById('current-year').textContent = new Date().getFullYear();

// Efecto hover para móviles
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('touchstart', function () {
        this.classList.add('hover-effect');
    });

    link.addEventListener('touchend', function () {
        setTimeout(() => {
            this.classList.remove('hover-effect');
        }, 150);
    });
});
// Preloader
window.addEventListener('load', function () {
    setTimeout(function () {
        document.body.classList.add('loaded');
    }, 1000);
});

// Menú Hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('No se encontró el formulario con ID "contact-form"');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = encodeURIComponent(document.getElementById('nombreApellido').value);
        const dni = encodeURIComponent(document.getElementById('dni').value);
        const celular = encodeURIComponent(document.getElementById('celular').value);
        const fechaNacimiento = encodeURIComponent(document.getElementById('fechaNacimiento').value);
        const genero = encodeURIComponent(document.getElementById('genero').value);
        const plan = encodeURIComponent(document.getElementById('plan-interes').value || 'No especificado');

        // Datos de MercadoPago 
        const mpAlias = "SEBABODYSTRONG";
        const mpCVU = "0000000000000000000000";
        const mpTitular = "ALFREDO SEBASTIAN GOMEZ";

        // Mensaje para WhatsApp
        const mensaje = `¡Hola! Gracias por inscribirte en *Body Strong* 🏋️‍♂️%0A%0A` +
            `*📝 Datos de la inscripción:*%0A` +
            `▸ Nombre: ${nombre}%0A` +
            `▸ DNI: ${dni}%0A` +
            `▸ Celular: ${celular}%0A` +
            `▸ Fecha Nac.: ${fechaNacimiento}%0A` +
            `▸ Género: ${genero}%0A` +
            `▸ Plan elegido: ${plan}%0A%0A` +

            `*💳 Datos para el pago por MercadoPago:*%0A` +
            `▸ Alias: *${mpAlias}*%0A` +
            `▸ CVU: *${mpCVU}*%0A` +
            `▸ Titular: *${mpTitular}*%0A%0A` +

            `*📌 Instrucciones:*%0A` +
            `1. Realiza la transferencia por el monto correspondiente a tu plan%0A` +
            `2. Envíame el comprobante por este mismo chat%0A` +
            `3. Recibirás la confirmación de tu inscripción%0A%0A` +

            `*Fecha de solicitud:* ${new Date().toLocaleString()}%0A%0A` +
            `¡Nos vemos en el gimnasio! 💪`;

        // Número de WhatsApp
        const whatsappNumber = '5491130410925'; // Reemplaza con tu número completo

        // Enlace de WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensaje}`;

        window.open(whatsappUrl, '_blank');

        showPaymentInfo(mpAlias, mpCVU, mpTitular, plan);
    });

    function showPaymentInfo(alias, cvu, titular, plan) {
        let confirmation = document.getElementById('payment-confirmation');

        if (!confirmation) {
            confirmation = document.createElement('div');
            confirmation.id = 'payment-confirmation';
            confirmation.className = 'payment-confirmation';
            confirmation.innerHTML = `
                <h4><i class="fas fa-check-circle"></i> ¡Inscripción enviada!</h4>
                <p>Por favor realiza el pago con estos datos:</p>
                <div class="payment-details">
                    <p><strong>Alias:</strong> ${alias}</p>
                    <p><strong>CVU:</strong> ${cvu}</p>
                    <p><strong>Titular:</strong> ${titular}</p>
                    <p><strong>Plan:</strong> ${plan}</p>
                </div>
                <p>Envía el comprobante por WhatsApp para activar tu membresía.</p>
            `;
            form.parentNode.insertBefore(confirmation, form.nextSibling);
        }

        confirmation.style.display = 'block';
        form.style.display = 'none';
    }
});

