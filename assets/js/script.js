/*========================================================
   PARTICLES.JS & THEME LOGIC
=========================================================*/
if (document.getElementById("particles-js")) {
  particlesJS.load("particles-js", "assets/particles.json");
}

/*========================================================
  LOADING SCREEN LOGIC
=========================================================*/
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");

  const hideLoader = () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("loader-hidden");
    }
    document.body.classList.remove("loading");
  };

  const instagramWidget = document.querySelector("[data-behold-id]");

  if (instagramWidget) {
    let isWindowLoaded = false;
    let isWidgetLoaded = false;
    function tryToHideLoader() {
      if (isWindowLoaded && isWidgetLoaded) hideLoader();
    }
    window.addEventListener("load", () => {
      isWindowLoaded = true;
      tryToHideLoader();
    });
    window.addEventListener("behold:widget-loaded", () => {
      isWidgetLoaded = true;
      tryToHideLoader();
    });
  } else {
    window.addEventListener("load", () => {
      setTimeout(hideLoader, 200);
    });
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  updateMetaThemeColor();
  setupLanguageDropdown();
  setLanguage(currentLang);

  const loaderAnimation = () => {
    const tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 750,
    });

    tl.add({
      targets: ".loader-content",
      scale: [1, 0],
      opacity: 0,
      duration: 500,
    }).add(
      {
        targets: "#loader",
        height: ["100%", "0%"],
        opacity: [1, 0],
        duration: 800,
        easing: "easeInOutQuart",
        complete: function () {
          document.getElementById("loader").style.display = "none";
          document.body.classList.remove("loading");
          initScrollReveal(); 
        },
      },
      "-=200"
    );
  };

  window.addEventListener("load", () => {
    setTimeout(loaderAnimation, 500);
  });
});

function initScrollReveal() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      const visibleElements = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target);

      if (visibleElements.length > 0) {
        anime({
          targets: visibleElements,
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 1000,
          easing: "easeOutExpo",
          delay: anime.stagger(150),
        });

        visibleElements.forEach((el) => {
          revealObserver.unobserve(el);
        });
      }
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".invisible-init").forEach((el) => {
    revealObserver.observe(el);
  });
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const skillsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      
      anime.set(".skill-item", {
        opacity: 0,
        scale: 0.5,
      });

      anime({
        targets: ".skill-item",
        opacity: [0, 1],
        scale: [0.5, 1],
        borderRadius: ["100%", "8px"],
        delay: anime.stagger(200),
        easing: "linear", 
        duration: 600,
      });
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const skillsSection = document.querySelector("#skills");
if (skillsSection) skillsObserver.observe(skillsSection);

/*========================================================
  THEME TOGGLE LOGIC
=========================================================*/
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const metaThemeColor = document.querySelector("meta[name='theme-color']");

function updateMetaThemeColor() {
  if (body.classList.contains("light-mode")) {
    metaThemeColor.setAttribute("content", "#ffffff");
  } else {
    metaThemeColor.setAttribute("content", "#000714");
  }
}

if (themeToggle) {
  let isThemeAnimating = false;

  themeToggle.addEventListener("click", () => {
    if (isThemeAnimating) return;
    isThemeAnimating = true;

    const currentIcon = themeToggle.querySelector(
      "i:not([style*='display: none'])"
    );

    const activeIconSelector = body.classList.contains("light-mode")
      ? ".fa-sun"
      : ".fa-moon";
    const activeIcon = themeToggle.querySelector(activeIconSelector);

    anime({
      targets: activeIcon,
      translateX: [0, 20],
      opacity: [1, 0],
      duration: 200,
      easing: "easeInQuad",
      complete: function () {
        body.classList.toggle("light-mode");
        updateMetaThemeColor();

        if (body.classList.contains("light-mode")) {
          localStorage.setItem("theme", "light");
        } else {
          localStorage.removeItem("theme");
        }

        const nextIconSelector = body.classList.contains("light-mode")
          ? ".fa-sun"
          : ".fa-moon";
        const nextIcon = themeToggle.querySelector(nextIconSelector);

        nextIcon.style.transform = "translateX(-20px)";
        nextIcon.style.opacity = "0";

        anime({
          targets: nextIcon,
          translateX: [-20, 0],
          opacity: [0, 1],
          duration: 300,
          easing: "easeOutBack",
          complete: function () {
            activeIcon.style.transform = "";
            activeIcon.style.opacity = "";
            nextIcon.style.transform = "";
            nextIcon.style.opacity = "";

            isThemeAnimating = false;
          },
        });
      },
    });
  });
}

