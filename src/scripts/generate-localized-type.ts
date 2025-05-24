import fs from 'fs';
import path from 'path';

export function generateLocalizedKeysType() {
    const translationsPath = path.resolve(process.cwd(), 'localize/translations.json');
    const outputPath = path.resolve(process.cwd(), 'localize/localized-keys.ts');

    const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf-8'));

    const allKeys = new Set<string>();

    for (const lang in translations) {
        const keys = Object.keys(translations[lang]);
        keys.forEach(key => allKeys.add(key));
    }

    const keysArray = Array.from(allKeys);
    const unionType = keysArray.map(key => `'${key}'`).join(' | ');

    const fileContent = `// This file is auto-generated. Do not edit manually.
export type LocalizedKeys = ${unionType};
`;

    fs.writeFileSync(outputPath, fileContent);
    console.log('⚡️ LocalizedKeys type has been generated.');
}
