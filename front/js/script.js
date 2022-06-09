
// Importer de l'Api les produits dans la page d’accueil

/* 
On utilise fetch pour recupérer les donneées de l'Api,
on traite la resolve en json
on traite les données reçue sous forme de tableau dans la console
*/

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((apiProduit) => {
        console.table(apiProduit);
        cardKanap(apiProduit);
    })
/* 
Si l'Api n'est pas trouvé, le texte associé à la classe .titles se transforme en H1 d'erreur 
et la console affiche une erreur d'Api non trouvée 
*/
    .catch((erreur) => {
        document.querySelector(".titles").innerHTML = "<h1>Erreur</h1>";
        console.log("'API not found':" + erreur);
    });



    
// Fonction d'affichage des cards articles (index correspond à la première valeur du tableau)

/* 
Déclaration de la variable sur le selecteur html

Boucle pour automatisé la creation de card pour chaque article les unes après les autres

Récupération des paramètres de l'url afin de savoir quel produit de l'api afficher sur la page produit grace à l'id

Code relatif à l'ajout de contenu html
*/

function cardKanap(card) {
    let zoneCard = document.querySelector("#items");
    for (let article of card) {

      zoneCard.innerHTML += 
      `<a href="./product.html?_id=${article._id}">

        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
        </article>
      </a>`;
    }
  }

    