/*========================================================
  PROJECT DATA
=========================================================*/
const projects = {
  sequence: {
    imageCount: 4,
    alt: "Tela do jogo de tabuleiro Sequence Online.",
    github: "https://github.com/Wendell95Araujo/jogo-sequence",
    online: "https://game-sequence-multiplayer.web.app/",
    translations: {
      "pt-BR": {
        title: "JOGO - SEQUENCE MULTIPLAYER ONLINE",
        summary:
          "Jogo de tabuleiro multiplayer para até 12 jogadores com sincronização em tempo real, utilizando Firebase para gerenciar o estado global da partida.",
        description:
          "Implementação completa do jogo Sequence, focada em uma experiência multiplayer online. O projeto utiliza Firebase Realtime Database para garantir que as ações de todos os jogadores sejam sincronizadas instantaneamente, criando uma partida fluida e interativa para até 12 participantes.",
      },
      en: {
        title: "GAME - SEQUENCE MULTIPLAYER ONLINE",
        summary:
          "Multiplayer board game for up to 12 players with real-time synchronization, using Firebase to manage the global game state.",
        description:
          "Complete implementation of the Sequence game, focused on an online multiplayer experience. The project uses Firebase Realtime Database to ensure that all players' actions are synchronized instantly, creating a fluid and interactive match for up to 12 participants.",
      },
      es: {
        title: "JUEGO - SEQUENCE MULTIJUGADOR EN LÍNEA",
        summary:
          "Juego de mesa multijugador para hasta 12 jugadores con sincronización en tiempo real, utilizando Firebase para gestionar el estado global de la partida.",
        description:
          "Implementación completa del juego Sequence, enfocada en una experiencia multijugador en línea. El proyecto utiliza Firebase Realtime Database para garantizar que las acciones de todos los jugadores se sincronicen instantáneamente, creando una partida fluida e interactiva para hasta 12 participantes.",
      },
    },
  },
  wlist: {
    imageCount: 8,
    alt: "Tela inicial do W-List, mostrando o menu principal.",
    github: "https://github.com/Wendell95Araujo/w-list",
    online: "",
    translations: {
      "pt-BR": {
        title: "W-List (App Android)",
        summary:
          "Aplicativo nativo para Android construído em Kotlin para gerenciamento de tarefas, com recursos como widgets, notificações e suporte a múltiplos idiomas.",
        description:
          "W-List é um assistente pessoal para Android que desenvolvi nativamente em Kotlin. Ele permite gerenciar tarefas e listas de compras de forma inteligente, com recursos avançados como lembretes via notificação, widget para a tela inicial, tema claro/escuro e suporte multilíngue.",
      },
      en: {
        title: "W-List (Android App)",
        summary:
          "Native Android application built in Kotlin for task management, with features like widgets, notifications, and multi-language support.",
        description:
          "W-List is a personal assistant for Android that I developed natively in Kotlin. It allows you to manage tasks and shopping lists intelligently, with advanced features like notification reminders, a home screen widget, light/dark theme, and multilingual support.",
      },
      es: {
        title: "W-List (App Android)",
        summary:
          "Aplicación nativa para Android desarrollada en Kotlin para la gestión de tareas, con funciones como widgets, notificaciones y soporte para múltiples idiomas.",
        description:
          "W-List es un asistente personal para Android que desarrollé nativamente en Kotlin. Permite gestionar tareas y listas de compras de forma inteligente, con funciones avanzadas como recordatorios mediante notificaciones, widget para la pantalla de inicio, tema claro/oscuro y soporte multilingüe.",
      },
    },
  },
  receitas: {
    imageCount: 4,
    alt: "Página inicial do site Receitas Incríveis.",
    github: "https://github.com/Wendell95Araujo/receitas-incriveis",
    online: "https://receitas-incriveis-wma.web.app/",
    translations: {
      "pt-BR": {
        title: "Receitas Incríveis",
        summary:
          "Site de receitas moderno e responsivo, construído com componentes Web Awesome e conteúdo carregado dinamicamente via JavaScript.",
        description:
          "Um site de receitas completo, desenvolvido com HTML, CSS e JavaScript puros para explorar a biblioteca de componentes Web Awesome. O projeto é totalmente dinâmico: todas as informações sobre receitas e chefs são carregadas de um arquivo 'data.js', permitindo fácil gerenciamento. O CSS é estruturado com variáveis (tokens) para um design consistente. Funcionalidades incluem layout responsivo, cabeçalho fixo, rodapé, página 404 customizada, componentes interativos como modal de imagem, tooltips, e uma barra de rolagem estilizada.",
      },
      en: {
        title: "Incredible Recipes",
        summary:
          "Modern and responsive recipe website, built with Web Awesome components and dynamically loaded content via JavaScript.",
        description:
          "A complete recipe website, developed with pure HTML, CSS, and JavaScript to explore the Web Awesome component library. The project is fully dynamic: all information about recipes and chefs is loaded from a 'data.js' file, allowing for easy management. The CSS is structured with variables (tokens) for a consistent design. Features include a responsive layout, fixed header, footer, custom 404 page, interactive components like an image modal, tooltips, and a styled scrollbar.",
      },
      es: {
        title: "Recetas Increíbles",
        summary:
          "Sitio web de recetas moderno y adaptable, construido con componentes Web Awesome y contenido cargado dinámicamente mediante JavaScript.",
        description:
          "Un sitio web de recetas completo, desarrollado con HTML, CSS y JavaScript puros para explorar la biblioteca de componentes Web Awesome. El proyecto es totalmente dinámico: toda la información sobre recetas y chefs se carga desde un archivo 'data.js', permitiendo una gestión sencilla. El CSS está estructurado con variables (tokens) para un diseño consistente. Las funcionalidades incluyen diseño adaptable, encabezado fijo, pie de página, página 404 personalizada, componentes interactivos como modal de imágenes, tooltips y una barra de desplazamiento estilizada.",
      },
    },
  },
  instafire: {
    imageCount: 3,
    alt: "Galeria de imagens do projeto InstaFire.",
    github: "https://github.com/Wendell95Araujo/insta-fire",
    online: "https://instafire.vercel.app/",
    translations: {
      "pt-BR": {
        title: "INSTAFIRE",
        summary:
          "Aplicação inspirada no Instagram com comentários em tempo real, utilizando Cloud Firestore para o back-end e jQuery para a manipulação do DOM.",
        description:
          "O InstaFire é uma aplicação multi-página que recria a experiência de um feed de fotos, com galeria e visualização detalhada. O front-end foi construído com HTML, CSS e JavaScript, utilizando jQuery para a manipulação eficiente de eventos e do DOM. A principal funcionalidade é o sistema de interações em tempo real: as curtidas (com um efeito visual de 'fogo') e os comentários são persistidos e sincronizados instantaneamente entre os usuários através do Cloud Firestore. O projeto também utiliza o localStorage para simular uma sessão de usuário, identificando quem está comentando.",
      },
      en: {
        title: "INSTAFIRE",
        summary:
          "Instagram-inspired application with real-time comments, using Cloud Firestore for the back-end and jQuery for DOM manipulation.",
        description:
          "InstaFire is a multi-page application that recreates the experience of a photo feed, with a gallery and detailed view. The front-end was built with HTML, CSS, and JavaScript, using jQuery for efficient event and DOM manipulation. The main feature is the real-time interaction system: likes (with a visual 'fire' effect) and comments are persisted and instantly synchronized among users through Cloud Firestore. The project also uses localStorage to simulate a user session, identifying who is commenting.",
      },
      es: {
        title: "INSTAFIRE",
        summary:
          "Aplicación inspirada en Instagram con comentarios en tiempo real, utilizando Cloud Firestore para el backend y jQuery para la manipulación del DOM.",
        description:
          "InstaFire es una aplicación de múltiples páginas que recrea la experiencia de un feed de fotos, con galería y vista detallada. El frontend se construyó con HTML, CSS y JavaScript, utilizando jQuery para la manipulación eficiente de eventos y del DOM. La funcionalidad principal es el sistema de interacciones en tiempo real: los 'me gusta' (con un efecto visual de 'fuego') y los comentarios se guardan y sincronizan instantáneamente entre los usuarios a través de Cloud Firestore. El proyecto también utiliza localStorage para simular una sesión de usuario, identificando quién está comentando.",
      },
    },
  },
  goncalvescosta: {
    imageCount: 3,
    alt: "Página inicial do site Gonçalves Costa Serviços.",
    github: "",
    online: "http://www.goncalvescostaservicos.com.br/",
    translations: {
      "pt-BR": {
        title: "Gonçalves Costa Serviços",
        summary:
          "Desenvolvimento de uma presença online profissional para uma empresa de serviços, com foco em design responsivo e captação de clientes.",
        description:
          "Criação de um site institucional completo para a Gonçalves Costa Serviços. O projeto foi desenvolvido para ser totalmente responsivo, garantindo uma experiência de usuário otimizada em desktops e dispositivos móveis, com seções claras de serviços e chamadas para ação (CTAs) que direcionam para o contato.",
      },
      en: {
        title: "Gonçalves Costa Services",
        summary:
          "Development of a professional online presence for a service company, focusing on responsive design and customer acquisition.",
        description:
          "Creation of a complete institutional website for Gonçalves Costa Serviços. The project was developed to be fully responsive, ensuring an optimized user experience on desktops and mobile devices, with clear service sections and calls to action (CTAs) that direct to contact.",
      },
      es: {
        title: "Gonçalves Costa Servicios",
        summary:
          "Desarrollo de una presencia en línea profesional para una empresa de servicios, con enfoque en diseño adaptable y captación de clientes.",
        description:
          "Creación de un sitio web institucional completo para Gonçalves Costa Serviços. El proyecto fue desarrollado para ser totalmente adaptable, garantizando una experiencia de usuario optimizada en computadoras y dispositivos móviles, con secciones claras de servicios y llamadas a la acción (CTAs) que dirigen al contacto.",
      },
    },
  },
  laisa: {
    imageCount: 4,
    alt: "Página inicial do site Studio Laisa Novais Hair Concept.",
    github: "",
    online: "https://laisa-novais-hair-concept.web.app/",
    translations: {
      "pt-BR": {
        title: "Studio Laisa Novais Hair Concept",
        summary:
          "Vitrine digital para um salão de beleza, com design moderno e responsivo. Centraliza serviços, promoções e facilita o agendamento com links diretos de contato.",
        description:
          "Desenvolvimento de um site estático e totalmente responsivo para o Studio Laisa Novais Hair Concept. Construído com HTML, CSS e JavaScript (jQuery), o projeto foca em uma interface limpa para apresentar o portfólio de serviços, promoções e facilitar o contato direto para agendamentos via WhatsApp.",
      },
      en: {
        title: "Studio Laisa Novais Hair Concept",
        summary:
          "Digital showcase for a beauty salon, with a modern and responsive design. It centralizes services, promotions, and facilitates scheduling with direct contact links.",
        description:
          "Development of a static and fully responsive website for Studio Laisa Novais Hair Concept. Built with HTML, CSS, and JavaScript (jQuery), the project focuses on a clean interface to present the portfolio of services, promotions, and facilitate direct contact for appointments via WhatsApp.",
      },
      es: {
        title: "Studio Laisa Novais Hair Concept",
        summary:
          "Escaparate digital para un salón de belleza, con diseño moderno y adaptable. Centraliza servicios, promociones y facilita la programación de citas con enlaces de contacto directos.",
        description:
          "Desarrollo de un sitio web estático y totalmente adaptable para Studio Laisa Novais Hair Concept. Construido con HTML, CSS y JavaScript (jQuery), el proyecto se enfoca en una interfaz limpia para presentar el portafolio de servicios, promociones y facilitar el contacto directo para programar citas a través de WhatsApp.",
      },
    },
  },
  faculdade: {
    imageCount: 1,
    alt: "Seção da página da Faculdade Uníntese.",
    github: "https://github.com/Wendell95Araujo/faculdade-digital",
    online: "https://wendell95araujo.github.io/faculdade-digital/",
    translations: {
      "pt-BR": {
        title: "FACULDADE UNÍNTESE",
        summary:
          "Projeto de site institucional para uma faculdade, com foco em um design limpo, arquitetura de informação clara e navegação intuitiva.",
        description:
          "Desenvolvimento de uma página de apresentação para a Faculdade Uníntese. O projeto visou estruturar uma grande quantidade de informações de forma clara e acessível, praticando conceitos de UI e UX para guiar o usuário pelos cursos e informações da instituição.",
      },
      en: {
        title: "UNÍNTESE COLLEGE",
        summary:
          "Institutional website project for a college, focusing on a clean design, clear information architecture, and intuitive navigation.",
        description:
          "Development of a presentation page for Uníntese College. The project aimed to structure a large amount of information in a clear and accessible way, practicing UI and UX concepts to guide the user through the courses and information of the institution.",
      },
      es: {
        title: "FACULTAD UNÍNTESE",
        summary:
          "Proyecto de sitio web institucional para una facultad, enfocado en un diseño limpio, una arquitectura de información clara y una navegación intuitiva.",
        description:
          "Desarrollo de una página de presentación para la Facultad Uníntese. El proyecto tuvo como objetivo estructurar una gran cantidad de información de manera clara y accesible, practicando conceptos de UI y UX para guiar al usuario a través de los cursos y la información de la institución.",
      },
    },
  },
  beatriz: {
    imageCount: 1,
    alt: "Página principal da Beatriz Store.",
    github: "https://github.com/wendell95araujo/beatriz-store",
    online: "https://wendell95araujo.github.io/beatriz-store/",
    translations: {
      "pt-BR": {
        title: "BEATRIZ STORE",
        summary:
          "Protótipo de front-end para um e-commerce de moda, com foco na criação de uma interface limpa e uma experiência de navegação agradável.",
        description:
          "Desenvolvimento do layout estático para a Beatriz Store, uma loja virtual de roupas. O objetivo foi praticar a criação de uma interface de usuário (UI) atraente e funcional para um e-commerce, incluindo a página inicial, visualização de produtos e formulários.",
      },
      en: {
        title: "BEATRIZ STORE",
        summary:
          "Front-end prototype for a fashion e-commerce, focusing on creating a clean interface and a pleasant browsing experience.",
        description:
          "Development of the static layout for Beatriz Store, a virtual clothing store. The goal was to practice creating an attractive and functional user interface (UI) for an e-commerce, including the homepage, product view, and forms.",
      },
      es: {
        title: "BEATRIZ STORE",
        summary:
          "Prototipo de front-end para un e-commerce de moda, enfocado en la creación de una interfaz limpia y una experiencia de navegación agradable.",
        description:
          "Desarrollo del diseño estático para Beatriz Store, una tienda virtual de ropa. El objetivo fue practicar la creación de una interfaz de usuario (UI) atractiva y funcional para un e-commerce, incluyendo la página de inicio, la visualización de productos y los formularios.",
      },
    },
  },
  forca: {
    imageCount: 5,
    alt: "Tela inicial do Jogo da Forca.",
    github: "https://github.com/Wendell95Araujo/jogo-da-forca",
    online: "https://wendell-araujo.web.app/games/jogo-da-forca/",
    translations: {
      "pt-BR": {
        title: "JOGO - JOGO DA FORCA",
        summary:
          "Versão digital do clássico Jogo da Forca, com seleção aleatória de palavras e interface interativa para adivinhar letras.",
        description:
          "Desenvolvimento do Jogo da Forca em JavaScript, com um banco de palavras e sorteio aleatório a cada nova partida. O projeto focou na manipulação de strings, arrays e na criação de uma interface interativa que responde às tentativas do jogador.",
      },
      en: {
        title: "GAME - HANGMAN",
        summary:
          "Digital version of the classic Hangman game, with random word selection and an interactive interface for guessing letters.",
        description:
          "Development of the Hangman Game in JavaScript, with a word bank and random selection for each new game. The project focused on string and array manipulation and creating an interactive interface that responds to the player's attempts.",
      },
      es: {
        title: "JUEGO - EL AHORCADO",
        summary:
          "Versión digital del clásico Juego del Ahorcado, con selección aleatoria de palabras e interfaz interactiva para adivinar letras.",
        description:
          "Desarrollo del Juego del Ahorcado en JavaScript, con un banco de palabras y sorteo aleatorio en cada nueva partida. El proyecto se centró en la manipulación de cadenas de texto, arreglos y la creación de una interfaz interactiva que responde a los intentos del jugador.",
      },
    },
  },
  dino: {
    imageCount: 1,
    alt: "Tela inicial do jogo Dino Dancer.",
    github: "https://github.com/wendell95araujo/dinogame.io",
    online: "https://wendell-araujo.web.app/games/dino-dancer-game/",
    translations: {
      "pt-BR": {
        title: "JOGO - DINO DANCER",
        summary:
          "Jogo 'endless runner' com placar de líderes online (Firebase), clima dinâmico, suporte a controles de videogame e persistência de dados em localStorage.",
        description:
          "Uma releitura aprimorada do clássico 'jogo do dinossauro', desenvolvida inteiramente com HTML, CSS e JavaScript puro. Além da mecânica de 'endless runner' com velocidade progressiva, o projeto implementa funcionalidades avançadas, como um sistema de clima dinâmico, trilha sonora aleatória e um placar de líderes online utilizando Firebase Realtime Database. Para aprimorar a jogabilidade, foi integrada a biblioteca Controller.js, adicionando suporte completo a controles de videogame (gamepads). As pontuações locais e configurações de som são persistidas no navegador através do localStorage.",
      },
      en: {
        title: "GAME - DINO DANCER",
        summary:
          "'Endless runner' game with an online leaderboard (Firebase), dynamic weather, gamepad support, and data persistence in localStorage.",
        description:
          "An enhanced remake of the classic 'dinosaur game,' developed entirely with pure HTML, CSS, and JavaScript. In addition to the 'endless runner' mechanic with progressive speed, the project implements advanced features such as a dynamic weather system, random soundtrack, and an online leaderboard using Firebase Realtime Database. To enhance gameplay, the Controller.js library was integrated, adding full support for gamepads. Local scores and sound settings are persisted in the browser via localStorage.",
      },
      es: {
        title: "JUEGO - DINO DANCER",
        summary:
          "Juego 'endless runner' con tabla de líderes en línea (Firebase), clima dinámico, soporte para mandos de videojuegos y persistencia de datos en localStorage.",
        description:
          "Una versión mejorada del clásico 'juego del dinosaurio', desarrollada completamente con HTML, CSS y JavaScript puro. Además de la mecánica 'endless runner' con velocidad progresiva, el proyecto implementa funcionalidades avanzadas, como un sistema de clima dinámico, banda sonora aleatoria y una tabla de líderes en línea utilizando Firebase Realtime Database. Para mejorar la jugabilidad, se integró la biblioteca Controller.js, añadiendo soporte completo para mandos de videojuegos (gamepads). Las puntuaciones locales y la configuración de sonido se guardan en el navegador a través de localStorage.",
      },
    },
  },
  velha: {
    imageCount: 1,
    alt: "Interface do Jogo da Velha.",
    github: "https://github.com/wendell95araujo/jogodavelha.io",
    online: "https://wendell95araujo.github.io/jogodavelha.io/",
    translations: {
      "pt-BR": {
        title: "JOGO - JOGO DA VELHA",
        summary:
          "Implementação do Jogo da Velha em JavaScript puro, focando na lógica de turnos, condições de vitória e manipulação de estado do jogo.",
        description:
          "Criação do clássico Jogo da Velha para dois jogadores locais. O projeto foi centrado na implementação da lógica de jogo em JavaScript, incluindo controle de turnos, checagem de todas as condições de vitória e empate, e feedback visual para o usuário.",
      },
      en: {
        title: "GAME - TIC-TAC-TOE",
        summary:
          "Implementation of Tic-Tac-Toe in pure JavaScript, focusing on turn logic, win conditions, and game state manipulation.",
        description:
          "Creation of the classic Tic-Tac-Toe game for two local players. The project was centered on implementing the game logic in JavaScript, including turn control, checking all win and draw conditions, and visual feedback for the user.",
      },
      es: {
        title: "JUEGO - TRES EN RAYA",
        summary:
          "Implementación del Tres en Raya en JavaScript puro, centrándose en la lógica de turnos, condiciones de victoria y manipulación del estado del juego.",
        description:
          "Creación del clásico Tres en Raya para dos jugadores locales. El proyecto se centró en la implementación de la lógica del juego en JavaScript, incluyendo el control de turnos, la verificación de todas las condiciones de victoria y empate, y la retroalimentación visual para el usuario.",
      },
    },
  },
  aluramidi: {
    imageCount: 1,
    alt: "Interface do Alura Midi.",
    github: "https://github.com/wendell95araujo/aluramidi",
    online: "https://wendell95araujo.github.io/aluramidi/",
    translations: {
      "pt-BR": {
        title: "ALURA MIDI",
        summary:
          "Drum pad interativo que utiliza JavaScript para manipular eventos de clique e teclado, interagindo com a API de Áudio do HTML5.",
        description:
          "Um teclado de ritmos (drum pad) que toca sons diferentes ao clicar nos botões ou pressionar as teclas correspondentes do teclado. O projeto explora a manipulação de múltiplos eventos do JavaScript e a interação com a API de Áudio do HTML5.",
      },
      en: {
        title: "ALURA MIDI",
        summary:
          "Interactive drum pad that uses JavaScript to handle click and keyboard events, interacting with the HTML5 Audio API.",
        description:
          "A rhythm keyboard (drum pad) that plays different sounds when buttons are clicked or corresponding keyboard keys are pressed. The project explores handling multiple JavaScript events and interacting with the HTML5 Audio API.",
      },
      es: {
        title: "ALURA MIDI",
        summary:
          "Drum pad interactivo que utiliza JavaScript para manejar eventos de clic y teclado, interactuando con la API de Audio de HTML5.",
        description:
          "Un teclado de ritmos (drum pad) que reproduce diferentes sonidos al hacer clic en los botones o presionar las teclas correspondientes del teclado. El proyecto explora la manipulación de múltiples eventos de JavaScript y la interacción con la API de Audio de HTML5.",
      },
    },
  },
  barbearia: {
    imageCount: 2,
    alt: "Homepage do site da Barbearia Alura.",
    github: "https://github.com/wendell95araujo/barbeariaalura.io",
    online: "https://wendell95araujo.github.io/barbeariaalura.io/",
    translations: {
      "pt-BR": {
        title: "BARBEARIA ALURA",
        summary:
          "Projeto de estudo para uma barbearia, focado na aplicação de conceitos fundamentais de HTML, CSS e na criação de um layout multi-páginas.",
        description:
          "Um dos meus primeiros projetos web completos, criando um site de três páginas para uma barbearia fictícia. Foi um exercício essencial para solidificar habilidades em estruturação com HTML semântico, estilização com CSS e navegação entre páginas.",
      },
      en: {
        title: "ALURA BARBERSHOP",
        summary:
          "Study project for a barbershop, focused on applying fundamental concepts of HTML, CSS, and creating a multi-page layout.",
        description:
          "One of my first complete web projects, creating a three-page website for a fictional barbershop. It was an essential exercise to solidify skills in structuring with semantic HTML, styling with CSS, and navigating between pages.",
      },
      es: {
        title: "BARBERÍA ALURA",
        summary:
          "Proyecto de estudio para una barbería, enfocado en la aplicación de conceptos fundamentales de HTML, CSS y la creación de un diseño de varias páginas.",
        description:
          "Uno de mis primeros proyectos web completos, creando un sitio de tres páginas para una barbería ficticia. Fue un ejercicio esencial para consolidar habilidades en la estructuración con HTML semántico, estilización con CSS y navegación entre páginas.",
      },
    },
  },
};

