const fs = require('fs');
const path = require('path')

async function loadUserData(userId) {
    console.log('Loading user ${userId}...');
    try {
        const pathUser = path.join(__dirname, `../../assets/user/${userId}.json`);
        console.log('Searching in', pathUser);
        const data = await fs.readFile(pathUser, 'utf8');
        const user = JSON.parse(data);

        if (!user.email) {
            throw new Error('Invalid user data: missing email');
        }

        return user;
    } catch (error) {
        console.log('Catching error');
        // Handle different error types
        if (error.code === 'ENOENT') {
            console.log('Error user not found');
            throw new Error(`User ${userId} not found`);
        } else if (error instanceof SyntaxError) {
            console.log('Error user syntax error');
            throw new Error('Invalid user data format');
        }
        console.log('Re throw error');
        // Re-throw other errors
        throw error;
    } finally {
        // Cleanup code that runs whether successful or not
        console.log(`Finished processing user ${userId}`);
    }
}

// Usage
(async () => {
    try {
        const user = await loadUserData(123);
        console.log('User loaded: ', user);
    } catch (error) {
        console.error('Failed to load user:', error.message);
        // Handle error (e.g., show to user, retry, etc.)
    }
})();