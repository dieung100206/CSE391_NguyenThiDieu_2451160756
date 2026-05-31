// =====================
// DATA
// =====================

const products = [
    { id:1,name:"iPhone 16",price:25990000,category:"phone",image:"https://placehold.co/200",rating:4.5,inStock:true },
    { id:2,name:"Samsung S24",price:22990000,category:"phone",image:"https://placehold.co/200",rating:4.4,inStock:true },
    { id:3,name:"Pixel 9",price:19990000,category:"phone",image:"https://placehold.co/200",rating:4.6,inStock:true },

    { id:4,name:"MacBook Pro",price:45990000,category:"laptop",image:"https://placehold.co/200",rating:4.8,inStock:true },
    { id:5,name:"Dell XPS 15",price:35990000,category:"laptop",image:"https://placehold.co/200",rating:4.7,inStock:true },
    { id:6,name:"ThinkPad X1",price:32990000,category:"laptop",image:"https://placehold.co/200",rating:4.5,inStock:true },

    { id:7,name:"iPad Air",price:16990000,category:"tablet",image:"https://placehold.co/200",rating:4.6,inStock:true },
    { id:8,name:"Xiaomi Pad 6",price:7990000,category:"tablet",image:"https://placehold.co/200",rating:4.2,inStock:true },
    { id:9,name:"Galaxy Tab",price:12990000,category:"tablet",image:"https://placehold.co/200",rating:4.3,inStock:true },

    { id:10,name:"AirPods Pro",price:6990000,category:"accessory",image:"https://placehold.co/200",rating:4.3,inStock:true },
    { id:11,name:"Galaxy Buds",price:3490000,category:"accessory",image:"https://placehold.co/200",rating:4.1,inStock:true },
    { id:12,name:"Magic Mouse",price:2490000,category:"accessory",image:"https://placehold.co/200",rating:4.0,inStock:true }
];

let currentProducts = [...products];
let cartCount = 0;

// =====================
// BUILD UI
// =====================

const body = document.body;

const header = document.createElement("div");
header.className = "header";

const searchInput = document.createElement("input");
searchInput.placeholder = "Tìm sản phẩm...";

const sortSelect = document.createElement("select");

sortSelect.innerHTML = `
<option value="">Sắp xếp</option>
<option value="priceAsc">Giá tăng</option>
<option value="priceDesc">Giá giảm</option>
<option value="name">Tên A-Z</option>
<option value="rating">Đánh giá cao nhất</option>
`;

const filters = document.createElement("div");
filters.className = "filters";

["all","phone","laptop","tablet","accessory"]
.forEach(category=>{
    const btn=document.createElement("button");
    btn.textContent=category;
    btn.dataset.category=category;
    filters.appendChild(btn);
});

const darkBtn=document.createElement("button");
darkBtn.textContent="🌙 Dark Mode";

header.append(searchInput,sortSelect,filters,darkBtn);

const cart=document.createElement("div");
cart.className="cart";
cart.innerHTML=`🛒 <span class="badge">0</span>`;

const productContainer=document.createElement("div");
productContainer.className="products";

body.append(header,cart,productContainer);

// =====================
// RENDER
// =====================

function renderProducts(data){
    productContainer.innerHTML="";

    data.forEach(product=>{

        const card=document.createElement("div");
        card.className="card";
        card.dataset.id=product.id;

        card.innerHTML=`
            <img src="${product.image}">
            <div class="card-body">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()}đ</p>
                <p>⭐ ${product.rating}</p>
                <button class="add-cart">
                    Thêm giỏ
                </button>
            </div>
        `;

        productContainer.appendChild(card);
    });
}

renderProducts(currentProducts);

// =====================
// SEARCH
// =====================

function searchProducts(keyword){

    currentProducts=products.filter(product=>
        product.name
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

    renderProducts(currentProducts);
}

searchInput.addEventListener(
    "input",
    e=>searchProducts(e.target.value)
);

// =====================
// FILTER
// =====================

function filterByCategory(category){

    currentProducts=
        category==="all"
        ? [...products]
        : products.filter(
            p=>p.category===category
        );

    renderProducts(currentProducts);
}

filters.addEventListener("click",e=>{

    if(e.target.tagName==="BUTTON"){
        filterByCategory(
            e.target.dataset.category
        );
    }

});

// =====================
// SORT
// =====================

function sortProducts(type){

    const sorted=[...currentProducts];

    switch(type){

        case "priceAsc":
            sorted.sort((a,b)=>a.price-b.price);
            break;

        case "priceDesc":
            sorted.sort((a,b)=>b.price-a.price);
            break;

        case "name":
            sorted.sort((a,b)=>
                a.name.localeCompare(b.name)
            );
            break;

        case "rating":
            sorted.sort((a,b)=>
                b.rating-a.rating
            );
            break;
    }

    renderProducts(sorted);
}

sortSelect.addEventListener(
    "change",
    e=>sortProducts(e.target.value)
);

// =====================
// MODAL + CART
// =====================

productContainer.addEventListener("click",e=>{

    const card=e.target.closest(".card");

    if(!card) return;

    const id=Number(card.dataset.id);

    const product=
        products.find(p=>p.id===id);

    if(e.target.classList.contains("add-cart")){

        cartCount++;

        document.querySelector(".badge")
            .textContent=cartCount;

        e.stopPropagation();
        return;
    }

    const modal=document.createElement("div");

    modal.className="modal";

    modal.innerHTML=`
        <div class="modal-content">
            <h2>${product.name}</h2>
            <p>Giá:
            ${product.price.toLocaleString()}đ</p>
            <p>Danh mục:
            ${product.category}</p>
            <p>Đánh giá:
            ${product.rating}</p>
        </div>
    `;

    modal.addEventListener("click",()=>{
        modal.remove();
    });

    document.body.appendChild(modal);

});

// =====================
// DARK MODE
// =====================

darkBtn.addEventListener("click",()=>{

    document.body
        .classList
        .toggle("dark-mode");

});