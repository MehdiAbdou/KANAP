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
 //Fonction bouton 



