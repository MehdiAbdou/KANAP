
// Importer de l'Api les produits dans la page d’accueil

/* 
On utilise fetch pour recupérer les donneées de l'api,
on traite la resolve en json
on traite les données reçue sous forme de tableau dans la console
*/

fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((apiProduit) => {
        console.table(apiProduit);
        
    })



    