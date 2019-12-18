const { WebpackPlugin } = require('@electron-forge/plugin-webpack')

module.exports = {
    electronPackagerConfig: {
        icon: __dirname + "/icon/icon.ico",
        name: "golaaby"
    },
    packagerConfig: {
        icon: __dirname + "/icon/icon.ico",
        name: "golaaby",
        "win32metadata": {
            "requested-execution-level": "requireAdministrator"
        }
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "golaaby",
                owners: "mohammad h alijany",
                title: "golaaby",
                noMsi: false,
                setupIcon: __dirname + "/icon/icon.ico",
                iconUrl: "https://cdn-24.anonfile.com/j1aasfGan9/6d39c050-1576483615/icon.ico"
            }
        }
    ],
    plugins: [
        ["@electron-forge/plugin-webpack", {
            mainConfig: "./webpack.main.config.js",
            renderer: {
                config: "./webpack.renderer.config.js",
                entryPoints: [
                    {
                        html: "./src/index.html",
                        js: "./src/renderer.js",
                        name: "main_window"
                    }
                ]
            }
        }]
    ]
}