import { createServer } from "./server";
import * as dotenv from 'dotenv'

dotenv.config()

const port = process.env.SERVER_PORT || 5001;
const server = createServer();

server.listen(port, () => {
  console.log('\x1b[32m', `  ➜ 🎸 Server is listening on port: ${port}`, '\x1b[0m');
});
