function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Đang thử lần ${attempt}...`);

            const response = await fetch(url);

            return response;

        } catch (error) {
            lastError = error;

            console.warn(`Lỗi network lần ${attempt}:`, error.message);

            if (attempt < maxRetries) {
                await delay(1000);
            }
        }
    }

    throw new Error(`Thất bại sau ${maxRetries} lần thử: ${lastError.message}`);
}