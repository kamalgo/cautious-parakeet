const { loadSubCasteCSV, normalizeSubCaste } = require('./normalizeSubcaste');

async function test() {
  await loadSubCasteCSV(); // This loads the CSV into memory

const inputs = [
    "mali",
    "kunbi",
    "mahar",
    "bhil",
    "someunknownsubcaste",
    "Chambhar 11",
    "11Chambhar",
    "11 Chambhar",
    "Bharati Gosavi(1)(5)",
    "Bharati(1)(3)"
  ];
  inputs.forEach(input => {
    const result = normalizeSubCaste(input);
    console.log(`Input: "${input}" → Normalized: "${result}"`);
  });
}

test();
