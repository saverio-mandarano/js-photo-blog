// seleziono elemento di container output
const outputCont = document.getElementById("container");
// console.log(outputCont);

// creiamo ref a endpoint
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";



// creiamo la chiamata ajax all'endpoint
axios.get(endpoint)
    .then(response => {
        // otteniamo l'array di oggetti dall'API
        const posts = response.data;
        console.log(posts);

        // var di accumulo stringa output
        let postsOutput = "";

        // cicliamo l'array per estrapolare le info
        posts.forEach((post, index) => {

            // destrutturiamo l'oggeto
            const { title, date, url } = post;

            //console.log("il valore del titolo è :", title, "il valore del testo è :", date);

            // valorizziamo la variabile di accumulo di output (stringa)
            postsOutput += `
            <div class="card p-3">
                <img src="${url}" class="card-img">
                <h2 class="title-font">${title}</h2>
                <p class="date-font">${date}</p>
            </div>`;

           // console.log("alla iterazione numero", index, postsOutput);

        });

        // inseriamo in pagina le card accumulate
        outputCont.innerHTML = postsOutput;


    })
    .catch(error => {
        console.error(error.message);
    })

    .finally(() => {
        console.log('end call');
    })