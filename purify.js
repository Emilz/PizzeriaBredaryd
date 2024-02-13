const purify = require('purify-css');

const content = ['index.html'];
const css = ['css/bootstrap.min.css', 'css/slide.css', 'css/style.css'];

const options = {
    output: 'css/styles.min.css',
    minify: true,
    info: true,
    whitelist: ['#slides*', '*slidesjs*']
};

purify(content, css, options, function (purifiedAndMinifiedResult) {
    console.log(purifiedAndMinifiedResult);
});

//run: node purify.js