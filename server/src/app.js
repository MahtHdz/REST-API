import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import pkg from '../package.json'

//import aspirantesRoutes from './routes/aspirantes.routes'
//import nacademicoRoutes from './routes/nacademico.routes'
//import agendaRoutes from './routes/agenda.routes'


const app = express()

app.use(cors()) 
app.use(morgan('dev'))
app.use(express.json())

app.set('pkg', pkg)

app.get('/', (req, res) => {
    res.json({
        author      : app.get('pkg').author,
        description : app.get('pkg').description,
        version     : app.get('pkg').version
    })
})

//app.use('/api/aspirantes', aspirantesRoutes)
//app.use('/api/nacademico', nacademicoRoutes)
//app.use('/api/agenda', agendaRoutes)

export default app;