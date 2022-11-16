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
                      baliseInputSettings.addEventListener('change', (event) => updatePriceAndQuantity(product.id, product.color, baliseInputSettings.value));
                     
                      // Je crée une nouvelle div pour la suppression
                      let baliseDivContentSettingsDelete = document.createElement("div") ;
                      baliseDivContentSettingsDelete.classList.add("cart__item__settings__delete") ;
                      baliseDivContentSettingsDelete.addEventListener('click',(event) => deleteItem(product.id, product.color, baliseDivContentSettingsDelete.value));

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


                    })
        }
      }
   )

    }}

//// Fonction qui calcule le total des quantités de produits du panier ////

     function calculateTotalQuantity() {

      let getTotalQuantity = document.querySelector("#totalQuantity");
      let basket = JSON.parse(localStorage.getItem("products"));
      let calculateTotalQuantity= [];
      
      let totalQuantity = 0;
      for( let product of basket){
          totalQuantity += parseInt(product.quantity);
      }

      calculateTotalQuantity.push(totalQuantity);
      getTotalQuantity.innerText = totalQuantity;

      }

    calculateTotalQuantity();

      
////Fonction qui calcule le prix total du panier///


  // Boucle qui va chercher les prix dans le panier

  function calculateTotalPrice () {

     // Je crée une variable pour le total prix
  let sumTotalPrice = 0;
  
  for (let i = 0 ; i < basket.length; i = i + 1) {

      // Je récupère le produit courant
      let product = basket[i];
      console.log(product);
      
      //J'appelle l'API //
        fetch("http://localhost:3000/api/products/" + product.id)
          .then((response) => {
            if (response.ok) {
              response.json()
                .then((monProduit) => {

                  // Nouvelle variable qui récupère le prix
                  let priceProductInBasket = monProduit.price;

                  // Nouvelle variable pour calculer le prix par produit
                  let pricePerProduct = product.quantity * priceProductInBasket;

                  // Somme totale = Somme totale + prix par produit (quantité de produit x prix du produit unitaire)
                  sumTotalPrice += pricePerProduct ;

                  //Je récupère ma div html
                  const totalPriceHtml = document.querySelector("#totalPrice");
                  totalPriceHtml.innerHTML = sumTotalPrice ;         
                })
              }
            })
      } 

   }
    
    calculateTotalPrice();


    // Fonction lorsqu'on modifie une quantité, le panier se met à jour

      function updatePriceAndQuantity (id, color, qty){

        // je contrôle la validité de l'id produit
        if (!id)
        return false;

        // je recherche le produit dans mon panier ( basket = localStorage )
        let itemToUpdate = basket.findIndex((product) => product.id === id && product.color === color );

        // je contrôle les données
        console.log(id, color, qty);

        // je contrôle la position du produit dans le panier   
        console.log(itemToUpdate);

        // je mets à jour la quantité dans le panier
        basket[itemToUpdate].quantity = qty;

        // je sauvegarde mon panier
        basket.push(qty);
        basket.pop();

        // je contrôle mes données
        console.log(basket);

        // je sauvegarde mon localStorage
        localStorage.setItem("products", JSON.stringify(basket));

        // je contrôle mon localStorage
        console.log(localStorage);

        // je recalcule les quantités
        calculateTotalQuantity()

        // je recalcule le total à payer
        calculateTotalPrice()
                  
         /*const itemToUpdate = basket.find((product) => product.id === id);
        itemToUpdate.quantity = Number(newValue);
        calculateTotalQuantity()
        calculateTotalPrice()*/
      } 
      
      updatePriceAndQuantity();


    // Fonction de suppression d'un produit  

    function deleteItem (id,color) {
      
      //Je contrôle mes données
      console.log(id,color);

      // Je cherche le produit dans mon panier (basket = LocalStorage)
      let itemToDelete = basket.filter((product) => (product.id !== id && product.color !== color) || (product.id === id && product.color !== color)) 

      // Je contrôle l'id du produit à supprimer
      console.log("item to delete: ", itemToDelete);

      // Je crée mon nouveau panier
      let newBasket = itemToDelete;

      // je sauvegarde mon localStorage
      localStorage.setItem("products", JSON.stringify(newBasket));

      // je contrôle mon localStorage
      console.log(localStorage);

      // Je recharge ma page
      location.reload();

      // Je contrôle mon nouveau panier
      console.log(newBasket);

      // Je recalcule les quantités
      calculateTotalQuantity();

      // Je recalcule le prix
      calculateTotalPrice();

      // J'appelle la fonction qui supprime les données du localStorage
      deleteDataFromLocalStorage();

      // J'appelle la fonction qui supprime l'article de ma page
      deleteArticleFromPage(product);

    }

        // Fonction qui supprime les données du localStorage, avec pour arguments l'id et la couleur :
        function deleteDataFromLocalStorage(id,color) {
          
          // Création d'une variable 'key' qui récupère les données
          let key = `${product.id}-${product.color}`;

          //Je contrôle ma donnée dans le localStorage
          console.log("On retire cette clé", key);

          // Je retire l'item avec la clé à supprimer du LocalStorage
          localStorage.removeItem(key)
        }


        // Fonction qui supprime l'article de ma page :
          function deleteArticleFromPage (product){
          
          // Je récupère l'article à supprimer avec son html
          let articleToDelete = document.querySelector(
            `<article class="cart__item" data-id="{product.id}" data-color="{product.color}">`
          )

          // Je supprime cet article de ma page
          articleToDelete.remove();
        }
 

    ///////////////////////////////////////////
         ///////// Formulaire /////////

    // Je sélectionne la référence de mon form
    //let form = document.querySelector("#cart__order__form");
  
      //Ecouter la modification du prénom//
      //Ecouter la modification du nom//
      //Ecouter la modification de l'adresse//
      //Ecouter la modification de la ville//

       /******Validation Email******/
      //Ecouter la modification de l'email//
      /* form.email.addEventListener('change', function () {
        validEmail(this);
      });
       
        const validEmail = function (inputEmail){
          let emailRegExp = new RegExp (
            '^[a-zA-Z0-9.-_]+[@]+{1}[a-zA-Z0-9.-_]+[.]+{1}[a-z]{2,10}$','g'
          );

          //Récupération de la balise p de message d'erreur
          let emailErrorMsg = document.getElementById('emailErrorMsg');

          //Je teste l'expression régulière
          let testEmail = emailRegExp.test(inputEmail.value);

          if(testEmail){
            emailErrorMsg.innerHTML = 'Adresse valide';
            emailErrorMsg.classList.remove('text-danger');
            emailErrorMsg.classList.add('text-success');
          }else{
            emailErrorMsg.innerHTML = 'Adresse invalide';
            emailErrorMsg.classList.remove('text-success');
            emailErrorMsg.classList.add('text-danger');
          }
        } */
