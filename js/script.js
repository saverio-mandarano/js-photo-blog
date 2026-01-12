// seleziono elemento di container output
const outputCont = document.getElementById("container");
// console.log(outputCont);

// creiamo ref a endpoint
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// seleziono frecce
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// array globale per id e rispettiva immagine
let carouselGallery = []; 
let currentIndex = 0;

// creiamo la chiamata ajax all'endpoint
axios.get(endpoint)
    .then(response => {
        // otteniamo l'array di oggetti dall'API
        const posts = response.data;
        console.log(posts);

        carouselGallery = posts;

        // var di accumulo stringa output
        let postsOutput = "";

        // cicliamo l'array per estrapolare le info
        posts.forEach((post, index) => {

            // destrutturiamo l'oggetto
            const { title, date, url, id } = post;

            // salvo nell'array url e relativo id per ciascuno img del carousel
            carouselGallery[index] = { url: url, id: id };

            //console.log("il valore del titolo è :", title, "il valore del testo è :", date);
            console.log("il valore dell'id è :", id);

            // valorizziamo la variabile di accumulo di output (stringa)
            postsOutput += `
            <div class="card p-3">
                <div class="img-wrapper">
                    <img src="${url}" id="${id}" class="card-img-top" />
                    <img src="img/pin.svg" class="icon" />
                </div>
                <div class="card-body">
                    <h2 class="title-font">${title}</h2>
                    <p class="date-font">${date}</p>
                </div> 
            </div>`;
        });

        // inseriamo in pagina le card accumulate
        outputCont.innerHTML = postsOutput;

        // Facciamo sì che cliccando una qualunque foto l’overlay ricompaia.
        // Per prima cosa seleziono gli elementi dal DOM:
        const overlay = document.querySelector(`.overlay`);
        const overlayImg = document.querySelector(`.overlay-img`);
        const overlayBtn = document.querySelector(`.overlay-btn`);

        // seleziono tutte le card appena create
        const cards = document.querySelectorAll(`.card`);


        // Adesso creiamo un evento di click sulle card:
        cards.forEach( card => {
            const img = card.querySelector(`img`); /*seleziono l’immagine interna alla card corrente.*/

            img.addEventListener(`click`, () => { 
            // console.log(`click`);

            // Quando una foto viene cliccata, dobbiamo fare in modo che sia proprio quella foto a essere mostrata 
            // all’interno dell’overlay:
            currentIndex = parseInt(img.id) - 1 ;   // Troviamo l'id dell'immagine corrente: è stringa da convertire in numero. Sottraggo uno poichè`l'id iniziano da 1 mentre g;li indici degli array da 0.
            console.log(`l'id corrente è: `, currentIndex);

            overlayImg.src = carouselGallery[currentIndex].url;  // imposto la src dell'img overlay uguale a src dell'img cliccata.

            overlay.classList.remove(`overlay-display`); //faccio apparire l'overlay rimuovendo la classe che lo nasconde
            });
        });

        // Cliccando il button "Close", l’overlay scompare nuovamente.
        overlayBtn.addEventListener(`click`, () => {
            overlay.classList.add(`overlay-display`);
        });

        nextButton.addEventListener("click", () => {
            currentIndex++;
            if (currentIndex >= carouselGallery.length){
                currentIndex = 0;
            } 
            overlayImg.src = carouselGallery[currentIndex].url;
        });

        prevButton.addEventListener("click", () => {
            currentIndex--;
            if (currentIndex < 0){
                currentIndex = carouselGallery.length - 1;
            } 
            overlayImg.src = carouselGallery[currentIndex].url;
        });


    })
    .catch(error => {
        console.error(error.message);
    })

    .finally(() => {
        console.log('end call');
    })