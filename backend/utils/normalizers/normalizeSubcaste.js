// const fs = require("fs");
// const path = require("path");
// const csv = require("csv-parser");
// const levenshtein = require("fast-levenshtein");

// const subCasteMap = {};

// // Safely resolve path for all OS
// const csvPath = path.resolve(__dirname, '../utils/normalizers/subcaste.csv');

// // Load CSV first – must call before using normalizeSubCaste()
// function loadSubCasteCSV() {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(csvPath)
//       .pipe(csv())
//       .on('data', (row) => {
//         if (!row.sub_caste_name) return;

//         // Clean any numeric prefix like (3), (3)(A), etc.
//         const cleaned = row.sub_caste_name
//           .trim()
//           .replace(/^\(\d+\)(\([A-Z]+\))?/, '') // handles (102)(C), (102)
//           .toLowerCase();

//         if (!subCasteMap[cleaned]) {
//           subCasteMap[cleaned] = row.sub_caste_name.trim();
//         }
//       })
//       .on('end', () => {
//         console.log("✅ CSV file successfully processed.");
//         resolve();
//       })
//       .on('error', (err) => {
//         console.error("❌ Error reading CSV:", err.message);
//         reject(err);
//       });
//   });
// }

// // Normalize sub-caste name
// function normalizeSubCaste(input = "") {
//   const originalInput = input.trim();
//   const lowerInput = originalInput.toLowerCase();

//   // Extract any numeric + alpha prefix e.g., (3)(C), (102), etc.
//   const prefixMatch = lowerInput.match(/^\(\d+\)(\([A-Z]+\))?/);
//   const prefix = prefixMatch ? prefixMatch[0] : "";
//   const cleanedInput = lowerInput.replace(/^\(\d+\)(\([A-Z]+\))?/, "").trim();

//   // Direct match
//   if (subCasteMap[cleanedInput]) {
//     return prefix ? `${prefix} ${subCasteMap[cleanedInput]}` : subCasteMap[cleanedInput];
//   }

//   // Fuzzy match if not found
//   let closest = null;
//   let minDistance = Infinity;

//   for (const key in subCasteMap) {
//     const distance = levenshtein.get(cleanedInput, key);
//     if (distance < minDistance) {
//       minDistance = distance;
//       closest = key;
//     }
//   }

//   if (closest) {
//     return prefix ? `${prefix} ${subCasteMap[closest]}` : subCasteMap[closest];
//   }

//   return originalInput; // fallback
// }

// module.exports = {
//   loadSubCasteCSV,
//   normalizeSubCaste
// };

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const levenshtein = require("fast-levenshtein");

const subCasteMap = {};

const csvPath = path.resolve(__dirname, '../utils/normalizers/subcaste.csv');

function loadSubCasteCSV() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (!row.sub_caste_name) return;

        const original = row.sub_caste_name.trim();

        // Extract the name only, without number suffix/prefix
        const cleaned = original
          .replace(/^\(\d+\)(\([A-Z]+\))?/, '')      // remove prefix like (11)
          .replace(/\(\s*\d+\s*\)$/, '')             // remove suffix like ( 11 )
          .trim()
          .toLowerCase();

        // Map to original value
        if (!subCasteMap[cleaned]) {
          subCasteMap[cleaned] = original;
        }
      })
      .on('end', () => {
        console.log("✅ CSV file successfully processed.");
        resolve();
      })
      .on('error', (err) => {
        console.error("❌ Error reading CSV:", err.message);
        reject(err);
      });
  });
}
function normalizeSubCaste(input = "") {
  const cleanedInput = input
    .trim()
    .replace(/^\(\d+\)(\([A-Z]+\))?/, '') // remove prefix
    .replace(/\(\s*\d+\s*\)$/, '')        // remove suffix
    .toLowerCase();

  // Direct match
  if (subCasteMap[cleanedInput]) {
    return subCasteMap[cleanedInput];
  }

  // Fuzzy match
  let closest = null;
  let minDistance = Infinity;

  for (const key in subCasteMap) {
    const distance = levenshtein.get(cleanedInput, key);
    if (distance < minDistance) {
      minDistance = distance;
      closest = key;
    }
  }

  if (closest) {
    return subCasteMap[closest];
  }

  return input; // fallback
}

module.exports = {
  loadSubCasteCSV,
  normalizeSubCaste
};