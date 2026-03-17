// With callbacks
function getUser(userId, callback) {
    console.log('Fetching user with callbacks');
    setTimeout(() => {
        callback(null, { id: userId, name: 'John' });
    }, 1000);
}

function getUserPosts(user, callback) {
    console.log('Fetching user posts with callbacks');
    setTimeout(() => {
        callback(null, ['Post 1', 'Post 2']);
    }, 1000);
}

// Using callbacks
getUser(1, (error, user) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('User;', user);

    getUserPosts(user, (error, posts) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Posts:', posts);
    });
})

// With promises
function getUserPromise(userId) {
    console.log('Fetching user with promise');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John'});
        })
    });
}

function getUserPostsPromise(user) {
    console.log('Fetching user posts with promise');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['Post 1', 'Post 2']);
        }, 1000);
    });
}

// Using promises
getUserPromise(1)
    .then(user => {
        console.log('User:', user);
        return getUserPostsPromise(user);
    })
    .then(posts => {
        console.log('Posts:', posts);
    })
    .catch(error => {
        console.error(error);
    });

// With async/await
async function getUserAndPosts() {
    try {
        const user = await getUserPromise(1);
        console.log('User:', user);

        const posts = await getUserPostsPromise(user);
        console.log('Posts:', posts);
    } catch (error) {
        console.error(error);
    }
}

getUserAndPosts();