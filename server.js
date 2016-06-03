const path = require('path');
const express = require('express');
const Gpio = require('onoff').Gpio;
const app = express();
const port = process.env.PORT;

const doorOpener = new Gpio(4, 'out');
doorOpener.writeSync(1);

app.post('/open', (req, res) => {
    doorOpener.write(0, () => {
        setTimeout(() => {
            doorOpener.write(1, () => res.sendStatus(200));
        }, 1000);
    })
    ;
});


app.use(express.static(__dirname + '/dist'));
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT, error => {
    if (error) {
        console.error(error);
    } else {
        console.info('==>  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
