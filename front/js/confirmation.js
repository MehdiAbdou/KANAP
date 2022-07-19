// retrieval of the orderId
const commande = new URLSearchParams(window.location.search);
const id = commande.get("id");

// function for getting the orderId
function orderConfirmation() {
  const numberOfOrder = document.getElementById("orderId");

  let orderIdHTML = `<span id="orderId">${id}</span>
                      <p> Merci pour votre commande à bientôt !</p>`;

  numberOfOrder.insertAdjacentHTML(`afterbegin`, orderIdHTML);
}

// call the function
orderConfirmation();

