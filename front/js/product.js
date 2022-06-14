const urlParam = new URLSearchParams(document.location.search); 

const id = urlParam.get("_id");
    console.log(id); 


 // Importer de l'Api les produits dans la page
    fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((apiProduit) => {
        console.table(apiProduit);
        // ajouter fonction (apiProduit);
    })
/* 
Si l'Api n'est pas trouvé, le texte associé à la classe .titles se transforme en H1 d'erreur 
et la console affiche une erreur d'Api non trouvée 
*/
    .catch((erreur) => {

        document.querySelector(".item").innerHTML = "<h1>Erreur 404</h1>";
        
        console.log("'API not found':" + erreur);
    });





