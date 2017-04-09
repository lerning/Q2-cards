
'use strict';

const Translate = require('@google-cloud/translate');
const projId = 'AIzaSyAM0ynSKrAZLaqiAowwQ9t_0Ll0OswspVs';

const translateClient = Translate({
  projectId: projId
});


const text = 'Flash is the best application ever created';

const target = 'es';

translateClient.translate(text, target)
  .then((results) => {
    const translation = results[0];

    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
});
