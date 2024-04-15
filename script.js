// All Category-----
async function getAllCategory() {
    try {
        let row = "";
        let res = await fetch('https://fakestoreapi.com/products/categories');
        let data = await res.json();
        data.forEach((items) => {
            row += `<a class="dropdown-item" href="#" onclick='productCategory(this)'>${items}</a>`
        });
        document.getElementById('categories').innerHTML = row;
    }
    catch (error) {

    }
}
getAllCategory();

// get all product category 
async function productCategory(t) {
    try {
        let categoryName = t.innerText;
        let res = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        localStorage.setItem('categoryproduct', JSON.stringify(res.data));
        window.location = "category-products.html";


    } catch (error) {

    }
}
// get category products from localstorage 
function getCategoryProductsStorage() {
    try {
        let res = localStorage.getItem('categoryproduct')
        if (res != null) {
            data = JSON.parse(res);
        }
        else {
            data = [];
        }
        let row = "";
        data.forEach((items) => {
            row += `<div class='col-md-4'>
             <div class="card">
                 <img class="card-img-top" src=${items.image} alt="Card image">
                 <div class="card-body">
                 <h4 class="card-title">${items.category}</h4>
                 <p class="card-text">Price : ${items.price}</p>
                 <button class="btn btn-primary" onclick='single_product( ${items.id})'>View</button>
                 <a href="#" class="btn btn-primary">Add to Cart</a>
                 </div>
             </div>
        </div>`
        })
        document.getElementById('catrgoryproducts').innerHTML = row;
    } catch (error) {

    }
}
getCategoryProductsStorage()
// Get product...........................
async function homePageProducts() {
    try {
        let row = "";
        let res = await fetch('https://fakestoreapi.com/products?');
        let data = await res.json();
        data.slice(0, 9).forEach((items) => {
            row += `<div class='col-md-4 mt-3 ' > 
                <div class="card ">
                    <img class="card-img-top " src=${items.image} alt="Card image">
                    <div class="card-body">
                    <h4 class="card-title">${items.category}</h4>
                    <p class="card-text">Price : ${items.price}</p>
                    <button class="btn btn-primary" onclick ="single_product( ${items.id})" >View</button>
                    <button class="btn btn-primary" onclick='addtocart(${items.id})'>Add to Cart</button>
                    </div>
                </div>
           </div>`
        })
        document.getElementById('result').innerHTML = row;
    }
    catch (error) {

    }
}
homePageProducts()
// products
async function products() {
    try {
        let row = "";
        let res = await fetch('https://fakestoreapi.com/products?');
        let data = await res.json();
        data.forEach((items) => {
            row += `<div class='col-md-4 mt-3' > 
                <div class="card ">
                    <img class="card-img-top " src=${items.image} alt="Card image">
                    <div class="card-body">
                    <h4 class="card-title">${items.category}</h4>
                    <p class="card-text">Price : ${items.price}</p>
                    <button class="btn btn-primary" onclick ="single_product( ${items.id})" >View</button>
                    <a href="#" class="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
           </div>`
        })
        document.getElementById('allproducts').innerHTML = row;
    } catch (error) {

    }
}
products()

// single product 
async function single_product(pid) {
    let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
    localStorage.setItem('singleproductdata', JSON.stringify(res.data));
    window.location = 'single-product.html';
}
//get single product data from localstorage 
function getSingleProduct() {
    try {
        let data = localStorage.getItem('singleproductdata');
        if (data != null) {
            details = JSON.parse(data);
        }
        document.getElementById('productimage').src = details.image;
        document.getElementById('title').innerText = details.title;
        document.getElementById('category-name').innerText = details.category;
        document.getElementById('desc').innerText = details.description;
        document.getElementById('price').innerText = "Price : " + details.price;
        document.getElementById('singlecartbtn').innerHTML =`<button class="btn btn-dark" onclick='addtocart(${details.id})'>Add To Cart</button>`
    } catch (error) {

    }
}
getSingleProduct();

// add to cart
// async function addtocart(pid){
//     try {
//        let res = await axios(`https://fakestoreapi.com/products/${pid}`);
//        let data = localStorage.setItem('cartdata');
//        if(data != null){
//         CatArray = JSON.parse(data);
//        }
//        else{
//         CatArray =[];
//        }
//        CatArray.push(res.data);
//        localStorage.setItem('cartdata',JSON.stringify( CatArray))
//        showCart()
//     } catch (error) {

//     }
// }
// // show cart
// function showCart(){
//     let data = localStorage.getItem('cartdata');
//     if(data != null){
//         carts = JSON.parse(data);
//     }
//     let row =""; 
//     carts.forEach((items)=>{
//         row +=`<tr>
//         <td>${items.image} style='width: 80px !important; height: 50px'/></td>
//         <td>${items.title}</td>
//         <td>${items.price}</td>
//         </tr>`
//     })
//     document.getElementById('cartitems').innerHTML = row;
//         document.getElementById('count').innerText = carts.length
// }
// showCart()
async function addtocart(pid) {
    try {
        let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
        let data = localStorage.getItem('cartnew');
        if (data != null) {
            cartArray = JSON.parse(data);
        }
        else {
            cartArray = [];
        }
        // check items already exist into the cart 
        let resultArray = cartArray.filter((items)=>{
            return items.id == pid
        });
        if( resultArray.length > 0){
            alert("Item already exists into the cart")
        }
        else{
        cartArray.push(res.data);
        localStorage.setItem('cartnew', JSON.stringify(cartArray));
        showCart()
        alert("items added into the cart")
        }
    } catch (error) {
    }
}
function showCart() {
    try {


        let data = localStorage.getItem('cartnew');
        if (data != null) {
            carts = JSON.parse(data);
        }
        let row = "";
        carts.forEach((items) => {
            row += `<tr>
            <td><img src=${items.image} style='width: 80px !important; height: 50px'/></td>
            <td>${items.title}</td>
            <td>${items.price}</td>
            <td><button onclick='removeItems(${items.id})'  class=" btn btn-danger btn-sm">Remove</button></td>
        </tr>`
        });
        // let element = document.querySelectorAll("count");
        // element[0].innerText =carts.length;
        let elements = document.querySelectorAll(".count");
        elements[0].innerText = carts.length;
        document.getElementById('cartitems').innerHTML = row;
        // document.getElementById('count').innerText = carts.length;
    }
    catch (error) {

    }
}
showCart();
// remove items
function removeItems(pid) {
    let data = localStorage.getItem("cartnew");
    if (data != null) {
        carts = JSON.parse(data);
    }
    let newData = carts.filter((items, index) => {
        return items.id != pid;
    })
    localStorage.setItem('cartnew', JSON.stringify(newData));
    total();
    showCart();
}
//  total price 
function total(){
    try {
        
    
 let data =localStorage.getItem('cartnew');
    if(data !=null){
        carts = JSON.parse(data);
    }
let totaldata=  carts.reduce((current_value, next_value)=>{
        return current_value + next_value.price;
    },0)
    document.getElementById('total_amount').innerHTML = totaldata;
}
catch (error) {
        
}
}
total()
