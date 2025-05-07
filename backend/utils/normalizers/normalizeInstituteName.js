function normalizeInstituteName(input = "") {
    const cleanedInput = input.trim().toLowerCase().replace(/\(\d+\)/g, "");
  
    const instituteMap = {
      "Jaywant College of Engineering & Management, Kille Macchindragad Tal. Walva(6313)": [
        "jaywant college",
        "jaywant college of engineering",
        "jaywant college of engineering & management",
        "jcemsangli",
        "kille macchindragad",
        "walva college",
        "6313"
      ],
      "Annasaheb Dange College of Engineering and Technology, Ashta, Sangli(6283)": [
        "adcet",
        "annasaheb dange college",
        "adcet ashta",
        "6283"
      ]
      // Add more mappings as needed
    };
  
    for (const [canonicalName, variants] of Object.entries(instituteMap)) {
      for (const variant of variants) {
        if (cleanedInput.includes(variant)) {
          return canonicalName;
        }
      }
    }
  
    // Fallback: Clean and capitalize input
    return capitalizeWords(input.trim());
  }
  
  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  module.exports = { normalizeInstituteName };
  