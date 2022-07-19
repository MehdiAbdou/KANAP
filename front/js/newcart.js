//declaration tableau pour prix total
totalOrder = [];

//Fonction affichage Items et prix total 

function displayItem(apiProduit, color, quantity) {

    // Création de l'élément "article" contenant le data-id
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', apiProduit._id);
    productArticle.setAttribute('data-color', color);

    // Création div
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = apiProduit.imageUrl;
    productImg.alt = apiProduit.altTxt;

    // Création div 
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Création d'un élément enfant "div" pour nom/couleur/prix
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";

    // Affichage du nom du produit
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = apiProduit.name;

    // Affichage du choix de la couleur du produit
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = color;
    productColor.style.fontSize = "18px";

    // Affichage du prix du produit
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    let price = apiProduit.price * quantity;
    productPrice.innerHTML = price + " €";
    console.log(price);
    
    // Création élément enfant pour quantité/suppression
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Création élément enfant pour la quantité
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    // Affichage de la quantité choisie
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Création des options pour le choix de la quantité affichée
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Création d'une "div" pour la possibilité de suppression
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Céation de l'élément de suppression d'un produit
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";

    //Calcul prix total
    totalOrder.push(price);
    let sumOrder = 0;
    for (let i = 0; i < totalOrder.length; i++) {
      sumOrder += totalOrder[i];
    }
    totalPrice.innerHTML = sumOrder.toString();

    return productArticle;
};

//----------------- Récupération du panier -----------------------//

// Déclaration des items contenus dans le local storage
let getCart = JSON.parse(localStorage.getItem("cart"));
console.log(getCart);

// Sélection de la classe où injecter les éléments
const positionItems = document.querySelector("#cart__items");


// Si le panier est vide : afficher le panier vide
if (getCart === null || getCart == 0) {
  const emptyCart = document.querySelector("#cart__items");
  emptyCart.innerText = "Votre panier est actuellement vide.";
  console.log(emptyCart);
  // Cacher le formulaire de saisie infos utilisateur
  document.querySelector(".cart__order").style.display = "none";

  // Si le panier n'est pas vide, affichage des items
} else {
  for (i = 0; i < getCart.length; i++) {
    let items = getCart[i];
    // Appel à API et récupération de l'élément d'index cible dans la boucle
    fetch("http://localhost:3000/api/products/" + getCart[i].productId)
      .then((res) => res.json())
      .then((apiProduit) => {
        console.log("apiProduit",apiProduit);
        console.log(items);
        positionItems.appendChild(displayItem(apiProduit, items.color, items.quantity));
       
        
        changeQuantity();
        deleteProduct();
      })
      .catch((erreur) => {

        
        let h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode('Erreur 404'));
      
        let oldTitles = document.querySelector("#cartAndFormContainer");
        let oldH1 = oldTitles.children[0];
      
        
        oldTitles.replaceChild(h1, oldH1);
        
      
        console.log("'API not found':" + erreur);
      })
  }
};


// Calcul du nombre d'articles dans le panier
let arrayQuantities = [];
if (getCart === null || getCart == 0) {
  console.log("Panier vide");
} else {
  for (let items of getCart) {
    let ItemQuantity = + items.quantity;
    arrayQuantities.push(ItemQuantity);
  }
  console.log("laaaaaaaa", arrayQuantities);
  // Méthode d'application de fonction d'accumulateur
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let totalQuantityCart = arrayQuantities.reduce(reducer);
  document.querySelector("#totalQuantity").innerHTML = totalQuantityCart;
}


// Suppression d'un article du panier

function deleteProduct() {
  // Sélection des boutons de suppression à écouter
  let deleteBtn = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();
      // Cibler l'id et couleur du produit 
      let selectProd = deleteBtn[k].closest("article");
      let selectIdItem = selectProd.dataset.id;
      console.log(selectIdItem);
      let selectColorItem = selectProd.dataset.color;
      console.log(selectColorItem);
      // Nouveau tableau contenant les éléments qui respectent la condition du filtre
      getCart = getCart.filter(el => el.productId !== selectIdItem || el.color !== selectColorItem);
      console.log(getCart);
      // Renvoi du nouveau panier dans le local storage
      localStorage.setItem("cart", JSON.stringify(getCart));

      location.reload();
    })
  }
}


// Modification de la quantité d'un article

