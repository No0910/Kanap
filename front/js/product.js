// Afficher le produit //



//Récupération de l'id dynamique de l'url//

let link ="http://localhost:3000/api/products/product.html?id="

let url= (new URL(link));

let id = url.searchParams.get("id");

console.log(id);

// Appel de l'API pour un seul produit//





