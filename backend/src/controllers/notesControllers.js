export function getNotes(req, res) { 
    res.status(200).send('You just fetched all notes from the notesRoutes!');
}

export function createNotes(req, res) { 
    res.status(201).json({message:'You just created a note from the notesRoutes!'});
}

export function updateNotes(req, res) { 
    res.status(200).json({message:`You just updated note from the notesRoutes!`});
}

export function deleteNotes(req, res) { 
    res.status(200).json({message:`You just deleted note from the notesRoutes!`});
}