//Récupération données backend
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((apiProduit) => {
        cartKanap(apiProduit);
        console.log(apiProduit)
    })
 

//Récupération du localStorage
let getCart = JSON.parse(localStorage.getItem("cart"));

console.log(getCart)

//Pointeur html 
let zonePanier = document.querySelector("#cart__items");

 

function cartKanap(index){
    //Si le panier est vide, alors on affiche Panier vide
    if(getCart == null){
let emptyCart = `
<div class="cartAndFormContainer">
<h1> est vide <h1>
<div>
`
zonePanier.innerHTML = emptyCart
    }else{
        //Sinon on cherche une correspondance clef/valeur de l'api et du panier et on crée les valeurs à afficher
          for (let choix of getCart) {
            for (let j = 0, k = index.length; j < k; j++) {
                if (choix.productId === index[j]._id) {
                    choix.name = index[j].name;
                    choix.prix = index[j].price;
                    choix.image = index[j].imageUrl;
                    choix.description = index[j].description;
                    choix.alt = index[j].altTxt;
                }
            }
          }
          //On passe getCart à la fonction d'affichage
          affiche(getCart);
    }
}

function affiche(indexé) {
    /// A MODIFIER !!!! 
    // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
    zonePanier.innerHTML += indexé.map((choix) => 
    `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.couleur}" data-quantité="${choix.quantité}"> 
      <div class="cart__item__img">
        <img src="${choix.image}" alt="${choix.alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${choix.name}</h2>
          <span>couleur : ${choix.couleur}</span>
          <p data-prix="${choix.prix}">${choix.prix} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantité}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.couleur}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
      ).join("");
    
  }



  