/*========================================================
  DYNAMIC PROJECT CARD RENDERING
=========================================================*/
function renderProjectCards(keysToRender) {
  const container = document.querySelector(".project-showcase-container");
  if (!container) return;

  let allCardsHTML = "";
  keysToRender.forEach((key) => {
    const project = projects[key];
    if (!project) return;

    const translation = project.translations[currentLang];
    if (!translation) return;

    const showGitHub = !!project.github;
    const showOnline = !!project.online;
    const onclickCall = `openModal('${key}', ${showGitHub}, ${showOnline})`;

    const cardHTML = `
      <div class="project-showcase-card">
          <div class="project-image-container">
              <img src="assets/img/projects/${key}/1.webp" alt="Preview of the ${translation.title} project.">
          </div>
          <div class="project-text-container">
              <h3>${translation.title}</h3>
              <p>${translation.summary}</p>
              <button class="button" onclick="${onclickCall}" data-i18n-key="viewDetails">Ver Detalhes</button>
          </div>
      </div>
    `;
    allCardsHTML += cardHTML;
  });

  container.innerHTML = allCardsHTML;

  const translations = window.currentTranslations || {};
  if (translations.viewDetails) {
    document
      .querySelectorAll('[data-i18n-key="viewDetails"]')
      .forEach((btn) => {
        btn.textContent = translations.viewDetails;
      });
  }

  setupProjectsAnimation();
}

