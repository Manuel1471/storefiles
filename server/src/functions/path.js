const path = require('path');
const storage = '/Users/manuelgarcia/Storage';

const slash = process.platform === 'win32' ? '\\' : '/';

const processPath = (url) => {
    relativePath = url ? url.replace(/-/g,slash) : slash;
    absolutePath = path.join(storage,relativePath);
    return {relativePath,absolutePath};
}

module.exports = processPath;
