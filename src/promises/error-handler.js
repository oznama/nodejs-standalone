function fetchData() {
    return new Promise((resolve, reject) => {
        reject(new Error('Network error'));
    });
}

fetchData()
    .then(
        data => console.log('Data:', data),
        error => console.log('Error handled in then:', error.message)
    );

// Alternative method using catch
fetchData()
    .then(data => console.log('Data:', data))
    .catch(error => console.log('Error handled in catch:', error.message));