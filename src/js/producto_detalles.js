//Poder cambiar la imagen principal y las miniaturas
    const mainImage = document.getElementById('mainImage');
    const miniaturas = document.querySelectorAll('.miniatura');

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            // Guarda la ruta de la imagen principal actual
            const tempSrc = mainImage.src;
            // Intercambia la imagen principal con la miniatura clickeada
            mainImage.src = this.src;
            this.src = tempSrc;
            });
        });