function changeQuantity() {
  // Sélection des inputs à écouter
  let itemQuantity = document.querySelectorAll(".itemQuantity");
  // Méthode pour cibler id et couleur du produit
  itemQuantity.forEach((itemQty) => {
    let articleQty = itemQty.closest("article");
    let articleQtyId = articleQty.dataset.id;
    console.log(articleQtyId);
    let articleQtyColor = articleQty.dataset.color;
    console.log(articleQtyColor);
    // Evènement de modification pour écouter changement de quantité
    itemQty.addEventListener("change", () => {
      let newQantity = Number(itemQty.value);
      /* Fonction callback pour chaque élément du panier
      --- au change on incrémente la quantité de l'élément de ces id&&couleur */
      getCart.forEach((element) => {
        if (element.productId == articleQtyId && element.color == articleQtyColor) {
          element.quantity = newQantity;
        }
      });
      // Renvoi du nouveau panier dans le local storage
      localStorage.setItem("cart", JSON.stringify(getCart));
      window.location.reload();
    });
  });
}


//----------------- Formulaire de commande -------------------------------//

// Sélection bouton envoi du formulaire
const orderButton = document.querySelector("#order");

// Add event listener
orderButton.addEventListener("click", (e) => {
  e.preventDefault();


  /* Création d'une classe pour fabriquer l'objet 
  dans lequel iront les valeurs du formulaire à contrôler */
  class Formulaire {
    constructor() {
      this.prenom = document.querySelector("#firstName").value;
      this.nom = document.querySelector("#lastName").value;
      this.adresse = document.querySelector("#address").value;
      this.ville = document.querySelector("#city").value;
      this.email = document.querySelector("#email").value;
    }
  }
  // Appel de l'instance de classe formulaire pour créer l'objet contact
  const contact = new Formulaire();


  // Construction d'un array of strings depuis local storage
  let idProducts = [];
  for (let i = 0; i < getCart.length; i++) {
    idProducts.push(getCart[i].productId);
  }
  console.log(idProducts);


  //-------- Gestion de validation du formulaire 

  // Fonction de contrôle des saisies selon regEx

  // Masque de recherche pour prenom/nom/ville
  const regExNameCity = (value) => {
    return /^[A-Za-zÀ-ÿ ,.'-]{3,20}$/.test(value)
  }
  // Motif de recherche pour l'adresse
  const regExAddress = (value) => {
    return /^([a-zA-ZÀ-ÿ,-. ]{1,}|[0-9]{1,4})[ ].{1,}$/.test(value)
  }
  // Masque de recherche de l'email
  const regExEmail = (value) => {
    return /^[a-zA-Z0-9._-]+@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value)
  }


  //-------- Fonctions de saisie des champs du formulaire
  function firstNameCheck() {
    const lePrenom = contact.prenom;
    if (regExNameCity(lePrenom)) {
      firstNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez saisir uniquement des lettres avec/sans accent, minimum de 3";
      return false;
    };
  }

  function lastNameCheck() {
    const leNom = contact.nom;
    if (regExNameCity(leNom)) {
      lastNameErrorMsg.innerHTML = " ";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez saisir uniquement des lettres avec/sans accent, minimum de 3";
      return false;
    };
  }

  function addressCheck() {
    const leAddress = contact.adresse;
    if (regExAddress(leAddress)) {
      addressErrorMsg.innerHTML = " ";
      return true;
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner une adresse valide";
      return false;
    };
  }

  function cityCheck() {
    const laVille = contact.ville;
    if (regExNameCity(laVille)) {
      cityErrorMsg.innerHTML = " ";
      return true;
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner une ville";
      return false;
    };
  }

  function eMailCheck() {
    const leMail = contact.email;
    if (regExEmail(leMail)) {
      console.log("ok");
      emailErrorMsg.innerHTML = " ";
      return true;

    } else {
      console.log("ko");
      emailErrorMsg.innerHTML = "Adresse email non valide";
      return false;
    };
  }


  // Contrôle validité du formulaire avant envoi dans local storage
  if (firstNameCheck() && lastNameCheck() && addressCheck() && cityCheck() && eMailCheck()) {
    // Mettre l'objet dans le local storage
    //localStorage.setItem("contact", JSON.stringify(contact));
    // Mettre les valeurs du formulaire et les produits du panier dans un objet à envoyer vers le serveur
    const order = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
      },
      products: idProducts,
    }
    console.log("Envoyer", order);

    sendToServer(order);
  } else {
    return false;
  };
});


/* Fonction d'envoi de la commande avec la méthode POST
requête JSON contenant l'objet de contact et tableau de produit (order) */
function sendToServer(order) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      'Accept': "application/json",
      "Content-type": "application/json",
    },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    // Récupération de la réponse émise
    .then(function (content) {
      console.log("CONTENT", content);
      // Redirection vers la page de confirmation + id de commande en paramètre URL
      window.location = "confirmation.html?id=" + content.orderId;
    })
    .catch(function (error) {
      alert(`Erreur de ${error}`);
    });
}


