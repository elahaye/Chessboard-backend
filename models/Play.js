const mongoose = require('mongoose');

const playSchema = mongoose.Schema({
    userId: { type: String, required: false },
    gameId: { type: String, required: true },
    createdAt: { type: String, required: true },
    finishedAt: { type: String, required: false },
    state: { type: Number, required: true },
    plays: { type: Array, required: true },
    board: { type: Object, required: true },
    defeatedPieces: { type: Array, required: true }
});

module.exports = mongoose.model('Play', playSchema);