const cl = console.log;
const port = 3000;
const app = require('./product');

app.listen(port, () => {
    cl(`Server is running on Port ${port}`);
})