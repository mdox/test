import app from "./app";

const { PORT = 5000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server on: http://localhost:${PORT}`);
});
