function normalizeDistrict(input = "") {
    const district = input.trim().toLowerCase();
  
    // Define known variations mapped to canonical names
    const districtMap = {
        mumbai: ["mumbai", "bombay", "mumbay", "mumbai city", "mumbai (city)"],
        "mumbai suburban": ["mumbai suburban", "mumbai subarban", "mumbai suburbs", "mumbai sub"],
        pune: ["pune", "poona"],
        thane: ["thane", "thanee"],
        palghar: ["palghar", "palgahr"],
        raigad: ["raigad", "raigarh", "raigadh"],
        ratnagiri: ["ratnagiri", "ratnagary"],
        sindhudurg: ["sindhudurg", "sindhudurga", "sindhudarg"],
        nagpur: ["nagpur", "nagpoor"],
        chandrapur: ["chandrapur", "chandrapoor"],
        gadchiroli: ["gadchiroli", "gadhchiroli"],
        wardha: ["wardha", "warda"],
        bhandara: ["bhandara", "bhandra"],
        gondia: ["gondia", "gondiya", "gondiya"],
        amravati: ["amravati", "amrawati"],
        akola: ["akola", "akolla"],
        buldhana: ["buldhana", "buldana", "buldhna"],
        washim: ["washim", "vasim"],
        yavatmal: ["yavatmal", "yeotmal", "yawatmal"],
        aurangabad: ["aurangabad", "aurungabad"],
        jalna: ["jalna", "jalana"],
        nanded: ["nanded", "nandad"],
        hingoli: ["hingoli", "hingolee"],
        parbhani: ["parbhani", "parbhany"],
        beed: ["beed", "bid"],
        latur: ["latur", "laaturr"],
        osmanabad: ["osmanabad", "usmanabad"],
        nashik: ["nashik", "nasik"],
        dhule: ["dhule", "dhoola"],
        nandurbar: ["nandurbar", "nandurbaar"],
        jalgaon: ["jalgaon", "jalgoan"],
        ahmednagar: ["ahmednagar", "ahmadnagar"],
        solapur: ["solapur", "sholapur"],
        satara: ["satara", "satra"],
        sangli: ["sangli", "sanglee"],
        kolhapur: ["kolhapur", "kolhapoor"]
      };
      
  
    // Search for match
    for (const [canonical, variants] of Object.entries(districtMap)) {
      if (variants.includes(district)) {
        return capitalizeWords(canonical);
      }
    }
  
    return capitalizeWords(input); // fallback to cleaned input
  }
  
  // Helper to capitalize words like "mumbai suburban" → "Mumbai Suburban"
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  module.exports = { normalizeDistrict };
  