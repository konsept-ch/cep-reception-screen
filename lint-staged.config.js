module.exports = {
    '*': 'prettier --ignore-unknown',
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
    // '*.{ts,tsx}': ['cross-env NODE_ENV=test CI=true jest --bail --findRelatedTests'],
    '*.{js,ts,tsx}': ['npm run test-related'],
    '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
    '*.scss': ['stylelint --fix', 'prettier --write'],
    '*.{png,jpeg,jpg,gif,svg}': 'imagemin-lint-staged',
}
