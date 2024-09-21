import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: error.message});
        
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);   
        return res.status(200).json({
            data: book
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: error.message});
        
    }
})

router.post('/', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ){
            return res.send(400).send({
                message: "incomplete params"
            })
        }
        const newBook ={
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

router.put("/:id", async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ){
            return res.status(400).send({
                message: "incomplete params for put"
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: "book ae not found"});
        }
        return res.status(200).send({message: "book ae uploaded"});

    } catch (error) {
        console.error(error.message);
        res.send(500).send({message: error.message});
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params; 
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "book ae not found"});
        }
        return res.status(200).send({message: "book found and deleted ae"});

    } catch (error) {
        console.error(error.message);
        return res.status(500).send({message: error.message});
    }
})

export default router;