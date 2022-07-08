// variables
const sidebar = document.querySelector(".sidebar");
const openSidebar = document.querySelector(".open-sidebar");
const closeSidebar = document.querySelector(".close-sidebar");
const cart = document.querySelector(".cart");
const openCart = document.querySelector(".open-cart");
const cartbox = document.querySelector(".cartbox");
const infobox = document.querySelector(".infobox");
const cartitems = document.querySelector(".cartitems");
const lightbox = document.querySelector(".lightbox");
const productInfo = document.querySelector(".product-info");
const modal = document.querySelector(".modal-container > .lightbox");
const cartNotification = document.querySelector(".notification");
const emptycart = document.querySelector(".emptycart");
const checkout = document.querySelector(".checkout");
let Cart = [];

// general functionalities
window.addEventListener("DOMContentLoaded", init);
openSidebar.addEventListener("click", () => {
    sidebar.style.transform = "translateX(0)";
    setTimeout(() => document.body.classList.add("modal"), 500)
});
closeSidebar.addEventListener("click", () => {
    sidebar.style.transform = "translateX(-100%)";
    setTimeout(() => document.body.classList.remove("modal"), 500)
});
openCart.addEventListener("click", () => {
    const cartHeight = cart.getBoundingClientRect().height;
    const infoboxHeight = infobox.getBoundingClientRect().height;
    if (infoboxHeight == 0) {
        infobox.style.height = `${cartHeight}px`;
    } else {
        infobox.style.height = 0;
    };
});

// Get Product Pages
class ProductPages {
    async getProductPages() {
        const res = await fetch("scripts/product.json");
        const data = await res.json();
        let productpages = data.productPages[0];
        return productpages;
    }
}

