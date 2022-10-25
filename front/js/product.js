//// Afficher le produit ////



// 1 : Récupérer de l'id dynamique de l'url

let urlParam = (new URL(location)).searchParams
let productId = urlParam.get("id")

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
                   
                    // Injecter les informations dans le HTML
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


