module.exports = {
    "plugins": ["node"],
    "extends": "airbnb-base",
    "rules": {
        "strict": "off",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-console": "warn"
    },
    "env": {
        "jest": true,
        "node": true,
    }
}

