// app.msj
async function loadModule(moduleName) {
    try {
        // Dynamic import returns as promise
        const module = await import(`./${moduleName}.mjs`);
        return module;
    } catch (error) {
        console.error(`Failed to load ${moduleName}:`, error);
    }
}

// Load a module based on a condition
const moduleName = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

loadModule(moduleName).then(module => {
    module.default(); // Call the default export
});

// Or with simpler await syntax
(async () => {
    const mathModule = await import('./math.mjs');
    console.log(mathModule.add(10, 5));
})();