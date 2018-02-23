function buildJSONStore(arrShoppingCart) {
    let sJSON;
    let i;
    let arrLength = arrShoppingCart.length;

    sJSON = "[";
    for (i in arrShoppingCart){
        sJSON += JSON.stringify(arrShoppingCart[i]);
        if (i < arrLength-1)
            sJSON += ",";
    }
    sJSON += "]";
    return sJSON;
}
function buildArrayOfObjects(sJSON) {
    let arrNew = [];
    let objJSON = JSON.parse(sJSON); //convert from JSON string to JSON object
    let i;

    for (i in objJSON)
        arrNew.push(objJSON[i]); // add an object into an array

    return arrNew;
}
function storeShoppingCart(arrShoppingCart) {
    if (typeof(Storage) !== "undefined") {
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");

        let jsonShoppingCart = buildJSONStore(arrShoppingCart);
        sessionStorage.setItem("wsShoppingCart",jsonShoppingCart);
    } else {
        // Sorry! No Web Storage support..
    }
}
function findIndexAnObjectInArray(objArray,objPropertyName,objPropertyValue) {
    if (Array.isArray(objArray))
        return objArray.findIndex(objIndex => objIndex[objPropertyName] === objPropertyValue);
    else
        return -1;
}
function addToShoppingCart(objProduct) {
    let arrShoppingCart = retrieveShoppingCart();
    let arrShoppingCartLength = arrShoppingCart.length;
    let i = findIndexAnObjectInArray(arrShoppingCart,'productId',objProduct.productId);

    if (arrShoppingCartLength > 0 && i > -1)
        arrShoppingCart[i].productQuantity++;
    else{
        objProduct.productQuantity = 1; //Assign new property to objProduct
        arrShoppingCart.push(objProduct);
    }

    storeShoppingCart(arrShoppingCart);
    alert(objProduct.productName + " added to cart!");
    showShoppingCartStatus(); //Update icon shopping cart on products.html page
}
function retrieveShoppingCart() {
    let arrShoppingCart = [];
    if (typeof(Storage) !== "undefined" && sessionStorage.getItem("wsShoppingCart")) {
        let sJSONShoppingCart = sessionStorage.getItem("wsShoppingCart");
        arrShoppingCart = buildArrayOfObjects(sJSONShoppingCart);
    }

    return arrShoppingCart;
}
function clearShoppingCart() {
    if (sessionStorage){
        if (sessionStorage.getItem("wsShoppingCart"))
            sessionStorage.removeItem("wsShoppingCart");
    }else
        document.body.innerHTML = "Sorry, your browser does not support Session Storage...";
}
function showShoppingCart(objProduct) {
    let spItem = document.createElement("tr");
    spItem.setAttribute("class","cartItem");
    spItem.innerHTML = `<td>${objProduct.productName}</td>
                        <td class="cartItemNumber"><input type="number" value="${objProduct.productQuantity}"></td>
                        <td class="cartItemNumber">${objProduct.productPrice}</td>
                        <td><img class="cartItemRemove" src="../images/remove-from-cart.png" alt="Remove from cart"></td>`;

    let parentElement = document.getElementById("tbShoppingCart");
    parentElement.appendChild(spItem);
}
function viewShoppingCart() {
    let arrShoppingCart = retrieveShoppingCart();
    let j;

    for (j in arrShoppingCart)
        showShoppingCart(arrShoppingCart[j]);
}