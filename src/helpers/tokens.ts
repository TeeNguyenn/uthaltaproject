export const fetchWithTokenRetry = async (url: string): Promise<any> => {
    const token = localStorage.getItem("token") ?? '';
    return new Promise(resolve => {
        fetch(url, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Token expired, refreshing...");
                    const isTokenRefreshed = refreshToken();
                    isTokenRefreshed.then(data => {
                        if (data) {
                            fetchWithTokenRetry(url);
                        }
                        else {
                            const logout = callLogout();
                            logout.then(data1 => {
                                if (data1) {
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            })
                        }
                    })
                } else {
                    // Handle other HTTP errors
                    throw new Error(`HTTP error: ${response.status}`);
                }
            }
            resolve(response)
        })
            .catch(error => {
                console.error("Network or CORS error:", error);
            })
    })
}
async function refreshToken() {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await fetch(process.env.REACT_APP_API_URL + 'api/Authenticate/refresh', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(refreshToken), // Send refresh token
        });
        if (!response.ok) {
            console.error("Failed to refresh token:", response.status);
            return false; // Return false if refreshing token fails
        }
        const { access_Token, refresh_Token } = await response.json();
        // Save new tokens to localStorage
        localStorage.setItem("token", access_Token);
        localStorage.setItem("refreshToken", refresh_Token);
        console.log("Token refreshed successfully");
        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false; // Return false if an error occurs
    }
}

async function callLogout() {
    try {
        const userName = localStorage.getItem("userName");
        const response = await fetch(process.env.REACT_APP_API_URL + 'api/Authenticate/logout/' + userName, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            console.error("Failed to refresh token:", response.status);
            return false; // Return false if refreshing token fails
        }
        return true;

    } catch (error) {
        console.error("Error refreshing token:", error);
        return false; // Return false if an error occurs
    }
}

