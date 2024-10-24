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
async function insertName(db: DB) {
  const name = prompt("Please enter your name:");
  if (name) {
    db.query("INSERT INTO people (name) VALUES (?)", [name]);
    console.log(`Added name: ${name}`);
  } else {
    console.log("No name entered.");
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

  // Confirm if the user wants to proceed
  const shouldProceed = confirm("Do you want to proceed with adding a name?");
  if (shouldProceed) {
    // Insert a name into the database
    await insertName(db);
  
    // Print out all names in the table
    printAllNames(db);
  } else {
    console.log("Operation cancelled.");
  }

  // Close the connection
  db.close();
}

// Run the main function
main();
