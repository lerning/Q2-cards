'use strict';

const Translate = require('@google-cloud/translate');

const projectId = 'AIzaSyAM0ynSKrAZLaqiAowwQ9t_0Ll0OswspVs';

const translateClient = Translate({
  projectId: projectId
});

let text = "Flash is the best app that man has made thus far."

let target = 'es';

translateClient.translate(text, target)
  .then((results) => {
    let translation = results[0];

    console.log('Text is: ', text);
    console.log('Text in Spanish: ', translation);
});
