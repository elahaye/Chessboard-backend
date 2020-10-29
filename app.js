const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Play = require('./models/Play');

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')
    );

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/plays', (req, res, next) => {
    delete req.body._id;
    const play = new Play({
        ...req.body
    });
    play.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/plays/:gameId', (req, res, next) => {
    Play.updateOne({ gameId: req.params.gameId }, { ...req.body, gameId: req.params.gameId })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/plays/:gameId', (req, res, next) => {
    Play.deleteOne({ gameId: req.params.gameId })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
})

app.get('/api/plays/:gameId', (req, res, next) => {
    Play.findOne({ gameId: req.params.gameId })
        .then(play => res.status(200).json(play))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/plays', (req, res, next) => {
    Play.find()
        .then((plays) => {
            let changinPlays = [];
            plays.forEach(play => {
                changinPlays.push(play.gameId);
            });
            res.status(200).json(changinPlays);
        })
        .catch(error => res.status(400).json({ error }));
});

module.exports = app;