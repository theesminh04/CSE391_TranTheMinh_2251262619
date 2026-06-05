async function loadProducts() {
    try {
        const response = await fetch("https://api.example.com/products");
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error("Network error:", error.message);
        alert("Không thể kết nối đến server. Vui lòng kiểm tra mạng.");
    }
}