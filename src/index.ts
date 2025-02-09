import { Hono } from 'hono'
import { serve } from 'bun'
import { globals } from './global/globals'
import { log } from './util/log'
import { fileURLToPath } from 'url';
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'
import JSON from '../static/arcane/main.json'

const app = new Hono();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadRoutes() {
    const routesPath = path.join(__dirname, 'routes');

    try {
        const routesPath = path.join(__dirname, 'routes');
        try {
            const routeFiles = await fs.readdir(routesPath);
        }
        catch (err) {
            log.error(`failed to load routes folder: ${err}`)
        }

        for (const fileName of routeFiles) {
            const routePath = path.join(routesPath, fileName);

            try {
                const routeModule = await import(`file://${routePath}`);
                const route = routeModule.default;

                if (route instanceof Hono) {
                    app.route(`/${fileName.replace('.js', '').replace('.ts', '')}`, route);
                    log.router(`route loaded: ${fileName}`);
                } else {
                    log.error(`invalid export in ${fileName}: expected hono instance.`);
                }
            } catch (err) {
                log.error(`error loading route ${fileName}: ${err}`);
            }
        }
    } catch (err) {
        log.error(`failed to read routes directory: ${err}`);
    }
}


serve({
    fetch: app.fetch,
    port: globals.PORT,
});

mongoose
.connect(globals.ConnectionUri)
.then(() => {
    log.database(`successfully connected to mongodb URI: ${globals.ConnectionUri}`);
})
.catch((error) => {
    log.error(`there was an error while connecting: ${error.message}`);
});

log.backend(`${globals.BackendName} listening on http://127.0.0.1:${globals.PORT} !`);

app.get('/', (c) => {
    return c.json(JSON);
});

export default app;
