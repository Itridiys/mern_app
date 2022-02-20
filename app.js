const express = require('express') //подключаем пакет
const config = require('config')
const path = require('path')
const mongoose = require('mongoose') // подключаемся к могодб

const app = express() // сервер

//midleware
app.use(express.json({extended : true} ))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    //любой запрос
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000 // если не определен то по умолчанию 5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'), {

            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log('App has been started on port:' + PORT +' ....'))

    } catch (e){
        console.log('Server error: ',e.message)
        process.exit(1)
    }
}

start()

