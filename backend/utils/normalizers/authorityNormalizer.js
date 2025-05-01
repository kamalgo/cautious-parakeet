function normalizeAuthority(input = "") {
    const authority = input.trim().toLowerCase();
  
    if (/sub\s*divisional\s*officer|s\.?d\.?o\.?/i.test(authority)) {
      return "Sub Divisional Officer(SDO)";
    }
  
    if (/tahsildar|tehsildar/i.test(authority)) {
      return "Tahsildar(Tehsildar)";
    }
  
    if (/naib\s*tahsildar|n\.?t\.?/i.test(authority)) {
      return "Naib Tahsildar(NT)";
    }
  
    if (/talathi/i.test(authority)) {
      return "Talathi";
    }
  
    if (/district\s*collector/i.test(authority)) {
      return "District Collector";
    }
  
    return input;
  }
  
  module.exports = { normalizeAuthority };
  