// getSerialNumber.ts

async function getBiosSerialNumber() {
  try {
    // Run the PowerShell command to get the BIOS serial number
    const command = [
      "powershell",
      "-Command",
      "Get-WmiObject Win32_BIOS | Select-Object -ExpandProperty SerialNumber"
    ];

    // Create a new process to run the command
    const process = Deno.run({
      cmd: command,
      stdout: "piped", // Capture the output
      stderr: "piped", // Capture any error messages
    });

    // Wait for the process to finish and capture the output
    const { code } = await process.status();
    const rawOutput = await process.output(); // Get stdout
    const rawError = await process.stderrOutput(); // Get stderr

    // Decode the output and error messages
    const output = new TextDecoder().decode(rawOutput);
    const error = new TextDecoder().decode(rawError);

    // Close the process
    process.close();

    // Check for errors
    if (code !== 0) {
      console.error("Error:", error);
      return;
    }

    // Print the BIOS serial number
    console.log("BIOS Serial Number:", output.trim());
  } catch (err) {
    console.error("Failed to execute command:", err);
  }
}

// Main function to execute the script
async function main() {
  await getBiosSerialNumber();
}

// Run the main function
main();
