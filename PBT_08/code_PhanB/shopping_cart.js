function createCart() {
    // Private data
    let items = [];
    let discountCode = null;

    const formatMoney = money => money.toLocaleString("vi-VN") + "đ";

    const getSubtotal = () =>
        items.reduce((total, item) => total + item.price * item.quantity, 0);

    const getDiscountAmount = () => {
        const subtotal = getSubtotal();

        if (discountCode === "SALE10") return subtotal * 0.1;
        if (discountCode === "SALE20") return subtotal * 0.2;
        if (discountCode === "FREESHIP") return 30000;

        return 0;
    };

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }

            items = items.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        },

        getTotal() {
            return Math.max(getSubtotal() - getDiscountAmount(), 0);
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];

            if (validCodes.includes(code)) {
                discountCode = code;
                console.log(`Đã áp dụng mã giảm giá: ${code}`);
            } else {
                console.log("Mã giảm giá không hợp lệ!");
            }
        },

        printCart() {
            console.log("┌────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm       │ SL │ Đơn giá        │ Tổng           │");
            console.log("├────────────────────────────────────────────────────────────┤");

            items.forEach((item, index) => {
                const total = item.price * item.quantity;

                console.log(
                    `│ ${String(index + 1).padEnd(1)} │ ` +
                    `${item.name.padEnd(14)} │ ` +
                    `${String(item.quantity).padStart(2)} │ ` +
                    `${formatMoney(item.price).padStart(13)} │ ` +
                    `${formatMoney(total).padStart(14)} │`
                );
            });

            console.log("├────────────────────────────────────────────────────────────┤");
            console.log(`│ Tạm tính:                         ${formatMoney(getSubtotal()).padStart(18)} │`);

            if (discountCode) {
                console.log(`│ Giảm giá (${discountCode}):              ${formatMoney(getDiscountAmount()).padStart(18)} │`);
            }

            console.log(`│ Tổng cộng:                        ${formatMoney(this.getTotal()).padStart(18)} │`);
            console.log("└────────────────────────────────────────────────────────────┘");
        },

        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discountCode = null;
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());

cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());