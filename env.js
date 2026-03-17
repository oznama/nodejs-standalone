console.log('Enviroiment:', process.env.NODE_ENV || 'development');
console.log('Custom variables:', process.env.MY_VARIABLE);
console.log('Database URL:', process.env.DATABASE_URL || 'Not set');

// Example usage with environment variables:
// NODE_ENV=production MY_VARIABLE=TEST node env.js