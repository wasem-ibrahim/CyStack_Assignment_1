// `${import.meta.env.VITE_APP_SERVER_URL}${domain}`

export function fetchCertificates(domain) {
    return fetch(`${import.meta.env.VITE_APP_SERVER_URL}${domain}`)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log(error);
        });
}
