module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    plugins: ['stylelint-csstree-validator'],
    rules: {
        'csstree/validator': {
            syntaxExtensions: ['sass'],
        },
        'selector-max-id': 1,
    },
}
