class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.statusCode = 400;
    }
}

class NotFoundError extends Error {
    constructor(resource) {
        super(`${resource} not found`);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

// Usage
function getUser(id) {
    if (!id) {
        throw new ValidationError('User ID is required', 'id');
    }
    if ( id !== 1 ) {
        throw new NotFoundError('User');
    }
    console.log('User John');
}

//getUser(); // ValidationError
//getUser(2); // NotFoundError
//getUser('1'); // NotFoundError
getUser(1); // User John