
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
    })
/* 
Si l'Api n'est pas trouvé, le texte associé à la classe .titles se transforme en H1 d'erreur 
et la console affiche une erreur d'Api non trouvée 
*/
    .catch((erreur) => {
        document.querySelector(".titles").innerHTML = "<h1>Erreur</h1>";
        console.log("'API not found':" + erreur);
    });

    