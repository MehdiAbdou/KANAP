


//Récupération données backend
fetch("http://localhost:3000/api/products") 
    .then((res) => res.json())
    .then((apiProduit) => {
        cartKanap(apiProduit);

    })
 
    .catch((erreur) => {

        
      let h1 = document.createElement('h1');
      h1.appendChild(document.createTextNode('Erreur 404'));
    
      let oldTitles = document.querySelector("#cartAndFormContainer");
      let oldH1 = oldTitles.children[0];
    
      
      oldTitles.replaceChild(h1, oldH1);
      
    
      console.log("'API not found':" + erreur);
    });
    

function cartKanap(index){
    //Si le panier est vide, alors on affiche Panier vide
    let getCart = JSON.parse(localStorage.getItem("cart"));
    console.log("cart" , getCart);
      console.log("index", index);
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
            produit = index.find(param => choix.productId == param._id);
            
            console.log("choix", choix._id);
            console.log("prduit", produit);
            if(produit != undefined) {
                choix.name = produit.name;
                choix.prix = produit.price;
                choix.image = produit.imageUrl;
                choix.description = produit.description;
                choix.alt = produit.altTxt;
                

                //On passe getCart à la fonction d'affichage
              affiche(choix);
            }
            
          } 
    }
}

function affiche(choix) {
      //Pointeur html 
    let zonePanier = document.querySelector("#cart__items");
    /// Déclaration variable a injecter dans le inner.html
    console.log("affiche", choix);
  
   let displayPanier = 
    `
    <article class="cart__item" data-id="${choix._id}" data-couleur="${choix.color}" data-quantité="${choix.quantity}"> 
    <div class="cart__item__img">
      <img src="${choix.image}" alt="${choix.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${choix.name}</h2>
        <span>couleur : ${choix.color}</span>
        <p data-prix="${choix.prix}">${choix.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  `;
    zonePanier.innerHTML += displayPanier ;
    
  }

// Fonction de sauvegarde du panier dans le local storage
function saveCart(items) {
  localStorage.setItem("cart", JSON.stringify(items))
}



 




  