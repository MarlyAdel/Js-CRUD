// & Global Variables:-

var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
// console.log(productName,productPrice,productCategory,productDescription,productImage);
var productList = [];
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex;
var arrayLength = productList.length;
var regex = {
    productName : {
        value: /^^[A-Z][a-zA-Z]*$/,
        isValid:false,
    },
    productPrice : {
        value:/^.{1,}$/,
        isValid:false,
    },
    productCategory :{
        value: /(tv|Mobiles|Laptops|Screens)/i,
        isValid:false,
    },
    productDescription : {
        value:/.{1,}/,
        isValid:false,
    }
}
if( localStorage.getItem("productList") != null){
    productList = JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
}

// & Add Product:-

function addProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value,
        image:  `Images/${productImage.files[0]?.name}`, 
        id: arrayLength++,
        // id: Math.trunc(Math.random() * 10000),
    }
    productList.push(product);
    updateLocalStorage();
    displayProduct(productList);
    updateInputValue();
    addBtn.disabled = true;
}

// & Display:-

function displayProduct(list){
    var cartona = "";

    for( var i=0 ; i<list.length ; i++){

        cartona += `<div class="col-md-4">
                <div class="item text-white border border-2 border-primary rounded-3 overflow-hidden">
                    <img src="${list[i].image}" class="w-100 mb-3" alt="">
                    <div class="p-3">
                        <h2 class="h4">Name: ${list[i].name}</h2>
                        <h3 class="h5">Price: ${list[i].price}</h3>
                        <h5>Description: ${list[i].description}</h5>
                        <h3 class="h5">Category: ${list[i].category}</h3>
                        <button onclick="getDataToUpdate(${i},${list[i].id})" class="btn btn-outline-success w-100 mt-3">Update</button>
                        <button onclick="deleteProduct(${list[i].id})" class="btn btn-outline-danger w-100 mt-3">Delete</button>
                    </div>
                </div>
            </div>`
    }

    document.getElementById("myData").innerHTML = cartona;
}

// & Clear Form:-

// function clear(){
   
// }

// & Delete Product:-

function deleteProduct(id){

    for(var i=0; i<productList.length;i++){
        if(productList[i].id == id){
          productList.splice(i,1);
        }
    }
    updateLocalStorage();
    displayProduct(productList);

}

// & Update Product:-

function getDataToUpdate(index , id){
    //currentIndex = index ;
   
    for (var i = 0; i < productList.length; i++) {
    if (productList[i].id === id) {
      currentIndex = i;
    }
  }
    
          updateInputValue(productList[currentIndex]);
    
          addBtn.classList.add("d-none");
          updateBtn.classList.remove("d-none");
}


function updateProduct(){
  var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value,
        image:  `Images/${productImage.files[0]?.name}`, 
  }
  productList.splice(currentIndex, 1, product);
  
  displayProduct(productList);
  updateLocalStorage();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  updateInputValue();
}

// ^ To Make A Clean Code:-

function updateLocalStorage(){
    localStorage.setItem("productList",JSON.stringify(productList));
}

function updateInputValue(config){
    productName.value = config ? config.name : null;
    productPrice.value = config ? config.price : null;
    productCategory.value = config ? config.category : null;
    productDescription.value = config ? config.description : null;

}

// & Search:-

function search(searchkey){
    var searchItem = [];
    for(var i=0 ; i<productList.length ; i++){
        
        if(productList[i].name.toLowerCase().startsWith(searchkey.toLowerCase())){
          // productList[i].newName = productList[i].name.toLowerCase().replace(searchkey.toLowerCase(),`<span class="text-danger fw-bold">${searchkey}</span>`);
          searchItem.push(productList[i]);
        }
    }
    displayProduct(searchItem);

}

// & Validation Regular Expression (regex):-

function validateProductInput(element){
  
   if(regex[element.id].value.test(element.value) == true){
    element.nextElementSibling.classList.add("d-none");
    regex[element.id].isValid = true;
   }
   else{
    element.nextElementSibling.classList.remove("d-none");
    regex[element.id].isValid = false;
   }

   toggleAddBtn()
}

// & Disable the add btn:-

function toggleAddBtn(){

    if(regex.productName.isValid && regex.productPrice.isValid && regex.productCategory.isValid 
        && regex.productDescription.isValid){
        addBtn.disabled = false;
    }
    else{
        addBtn.disabled = true;
    }
}