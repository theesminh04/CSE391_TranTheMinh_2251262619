async function loadProductDetail(productId) {
    const results = await Promise.allSettled([
        fetchJson(`https://api.example.com/products/${productId}`),
        fetchJson(`https://api.example.com/products/${productId}/reviews`),
        fetchJson(`https://api.example.com/products/${productId}/related`),
        fetchJson(`https://api.example.com/products/${productId}/coupons`)
    ]);

    const [productResult, reviewsResult, relatedResult, couponsResult] = results;

    if (productResult.status === "fulfilled") {
        console.log("Sản phẩm:", productResult.value);
    } else {
        console.error("Không tải được sản phẩm:", productResult.reason.message);
    }

    if (reviewsResult.status === "fulfilled") {
        console.log("Đánh giá:", reviewsResult.value);
    } else {
        console.warn("Không tải được đánh giá.");
    }

    if (relatedResult.status === "fulfilled") {
        console.log("Sản phẩm liên quan:", relatedResult.value);
    }

    if (couponsResult.status === "fulfilled") {
        console.log("Mã giảm giá:", couponsResult.value);
    }
}