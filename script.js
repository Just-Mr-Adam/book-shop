const books = [
    { id: 1, name: "Война и мир", price: 500, genre: "epic", image: "images/Война и мир - обложка.webp", link: "items/item1.html" },
    { id: 2, name: "Преступление и наказание", price: 400, genre: "psychological", image: "images/Преступление и наказание - обложка.webp", link: "items/item2.html" },
    { id: 3, name: "Мастер и Маргарита", price: 450, genre: "mystery", image: "images/Мастер и Маргарита - обложка.webp", link: "items/item3.html" },
    { id: 4, name: "Отцы и дети", price: 350, genre: "social", image: "images/Отцы и дети - обложка.webp", link: "items/item4.html" },
    { id: 5, name: "Мертвые души", price: 380, genre: "poem", image: "images/Мертвые души - обложка.webp", link: "items/item5.html" }
];

function renderBooks(filterGenre = "all") {
    let container = document.querySelector("._catalog");
    container.innerHTML = "";


    let filtered = filterGenre === "all" ? books : books.filter(book => book.genre === filterGenre);

    filtered.forEach(book => {
        let card = `
            <div>
                <h3>${book.name}</h3>
                <img src="${book.image}" width="150">
                <p>Цена: ${book.price} Р</p>
                <a href="${book.link}" target="_blank">Подробнее</a><br>
                <button data-id="${book.id}">Добавить в корзину</button>
            </div>
        `;
        container.innerHTML += card;
    });

    let buttons = document.querySelectorAll("._catalog button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let id = button.getAttribute("data-id");
            addToCart(id);
        });
    });
}

renderBooks();

document.getElementById("genreFilter").addEventListener("change", event => {
    renderBooks(event.target.value);
    renderCart();
});

//Корзина
let cart = [];

function renderCart() {
    let cartItem = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    cartItem.innerHTML = "";

    if (cart.length === 0) {
        cartItem.innerHTML = "<p>Корзина пуста</p>";
        cartTotal.textContent = "Итого: 0 ?";
        return;
    }

    let total = 0;
    let html = "";

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let sum = item.price * item.quantity;
        html += `<div>${item.name} x ${item.quantity} = ${sum} ? <button class="remove-btn" data-id="${item.id}">Удалить</button></div>`;
        total += sum;
    }

    cartItem.innerHTML = html;
    cartTotal.textContent = "Итого: " + total + " ?";

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.onclick = () => {
            let id = parseInt(button.getAttribute("data-id"));
            removeFromCart(id);
        };
    });
}

function addToCart(bookId) {
    let book = null;
    books.forEach(b => {
        if (b.id == bookId) book = b;
    });
    if (!book) return;

    let existing = null;
    cart.forEach(item => {
        if (item.id == bookId) existing = item;
    });

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            name: book.name,
            price: book.price,
            quantity: 1
        });
    }
    renderCart();
}

function removeFromCart(bookId) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== bookId) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    renderCart();
}

document.getElementById("payButton").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно");
        cart = [];
        renderCart();
    }
});