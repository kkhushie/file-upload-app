const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    filetype: { type: String, required: true },
    filedata: { type: Buffer, required: true },
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);

module.exports = File;
