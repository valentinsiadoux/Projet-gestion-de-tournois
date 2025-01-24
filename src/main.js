import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

const fs = require('fs');

/**
 * Creates a JSON file with the specified data.
 * 
 * @param {string} folderPath - The path to the folder where the JSON file will be created.
 * @param {string} dataFileName - The name of the JSON file to be created (without extension).
 * @param {Object} data - The data to be written to the JSON file.
 */
function createJsonFile(folderPath, dataFileName, data) {
    // Construct the full file path by combining the folder path and the file name with .json extension
    const filePath = `${folderPath}/${dataFileName}.json`;

    // Write the data to the file in JSON format with 2-space indentation
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File has been created');
        }
    });
}

/**
 * Modifies a JSON file with new data.
 * 
 * @param {string} filePath - The path to the JSON file to be modified.
 * @param {Object} newData - The new data to be merged into the JSON file.
 * @returns {Promise<void>} A Promise that resolves when the file has been updated.
 */
function modifyJsonFile(filePath, newData) {
    // Read the existing data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Log an error message if there was an issue reading the file
            console.error('Error reading file:', err);
            return;
        }

        // Parse the existing data into a JavaScript object
        let jsonData = JSON.parse(data);

        // Merge the new data into the existing data
        Object.assign(jsonData, newData);

        // Write the updated data back to the JSON file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                // Log an error message if there was an issue writing the file
                console.error('Error writing file:', err);
            } else {
                // Log a success message if the file was updated successfully
                console.log('File has been updated');
            }
        });
    });
}

module.exports = { createJsonFile, modifyJsonFile };