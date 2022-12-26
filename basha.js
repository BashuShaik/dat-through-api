const express = require("express");

const app = express();

const sqlite3 = require("sqlite3");

const { open } = require("sqlite");

const path = require("path");

const dbpath = path.join(__dirname, "goodreads.db");

let temp = null;

const result = async () => {
  try {
    temp = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is Running");
    });
  } catch (e) {
    console.log(`Database Error: ${e.message}`);
    process.exit(1);
  }
};

result();

app.get("/books/", async (request, response) => {
  const getBooks = `SELECT * FROM book ORDER BY book_id;`;

  const booksArray = await temp.all(getBooks);
  response.send(booksArray);
});
