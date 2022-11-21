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

      // Je contrôle mon nouveau panier
      console.log(newBasket);

      // Je recalcule les quantités
      calculateTotalQuantity();

      // Je recalcule le prix
      calculateTotalPrice();

      // J'appelle la fonction qui supprime les données du localStorage
      deleteDataFromLocalStorage();

      // rechargement de la page
      window.location.reload();

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


      



    /**************///////////////////////////////////////////**************/
                        ///////// Formulaire /////////


// Je récupère mon bouton "commander"
  const orderButton = document.querySelector("#order");

// Au clic, i faut que soit appeler la fonction submitForm() (Soumettre le formulaire) :
  orderButton.addEventListener('click', (event) => submitForm(event));

// Fonction pour soumettre le formulaire :
 function submitForm(event) {
      //Je ne veux pas que la page se recharge
      event.preventDefault();
      // Je vérifie si le panier est vide ou non
      if(basket.length === 0){
        alert('Veuillez sélectionner un article à acheter')
        return
      }

      // Si mon formulaire est invalide, stopper la fonction submitForm
      if(isFormInvalid()) return
      //
      if(!checkFirstName()) return
      //
      if(!checkLastName()) return
      //
      if(!checkAddress()) return
      //
      if(!checkCity()) return
      // Si la saisie email est invalide, stopper la fonction submitForm
      if(!checkEmail()) return
      //


      //J'envoie une alerte une fois le clic effectué
      //alert('Formulaire envoyé !');

      //Je crée ma variable pour faire la demande pour envoyer le body 
      let body = makeRequestBody();
   
      //Je fais ma requête POST à l'API, avec la méthode fetch
        fetch("http://localhost:3000/api/products/order",{

          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then((res) => res.json())
            .then((data) => {
              window.location.href = "confirmation.html" + "?orderId=" + data.orderId ;
              console.log(data);
              })
            .catch((err)=> console.log ("Il y a une erreur : " + err))

 }  

  // Fonction si le formulaire est INvalide

  function isFormInvalid(){
    //
    let nbError = 0 ;
    // Je récupère la balise form
    const form = document.querySelector('.cart__order__form');
    // Je récupère tous les inputs du formulaire
    const inputs = form.querySelectorAll("input");
    // Pour chaque , si la valeur de l'input est nulle, alors alert et retourner true
    inputs.forEach((input) => {
      if(input.value === ""){
        nbError++
      }
     
    });
    if (nbError > 0) {
      return true
    } else {
      return false
    }
 }

  // Fonction qui fait une requête au body

  function makeRequestBody() {

    // Je récupère la balise form
    const form = document.querySelector('.cart__order__form');

    //Création de l'objet
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    // Je rassemble les données à transmettre à l'API
    const body = {
      contact : {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
      },
      products : getIdsFromLocalStorage()
    }
    console.log(body);
    return body
}



// Fonction qui récupère les id du localStorage

  function getIdsFromLocalStorage() {

    // Variable avec le nombre de produits = taille du localStorage
    let nbProducts = basket.length;
    // Variable pour les ids qui sera un tableau vide
    let ids = []
    //Je fais une boucle qui va récupérer les clés du localStorage
        for (let i = 0; i < nbProducts; i++){
          // Variable qui cherche les clés du LS
          let product = basket[i]; 
          //Je contrôle mes données
          console.log(product)
          // Variable qui affiche l'id du produit stocké dans le LS : Je transforme mon string en array avec la méthode split, seule la première valeur nous intéresse donc paramètre 0
          let id = product.id
          //J'ajoute mon id aux autres ids
          ids.push(id)
        }
    return ids
  }


//////////////Vérification de la validité des champs du formulaire//////////////////

 // Je récupère les "p" pour afficher les messages d'erreur
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
let addressErrorMsg = document.querySelector("#addressErrorMsg");
let cityErrorMsg = document.querySelector("#cityErrorMsg");
let emailErrorMsg = document.querySelector("#emailErrorMsg");


// Fonction qui vérifie la validité du prénom (FirstName)

  function checkFirstName() {

    let firstName = document.getElementById("firstName").value;
    //Je crée une regex
    let regexName = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
    //J'affiche la saisie
    console.log(firstName)
    //Conditions pour la regex
    if (!regexName.test(firstName)) {
      firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";
      firstNameErrorMsg.style.color = "red";
      return false;  
    } else {
      firstNameErrorMsg.textContent = "Saisie validée";
      firstNameErrorMsg.style.color = "green";
      return true;
    }
  }



// Fonction qui vérifie la validité du nom (lastName)

  function checkLastName() {

    let lastName = document.getElementById("lastName").value;
    //Je crée une regex
    let regexName = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
    //J'affiche la saisie
    console.log(lastName)
    //Conditions pour la regex
    if (!regexName.test(lastName)) {
      lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";
      lastNameErrorMsg.style.color = "red";
      return false;
    } else {
      lastNameErrorMsg.textContent = "Saisie validée";
      lastNameErrorMsg.style.color = "green";
      return true;
    }
  }


// Fonction qui vérifie la validité de l'adresse saisie (address)

function checkAddress() {

  let address = document.getElementById("address").value;
  //Je crée une regex
  let regexAdress = /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/ ;
  //J'affiche la saisie
  console.log(address)
  //Conditions pour la regex
  if (!regexAdress.test(address)) {
    addressErrorMsg.textContent = "Veuillez renseigner une adresse d'au minimum 50 caractères et débutant par des chiffres !";
    addressErrorMsg.style.color = "red";
    return false;
  } else {
    addressErrorMsg.textContent = "Saisie validée";
    addressErrorMsg.style.color = "green";
    return true;
  }
}


// Fonction qui vérifie la validité de l'adresse saisie (address)

function checkCity() {

  let city = document.getElementById("city").value;
  //J'affiche la saisie
  console.log(city)
  //Je crée une regex
  let regexCity= new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
  //Conditions pour la regex
  if (!regexCity.test(city)) {
    cityErrorMsg.textContent = "Veuillez renseigner un nom de ville valide !";
    cityErrorMsg.style.color = "red";
    return false;
  } else {
    cityErrorMsg.textContent = "Saisie validée";
    cityErrorMsg.style.color = "green";
    return true;
  }
}


// Fonction la validité de l'email saisi

  function checkEmail(){

    let email = document.getElementById("email").value;
    //console.log(email)
    console.log(email)
    //Je crée une regex
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //Condition de la regex : Si mon email ne remplit pas les conditions (=false), alors il est invalide, donc retourner true
    if (!regexEmail.test(email)){
      emailErrorMsg.textContent = " Veuillez saisir un email valide. Il doit contenir un @ et un point suivi d'au maximum 3 lettres"
      emailErrorMsg.style.color = "red";
      return false
    } else {
      emailErrorMsg.textContent = "Saisie Validée";
      emailErrorMsg.style.color = "green";
      return true
    }
}



    /**************///////////////////////////////////////////**************/
                        ///////// Fin du formulaire /////////

// Je nettoie le localStorage une fois la commande validée
localStorage.clear();


//fin//