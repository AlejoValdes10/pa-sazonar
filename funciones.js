// ==========================
// FLECHA DE DESPLAZAMIENTO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const flecha = document.querySelector(".flecha-desplazamiento");
  if (flecha) {
    flecha.addEventListener("click", () => {
      const niveles = document.querySelector(".niveles");
      if (niveles) {
        niveles.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});

// ==========================
// DATOS DE PLATILLOS
// ==========================
const platillos = {
  chocolate: {
    nombre: "Chocolate Colombiano",
    tiempo: "20 min",
    video: "https://www.youtube.com/embed/IIqegLsMaMU",
    poster: "",
    ingredientes: [
      { img: "img/soda.png", nombre: "Leche" },
      { img: "img/chocolate.png", nombre: "Rama de Canela" },
      { img: "img/chocolate.png", nombre: "Pastilla de Chocolate" },
      { img: "img/chocolate.png", nombre: "Queso Campesino" }
    ],
    pasos: [
      { img: "img/soda.png", texto: "Calienta la leche en una olla mediana a fuego medio." },
      { img: "img/chocolate.png", texto: "Agrega la pastilla de chocolate y revuelve." },
      { img: "img/chocolate.png", texto: "Hierve 5 minutos suavemente, revolviendo ocasionalmente." },
      { img: "img/chocolate.png", texto: "Sirve con trozos de queso campesino al gusto." }
    ]
  },
  arroz: {
    nombre: "Arroz con Pollo",
    tiempo: "45 min",
    video: "https://www.youtube.com/embed/CygdufK8gmE",
    poster: "",
    ingredientes: [
      { img: "img/arroz con pollo.avif", nombre: "Arroz blanco" },
      { img: "img/arroz con pollo.avif", nombre: "Pechuga de Pollo" },
      { img: "img/arroz con pollo.avif", nombre: "Verduras mixtas" },
      { img: "img/arroz con pollo.avif", nombre: "Color/Azafrán" }
    ],
    pasos: [
      { img: "img/arroz con pollo.avif", texto: "Sofríe cebolla, ajo y apio picados." },
      { img: "img/arroz con pollo.avif", texto: "Agrega el pollo y las verduras, sazona al gusto." },
      { img: "img/arroz con pollo.avif", texto: "Añade arroz y mezcla bien." },
      { img: "img/ajiaco.avif", texto: "Agrega caldo y cocina hasta que el arroz esté tierno." }
    ]
  },
  alitas: {
    nombre: "Alitas BBQ",
    tiempo: "60 min",
    video: "https://www.youtube.com/embed/3an78mKw1ko",
    poster: "",
    ingredientes: [
      { img: "img/alitas bqq.webp", nombre: "Alitas de pollo" },
      { img: "img/alitas bqq.webp", nombre: "Sal y Pimienta" },
      { img: "img/alitas bqq.webp", nombre: "Ajo en polvo y Paprika" },
      { img: "img/alitas bqq.webp", nombre: "Salsa BBQ" }
    ],
    pasos: [
      { img: "img/alitas bqq.webp", texto: "Marina las alitas en especias por 2 horas." },
      { img: "img/alitas bqq.webp", texto: "Prepara la salsa BBQ." },
      { img: "img/alitas bqq.webp", texto: "Fríe o hornea las alitas hasta que estén doradas." },
      { img: "img/alitas bqq.webp", texto: "Báñalas en salsa y sirve calientes." }
    ]
  }
};

// ==========================
// DATOS DEL EQUIPO
// ==========================
const equipoData = [
  { nombre: "Chelssie Suárez", cargo: "Líder audiovisual" },
  { nombre: "David Rodríguez", cargo: "Web master" },
  { nombre: "Catalina Casallas", cargo: "Marketing" },
  { nombre: "Christian Rodríguez", cargo: "Animador y diseñador gráfico" },
  { nombre: "Natalia Palacios", cargo: "Diseñadora e ilustradora" },
  { nombre: "Sergio Parrado", cargo: "Productor audiovisual" },
  { nombre: "Juan Valdes", cargo: "Diseñador gráfico de marketing" },
  { nombre: "Stiven Morera", cargo: "Diseñador gráfico general" },
  { nombre: "Alejandro Urdaneta", cargo: "Diseñador gráfico y editorial" }
];

// ==========================
// VARIABLES GLOBALES
// ==========================
let currentPlatillo = "chocolate";
let currentIngrediente = 0;
let selectedTeamMember = 0;

// ==========================
// INICIALIZACIÓN
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  // Cargar contenido base
  initializeWebsite();

  // Si estamos en recetas.html → filtrar por nivel
  const nivel = new URLSearchParams(window.location.search).get("nivel");
  if (nivel) {
    document.querySelectorAll(".platillo").forEach((p) => (p.style.display = "none"));
    const seleccionado = document.querySelector(`.platillo.${nivel}`);
    if (seleccionado) seleccionado.style.display = "block";
  }

  // Si estamos en tutorial.html → cargar platillo específico
  const platillo = new URLSearchParams(window.location.search).get("platillo");
  if (platillo && platillos[platillo]) {
    loadPlatillo(platillo);
    loadIngredientes(platillo);
    loadPasos(platillo);
  }

  // Inicializar carrusel si existe
  if (document.querySelector(".carrusel-container")) {
    initializeCarrusel();
  }
});