function setupProjectsAnimation() {
  const cards = document.querySelectorAll(".project-showcase-card");
  
  anime.set(cards, { opacity: 0 });

  const observer = new IntersectionObserver((entries) => {
    
    const visibleCards = entries
      .filter(entry => entry.isIntersecting)
      .map(entry => entry.target);

    if (visibleCards.length > 0) {
      
      anime({
        targets: visibleCards,
        opacity: [0, 1],
        
        translateX: function (el) {
          const allCardsArray = Array.from(document.querySelectorAll(".project-showcase-card"));
          const index = allCardsArray.indexOf(el);
          return index % 2 === 0 ? [1500, 0] : [-1500, 0];
        },

        easing: "easeOutExpo",
        duration: 800,
        delay: anime.stagger(200) 
      });

      visibleCards.forEach(card => observer.unobserve(card));
    }
  }, { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  cards.forEach(card => observer.observe(card));
}

function initProjectRendering() {
  const featuredProjectKeys = [
    "laisa",
    "goncalvescosta",
    "instafire",
    "sequence",
  ];
  const allProjectKeys = Object.keys(projects);

  if (document.querySelector(".view-more-button")) {
    renderProjectCards(featuredProjectKeys);
  } else {
    renderProjectCards(allProjectKeys);
  }
}

/*========================================================
  PROJECT MODAL & GALLERY
=========================================================*/
let currentProjectImages = [];
let currentImageIndex = 0;
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const githubLink = document.getElementById("githubLink");
const onlineLink = document.getElementById("onlineLink");
const modalPrevBtn = document.getElementById("modal-prev");
const modalNextBtn = document.getElementById("modal-next");
const modalCounter = document.getElementById("modal-counter");
const galleryLoader = document.querySelector(".gallery-loader");

function updateModalView() {
  const totalImages = currentProjectImages.length;
  modalImage.src = currentProjectImages[currentImageIndex];
  modalCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;

  if (totalImages <= 1) {
    modalPrevBtn.style.display = "none";
    modalNextBtn.style.display = "none";
    modalCounter.style.display = "none";
  } else {
    modalCounter.style.display = "block";
    modalPrevBtn.style.display = currentImageIndex === 0 ? "none" : "flex";
    modalNextBtn.style.display =
      currentImageIndex === totalImages - 1 ? "none" : "flex";
  }
}

function loadImage() {
  galleryLoader.classList.add("show");
  modalImage.style.opacity = "0";
  const newImage = new Image();
  newImage.src = currentProjectImages[currentImageIndex];

  newImage.onload = () => {
    modalImage.src = newImage.src;
    galleryLoader.classList.remove("show");
    modalImage.style.opacity = "1";
  };
}

function resetModalElements() {
  const elements = document.querySelectorAll(
    ".modal-gallery-container, #modalTitle, #modalDescription, .modal-buttons"
  );
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });
}

