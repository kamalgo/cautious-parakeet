function normalizeStream(input = "") {
    const stream = input.trim().toLowerCase();
  
    const streamMap = {
      "Arts": ["arts", "art"],
      "Commerce": ["commerce", "com"],
      "Science": ["science", "sci"],
      "Agriculture": ["agriculture", "agri"],
      "Architecture and Town Planning": ["architecture", "town planning", "architecture and town planning"],
      "Commerce & Management": ["commerce and management", "commerce & management", "com & mgmt"],
      "Design": ["design", "fashion design", "interior design"],
      "Education": ["education", "b.ed", "teaching"],
      "Engineering": ["engineering", "engg", "engg group"],
      "Engineering Machine Group": ["engineering machine group", "machine group"],
      "Engineering Non Machine Group": ["engineering non machine group", "non machine group"],
      "Eye Care Optometrists": ["optometry", "optometrist", "eye care", "eye care optometrists"],
      "Fine Art(Visual Art)": ["fine art", "visual art", "fine art(visual art)"],
      "Health Science": ["health science", "healthcare", "medical"],
      "Hotel Management and Catering": ["hotel management", "catering", "hmct", "hotel management and catering"],
      "Humanities and Social Sciences": ["humanities", "social sciences", "humanities and social sciences"],
      "Interdisciplinary": ["interdisciplinary", "multi-disciplinary", "inter-discipline"],
      "Management": ["management", "bba", "mba"],
      "MCA": ["mca", "master of computer applications"],
      "Non Engineering Group": ["non engineering", "non engineering group"],
      "Non-AICTE": ["non aicte", "non-aicte"],
      "Nursing": ["nursing", "bsc nursing", "gnm"],
      "Other": ["other", "misc", "general"],
      "Pharmacy": ["pharmacy", "b.pharm", "d.pharm"],
      "Physical Education": ["physical education", "b.p.ed", "p.e."],
      "Science Technology": ["science technology", "science & tech", "sci tech"],
      "Social Work": ["social work", "msw", "b sw"],
      "Veterinary": ["veterinary", "animal science", "vet"],
      "SSC": ["ssc", "10th", "secondary school certificate"],
      "Under Graduate": ["undergraduate", "ug"],
      "Post Graduate": ["postgraduate", "pg"]
    };
  
    for (const [canonical, variants] of Object.entries(streamMap)) {
      if (variants.includes(stream)) {
        return canonical;
      }
    }
  
    return capitalizeWords(input); // fallback to cleaned input
  }
  
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  module.exports = { normalizeStream };
  