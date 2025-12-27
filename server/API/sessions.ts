import express from "express"
import { ISessionManager, SessionManagerError, NotFoundError, InvalidSessionError } from "../SessionManager/ISessionManager";
import { error } from "node:console";

const app = express();
const port = 3000;
// const sessionManager: ISessionManager = new ...();

// GET /sessions/:id
app.get('/sessions/:id', async (req, res) => {
    // TODO
});

// GET /sessions
// ***** Handles query filters
app.get('/sessions', (req, res) => {
    // TODO
});

// POST /sessions
app.post('/sessions', async (req, res) => {
    // TODO
})

// PUT /sessions/:id
app.put('/sessions/:id', (req, res) => {
    // TODO
});

// DELETE /sessions/:id
app.delete('/sessions/:id', (req, res) => {
    // TODO
});