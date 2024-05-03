
import dotenv from 'dotenv';
import Server from './server';

//For env File 
dotenv.config();

const app = Server;
const port = process.env.PORT || 8000;

app.set('port', port);
app.listen(app.get('port'), () => {
});