const path = require('path');
const storage = 'C:\\Users\\Jafet\\Desktop\\S.O\\Proyecto\\Archivos';

const slash = process.platform === 'win32' ? '\\' : '/';

const processPath = (url) => {
    relativePath = url ? url.replace(/-/g,slash) : slash;
    absolutePath = path.join(storage,relativePath);
    return {relativePath,absolutePath};
}

module.exports = processPath;
