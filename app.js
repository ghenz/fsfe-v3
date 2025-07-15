import { createServer } from 'node:http'

createServer((req, res) => {
res.write("Serverzin medonho")
res.end()
}).listen(3000)
console.log("Ta rodando na porta 3000")
