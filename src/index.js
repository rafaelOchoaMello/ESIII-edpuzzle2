//Rafael Ochôa Mello - rafaelochoamello@gmail.com
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

let clients = [
    {
        id: 1,
        name: 'Fulano'
    },
    {
        id: 2,
        name: 'Ciclano'
    },
    {
        id: 3,
        name: 'Beltrano'
    }
]

app.get('/clients', (req, res) => res.json(clients));

app.get('/clients/:id', (req, res) => {
    const id = req.params.id;
    const data = clients.filter((data) => parseInt(data.id) === parseInt(id));
    if (data)
        res.status(200).json(data);
    else
        res.status(404).json({ msg: 'No Data' });
});

app.post('/clients', (req, res) => {
    const sizecontrol = clients.length;
    const data = req.body;
    clients.push(data);

    if (clients.length > sizecontrol)
        res.status(201).json({ msg: 'Ok', data: data });
    else
        res.status(404).json({ msg: 'No Data' });
});

app.put('/clients/:id', (req, res) => {
    const id = req.params.id;
    const newName = req.body.newName;

    let client = clients.find((data) => parseInt(data.id) === parseInt(id));

    if (client) {
        client.nome = newName;
        res.status(200).json(client);
    }
    else
        res.status(404).json({ msg: 'No Data' });
});

app.delete('/clients/:id', (req, res) => {
    const id = req.params.id;
    const toRemove = clients.filter((data) => parseInt(data.id) === parseInt(id));

    if (toRemove) {
        clients = clients.filter((data) => parseInt(data.id) !== parseInt(id));
        res.status(200).json(toRemove);
    }
    else
        res.status(404).json({ msg: 'No Data' });
});

app.listen(port, () => {
    console.log(`App rodando em: http://localhost:${port}`);
});