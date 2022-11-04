//// Afficher le produit ////

let productChoices = null;

// 1. Je vais créer le panier dans le LocalStorage

let basket = JSON.parse(localStorage.getItem("products"));

if (basket == null) {
    basket = [];
}


//// 2 : Je récupére l'id dynamique de l'url :

// Avec new URL je vais récupèrer l'URL de la page active puis Avec searchParams.get je vais récupérer l'id du produit

let productId = new URL(window.location.href).searchParams.get("id");

//// 3 : Je récupére les élements pour injecter les infos du produit

let productTitle = document.getElementById("title");
let productColor = document.getElementById("colors");
let productImage = document.querySelector(".item__img");
let productDescription = document.getElementById("description");
let productPrice = document.getElementById("price");


//// 4 : Je vais appeler l'API pour récupérer les informations du produit à afficher

fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
        if (response.ok) {
            response.json()

                .then((product) => {

                    productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
                    productTitle.innerHTML = `${product.name}`
                    productPrice.innerHTML = `${product.price}`
                    productDescription.innerHTML = `${product.description}`
                    let colorArray = product.colors

                    for (let color of colorArray) {
                        productColor.innerHTML += `<option value="${color}"> ${color}</option>`
                    }

                })
                .catch((error) => {
                    alert("Erreur: Le produit n'est pas disponible")
                })
        }

    }).catch((error) => {
        alert("Pas de réponse du serveur")
    })



//// 5: A l'évènement 'click' sur le bouton 'btnAddProductToBasket' --> Cela envoit les produits au localStorage

            // 1. Je crée une variable pour le bouton "ajouter au panier", qui permet de sélectionner l'id du bouton ('addToCart') grâce à querySelector

            let btnAddProductToBasket = document.querySelector("#addToCart");

            // 2. Je crée une fonction qui au clic, va récupérer la couleur choisie & la quantité saisie

            btnAddProductToBasket.addEventListener('click', () => {

            // 3. Je récupére la couleur sélectionnée
            let colorOfProduct = document.querySelector("#colors").value;

            // 4. Je récupére la quantité saisie

            let quantityOfProduct = document.querySelector("#quantity").value;

            // 5. Conditions du panier

            if (!colorOfProduct) {
                alert("Veuillez choisir une couleur")
            } else if (quantityOfProduct <= 0) {
                alert("Vous devez ajouter au moins un produit par commande")
            } else if (quantityOfProduct > 100) {
                alert("Vous ne pouvez pas ajouter plus de 100 produits par commande")

            } else {

                // 6. Création de l'objet à envoyer au LocalStorage
                productChoices = {
                    id: productId,
                    color: colorOfProduct,
                    quantity: quantityOfProduct,
                }


                console.log(productChoices);

                console.log(basket);

            // 7. Si j'ai déjà des produits dans mon panier : je lance la recherche pour pouvoir le faire le cumul des quantités

            if (basket != null) {

                let found = basket.findIndex(
                    (element) => element.id === productId && element.color == colorOfProduct
                );

                if (found !== -1) {

                    // 8. Je crée une variable qui additionne deux fonctions parseInt qui vont convertir la chaine de caractères en nombre.
                    let totalQuantity = parseInt(basket[found].quantity) + parseInt(quantityOfProduct);

                    basket[found].quantity = totalQuantity;

                    // 9. J'ajoute l'article

                    basket.push(productChoices);

                    // 10. Je supprime le dernier article

                    basket.pop(); 

                } else {

                    // 11. J'enregistre les éléments dans le LocalStorage s'il n'existe pas
                    basket.push(productChoices);
                }

            } else {
                basket.push(productChoices);
            }


            // 12. J'enregistre le nouvel élement (proprièté localStorage.setItem) et j'additionne dans le LocalStorage de ma page product.js sous forme de chaine de caractères JSON, grâce à JSONStringify.

            localStorage.setItem("products", JSON.stringify(basket));

            // 13. Je récupère l'URL pour qu'au clic l'utilisateur soit basculé sur la page cart.html

            document.location.href = "cart.html";

        }

});




