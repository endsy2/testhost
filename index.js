import express from 'express';
import bodyParser from 'body-parser';
import { students } from './data.js';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/get', (req, res) => {
    res.status(200).json({
        data: students,
        message: "success"
    })
})
app.post('/post', (req, res) => {
    const { name, age, grade, email } = req.body;

    if (!name || !age || !grade || !email) {
        res.status(400).json({ message: "must input all field" })
    }
    const id = students.length + 1;
    students.push({ id, name, age, grade, email });
    return res.status(200).json({
        data: students,
        messenge: "successfully"
    })
})
app.put('/put', (req, res) => {
    const { id, name, age, grade, email } = req.body;

    const updateArray = students.filter((element) => {
        return element.id === id;
    })

    if (updateArray.length === 0) {
        return res.status(400).json({ message: "don't have this id" })
    }
    updateArray[0].name = name;
    updateArray[0].age = age;
    updateArray[0].grade = grade;
    updateArray[0].email = email;

    students.map((element, index) => {
        if (element.id === id) {
            students[index].name = name;
            students[index].age = age;
            students[index].grade = grade;
            students[index].email = email;
        }
    })
    return res.status(200).json({
        data: students,
        message: "successfully"
    })
})
app.delete('/delete', (req, res) => {
    students.length = 0;
    return res.status(200).json({
        data: students,
        message: "successfully"
    })
})
app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})