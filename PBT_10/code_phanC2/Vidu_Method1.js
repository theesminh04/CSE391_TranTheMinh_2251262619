async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}

async function loadCheckoutPage() {
    try {
        const [cart, shippingAddress, paymentMethods] = await Promise.all([
            fetchJson("https://api.example.com/cart"),
            fetchJson("https://api.example.com/shipping-address"),
            fetchJson("https://api.example.com/payment-methods")
        ]);

        console.log("Giỏ hàng:", cart);
        console.log("Địa chỉ giao hàng:", shippingAddress);
        console.log("Phương thức thanh toán:", paymentMethods);

    } catch (error) {
        console.error("Không thể tải trang thanh toán:", error.message);
    }
}