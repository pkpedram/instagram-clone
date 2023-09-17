const generateFileName = (file = false, additionalName = '') => {

    console.log(file)
     return file ? 'media/' + file.originalname.split('.')[0] + '_' + additionalName + '.' + file.originalname.split('.')[1] : null
}

module.exports = {
    generateFileName,
}