function openModal(projectKey, showGitHubLink = true, showOnlineLink = true) {
  document.body.classList.add("showModal");
  const projectData = projects[projectKey];
  if (!projectData) return;

  const translation = projectData.translations[currentLang];
  if (!translation) return;

  currentProjectImages = [];
  for (let i = 1; i <= projectData.imageCount; i++) {
    currentProjectImages.push(`assets/img/projects/${projectKey}/${i}.webp`);
  }
  currentImageIndex = 0;

  modalTitle.textContent = translation.title;
  modalDescription.textContent = translation.description;
  modalImage.alt = projectData.alt;

  githubLink.href = projectData.github;
  onlineLink.href = projectData.online;

  const translations = window.currentTranslations || {};
  githubLink.textContent = translations.modalViewOnGithub || "Ver no GitHub";
  onlineLink.textContent = translations.modalAccessOnline || "Acessar Online";

  githubLink.style.display = showGitHubLink ? "block" : "none";
  onlineLink.style.display = showOnlineLink ? "block" : "none";

  updateModalControls();
  modalImage.src = currentProjectImages[0];
  modalImage.style.transform = "translateX(0)";
  modalImage.style.opacity = "1";

  modal.classList.add("show");
  resetModalElements();

  anime.set(".modal-content", {
    scale: 0.8,
    opacity: 0,
    translateY: 0,
    translateX: 0,
  });

  anime.set(".modal", {
    opacity: 0,
  });

  const tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 500,
  });

  tl.add({
    targets: ".modal",
    opacity: [0, 1],
    duration: 300,
    easing: "linear",
  })
    .add(
      {
        targets: ".modal-content",
        scale: [0.8, 1],
        opacity: [0, 1],
        easing: "spring(1, 80, 10, 0)",
      },
      "-=100"
    )
    .add(
      {
        targets: [
          ".modal-gallery-container",
          "#modalTitle",
          "#modalDescription",
          ".modal-buttons",
        ],
        translateY: [20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: "easeOutQuad",
      },
      "-=800"
    );

  document.addEventListener("keydown", handleKeydown);
}

