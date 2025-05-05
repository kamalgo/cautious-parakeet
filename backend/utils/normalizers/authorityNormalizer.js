function normalizeAuthority(input = "") {
  const authority = input.trim().toLowerCase();

  // Match full phrase "Sub-Divisional Officer/ Dy. Collector"
  if (/sub[-\s]*divisional\s*officer\s*\/\s*dy\.?\s*collector/i.test(authority)) {
    return "Sub-Divisional Officer/ Dy. Collector";
  }

  // Match just "Sub Divisional Officer" or abbreviations like SDO (but not the above case)
  if (
    /\bsub\s*divisional\s*officer\b(?!.*dy\.?\s*collector)/i.test(authority) ||
    /\bs\.?d\.?o\.?\b(?!.*dy\.?\s*collector)/i.test(authority)
  ) {
    return "Sub Divisional Officer(SDO)";
  }

  // Match Executive Magistrate
  if (/executive\s*magistrate/i.test(authority)) {
    return "Executive Magistrate";
  }

  // Match Tahsildar / Tehsildar
  if (/tahsildar|tehsildar/i.test(authority)) {
    return "Tahsildar";
  }

  // Match Nayab Tahsildar / Naib Tahsildar / NT
  if (/naib\s*tahsildar|nayab\s*tahsildar|\bn\.?t\.?\b/i.test(authority)) {
    return "Nayab Tahsildar";
  }

  return input; // Return original input if no match found
}

module.exports = { normalizeAuthority };
