#!/usr/bin/env node

import { fetchLocalizations, generateLocalizedKeysType } from "./scripts";

async function main() {
    try {
        await fetchLocalizations();
        generateLocalizedKeysType();
        console.log('✅  Localization process completed successfully.');
    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
}

main();
