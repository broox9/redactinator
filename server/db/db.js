const fs = require('fs')
const originalData = require('./getConsults')
const persistance = require('./persist.json');

class MockDB {
  constructor() {
    this.data = persistance || originalData;

    this.consults = new Map();
    this.images = new Map();

    this.data.consults.forEach(consult => {
      this.consults.set(consult.id, consult)
      consult.images.forEach(image => this.images.set(image.img_id, image))
    });
  }

  getConsults() {
    return this.data
  }

  reset() {
    this.data = originalData;
    this.writeData(JSON.stringify(originalData))
  }

  saveImage(img_id, redaction_status) {
    const image = this.getImage(img_id)
    if (!image) {
      return null;
    }

    image.redaction_status = redaction_status
    this.images.set(img_id, image);
    this.writeData()
    return image;
  }

  getImage(img_id) {
    return this.images.get(parseInt(img_id))
  }

  writeData() {
    const file = __dirname + '/persist.json'
    fs.writeFileSync(file, JSON.stringify(this.data, null, 2), { encoding: 'utf8' })
  }
}

module.exports = new MockDB()
