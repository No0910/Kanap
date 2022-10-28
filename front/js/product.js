//// Afficher le produit ////



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

    // 2. Création du panier dans le LS 
 
    let basket = JSON.parse(localStorage.getItem("products")) || [];

    // 3. récupération de la couleur saisie

    let quantityOfProduct = document.querySelector("#quantity").value; 

   // 4. Conditions du panier

    if (colorOfProduct.value === "") {
        alert("Veuillez choisir une couleur")
    } else if (quantityOfProduct.value > 0 && quantityOfProduct.value < 100) {

       // Création de l'objet à envoyer au LocalStorage
       const productChoices = {
        id: productId,
        color: colorOfProduct.value,
        quantity: quantityOfProduct.value,
    }
        
    } else if (quantityOfProduct.value > 100) {
        alert("Vous ne pouvez pas ajouter plus de 100 produits par commande")

    } 

   // 5. Méthode pour rechercher un produit si déja existant dans le LS

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

  // 8. Enregistrer le nouvel élement et on additionne dans le LS/STRINGIFY = On récupère sous forme de chaine de caractère (string)
  
  localStorage.setItem("products", JSON.stringify(basket));
  
});
    


