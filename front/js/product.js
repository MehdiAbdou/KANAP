const urlParam = new URLSearchParams(document.location.search); 

const id = urlParam.get("_id");
    console.log(id); 
 // Importer de l'Api les produits dans la page
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((apiProduit) => {
        console.table(apiProduit);
        product(apiProduit);
    })
/* 
Si l'Api n'est pas trouvé, le texte associé à la classe .titles se transforme en H1 d'erreur 
et la console affiche une erreur d'Api non trouvée 
*/
.catch((erreur) => {

    let h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('Erreur 404'));

    let oldTitles = document.querySelector(".item");
    let oldH1 = oldTitles.children[0];

    oldTitles.replaceChild(h1, oldH1);
    
    console.log("'API not found':" + erreur);
});


  let productObject = {};
        productObject._id = id;
        console.log(productObject);

    function product(produit) {
       
        let imgAlt = document.querySelector("article div.item__img");
        let title = document.querySelector("#title");
        let price = document.querySelector("#price");
        let description = document.querySelector("#description");
        
        // boucle for 
        for (let type of produit) {
          //si id strictement identique à un _id d'un produits du tableau ==> recup indice 
          if (id === type._id) {
            //ajout éléments
            let articleImg = document.createElement ('img');
                articleImg.setAttribute('src', `${type.imageUrl}`);
                articleImg.setAttribute('alt', `${type.altTxt}`);
                imgAlt.appendChild(articleImg);

            title.textContent = `${type.name}`;
            price.textContent = `${type.price}`;
            description.textContent = `${type.description}`;

            // ajout du prix au panier et à l'endroit prevu sur la page 

            productObject.price = `${type.price}`;
            
            // Nouvelle boucle à l'interieur de la boucle pour couleurs differentes
            for (let color of type.colors) {
              let optionColor = document.createElement("option");
              document.getElementById("colors").appendChild(optionColor);
              optionColor.textContent = color;
              optionColor.value = color;
            }
          }
        }
        console.log("Display done");
      }
 

   
let addToCart = document.getElementById("addToCart");

// Fonction de récupération d'un article déclaré dans le local storage
function getCart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
        items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
}

// Choix quantité 
function quantityValue() {
    let quantity = document.getElementById("quantity");
    return quantity.value;
}

// Choix couleur 
function colorValue() {
    let color = document.getElementById("colors");
    return color.value;
}
    

//Fenêtre de confirmation des options sélectionnées
const confirmationWindow = () => {
    if (window.confirm(`Votre article de couleur ${colorValue()} a été ajouté au nombre de ${quantityValue()} à votre panier. \n Consultez le panier OK, revenir à l'accueil Annuler`)) {
        window.location.href = "cart.html";
    } else {
        window.location.href = "index.html";
    }
}


function itemInCart(productId, color, quantity) {
    //if (quantity == 0 || color == 0) {
    if ((color == 0) || ((quantity == null) || (quantity < 1) || (quantity > 100))) {
        window.alert("Choisissez une couleur et une quantité.");
        return;
    }
    let items = getCart();
    if (items.length == 0) {
        items.push({ "productId": productId, "color": color, "quantity": quantity });
        confirmationWindow();

    } else {
        let found = false;
        for (let i = 0; i < items.length; i++) {
            /* Si item avec le même id/couleur déjà présent dans le local storage
        on modifie la quantité */
            if (productId === items[i].productId && color === items[i].color) {
                found = true;
                items[i].quantity += quantity;
                confirmationWindow();
            }
        }
        if (found == false) {
            let item = {
                "productId": productId, "color": color, "quantity": quantity
            };
            // Méthode d'ajout dans le tableau de l'objet avec les options choisies
            items.push(item);
            confirmationWindow();
        }
    }
    // Transfo format JSON + envoie vers la key du local storage
    localStorage.setItem("cart", JSON.stringify(items));
}


// Ecoute du btn ==> envoie dans le panier des options choisies
addToCart.addEventListener("click", () => {
    let quantity = parseInt(quantityValue());  //Convertit la chaîne de caractères et renvoit un entier
    let color = colorValue();
    itemInCart(id, color, quantity);
});
        