// ==========================
// FUNCIONES DE PLATILLOS
// ==========================
function loadPlatillo(tipo) {
  const platillo = platillos[tipo];
  if (!platillo) return;

  const selector = document.getElementById("selector-platillo");
  if (selector) selector.value = tipo;

  const btnTiempo = document.getElementById("tiempo-aprox");
  if (btnTiempo) btnTiempo.textContent = `TIEMPO APROX: ${platillo.tiempo}`;

  const tutorialVideo = document.getElementById("tutorial-video");
  if (tutorialVideo) tutorialVideo.src = platillo.video;
}

function loadIngredientes(tipo) {
  const platillo = platillos[tipo];
  if (!platillo) return;

  const container = document.getElementById("ingredientes-container");
  if (!container) return;

  container.innerHTML = "";
  platillo.ingredientes.forEach((ingrediente, index) => {
    const ingredienteDiv = document.createElement("div");
    ingredienteDiv.className = "ingrediente-item";
    if (index === 0) ingredienteDiv.classList.add("active");
    ingredienteDiv.innerHTML = `
      <div class="ingrediente-content">
        <img src="${ingrediente.img}" alt="${ingrediente.nombre}">
        <p>${ingrediente.nombre}</p>
      </div>`;
    container.appendChild(ingredienteDiv);
  });

  currentIngrediente = 0;
}

function loadPasos(tipo) {
  const platillo = platillos[tipo];
  if (!platillo) return;

  const container = document.getElementById("pasos-container");
  if (!container) return;

  container.innerHTML = "";
  const colores = ["azul", "amarillo", "naranja", "rojo"];
  platillo.pasos.forEach((paso, index) => {
    const pasoDiv = document.createElement("div");
    pasoDiv.className = "paso";
    const isEven = index % 2 === 0;
    pasoDiv.innerHTML = `
      ${!isEven ? `<div class="numero-paso ${colores[index]}">${index + 1}</div>
      <div class="texto-paso"><p>${paso.texto}</p></div>` : ""}
      <div class="imagen-paso"><img src="${paso.img}" alt="Paso ${index + 1}"></div>
      ${isEven ? `<div class="numero-paso ${colores[index]}">${index + 1}</div>
      <div class="texto-paso"><p>${paso.texto}</p></div>` : ""}`;
    container.appendChild(pasoDiv);
  });
}

// ==========================
// FUNCIONES DE EQUIPO (CÍRCULOS PEQUEÑOS)
// ==========================
function initializeTeam() {
  const members = document.querySelectorAll(".team-member");
  if (!members.length) return;

  positionTeamMembers();
  selectMember(0);

  members.forEach((member, index) => {
    member.addEventListener("click", () => selectMember(index));
  });
}

function positionTeamMembers() {
  const members = document.querySelectorAll(".team-member");
  const container = document.getElementById("circle-container");
  if (!container) return;

  const radius = 350;
  const totalMembers = members.length;
  const angleStep = Math.PI / (totalMembers - 1);

  members.forEach((member, i) => {
    const angle = i * angleStep - Math.PI / 1;
    const x = Math.cos(angle) * radius + container.offsetWidth / 2;
    const y = Math.sin(angle) * radius + container.offsetHeight / 2;

    member.style.left = x - 50 + "px";
    member.style.top = y - -200 + "px";
  });
}

function selectMember(index) {
  const members = document.querySelectorAll(".team-member");
  const btnCargo = document.getElementById("btn-cargo");

  members.forEach((m) => {
    m.classList.remove("selected");
    positionTeamMembers();
  });

  members[index].classList.add("selected");
  if (equipoData[index] && btnCargo) btnCargo.textContent = equipoData[index].cargo;

  const selected = members[index];
  selected.style.width = "100px";
  selected.style.height = "100px";
  selected.style.left = "50%";
  selected.style.top = "20px";
  selected.style.transform = "translateX(-50%)";
  selected.style.zIndex = "100";

  selectedTeamMember = index;
}

// ==========================
// CARRUSEL (Recetas)
// ==========================
function initializeCarrusel() {
  const slides = document.querySelectorAll(".carrusel-slide");
  const prevBtn = document.querySelector(".carrusel-prev");
  const nextBtn = document.querySelector(".carrusel-next");

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove("active"));
    slides[index].classList.add("active");
    currentSlide = index;
  }

  prevBtn?.addEventListener("click", () => {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
  });

  nextBtn?.addEventListener("click", () => {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
  });

  showSlide(0);
}

// ==========================
// WEBSITE GENERAL
// ==========================
function initializeWebsite() {
  loadPlatillo(currentPlatillo);
  loadIngredientes(currentPlatillo);
  loadPasos(currentPlatillo);
  initializeTeam();
  initializeIngredientCarousel();
  window.addEventListener("resize", positionTeamMembers);
}

function initializeIngredientCarousel() {
  const prevBtn = document.querySelector(".carrusel-prev-ingredientes");
  const nextBtn = document.querySelector(".carrusel-next-ingredientes");

  prevBtn?.addEventListener("click", () => {
    const ingredientes = document.querySelectorAll(".ingrediente-item");
    if (!ingredientes.length) return;
    ingredientes[currentIngrediente].classList.remove("active");
    currentIngrediente = (currentIngrediente - 1 + ingredientes.length) % ingredientes.length;
    ingredientes[currentIngrediente].classList.add("active");
  });

  nextBtn?.addEventListener("click", () => {
    const ingredientes = document.querySelectorAll(".ingrediente-item");
    if (!ingredientes.length) return;
    ingredientes[currentIngrediente].classList.remove("active");
    currentIngrediente = (currentIngrediente + 1) % ingredientes.length;
    ingredientes[currentIngrediente].classList.add("active");
  });
}
