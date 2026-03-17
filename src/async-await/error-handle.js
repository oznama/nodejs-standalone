async function fetchUserData() {
    console.log('Fetching user data...');
    try {
        const response = await fetch('http://api.example.com/user/1');
        if (!response.ok) {
            console.log('Response is not ok');
            throw new Error(`HTTP error: ${response.status}`);
        }
        const user = await response.json();
        console.log('User data:', user);
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error if needed
    }
}

// Using catch with async function
fetchUserData().catch(error => {
    console.log('Caught outside of async function:', error.message);
});