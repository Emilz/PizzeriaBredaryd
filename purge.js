const PurgeCSS = require('purgecss').PurgeCSS;
const CleanCSS = require('clean-css');
const fs = require('fs');

const content = ['index.html'];
const css = ['css/bootstrap.min.css', 'css/slide.css', 'css/style.css'];
const output = 'css/styles.min.css';

(async () => {
    const purgeCSSResult = await new PurgeCSS().purge({
        content,
        css,
        safelist: {
            standard: ['slidesjs'],
            deep: [/^#slides/, /slidesjs/]
        }
    });

    const combinedCSS = purgeCSSResult.map(result => result.css).join("\n");

    const minifiedCSS = new CleanCSS().minify(combinedCSS).styles;

    fs.writeFileSync(output, minifiedCSS);
})();

//run: node purge.js
