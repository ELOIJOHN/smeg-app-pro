const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// --- Persistance JSON ---

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ collaborators: [] }));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const EMPTY_TASKS = {
  Edge: false, Office: false, Teams: false, SkyRemote: false,
  ZScaler: false, Printers: false, BOX: false, GLPI: false, Intune: false
};

// --- Routes collaborateurs ---

// GET /api/collaborators
app.get('/api/collaborators', (req, res) => {
  const db = readDB();
  res.json(db.collaborators);
});

// POST /api/collaborators
app.post('/api/collaborators', (req, res) => {
  const { name, company, ticket } = req.body;
  if (!name || !company || !ticket) {
    return res.status(400).json({ error: 'name, company et ticket sont requis' });
  }
  const db = readDB();
  const newCollab = {
    id: Date.now(),
    name,
    company,
    ticket: Number(ticket),
    stepReached: 0,
    tasks: { ...EMPTY_TASKS }
  };
  db.collaborators.push(newCollab);
  writeDB(db);
  res.status(201).json(newCollab);
});

// PUT /api/collaborators/:id
app.put('/api/collaborators/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const index = db.collaborators.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Collaborateur introuvable' });
  db.collaborators[index] = { ...db.collaborators[index], ...req.body, id };
  writeDB(db);
  res.json(db.collaborators[index]);
});

// DELETE /api/collaborators/:id
app.delete('/api/collaborators/:id', (req, res) => {
  const id = Number(req.params.id);
  const db = readDB();
  const index = db.collaborators.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: 'Collaborateur introuvable' });
  db.collaborators.splice(index, 1);
  writeDB(db);
  res.status(204).end();
});

// Health check
app.get('/api/health', (req, res) => {
  const db = readDB();
  res.json({ status: 'ok', app: 'SMEG PRO v2.0', collaborators: db.collaborators.length });
});

app.listen(PORT, () => {
  console.log(`SMEG PRO backend running on port ${PORT}`);
});
