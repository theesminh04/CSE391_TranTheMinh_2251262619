async function getProductById(id) {
    try {
        const response = await fetch(`https://api.example.com/products/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Khong thay san pham");
            }

            if (response.status === 500) {
                throw new Error("Server loi, hay thu lai sau");
            }

            if (response.status === 429) {
                throw new Error("Ban gui qua nhieu request, vui long thu lai sau");
            }

            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("API error:", error.message);
        return null;
    }
}