import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: any, res: any) => {
  res.send('Hello Typescript Server');
});

app.listen(PORT, () => {
  console.log(`Server running on  port ${PORT}`);
});
