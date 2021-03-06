import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import pkg from '../package.json'

//import { createRoles } from './libs/initialSetup'
import transactions from './routes/transactions.routes';
import holdersUpdate from './routes/updateAndDelete.routes'
import auth from './routes/auth.routes'
import users from './routes/users.routes';

const app = express()
//createRoles();

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

app.use('/api/UD', holdersUpdate);
app.use('/api/transactions', transactions);
app.use('/api/auth', auth);
app.use('/api/users', users);

export default app;