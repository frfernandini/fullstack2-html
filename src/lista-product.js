//CREANDO LISTADO DE PRODUCTOS
const productos = {
    JM001: {
        Categoria: "Juegos de Mesa",
        Titulo: "Catan",
        Descripcion: "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
        Precio: 29990,
        imagen: "img/ps5-test.png"
    },
    JM002: {
        Categoria: "Juegos de Mesa",
        Titulo: "Carcassonne",
        Descripcion: " Un juego de colocación de fichas donde los jugadores construyen el paisajealrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil deaprender.",
        Precio: 24990,
        imagen: "img/ps5-test.png"
    },
    AC001: {
        Categoria: "Accesorios",
        Titulo: "Controlador Inalámbrico Xbox Series X",
        Descripcion: "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
        Precio: 59990,
        imagen: "img/ps5-test.png"
    },
    AC002: {
        Categoria: "Accesorios",
        Titulo: "Auriculares Gamer HyperX Cloud II",
        Descripcion: "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
        Precio: 79990,
        imagen: "img/ps5-test.png"
    },
    CO001: {
        Categoria: "Consolas",
        Titulo: "PlayStation 5",
        Descripcion: " La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
        Precio: 549990,
        imagen: "img/ps5-test.png"
    },
    CG001: {
        Categoria: "Computadores Gamers",
        Titulo: "PC Gamer ASUS ROG Strix",
        Descripcion: "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego",
        Precio: 1299990,
        imagen: "img/ps5-test.png"
    },
    SG001: {
        Categoria: "Sillas Gamers",
        Titulo: "Silla Gamer Secretlab Titan ",
        Descripcion: " Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas",
        Precio: 349990,
        imagen: "img/ps5-test.png"
    },
    MS001: {
        Categoria: "Mouse",
        Titulo: "Mouse Gamer Logitech G502 HERO",
        Descripcion: " Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización",
        Precio: 49990,
        imagen: "img/ps5-test.png"
    },
    MP001: {
        Categoria: "Mousepad",
        Titulo: "Mousepad Razer Goliathus Extended Chroma",
        Descripcion: "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
        Precio: 29990,
        imagen: "img/ps5-test.png" 
    },
    PP001: {
        Categoria: "Poleras Personalizadas",
        Titulo: "Polera Gamer Personalizada 'Level-Up'",
        Descripcion: "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito",
        Precio: 14990,
        imagen: "img/ps5-test.png" 
    }
};

//APLICANDO LOGICA

//INICIALIZAR EL CONTENEDOR PRINCIPAL DONDE IRAN LOS PRODUCTOS
const container = document.getElementById("productContainer")

for (let i in productos){
    const prod = productos[i];

    //SE CREA UN ELEMENTO DE TIPO DIV-CONTAINER
    const card = document.createElement("div");
    //IMPLEMENTA ATRIBUTO 
    card.classList.add("card-product");

    //SE CREAN LAS CARD
    card.innerHTML = `
        <div class="card-product">
            <img src="${prod.imagen}" alt="${prod.Titulo}">
        </div>
        <div>
            <h3 class="title">${prod.Titulo}</h3>
            <p class="price">$${prod.Precio}</p>
            <button class="btn btn-primary">Agregar</button>
        </div>
    `;

    container.appendChild(card);
}