function closeModal() {
  document.removeEventListener("keydown", handleKeydown);

  const tl = anime.timeline({
    easing: "easeInQuad",
    duration: 300,
    complete: function () {
      modal.classList.remove("show");
      document.body.classList.remove("showModal");

      modal.style.opacity = "";
      document.querySelector(".modal-content").style.transform = "";
      document.querySelector(".modal-content").style.opacity = "";
    },
  });

  tl.add({
    targets: ".modal-content",
    scale: [1, 0.8],
    opacity: 0,
    duration: 250,
  }).add(
    {
      targets: ".modal",
      opacity: 0,
      duration: 200,
    },
    "-=100"
  );
}

function updateModalControls() {
  const totalImages = currentProjectImages.length;

  modalCounter.textContent = `${currentImageIndex + 1} / ${totalImages}`;

  if (totalImages <= 1) {
    modalPrevBtn.style.display = "none";
    modalNextBtn.style.display = "none";
    modalCounter.style.display = "none";
  } else {
    modalCounter.style.display = "block";
    modalPrevBtn.style.display = currentImageIndex === 0 ? "none" : "flex";
    modalNextBtn.style.display =
      currentImageIndex === totalImages - 1 ? "none" : "flex";
  }
}

function animateGallerySwitch(direction) {
  const imgElement = document.getElementById("modalImage");
  const loader = document.querySelector(".gallery-loader");

  const moveOutTo = direction === "next" ? -50 : 50;
  const moveInFrom = direction === "next" ? 50 : -50;

  anime({
    targets: imgElement,
    translateX: [0, moveOutTo],
    opacity: [1, 0],
    easing: "easeInQuad",
    duration: 200,
    complete: function () {
      if (direction === "next") {
        currentImageIndex++;
      } else {
        currentImageIndex--;
      }
      updateModalControls();

      loader.classList.add("show");

      const newSrc = currentProjectImages[currentImageIndex];
      const newImgObj = new Image();
      newImgObj.src = newSrc;

      newImgObj.onload = () => {
        imgElement.src = newSrc;
        loader.classList.remove("show");

        imgElement.style.transform = `translateX(${moveInFrom}px)`;
        imgElement.style.opacity = "0";

        anime({
          targets: imgElement,
          translateX: [moveInFrom, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 300,
        });
      };
    },
  });
}

function showNextImage() {
  if (currentImageIndex < currentProjectImages.length - 1) {
    animateGallerySwitch("next");
  }
}

function showPrevImage() {
  if (currentImageIndex > 0) {
    animateGallerySwitch("prev");
  }
}

function handleKeydown(e) {
  if (e.key === "Escape") closeModal();
  else if (e.key === "ArrowRight") showNextImage();
  else if (e.key === "ArrowLeft") showPrevImage();
}

/*========================================================
  MOBILE MENU
=========================================================*/
const menu = document.getElementById("menu");
const menuIcon = document.getElementById("menu-icon");
const menuButtons = document.querySelectorAll(".menu a");

let isMenuAnimating = false;

function toggleMenu() {
  if (!menu || isMenuAnimating) return;

  const isOpening = !menu.classList.contains("active");

  if (isOpening) {
    menu.classList.add("active");

    anime.set(".menu a", {
      opacity: 0,
      translateX: 50,
    });

    anime({
      targets: ".menu a",
      translateX: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 100 }),
      easing: "easeOutBack",
      duration: 600,
    });
  } else {
    isMenuAnimating = true;

    anime({
      targets: ".menu a",
      opacity: 0,
      translateX: 20,
      duration: 300,
      easing: "easeInQuad",
      complete: () => {
        menu.classList.remove("active");
        isMenuAnimating = false;
      },
    });
  }
}

