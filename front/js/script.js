// Affichage de tous les produits de la page d'accueil //

// Il faut récupèrer l'élément items pour y injecter les produits //
const items = document.getElementById("items");

//Puis appeller l'API //
fetch("http://localhost:3000/api/products/")
    .then((response) => {
        if (response.ok) {

            response.json()
                .then((products) => {
                    for (let product of products) {

                        let baliseA = document.createElement("a");
                        baliseA.href = `product.html?id=${product._id}`;
                        items.appendChild(baliseA);

                        let baliseImg = document.createElement("img");
                        baliseImg.src =  `${product.imageUrl}`;
                        baliseImg.alt = `${product.altTxt}`;
                        baliseArticle.appendChild(baliseImg);
                       

                        let baliseArticle = document.createElement("article");
                        baliseA.appendChild(baliseArticle);

                        let baliseH3 = document.createElement("h3");
                        baliseH3.innerText = `${product.name}`;
                        baliseArticle.appendChild(baliseH3);


                        let baliseP = document.createElement("p");
                        baliseP.innerText = `${product.description}`;
                        baliseArticle.appendChild(baliseP);


                        // Puis injecter les informations du produit dans le HTML
        /*                items.innerHTML += `<a href="./product.html?id=${product._id}">
                        <article>
                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                          <h3 class="productName">${product.name}</h3>
                          <p class="productDescription">${product.description}</p>
                        </article>
                      </a>`
*/
                    }

                })
                .catch((error) => {
                    alert("Erreur: Le produit n'est pas disponible")
                })
        }

    }).catch((error) => {
    alert("Pas de réponse du serveur")
})

