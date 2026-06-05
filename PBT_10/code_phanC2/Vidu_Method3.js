function timeoutAfter(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Request timeout"));
        }, ms);
    });
}

async function loadOrdersWithTimeout() {
    try {
        const orders = await Promise.race([
            fetchJson("https://api.example.com/orders"),
            timeoutAfter(10000)
        ]);

        console.log("Danh sách đơn hàng:", orders);

    } catch (error) {
        console.error("Không tải được đơn hàng:", error.message);
    }
}