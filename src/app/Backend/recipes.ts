const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');

admin.initializeApp();

const app = express();

const db = admin.firestore();

// Create a new recipe
app.post('/recipes', async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { id?: any; error?: string; }): void; new(): any; }; }; }) => {
    try {
        const recipe = req.body;
        const newRecipeRef = await db.collection('recipes').add(recipe);
        res.status(201).json({ id: newRecipeRef.id });
    } catch (error) {
        console.error('Error adding recipe: ', error);
        res.status(500).json({ error: 'Could not add recipe' });
    }
});

// Get all recipes
app.get('/recipes', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const snapshot = await db.collection('recipes').get();
        const recipes = snapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
        res.json(recipes);
    } catch (error) {
        console.error('Error getting recipes: ', error);
        res.status(500).json({ error: 'Could not get recipes' });
    }
});

// Get a single recipe by ID
app.get('/recipes/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; json: (arg0: any) => void; }) => {
    try {
        const recipeId = req.params.id;
        const recipeDoc = await db.collection('recipes').doc(recipeId).get();
        if (!recipeDoc.exists) {
            res.status(404).json({ error: 'Recipe not found' });
        } else {
            res.json({ id: recipeDoc.id, ...recipeDoc.data() });
        }
    } catch (error) {
        console.error('Error getting recipe: ', error);
        res.status(500).json({ error: 'Could not get recipe' });
    }
});

// Update a recipe by ID
app.put('/recipes/:id', async (req: { params: { id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const recipeId = req.params.id;
        const updatedRecipe = req.body;
        await db.collection('recipes').doc(recipeId).update(updatedRecipe);
        res.status(204).end();
    } catch (error) {
        console.error('Error updating recipe: ', error);
        res.status(500).json({ error: 'Could not update recipe' });
    }
});

// Delete a recipe by ID
app.delete('/recipes/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const recipeId = req.params.id;
        await db.collection('recipes').doc(recipeId).delete();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting recipe: ', error);
        res.status(500).json({ error: 'Could not delete recipe' });
    }
});

exports.api = functions.https.onRequest(app);
