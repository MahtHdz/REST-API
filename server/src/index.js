//import fs from 'fs'
//import https from 'https'

import * as dotenv from 'dotenv';
dotenv.config();

//import initMongoose from "./database";
import app from './app'

(async () => {
    // Initialize Mongoose
    //initMongoose();

    const port = process.env.PORT;
    const modo = process.env.NODE_ENV;

        app.listen({ port }, () =>
            console.log('Server listen http on port', port)
        );
    
})();