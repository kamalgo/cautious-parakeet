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

const subCasteMap = new Map();        // full raw map
const nameOnlyMap = new Map();        // "chambhar" => fullValue
const fullEntryList = [];             // list of all full values (for code+name logic)

const casteColumns = [
  "Obc",
  "(SBC) Special",
  "(SC)Scheduled Cast",
  "(ST) Scheduled Tribes",
  "(VJNT)Vimukta Jati and Nomadic Tribes",
  "SEBC"
];

const csvPath = path.resolve(__dirname, "subcaste.csv");
console.log("Resolved CSV Path:", csvPath);

function loadSubCasteCSV() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        casteColumns.forEach((col) => {
          const value = row[col];
          if (!value) return;

          const trimmedValue = value.trim();
          const cleanedName = trimmedValue
            .replace(/\(\d+\)/g, "")   // remove (number)
            .replace(/[^a-zA-Z ]/g, "") // remove special chars
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "");

          if (!nameOnlyMap.has(cleanedName)) {
            nameOnlyMap.set(cleanedName, trimmedValue);
          }

          fullEntryList.push(trimmedValue);
        });
      })
      .on("end", () => {
        console.log("✅ CSV file successfully processed.");
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ Error reading CSV:", err.message);
        reject(err);
      });
  });
}

function normalizeSubCaste(input = "") {
  const originalInput = input.trim();

  const inputCodes = [...originalInput.matchAll(/\d+/g)].map(m => m[0]);
  const inputName = originalInput
    .replace(/\d+/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase()
    .trim();

  // 1. Try direct match: name + all codes must match
  for (const entry of fullEntryList) {
    const entryCodes = [...entry.matchAll(/\d+/g)].map(m => m[0]);
    const entryName = entry
      .replace(/\(\d+\)/g, "")
      .replace(/[^a-zA-Z]/g, "")
      .toLowerCase()
      .trim();

    const codesMatch = inputCodes.every(code => entryCodes.includes(code));
    const nameMatch = entryName === inputName;

    if (codesMatch && nameMatch) {
      return entry;
    }
  }

  // 2. Try name-only match
  if (nameOnlyMap.has(inputName)) {
    return nameOnlyMap.get(inputName);
  }

  // 3. Fuzzy fallback on name
  let closest = null;
  let minDistance = Infinity;

  for (const [key, value] of nameOnlyMap.entries()) {
    const distance = levenshtein.get(inputName, key);
    if (distance < minDistance) {
      minDistance = distance;
      closest = value;
    }
  }

  return closest || originalInput;
}

module.exports = {
  loadSubCasteCSV,
  normalizeSubCaste
};
