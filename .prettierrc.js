module.exports = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    endOfLine: 'auto',
    arrowParens: 'avoid',
    bracketSpacing: true,
    jsxSingleQuote: false,
    quoteProps: 'as-needed',
    useTabs: false,
    vueIndentScriptAndStyle: false,
    htmlWhitespaceSensitivity: 'css',
    embeddedLanguageFormatting: 'auto',
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    requirePragma: false,
    insertPragma: false,
    rangeStart: 0,
    rangeEnd: Infinity,
    filepath: '',
    overrides: [
        {
            files: '*.json',
            options: {
                parser: 'json',
                tabWidth: 2,
            },
        },
    ],
}