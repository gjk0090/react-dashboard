module.exports = {
    entry: "./src/Dashboard.js",
    output: {
        path: __dirname,
        filename: "./dist/ReactDashboard.js",
        //the following 2 params exports the module as global variable
        libraryTarget: "var",
        library: "ReactDashboard"
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


// module.exports = {
//     entry: "./example/script.js",
//     output: {
//         path: __dirname,
//         filename: "./example/build.js"
//     },
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             loader: 'babel',
//             query:
//             {
//                 presets:['es2015', 'react']
//             }
//         },
//         {test: /\.less$/, loader: "style!css!less"}
//       ]
//     }
// };

//todo: read about the config and update this
//todo: minify and map