module.exports = {
    entry: "./example/script.js",
    output: {
        path: __dirname,
        filename: "./example/build.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query:
            {
                presets:['es2015', 'react']
            }
        },
        {test: /\.less$/, loader: "style!css!less"}
      ]
    }
};