
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

        
        let h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode('Erreur 404'));

        let oldTitles = document.querySelector(".titles");
        let oldH1 = oldTitles.children[0];

        
        oldTitles.replaceChild(h1, oldH1);
        let rmvH2 = oldTitles.removeChild(oldTitles.children[1]);

        console.log("'API not found':" + erreur);
    });



    
// Fonction d'affichage des cards articles (index correspond à la première valeur du tableau)

/* 
Déclaration de la variable sur le selecteur html

Boucle pour automatiser la creation de card pour chaque article les unes après les autres

Récupération des paramètres de l'url afin de savoir quel produit de l'api afficher sur la page produit grace à l'id

Code relatif à l'ajout de contenu html
*/

function cardKanap(card) {

    let zoneCard = document.querySelector("#items");
      

    console.log(zoneCard)

    for (let articles of card) {
        
        let articleLink = document.createElement ('a');
            articleLink.setAttribute('href', `./product.html?_id=${articles._id}`);

        let article = document.createElement ('article');
        
        let articleImg = document.createElement ('img');
                articleImg.setAttribute('src', `${articles.imageUrl}`);
                articleImg.setAttribute('alt', `${articles.altTxt}`);

        let articleH3 = document.createElement ('h3');
                articleH3.setAttribute('class', 'productName');
                articleH3.appendChild(document.createTextNode(`${articles.name}`));

        let articleP = document.createElement ('p');
                articleP.setAttribute('class', 'productDescription');
                articleP.appendChild(document.createTextNode(`${articles.description}`));

        zoneCard.appendChild(articleLink);
        articleLink.appendChild(article);
        article.appendChild(articleImg);
        article.appendChild(articleH3);
        article.appendChild(articleP);
      
    }
  }

