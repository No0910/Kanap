//// Afficher le produit ////

let productChoices = null;

// 1. Création du panier dans le LS 

let basket = localStorage.getItem("products");
if (basket == null) {
    basket = [];
}


//// 1 : Récupérer de l'id dynamique de l'url : 

let productId = new URL(window.location.href).searchParams.get("id"); // --> On récupére l'id avec les paramétres de l'url puis on récupère l'URL de la page active et on extrait l'ID d'un produit //


console.log(productId);


// 2 : Récupérer les élements pour injecter les infos du produit

let productTitle = document.getElementById("title");
let productColor = document.getElementById("colors");
let productImage = document.querySelector(".item__img");
let productDescription = document.getElementById("description");
let productPrice = document.getElementById("price");



// 3 : Appeler l'API pour récupérer les informations du produit à afficher

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


// 4 : Ajout du produit et ses infos au localstorage : "Ajouter un produit au panier"



// Lorsqu'on clique sur le bouton 'btnAddProductToBasket' --> On envoie les produits au localStorage

let btnAddProductToBasket = document.querySelector("#addToCart");


btnAddProductToBasket.addEventListener('click', () => {

    // 1. Récupération de la couleur sélectionnée
    let colorOfProduct = document.querySelector("#colors").value;

    // 2. Récupération de la quantité saisie

    let quantityOfProduct = document.querySelector("#quantity").value;

    // 3. Conditions du panier

    if (!colorOfProduct) {
        alert("Veuillez choisir une couleur")
    } else if (quantityOfProduct <= 0) {
        alert("Vous devez ajouter au moins un produit par commande")
    } else if (quantityOfProduct > 100) {
        alert("Vous ne pouvez pas ajouter plus de 100 produits par commande")

    } else {

        // Création de l'objet à envoyer au LocalStorage
        productChoices = {
            id: productId,
            color: colorOfProduct,
            quantity: quantityOfProduct,
        }


        console.log(productChoices);
        console.log(basket);


        // Si j'ai déjà des produits dans mon panier : je lance la recherche pour pouvoir le faire le cumul des quantités

        if (basket) {
            let found = basket.find(
                (element) => element.id == productId && element.color == colorOfProduct
            );

            if (found != undefined) {

                // 6. Valeur LS + value actuelle : transforme les chaines de caractères en nombre
                let totalQuantity = parseInt(found.quantityOfProduct) + parseInt(quantityOfProduct);
                found.quantityOfProduct = totalQuantity;

            } else {
                // 7. Enregistrer les éléments dans le LS s'il n'existe pas
                basket.push(productChoices);
            }

        } else {
            basket.push(productChoices);
        }


        // 8. Enregistrer le nouvel élement et on additionne dans le LS/STRINGIFY = On récupère sous forme de chaine de caractère (string)

        localStorage.setItem("products", JSON.stringify(basket));

    }
});



