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

        let h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode('Erreur 404'));

        let oldTitles = document.querySelector(".item");
        let oldH1 = oldTitles.children[0];

        
        oldTitles.replaceChild(h1, oldH1);
        let rmvH2 = oldTitles.removeChild(oldTitles.children[1]);

        console.log("'API not found':" + erreur);
    });





