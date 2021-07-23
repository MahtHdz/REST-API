import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import pkg from '../package.json'

import { createRoles } from './libs/initialSetup'

import payments from './routes/payments.routes';
import auth from './routes/auth.routes'
import holders from './routes/holder.routes'

const app = express()
createRoles();

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

app.use('/api/payments', payments);
app.use('/api/auth', auth);
app.use('/api/holders', holders);

export default app;