
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import Server from './server';
import { createConnection } from 'mysql';
//For env File 
dotenv.config();

const app = Server;
const port = process.env.PORT || 8000;

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`Server is Fire at port:${port}`);
});