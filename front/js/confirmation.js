// Avec new URL je vais récupèrer l'URL de la page cart.js
let urlParams = new URLSearchParams(window.location.search);

// Je vais chercher l'orderId
let orderId = urlParams.get("orderId");

// J'affiche mon orderId dans la console
console.log("Le numéro de commande est: " + orderId);

// Je l'affiche sur le navigateur en allant chercher le span orderId
let spanOrderId = document.getElementById('orderId');
spanOrderId.textContent = orderId;

//Vider le localStorage
localStorage.clear()