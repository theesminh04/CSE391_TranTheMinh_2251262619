async function loadHomeBanner() {
    try {
        const banner = await Promise.any([
            fetchJson("https://cdn1.example.com/home-banner"),
            fetchJson("https://cdn2.example.com/home-banner"),
            fetchJson("https://cdn3.example.com/home-banner")
        ]);

        console.log("Banner trang chủ:", banner);

    } catch (error) {
        console.error("Tất cả server banner đều lỗi:", error);
    }
}