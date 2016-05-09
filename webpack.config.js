module.exports = {
    entry: "./src/Dashboard.js",
    output: {
        path: __dirname,
        filename: "./dist/ReactDashboard.js",
        //the following 2 params exports the module as global variable
        libraryTarget: "var",
        library: "ReactDashboard"
    },
    externals: {
     'react': 'React',
     'react-dom' : 'ReactDOM',
     'react-bootstrap' : 'ReactBootstrap'
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

// for custom widgets
// module.exports = {
//     entry: "./example/customwidgets/CustomWidget.js",
//     output: {
//         path: __dirname,
//         filename: "./dist/CustomWidget.js",
//         //the following 2 params exports the module as global variable
//         libraryTarget: "var",
//         library: "CustomWidget"
//     },
//     externals: {
//      'react': 'React',
//      'react-dom' : 'ReactDOM',
//      'react-bootstrap' : 'ReactBootstrap'
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