if (menuIcon && menu) {
  menuIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (menu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  window.addEventListener("click", (event) => {
    if (
      menu.classList.contains("active") &&
      !menu.contains(event.target) &&
      !menuIcon.contains(event.target)
    ) {
      toggleMenu();
    }
  });
}

/*========================================================
  NAVIGATION SCROLLSPY
=========================================================*/
function setupScrollspy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".menu a");
  const offset = 150;

  const highlightLink = () => {
    const scrollPosition = window.scrollY;
    let activeSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        activeSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").endsWith(`#${activeSectionId}`)) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", highlightLink);
  window.addEventListener("load", highlightLink);
}

setupScrollspy();

/*========================================================
  I18N - INTERNATIONALIZATION LOGIC
=========================================================*/
let currentLang = localStorage.getItem("lang") || "pt-BR";
window.currentTranslations = {};

const flagMap = {
  "pt-BR": "https://flagcdn.com/w40/br.png",
  en: "https://flagcdn.com/w40/us.png",
  es: "https://flagcdn.com/w40/es.png",
};

async function setLanguage(lang, animate = false) {
  localStorage.setItem("lang", lang);
  currentLang = lang;

  const response = await fetch(`assets/languages/${lang}.json`);
  const translations = await response.json();
  window.currentTranslations = translations;

  const updateDOM = () => {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n-key]").forEach((element) => {
      const key = element.getAttribute("data-i18n-key");
      if (translations[key]) {
        const attr = element.getAttribute("data-i18n-attr");
        if (attr) {
          element.setAttribute(attr, translations[key]);
        } else {
          element.innerHTML = translations[key];
        }
      }
    });

    if (translations.docTitle) {
      document.title = translations.docTitle;
    }

    initProjectRendering();
  };

  const flagIcon = document.getElementById("selected-lang-flag");

  if (animate && flagIcon) {
    const tl = anime.timeline({
      easing: "easeInQuad",
      duration: 200,
    });

    tl.add({
      targets: flagIcon,
      translateX: [0, 20],
      opacity: [1, 0],
      duration: 200,
    })
      .add({
        targets: "main",
        opacity: [1, 0.5],
        filter: ["blur(0px)", "blur(2px)"],
        duration: 200,
        offset: 0,
      })
      .add({
        duration: 1,
        complete: () => {
          updateDOM();
          if (flagMap[lang]) flagIcon.src = flagMap[lang];

          flagIcon.style.transform = "translateX(-20px)";
          flagIcon.style.opacity = "0";
        },
      })

      .add({
        targets: flagIcon,
        translateX: [-20, 0],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutBack",
      })
      .add({
        targets: "main",
        opacity: [0.5, 1],
        filter: ["blur(2px)", "blur(0px)"],
        duration: 300,
        easing: "easeOutQuad",
        offset: "-=300",
      });
  } else {
    updateDOM();
    if (flagIcon && flagMap[lang]) {
      flagIcon.src = flagMap[lang];
    }
  }
}

