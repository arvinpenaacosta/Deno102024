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

// Function to insert names into the database
function insertNames(db: DB, names: string[]) {
  for (const name of names) {
    db.query("INSERT INTO people (name) VALUES (?)", [name.trim()]);
    console.log(`Added name: ${name.trim()}`);
  }
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

  // Check if any names were provided as arguments
  if (Deno.args.length > 0) {
    // Join all arguments into a single string and split by comma or pipe
    const names = Deno.args.join(" ").split(/[,|]/).map(name => name.trim()).filter(name => name);

    // Insert names into the database
    insertNames(db, names);
    
    // Print out all names in the table
    printAllNames(db);
  } else {
    console.log("No names provided. Please add names as command-line arguments.");
  }

  // Close the connection
  db.close();
}

// Run the main function
main();
