// Toggle menú móvil
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Cerrar menú al hacer click en un enlace
  navLinks.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      navLinks.classList.remove("open");
    }
  });
}

// Año dinámico en el footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Resaltar sección activa al hacer scroll (simple)
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

function onScroll() {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", onScroll);

// Asistente de contacto (autocompletar)
const assistantButtons = document.querySelectorAll(".assistant-btn");
const selectTipo = document.getElementById("tipo");
const textMensaje = document.getElementById("mensaje");

assistantButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tipo = btn.getAttribute("data-tipo");
    const msg  = btn.getAttribute("data-msg");

    if (selectTipo && tipo) selectTipo.value = tipo;

    if (textMensaje && msg) {
      // Solo reemplaza si está vacío (o casi vacío)
      const current = textMensaje.value.trim();
      if (current.length < 5) textMensaje.value = msg;
    }

    // Llevar al formulario / contacto
    const contacto = document.getElementById("contacto");
    if (contacto) contacto.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Parallax sutil para la mascota (solo en desktop)
// Parallax sutil para la mascota (solo en desktop)
const assistantCard = document.querySelector(".assistant-card");
const assistantImg  = document.querySelector(".assistant-img");

if (assistantCard && assistantImg) {
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (isFinePointer) {
    assistantCard.addEventListener("mousemove", (e) => {
      const rect = assistantCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;  // 0..1
      const y = (e.clientY - rect.top) / rect.height;  // 0..1

      const moveX = (x - 0.5) * 8;  // px
      const moveY = (y - 0.5) * 8;  // px

      assistantImg.style.transform = `translate(${moveX}px, ${moveY - 2}px) scale(1.03)`;
    });

    assistantCard.addEventListener("mouseleave", () => {
      assistantImg.style.transform = "";
    });
  }
} 




// Envío de formulario (Formspree) sin recargar
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    formStatus.style.display = "block";
    formStatus.className = "form-status";
    formStatus.textContent = "Enviando...";

    const formData = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        formStatus.classList.add("form-status-ok");
        formStatus.textContent = "✅ Gracias, hemos recibido tu mensaje. Te contactaremos pronto.";
        contactForm.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        formStatus.classList.add("form-status-error");
        formStatus.textContent = data?.error || "⚠️ No se pudo enviar. Intenta de nuevo más tarde.";
      }
    } catch (err) {
      formStatus.classList.add("form-status-error");
      formStatus.textContent = "⚠️ Error de conexión. Revisa tu Internet e intenta de nuevo.";
    }
  });
}
