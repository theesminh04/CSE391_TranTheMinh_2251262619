const productPrices = {
    "iPhone 15 Pro Max": 34990000,
    "MacBook Pro M3": 39990000,
    "AirPods Pro 2": 5990000,
    "Apple Watch Ultra": 21000000
};

let cartData = [];
const cartBody = document.querySelector('#cart-table tbody');
const totalPriceCell = document.getElementById('total-price-cell');
const searchInput = document.getElementById('product-search');
const qtyInput = document.getElementById('add-quantity');
const previewBox = document.getElementById('price-preview-box');

const formatMoney = (val) => val.toLocaleString('vi-VN') + 'đ';

function renderCart() {
    cartBody.innerHTML = '';
    let total = 0;
    cartData.forEach((item, index) => {
        const sub = item.price * item.quantity;
        total += sub;
        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${formatMoney(sub)}</td>
                <td><button type="button" class="btn-remove" onclick="removeItem(${index})">×</button></td>
            </tr>`;
    });
    totalPriceCell.innerText = formatMoney(total);
}

document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const name = searchInput.value;
    const qty = parseInt(qtyInput.value);
    const price = productPrices[name];

    if (name && price) {
        const item = cartData.find(i => i.name === name);
        if (item) item.quantity += qty;
        else cartData.push({ name, price, quantity: qty });
        renderCart();
        searchInput.value = ''; qtyInput.value = 1; updatePricePreview();
    } else alert("Chọn sản phẩm hợp lệ!");
});

window.removeItem = (idx) => { cartData.splice(idx, 1); renderCart(); };

function updatePricePreview() {
    const name = searchInput.value;
    const qty = parseInt(qtyInput.value);
    const price = productPrices[name];
    if (price) {
        previewBox.style.display = 'block';
        document.getElementById('preview-unit').innerText = formatMoney(price);
        document.getElementById('preview-total').innerText = formatMoney(price * qty);
    } else previewBox.style.display = 'none';
}

window.stepQty = (val) => {
    let n = parseInt(qtyInput.value) + val;
    qtyInput.value = n < 1 ? 1 : n;
    updatePricePreview();
};

searchInput.addEventListener('input', updatePricePreview);

const dInput = document.getElementById('delivery-date');
const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
if(dInput) dInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);

const rInput = document.getElementById('shipping-speed');
if(rInput) rInput.addEventListener('input', () => { document.getElementById('days-val').innerText = rInput.value; });

document.getElementById('checkout-form').addEventListener('reset', (e) => {
    if(confirm("Hủy đơn?")) { cartData = []; renderCart(); updatePricePreview(); }
    else e.preventDefault();
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if(cartData.length === 0) return alert("Giỏ hàng trống!");
    alert("🎉 Đặt hàng thành công!");
    location.reload();
});