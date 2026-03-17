// Handle uncaught exceptions (synchronous errors)
process.on('uncaughtException', (error) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    console.error(error.name, error.message);

    // Perform cleanup (close database connections, etc.)
    server.close(() => {
        console.log('Process terminated due to uncaught exception');
        process.exit(1); // Exit with failure
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    console.error('Unhandled Rejection at:', promise, 'Reason:', reason);

    // Close server and exit
    server.close(() => {
        process.exit(1);
    });
});

// Example of an unhandled promise rejection
Promise.reject(new Error('Something went wrong'));

// Example of an uncaught exception
setTimeout(() => {
    throw new Error('Uncaught exception after timeout');
}, 1000);