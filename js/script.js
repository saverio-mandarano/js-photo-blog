// seleziono elemento di container output
const outputCont = document.getElementById("container");
// console.log(outputCont);

// creiamo ref a endpoint
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// seleziono frecce
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// array globale per id e rispettiva immagine
let carousel = []; 
let j = 0;

// creiamo la chiamata ajax all'endpoint
axios.get(endpoint)
    .then(response => {
        // otteniamo l'array di oggetti dall'API
        const posts = response.data;
        console.log(posts);

        carousel = posts;

        // var di accumulo stringa output
        let postsOutput = "";

        // cicliamo l'array per estrapolare le info
        posts.forEach((post, index) => {

            // destrutturiamo l'oggetto
            const { title, date, url, id } = post;

            // salvo nell'array url e id per carousel
            carousel[index] = { url: url, id: id };

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
            overlayImg.src = img.src; // imposto la src dell'img overlay uguale a src dell'img cliccata.

            overlay.classList.remove(`overlay-display`); //faccio apparire l'overlay rimuovendo la classe che lo nasconde
            });


        });

        // Cliccando il button "Close", l’overlay scompare nuovamente.
        overlayBtn.addEventListener(`click`, () => {
            overlay.classList.add(`overlay-display`);
        });


    })
    .catch(error => {
        console.error(error.message);
    })

    .finally(() => {
        console.log('end call');
    })