// Fetch data from backend
export async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    return response.json();
}