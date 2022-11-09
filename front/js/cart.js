// 1. Je récupère le contenu de mon panier

let basket = JSON.parse(localStorage.getItem("products"));

if ( basket == null || basket.length <= 0 ) {

document.getElementById('totalQuantity').innerHTML = "0";

let baliseNoItems = document.createElement("p");
baliseNoItems.textContent = "Pas d'articles";

document.getElementById('cart__items').appendChild(baliseNoItems);


} else {

let nbProducts = basket.length;

document.getElementById('totalQuantity').innerHTML = nbProducts;

  // 2. J'affiche un tableau récapitulatif des produits / Je parcours mon localStorage

  for (let i = 0; i < nbProducts; i++) {
 
// Je récupère le produit courant

let product = basket[i];

console.log(product);

// 3. Pour chaque produit, je dois créer une ligne dans mon tableau ( qui correspond à ce qui est commenté dans cart.html )


// Je veux créer un article, à l’intérieur de ma section déjà existante
// Je récupère l’élément « section » qui existe déjà pour y créer mes éléments actuellement commentés dans mon html

let baliseSection = document.getElementById ("cart__items") ;

// Puis j'appelle l'API avec la fonction fetch

//Puis appeller l'API //
fetch("http://localhost:3000/api/products/" + product.id) //product.id récupère l'identifiant du produit dans le tableau crée ligne 27, .id est la clé
    .then((response) => {
        if (response.ok) {

            response.json()
                .then((monProduit) => {

                  console.log(monProduit);
                     

                      // Je crée ma première balise la baliseArticle
                      let baliseArticle = document.createElement("article") ;
                      baliseArticle.className = "cart__item";
                      baliseArticle.setAttribute("data-id", monProduit._id );
                      baliseArticle.setAttribute("data-color", product.color);


                      // Je dois créer une div image à l’intérieur de laquelle se trouve une image
                      let baliseDivImage = document.createElement("div") ;
                      baliseDivImage.classList.add("cart__item__img");

                      //Je crée ensuite ma balise image (qui sera l’enfant de ma BaliseDivImage)
                      let baliseImage = document.createElement ("img") ;
                      baliseImage.src = `${monProduit.imageUrl}`;
                      baliseImage.alt = `${monProduit.altTxt}`;

                      // Je crée une nouvelle div appelée cart__item__content
                      let baliseDivContent = document.createElement ("div") ;
                      baliseDivContent.classList.add("cart__item__content");

                      // Je crée une nouvelle div appellée cart__item__content__description
                      let baliseDivContentDescription = document.createElement("div") ;
                      baliseDivContentDescription.classList.add("cart__item__content__description");

                      // Dans ma div content description je vais créer : Un H2 et 2 P :
                      let baliseTitleH2 = document.createElement("h2") ;
                      baliseTitleH2.innerText = monProduit.name;
                     
                      // Il me reste à insérer les 2 P :
                      //Le premier P pour la couleur

                      let baliseP1 = document.createElement ("p") ;
                      baliseP1.textContent = product.color ; 
                     

                      // Puis le second P pour le prix

                      let baliseP2 = document.createElement ("p") ;
                      baliseP2.textContent = monProduit.price + " €" ;
                     

                      // Je crée une nouvelle div appelée baliseDivContentSettings
                      let baliseDivContentSettings = document.createElement ("div") ;
                      baliseDivContentSettings.classList.add("cart__item__content__settings") ;

                      // Je crée une div pour la quantité
                      let baliseDivContentSettingsQuantity = document.createElement ("div") ;
                      baliseDivContentSettingsQuantity.classList.add("cart__item__settings__quantity");

                      // Dans ma div baliseDivContentSettingsQuantity je dois insérer un P et un input 
                      let balisePSettings = document.createElement("p") ;
                      balisePSettings.textContent = "Qté : ";

                      
                      // Je crée mon input
                      let baliseInputSettings = document.createElement ("input") ;
                      baliseInputSettings.classList.add("itemQuantity");
                      baliseInputSettings.setAttribute("type","number");
                      baliseInputSettings.setAttribute("class","itemQuantity");
                      baliseInputSettings.setAttribute("name","itemQuantity");
                      baliseInputSettings.setAttribute("min","1");
                      baliseInputSettings.setAttribute("max","100");
                      baliseInputSettings.setAttribute("value", product.quantity); 

                      // Je crée une nouvelle div pour la suppression
                      let baliseDivContentSettingsDelete = document.createElement("div") ;
                      baliseDivContentSettingsDelete.classList.add("cart__item__settings__delete") ;

                      // Je dois insérer un P dans ma balise delete
                      let balisePDelete = document.createElement ("p") ;
                      balisePDelete.className = "deleteItem" ;
                      balisePDelete.textContent = "Supprimer";


                     
                      baliseSection.appendChild(baliseArticle);
                      baliseArticle.appendChild(baliseDivImage);
                      baliseDivImage.appendChild(baliseImage);
                      baliseArticle.appendChild(baliseDivContent);
                      baliseDivContent.appendChild(baliseDivContentDescription);
                      baliseDivContentDescription.appendChild(baliseTitleH2);
                      baliseDivContentDescription.appendChild ( baliseP1) ;
                      baliseDivContentDescription.appendChild ( baliseP2) ;
                      baliseDivContent.appendChild(baliseDivContentSettings);
                      baliseDivContentSettings.appendChild(baliseDivContentSettingsQuantity);
                      baliseDivContentSettingsQuantity.appendChild(balisePSettings);
                      baliseDivContentSettingsQuantity.appendChild (baliseInputSettings);
                      baliseDivContentSettings.appendChild(baliseDivContentSettingsDelete);
                      baliseDivContentSettingsDelete.appendChild(balisePDelete);

                      //TODO calculer les quantités commandées de ma variable product
                      //TODO calculer le prix total des produits commandés monProduit/product mix 
                      //TODO écrire la fonction de suppression d'un produit 
                      //TODO fonction qui recalcule le panier quand je change les quantités


                    }

                )
        }
      }
   )

    }}

    // Fonction qui calcule le total des quantités de produits du panier 

      function calculateTotalQuantity() {
      let getTotalQuantity = document.querySelector("#totalQuantity");
      let basket = JSON.parse(localStorage.getItem("products"));
      let calculateTotalQuantity= [];
      console.log(calculateTotalQuantity)

      let totalQuantity = 0;
      for( let product of basket ){
          totalQuantity += parseInt(product.quantity);
      }

      calculateTotalQuantity.push(totalQuantity);
      getTotalQuantity.innerText = totalQuantity;

      }

    calculateTotalQuantity();

      
  // Fonction qui calcule le prix total du panier

      let sumTotalPrice = [];

      // Je vais chercher les prix dans le panier
      for (let i = 0 ; i < basket.lenght; i++){
        let priceProductInBasket = basket[i].price;

      // Je vais mettre les prix du panier dans la variable "sumTotalPrice"
      sumTotalPrice.push(priceProductInBasket)
      }

      //J'additionne ensuite les prix qu'il y a dans le tableau de la variable "sumTotalPrice" avec la méthode .reduce
      const reducer = (accumulator,currentValue) => accumulator + currentValue ;
      const totalPrice = sumTotalPrice.reduce(reducer,0);
    

      //Je récupère ma div html
      const  displayTotalPrice = `<span id="totalPrice">${totalPrice}</span>`;
      const totalPriceHtml = document.querySelector("#totalPrice");

      console.log(totalPrice);
      

  // Fonction lorsqu'on modifie une quantité, le panier se met à jour

  /* function updatePriceAndQuantity (id,newValue) {
  
    const productToUpdate = basket.find(product => product.id === id);
    productToUpdate.quantity = Number(newValue);

    console.log("productToUpdate",productToUpdate);
    console.log("newValue",newValue);

  } */


  
 // Fonction de suppression d'un produit

      // Je sélectionne la référence de tous les boutons "supprimer"
      let deleteButton = document.querySelectorAll(".deleteItem");
      console.log("deleteButton");
      
      //Je sélectionne l'id qui va être supprimer en cliquant sur le bouton

      for (let i = 0 ; i < deleteButton.length; i++){
        deleteButton[i].addEventListener("click", (event) => {
          event.preventDefault(); //preventDefault évite que la page se recharge au clic du bouton

          //Sélection de l'id du produit qui va être supprimé au clic du bouton
          let idSelectionDelete = basket[i]._id;
          console.log(idSelectionDelete);

          // avec la méthode filter 
          basket = basket.filter ( element => element._id !== idSelectionDelete );

          //J'envoie la variable dans le localStorage
          localStorage.setItem("products", JSON.stringify(basket));

          //Alerte + Rechargement de la page
          alert("Ce produit a été supprimer du panier");
          window.location.href = "cart.html";

        })

      }
