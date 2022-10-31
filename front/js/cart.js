////////////////////////////////////////////////////////////////
// On affiche tout les produits dans le localstorage ////////////////////
////////////////////////////////////////////////////////////////


// récupérer le panier (l’array) via localStorage.
let productInLocalStorage = (localStorage.getItem("products"));
console.log(productInLocalStorage);

let cartTotalPrice = 0 ;
let cartTotalItems = 0 ;


function getProductOfCart() {
  //Object.entries permets de transformer un objet en tableau
  //la première boucle va au premier niveau de l'objet
  for (let [id, colors] of Object.entries(productInLocalStorage)) {
    //la deuxième boucle va au deuxième niveau
    //On récupère la couleur et la quantité
    for (let [color, quantity] of Object.entries(colors)) {
      fetch("http://localhost:3000/api/products/" + id)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((productData) => {

                let item = document.querySelector("#cart__items")
                // Insertion des éléments
                item.innerHTML += `<article class="cart__item" data-id ="${productData._id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${productData.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productData.name}</h2>
                    <p>${color}</p>
                    <p>${productData.price} €</p> 
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :   </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
                </article>`
                //Supprimer un produit du ls
                //deleteBtns renvoie un objet avec tous les éléments html sous forme de collection
                let deleteBtns = document.getElementsByClassName("deleteItem")

                //le forEach permets de boucler sur les boutons récupérés dans deleteBtns
                //Object.values nous permet d'établir un tableau pour pouvoir boucler sur les éléments
                Object.values(deleteBtns).forEach(deleteBtn => {
                  // Au clic de deleteBtn on supprime le produit du ls
                  deleteBtn.addEventListener('click', function () {
                    //closest permet de récupérer l'article le plus proche du deleteBtn en question
                    let article = deleteBtn.closest("article")
                    let deleteBtnId = article.getAttribute("data-id")
                    let deleteBtncolor = article.getAttribute("data-color")

                    //Fonction récupérer dans le fichier localstorage, qui permet de supprimer le produit du ls
                    removeProductFromLs(deleteBtnId, deleteBtncolor)

                  })
                })

                // Changer la quantité d'un produit dans le ls
                //quantityItem renvoie un objet avec tous les éléments html sous forme de collection
                let quantityItem = document.getElementsByClassName("itemQuantity")

                //Object.values nous permet d'établir un tableau pour pouvoir boucler sur les éléments
                Object.values(quantityItem).forEach(qty => {
                  qty.addEventListener('change', function () {
                    let article = qty.closest("article")
                    let idData = article.getAttribute("data-id")
                    let idColor = article.getAttribute("data-color")
                    let newQuantity = qty.value

                    changeProductQuantity(idData, idColor, newQuantity)
                  })
                })

                // Calculé le prix total et le nombre d'articles du panier

                let totalQuantity = document.querySelector('#totalQuantity')
                let totalPrice = document.querySelector('#totalPrice')
                // On additionne la quantité de chaque produit pour trouver le nombre d'articles
                cartTotalItems += parseInt(quantity)
                // On multiplie pour chaque produit son prix par sa quantité, et on additionne
                cartTotalPrice += productData.price * parseInt(quantity)

                totalQuantity.innerHTML = cartTotalItems
                totalPrice.innerHTML = cartTotalPrice


              })


          }
        })
    }

  }
}

// getProductOfCart()