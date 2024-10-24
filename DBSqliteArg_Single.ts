import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Function to create a new database and table if they do not exist
function initializeDatabase(db: DB) {
  db.execute(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);
}

// Function to insert a name into the database
function insertName(db: DB, name: string) {
  db.query("INSERT INTO people (name) VALUES (?)", [name]);
  console.log(`Added name: ${name}`);
}

// Function to print out all names in the table
function printAllNames(db: DB) {
  console.log("Names in the database:");
  for (const [name] of db.query("SELECT name FROM people")) {
    console.log(name);
  }
}

// Main function to run the database operations
async function main() {
  // Open a database
  const db = new DB("test.db");

  // Initialize the database and table
  initializeDatabase(db);

  // Check if a name was provided as an argument
  if (Deno.args.length > 0) {
    const name = Deno.args[0];
    insertName(db, name);
    
    // Print out all names in the table
    printAllNames(db);
  } else {
    console.log("No name provided. Please add a name as a command-line argument.");
  }

  // Close the connection
  db.close();
}

// Run the main function
main();
