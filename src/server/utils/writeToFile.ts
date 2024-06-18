import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

export async function writeToFile() {
  try {
    const controller = new AbortController();
    const { signal } = controller;
    const data = new Uint8Array(Buffer.from('Hello Node.js'));
    const promise = writeFile('message.txt', data, { signal });

    controller.abort();

    await promise;
  } catch (error) {
    console.error(error);
  }
}
