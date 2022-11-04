
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

console.log( product );

// 3. Pour chaque produit, je dois créer une ligne dans mon tableau ( qui correspond à ce qui est commenté dans cart.html )

// TODO
// Je veux créer un article, à l’intérieur de ma section déjà existante
// Je récupère l’élément « section » qui existe déjà pour y créer mes éléments actuellement commentés dans mon html

let baliseSection = document.getElementById ("cart__items") ;

// Puis je crée ma première balise la baliseArticle, avec document.createElement() //
let baliseArticle = document.createElement("article") ;
// Je lui assigne sa classe 
baliseArticle.className = "cart__item"; 
// « data-id » ? (comment puis-je récupérer cette information ?)
// « data-color » ? (comment puis-je récupérer cette information ?)

// J’insère le nouvel enfant créé (donc baliseArticle appelée cart_item) dans mon élément parent (la section cart__items), grâce à la proprièté appendChild (ajout d’un enfant)
baliseSection.appendChild(baliseArticle);

// Je dois créer une div image à l’intérieur de laquelle se trouve une image
let baliseDivImage = document.createElement("div") ;
baliseDivImage.className = "cart__item__img";

//Je crée ensuite ma balise image (qui sera l’enfant de ma BaliseDivImage)
let baliseImage = document.createElement ("image") ;
baliseImage.src= `${product.imageUrl}` ;
balisemage.alt = `${product.altTxt}` ;

// J’insère l’enfant créé (baliseImage) dans ma nouvelle div (baliseDivImage) avec appendChild
baliseDivImage.appendChild(baliseImage) ;

// Puis j’insère ma div image dans ma baliseArticle parent
baliseArticle.appendChild(baliseDivImage);

// Je crée une nouvelle div appelée cart__item__content
let baliseDivContent = document.createElement ("div") ;
baliseDivContent.className = "cart__item__content" ;

// Je crée une nouvelle div appellée cart__item__content__description
let baliseDivContentDescription = document.createElement("div") ;
baliseDivContentDescription.className = "cart__item__content__description";

// Dans ma div content description je vais créer : Un H2 et 2 P :
let baliseTitleH2 = document.createElement("h2") ;
// baliseTitleH2.innerText = `${product-name}` ; (Lequel mettre ?)
// baliseTitleH2.TextContent = product.name ; (Lequel mettre ?)

// J’insère ma baliseTitleH2 à sa balise parent Div content description
baliseDivContentDescription.appendChild(baliseTitleH2)

// Il me reste à insérer les 2 P :
//Le premier P pour la couleur

let baliseP1 = document.createElement ("p") ;
// baliseP1.textContent = product.color ; (lequel mettre ?)
// baliseP1.innerText = `${product-color}`, (lequel mettre ?)

// Puis le second P pour le prix

let baliseP2 = document.createElement ("p") ;
// baliseP2.textContent = product.price  ; (Comment rajoute t-on le € ?) (lequel mettre?)
// baliseP2.innerText = `${product-price}` ; (lequel mettre ?)

// J’insère les deux P dans ma div content description
baliseDivContentDescription.appendChild ( baliseP1) ;
baliseDivContentDescription.appendChild ( baliseP2) ;

// J’insère la div content description dans sa div parent div content avec appendChild
baliseDivContent.appendChild(baliseDivContentDescription)

// Je crée une nouvelle div appelée baliseDivContentSettings
let baliseDivContentSettings = document.createElement ("div") ;
baliseDivContentSettings.className = "cart__item__content__settings" ;

// J’insère cette div dans sa div parent qui est baliseDivContent
baliseDivContent.appendChild(baliseDivContentSettings)

// Je crée une div pour la quantité
let baliseDivContentSettingsQuantity = document.createElement ("div") ;
baliseDivContentSettingsQuantity.className = "cart__item__settings__quantity";

//J’insère cette div dans sa div parent 
baliseDivContentSettings.appendChild(baliseDivContentSettingsQuantity) ;

// Dans ma div baliseDivContentSettingsQuantity je dois insérer un P et un input 
let balisePSettings = document.createElement("p") ;
balisePSettings.textContent = "Qté : ";

// J’insère mon P dans sa div parent
baliseDivContentSettingsQuantity.appendChild(balisePSettings) ;

// Je crée mon input
let baliseInputSettings = document.createElement ("input") ;
baliseInputSettings.className = "itemQuantity";
 // (Comment ajouter les informations : type, class, min, max, value ?)

// J’insère l’input dans sa div parent
baliseDivContentSettingsQuantity.appendChild (baliseInputSettings) ;

// Je crée une nouvelle div pour la suppression
let baliseDivContentSettingsDelete = document.createElement("div") ;
baliseDivContentSettingsDelete.className = "cart__item__settings__delete" ;

// Je l’insère dans sa div parent
baliseDivContentSettings.appendChild(baliseDivContentSettingsDelete) ;

// Je dois insérer un P dans ma balise delete
let balisePDelete = document.createElement ("p") ;
balisePDelete.className = "deleteItem" ;
balisePDelete.textContent = "Supprimer";

// J’insère mon p dans sa balise parent
baliseDivContentSettingsDelete.appendChild(balisePDelete) ;

// J’insère la div content à sa div parent article
baliseArticle.appendChild(baliseDivContent);

}

  }







// Je récupère les
/*
///// Formulaire de Validation : RegExp et POST request/////

// Création du formulaire//

let form = document.querySelector('.cart__order__form');

console.log(form.firstName);

// Ecoute de la modification du prénom

form.firstName.addEventListener('change',function(){
  validFirstname(this);
})

const validFirstname = function (inputFirstname){
  let  firstNameRegExp = new RegExp(
    '^[a-zA-Z-]+[a-zA-Z]{2,20}$', 'g'
    )
}; */

