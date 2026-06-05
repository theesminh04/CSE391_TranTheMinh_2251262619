async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, ms);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        return response;

    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Request timeout. API phan hoi cham");
        }

        throw error;

    } finally {
        clearTimeout(timeoutId);
    }
}