/*========================================================
  DROPDOWN LANGUAGE SELECTOR LOGIC
=========================================================*/
function setupLanguageDropdown() {
  const button = document.getElementById("language-selector-button");
  const dropdown = document.getElementById("dropdown-content");
  const langOptions = dropdown.querySelectorAll("a");

  let isDropdownOpen = false;
  let isAnimating = false;

  const openDropdown = () => {
    if (isAnimating) return;
    isAnimating = true;

    dropdown.style.display = "block";

    anime({
      targets: dropdown,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 300,
      easing: "easeOutBack",
    });

    anime.set(langOptions, {
      opacity: 0,
      translateX: 20,
    });

    anime({
      targets: langOptions,
      opacity: [0, 1],
      translateX: [20, 0],
      delay: anime.stagger(80, { start: 100 }),
      easing: "easeOutBack",
      duration: 500,
      complete: () => {
        isAnimating = false;
      },
    });

    isDropdownOpen = true;
  };

  const closeDropdown = () => {
    if (isAnimating) return;
    isAnimating = true;

    anime({
      targets: langOptions,
      opacity: 0,
      translateX: 10,
      duration: 200,
      easing: "easeInQuad",
    });

    anime({
      targets: dropdown,
      opacity: 0,
      scale: 0.9,
      duration: 200,
      easing: "easeInQuad",
      delay: 100,
      complete: () => {
        dropdown.style.display = "none";
        isDropdownOpen = false;
        isAnimating = false;
      },
    });
  };

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  langOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      const newLang = option.getAttribute("data-lang");

      if (newLang !== currentLang) {
        setLanguage(newLang, true);
      }
      closeDropdown();
    });
  });

  window.addEventListener("click", (event) => {
    if (
      isDropdownOpen &&
      !button.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      closeDropdown();
    }
  });
}

/*========================================================
  RESIZE LOGIC
=========================================================*/
window.addEventListener("resize", () => {
  if (window.innerWidth > 576) {
    if (menu) menu.classList.remove("active");
    anime.set(".menu a", {
      opacity: 1,
      translateX: 0,
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.style.opacity = "";
      link.style.transform = "";
      link.style.transition = "";
    });

    isMenuAnimating = false;
  }
});
