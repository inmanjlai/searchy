const express = require('express');

const app = express();
const PORT = 5050;

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
     return res.render('index');
});

app.post('/cards', async(req, res) => {
    let data = req.body;

    if (!data.searchQuery.includes('=')) {
        try {
            const cards = await (await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${data.searchQuery}`)).json();
            if (cards.error) res.render('index', {error:cards.error, searchQuery:data.searchQuery})
            return res.render('cards', {cards:cards.data, searchQuery:data.searchQuery});
        } catch(err) {
            res.render('index', {error:err})
        }    
    } else {
        let rebuiltQuery = data.searchQuery.split('/').join('&');
    
        try {
            const cards = await (await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${rebuiltQuery}`)).json();
            if (cards.error) res.render('index', {error:cards.error, searchQuery:data.searchQuery})
            return res.render('cards', {cards:cards.data, searchQuery:data.searchQuery});
        } catch(err) {
            res.render('index', {error:err})
        }
    }
})

app.listen(PORT, () => { console.log(`Server live at http://localhost:${PORT}`)});