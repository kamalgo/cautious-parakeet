function normalizeCasteCategory(input = "") {
    const caste = input.trim().toLowerCase();
  
    const casteMap = {
      "(OBC) Other Backward Class": ["obc", "other backward class"],
      "(SBC) Special Backward Class": ["sbc", "special backward class"],
      "(SC) Scheduled Caste": ["sc", "scheduled caste"],
      "(ST) Scheduled Tribes": ["st", "scheduled tribes", "schedule tribe"],
      "(VJNT) Vimukta Jat Nomadic Tribes": [
        "vjnt",
        "vimukta",
        "nomadic tribes",
        "vimukta jat","nt", "nt2"
      ],
      "General": ["general", "open", "unreserved"],
      "SEBC": ["sebc", "socially and economically backward"]
    };
  
    for (const [canonical, variants] of Object.entries(casteMap)) {
      if (variants.includes(caste)) {
        return canonical;
      }
    }
  
    // Fallback: Capitalize input
    return capitalizeWords(input);
  }
  
  function capitalizeWords(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  module.exports = { normalizeCasteCategory };
  