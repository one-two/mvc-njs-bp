import * as http from 'http';

const persona = { arcana: 'tower', level: '47'}

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(`<html>
            <head><title>this is the root</title></head>
            <body>
            <form action="/create-user" method="POST">
                <input type="text" name="newUser"/> <button type="submit">Send</button>
            </form>
            </body>
        </html>`);
        return res.end();
    }

    if (url === '/users' && method === 'GET') {
        res.write(`
            <html><header><title>users list</title></header>
            <body><ul><li>user 1</li><li>user 2</li></ul></body>
            </html>
        `);
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        console.log('post')
        const body = [];
        req.on('data', (chunk) => {
            console.log(`chunk ${chunk}`)
            body.push(chunk)
        })
        req.on('end', () => {
            console.log(`body ${body}`)
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsed' + parsedBody);
            const newUser = parsedBody.split('=')[1];
            console.log(newUser);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    console.log(req.url, method, req.headers);
    res.write(JSON.stringify(persona));
    res.end();
})

server.listen(3000);