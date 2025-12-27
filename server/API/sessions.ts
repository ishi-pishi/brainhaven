import express from "express"
import { ISessionManager, SessionManagerError, NotFoundError, InvalidSessionError } from "../SessionManager/ISessionManager";
import { LocalSessionFacade } from "../SessionManager/LocalSessionFacade";
import { error } from "node:console";

const app = express();
const port = 3000;
const sessionManager: ISessionManager = new LocalSessionFacade();

// GET /sessions/:id
app.get('/sessions/:id', async (req, res) => {
    try {
        const session = await sessionManager.loadSessionById(req.params.id);
        res.json(session);
    } catch (e: any) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({ error: e.message });
        } else if (e instanceof InvalidSessionError) {
            return res.status(400).json({ error: e.message });
        } else {
            return res.status(500).json({ error: e.message });
        }
    }
});

// GET /sessions
// ***** Handles query filters
app.get('/sessions', (req, res) => {
    // TODO
});

// POST /sessions
app.post('/sessions', async (req, res) => {
    try {
        const newSession = req.body;
        await sessionManager.saveSession(newSession);
        res.status(201).json(newSession); 
    } catch (e: any) {
        if (e instanceof InvalidSessionError) {
            return res.status(400).json({ error: e.message });
        }

        return res.status(500).json({ error: e.message });
    }
})

// PUT /sessions/:id
app.put('/sessions/:id', (req, res) => {
    try {

    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
});

// DELETE /sessions/:id
app.delete('/sessions/:id', (req, res) => {
    try {

    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
});