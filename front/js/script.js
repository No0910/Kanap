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
                        
                        let baliseArticle = document.createElement("article"); 

                        let baliseImage = document.createElement("img");
                        baliseImage.src = `${product.imageUrl}`;
                        baliseImage.alt = `${product.altTxt}`;
                        
                        let baliseH3 = document.createElement("h3");
                        baliseH3.innerText = `${product.name}`;
                       
                        let baliseP = document.createElement("p");
                        baliseP.innerText = `${product.description}`;
                     
                        
                        items.appendChild(baliseA);
                        baliseA.appendChild(baliseArticle);
                        baliseArticle.appendChild(baliseImage);
                        baliseArticle.appendChild(baliseH3);
                        baliseArticle.appendChild(baliseP);

                    }

                })
                .catch((error) => {
                    alert("Erreur: Le produit n'est pas disponible")
                })
        }

    }).catch((error) => {
    alert("Pas de réponse du serveur")
})

