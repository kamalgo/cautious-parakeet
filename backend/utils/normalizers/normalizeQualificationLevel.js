function normalizeQualificationLevel(input = "") {
    const course = input.trim().toLowerCase();
  
    const courseTypeMap = {
      "Certificate Courses": ["certificate course", "certificate courses", "certification"],
      "Diploma Course": ["diploma", "diploma course"],
      "DUAL Degree": ["dual degree", "duel degree", "dual-degree"],
      "Ph.D": ["ph.d", "phd", "doctorate", "ph.d."],
      "Post Graduate Certificate": ["pg certificate", "post graduate certificate"],
      "Post Graduate Course": ["post graduate course", "pg course", "postgrad"],
      "Post Graduate Diploma Course": [
        "post graduate diploma", "pg diploma", "post graduate diploma course"
      ],
      "Under Graduate Course": ["undergraduate", "under graduate", "ug course", "under graduate course"],
      "Under Graduate Course for Sainiki": [
        "under graduate sainik", "ug sainik", "under graduate course for sainiki"
      ],
      "Vocational Course": ["vocational course", "skill based course", "vocational"],
      "F.Y.J.C (11th Std)": ["fyjc", "f.y.j.c", "f.y.j.c(11 std)", "11th std", "11 std", "first year junior college"],
      "H.S.C. (12th Std)": ["hsc", "h.s.c", "h.s.c.(12 std)", "12th std", "12 std", "higher secondary"]
    };
  
    for (const [canonical, variants] of Object.entries(courseTypeMap)) {
      if (variants.includes(course)) {
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
  
  module.exports = { normalizeQualificationLevel };
  