// create page UI and functionality
class UI {
    displayLightBox(product) {
        lightbox.innerHTML = `
        <figure class="w-full h-[350px] relative mx-auto xl:w-9/12 xl:h-[450px]">
            <img src=${product.images[0]} alt=${product.title} class="lightboxImg w-full h-full object-cover lg:rounded-lg" data-imgs=${JSON.stringify(product.images)}>
            <button class="prev-img absolute top-[47%] left-4 w-10 h-10 text-2xl bg-white px-2 py-1 rounded-full lg:hidden"><i class="fa-solid fa-angle-left"></i></button>
            <button class="next-img absolute top-[47%] right-4 w-10 h-10 text-2xl bg-white px-2 py-1 rounded-full lg:hidden"><i class="fa-solid fa-angle-right"></i></button>
        </figure>
        <div class="hidden lg:grid grid-cols-4 gap-4 mt-4 mx-auto xl:w-9/12">
            <button class="thumbnail group relative rounded-md outline outline-2 outline-transparent selected">
                <img src=${product.thumbnails[0]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[0]}>
                <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
            </button>
            <button class="thumbnail group relative rounded-md outline outline-2 outline-transparent ">
                <img src=${product.thumbnails[1]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[1]}>
                <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
            </button>
            <button class="thumbnail group relative rounded-md outline outline-2 outline-transparent ">
                <img src=${product.thumbnails[2]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[2]}>
                <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
            </button>
            <button class="thumbnail group relative rounded-md outline outline-2 outline-transparent ">
                <img src=${product.thumbnails[3]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[3]}>
                <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
            </button>
        </div>`;
    };
    displayProductInfo(product) {
        const discountedPrice = parseFloat(product.price * (1 - product.discount / 100));
        const price = parseFloat(product.price);
        productInfo.innerHTML = `
            <h3 class="text-orange text-sm font-bold uppercase tracking-wider">${product.maker}</h3>
            <h1 class="text-veryDarkBlue text-4xl font-bold capitalize">${product.title}</h1>
            <p class="text-base text-darkGrayishBlue">${product.desc}</p>
            <div class="flex items-center justify-between pt-3 lg:flex-col lg:space-y-4 lg:items-start">
                <div class="flex items-center space-x-4">
                    <span class="text-veryDarkBlue text-4xl font-bold">$${discountedPrice.toFixed(2)}</span>
                    <span class="bg-paleOrange text-orange text-lg font-bold px-2 py-1 rounded-md">${product.discount}%</span>
                </div>
                <span class="text-grayishBlue text-lg font-bold line-through">$${price.toFixed(2)}</span>
            </div>
            <div class="intoCart flex flex-col space-y-4 pt-3 lg:flex-row lg:space-y-0 lg:space-x-4">
                <div class="flex items-center justify-between w-full px-6 py-4 bg-lightGrayishBlue rounded-lg lg:w-1/3 lg:px-3 lg:py-3">
                    <button class="subamount text-xl text-orange hover:opacity-70"><i class="fa-solid fa-minus"></i></button>
                    <span class="amount text-veryDarkBlue text-lg font-bold">1</span>
                    <button class="addamount text-xl text-orange hover:opacity-70"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="add-to-cart bg-orange text-center text-base text-white font-bold w-full px-6 py-4 rounded-lg shadow-xl shadow-orange/40 hover:opacity-70 lg:w-2/3 lg:py-3" data-id=${product.id}><i class="fa-solid fa-cart-shopping pr-4"></i>Add to cart</button>
            </div>`;
    };
    createModal(product) {
        modal.innerHTML = `
            <button class="close-modal text-xl text-orange text-right pb-6 w-full"><i class="fa-solid fa-xmark"></i></button>
            <figure class="w-full h-[350px] relative">
                <img src=${product.images[0]} alt=${product.title} class="lightboxImg w-full h-full object-cover lg:rounded-lg" data-imgs=${JSON.stringify(product.images)}>
                <button class="prev-img absolute top-[47%] -left-5 w-10 h-10 text-2xl bg-white px-2 py-1 rounded-full"><i class="fa-solid fa-angle-left"></i></button>
                <button class="next-img absolute top-[47%] -right-5 w-10 h-10 text-2xl bg-white px-2 py-1 rounded-full"><i class="fa-solid fa-angle-right"></i></button>
            </figure>
            <div class="hidden lg:grid grid-cols-4 gap-4 mt-4">
                <button class="group thumbnail relative rounded-md outline-2 outline outline-transparent selected">
                    <img src=${product.thumbnails[0]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[0]}>
                    <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
                </button>
                <button class="group relative thumbnail rounded-md outline-2 outline outline-transparent">
                    <img src=${product.thumbnails[1]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[1]}>
                    <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
                </button>
                <button class="group relative thumbnail rounded-md outline-2 outline outline-transparent">
                    <img src=${product.thumbnails[2]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[2]}>
                    <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
                </button>
                <button class="group relative thumbnail rounded-md outline-2 outline outline-transparent">
                    <img src=${product.thumbnails[3]} alt=${product.title} class="w-full h-full object-cover rounded-md" data-img=${product.images[3]}>
                    <span class="invisible absolute top-0 left-0 w-full h-full bg-paleOrange/50 rounded-md group-hover:visible"></span>
                </button>
            </div>`;
    };
    addCartItems() {
        Cart.forEach(item => {
            const discountedPrice = parseFloat(item.price * (1 - item.discount / 100).toFixed(2));
            cartitems.innerHTML = `
                <li class="cartitem flex space-x-3 items-center">
                    <img src=${item.thumbnails[0]} alt=${item.title} class="w-12 h-12 object-cover rounded-md">
                    <div class="flex-1 flex flex-col sm:w-48">
                        <h2 class="text-base text-grayishBlue capitalize truncate">${item.title}</h2>
                        <h4 class="text-base text-grayishBlue">$${parseFloat(discountedPrice.toFixed(2))} x ${item.amount} <span class="text-veryDarkBlue font-bold pl-2">$${parseFloat((discountedPrice * item.amount).toFixed(2))}</span></h4>
                    </div>
                    <button class="text-grayishBlue text-xl"><i class="delete fa-solid fa-trash-can h-full w-full" data-id=${item.id}></i></button>
                </li>`;
        })
    }
    setCartInfo(cart) {
        let itemsTotal = 0;
        cart.forEach(item => {
            itemsTotal += item.amount;
        });
        if (itemsTotal <= 0) {
            cartNotification.style.display = "none";
            emptycart.style.display = "block";
            checkout.style.display = "none";
        } else {
            emptycart.style.display = "none";
            checkout.style.display = "block";
            cartNotification.style.display = "block";
            cartNotification.innerText = itemsTotal;
        }
    }
    setUp() {
        Cart = Storage.getCart();
        this.setCartInfo(Cart);
        this.addCartItems();
    }
    addToCart() {
        const intocart = document.querySelector(".intoCart");
        intocart.addEventListener("click", e => {
            const amount = document.querySelector(".amount");
            let itemAmount = amount.innerText;
            if (e.target.closest(".add-to-cart")) {
                let id = e.target.dataset.id;
                const incart = Cart.find(item => item.id == id);
                if (!incart) {
                    let product = { ...Storage.findProduct(), "amount": 0 };
                    product.amount += parseInt(itemAmount);
                    Cart.push(product);
                } else {
                    let item = Cart.find(item => item.id == id);
                    item.amount += parseInt(itemAmount);
                };
                Storage.saveCart(Cart);
                this.setCartInfo(Cart);
                this.addCartItems();
                amount.innerText = 1;
            } else if (e.target.closest(".addamount")) {
                itemAmount++;
                amount.innerText = itemAmount;
            } else if (e.target.closest(".subamount")) {
                if (itemAmount > 1) {
                    itemAmount--;
                    amount.innerText = itemAmount;
                }
            }
        });
    }
    cartLogic() {
        cartbox.addEventListener("click", e => {
            if (e.target.closest(".delete")) {
                let id = parseInt(e.target.dataset.id);
                this.removeItem(id);
                let div = e.target.parentElement.parentElement.parentElement;
                div.removeChild(e.target.parentElement.parentElement);
            } else if (e.target.closest(".checkout")) {
                this.clearCart();
            }
        });
    }
    removeItem(id) {
        Cart = Cart.filter(item => item.id !== id);
        this.setCartInfo(Cart);
        Storage.saveCart(Cart);
    }
    clearCart() {
        let itemsId = Cart.map(item => item.id);
        itemsId.forEach(id => this.removeItem(id));
        const cartitems = document.querySelectorAll(".cartitem");
        cartitems.forEach(item => item.parentElement.removeChild(item));
    }
    // lightbox functionality
    lightbox() {
        const lightboxImg = document.querySelector(".lightboxImg");
        const nextImg = document.querySelectorAll(".next-img");
        const prevImg = document.querySelectorAll(".prev-img");
        const closeModal = document.querySelector(".close-modal");
        const thumbnails = document.querySelectorAll(".thumbnail");
        let count = 0;
        nextImg.forEach(btn => {
            btn.addEventListener("click", () => {
                const lightbox = btn.previousElementSibling.previousElementSibling;
                const lightboxImgs = JSON.parse(lightbox.dataset.imgs);
                if (count < lightboxImgs.length - 1 && count >= 0) {
                    count++;
                } else {
                    count = 0;
                }
                lightbox.src = lightboxImgs[count];
            })
        });
        prevImg.forEach(btn => {
            btn.addEventListener("click", () => {
                const lightbox = btn.previousElementSibling;
                const lightboxImgs = JSON.parse(lightbox.dataset.imgs);
                if (count > 0 && count <= lightboxImgs.length - 1) {
                    count--;
                } else {
                    count = lightboxImgs.length - 1;
                }
                lightbox.src = lightboxImgs[count]
            })
        });
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener("click", () => {
                thumbnails.forEach(item => {
                    if (item != thumbnail) {
                        item.classList.remove("selected");
                    };
                });
                thumbnail.classList.add("selected");
                const imgSrc = thumbnail.firstElementChild.dataset.img;
                const lightboximg = thumbnail.parentElement.previousElementSibling.firstElementChild;
                lightboximg.src = imgSrc;
            });
        });
        if (window.innerWidth >= 976) {
            lightboxImg.addEventListener("click", () => document.body.classList.add("modal2"));
            closeModal.addEventListener("click", () => document.body.classList.remove("modal2"));
        };
        window.addEventListener("resize", () => {
            const currentWidth = window.innerWidth;
            if (currentWidth >= 976) {
                lightboxImg.addEventListener("click", () => document.body.classList.add("modal2"));
                closeModal.addEventListener("click", () => document.body.classList.remove("modal2"));
            };
        });
    }
};

class Storage {
    static getCart() {
        return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    static findProduct() {
        let product = JSON.parse(localStorage.getItem("products"));
        return product
    }
    static saveProduct(product) {
        localStorage.setItem("products", JSON.stringify(product));
    }
}

function init() {
    const product = new ProductPages();
    const ui = new UI();
    ui.setUp();
    product.getProductPages().then(res => {
        ui.createModal(res);
        ui.displayLightBox(res);
        ui.displayProductInfo(res);
        Storage.saveProduct(res)
    }).then(() => {
        ui.lightbox();
        ui.addToCart();
        ui.cartLogic();
    })
}