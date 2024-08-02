import tls from 'node:tls';
import { databaseENV } from '../config/databaseENV';

const options = {
  // ** Necessary only if the server's cert isn't for "localhost".
  checkServerIdentity: () => {
    return undefined;
  },
};

const socket = tls.connect(databaseENV.DB_PORT, options, () => {
  console.log(
    'client connected',
    socket.authorized ? 'authorized' : 'unauthorized'
  );
  process.stdin.pipe(socket);
  process.stdin.resume();
});

socket.setEncoding('utf8');
socket.on('data', data => {
  console.log(data);
});
socket.on('end', () => {
  console.log('server ends connection');
});
