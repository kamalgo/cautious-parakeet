const talukas = [
    // Gadchiroli
    "Aheri", "Armori", "Bhamragad", "Chamorshi", "Desaiganj (Vadasa)", "Dhanora", "Etapalli", "Gadchiroli", "Korchi", "Kurkheda", "Mulchera", "Sironcha",
  
    // Raigad
    "Alibag", "Karjat", "Khalapur", "Mahad", "Mangaon", "Mhasla", "Murud", "Panvel", "Pen", "Poladpur", "Roha", "Shrivardhan", "Sudhagad", "Tala", "Uran",
  
    // Solapur
    "Akkalkot", "Barshi", "Karmala", "Madha", "Malshiras", "Mangalvedhe", "Mohol", "Pandharpur", "Sangole", "Solapur North", "Solapur South",
  
    // Dhule
    "Dhule", "Sakri", "Shirpur", "Sindkhede",
  
    // Amravati
    "Achalpur", "Amravati", "Anjangaon Surji", "Bhatkuli", "Chandur Railway", "Chandurbazar", "Chikhaldara", "Daryapur", "Dhamangaon Railway", "Dharni", "Morshi", "Nandgaon-Khandeshwar", "Teosa", "Warud",
  
    // Akola
    "Akola", "Akot", "Balapur", "Barshitakli", "Murtijapur", "Patur", "Telhara",
  
    // Aurangabad
    "Aurangabad", "Gangapur", "Kannad", "khultabad", "Paithan", "Phulambri", "Sillod", "Soygaon", "Vaijapur",
  
    // Beed
    "Ambejogai", "Ashti", "Beed", "Dharur", "Georai", "Kaij", "Manjlegaon", "Parli", "Patoda", "Shirur (Kasar)", "Wadwani",
  
    // Ratnagiri
    "Chiplun", "Dapoli", "Guhagar", "Khed", "Lanja", "Mandangad", "Rajapur", "Ratnagiri", "Sangameshwar",
  
    // Nanded
    "Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Himayatnagar",

     // Nanded
  "Kandhar", "Kinwat", "Loha", "Mahoor", "Mudkhed", "Mukhed", "Naigaon (Khairgaon)", "Nanded", "Umri",

  // Ahmednagar
  "Akole", "Jamkhed", "Karjat", "Kopargaon", "Nagar", "Nevasa", "Parner", "Pathardi", "Rahta", "Rahuri", "Sangamner", "Shevgaon", "Shrigonda", "Shrirampur",

  // Nandurbar & Dhule
  "Akkalkuwa", "Akrani", "Nandurbar", "Nawapur", "Shahade", "Talode",

  // Thane
  "Ambarnath", "Bhiwandi", "Kalyan", "Murbad", "Shahapur", "Thane", "Ulhasnagar",

  // Wardha
  "Arvi", "Ashti", "Deoli", "Hinganghat", "Karanja", "Samudrapur", "Seloo", "Wardha",

  // Washim
  "Karanja", "Malegaon", "Mangrulpir", "Manora", "Risod", "Washim",

  // Gondia
  "Amgaon", "Arjuni Morgaon", "Deori", "Gondiya", "Goregaon", "Sadak-Arjuni", "Salekasa", "Tirora",

  // Osmanabad
  "Bhoom", "Kalamb", "Lohara", "Osmanabad", "Paranda", "Tuljapur", "Umarga", "Washi",

  // Bhandara
  "Bhandara", "Lakhandur", "Lakhani", "Mohadi", "Pauni", "Sakoli", "Tumsar",

  // Kolhapur
  "Ajra", "Bavda", "Bhudargad", "Chandgad", "Gadhinglaj", "Hatkanangle", "Kagal", "Karvir", "Panhala", "Radhanagari", "Shahuwadi", "Shirol",

  // Yavatmal
  "Arni", "Babulgaon", "Darwha", "Digras", "Ghatanji", "Kalamb", "Kelapur", "Mahagaon", "Maregaon", "Ner", "Pusad", "Ralegaon", "Umarkhed", "Wani", "Yavatmal",

   // Gadchiroli
   "Aheri", "Armori", "Bhamragad", "Chamorshi", "Desaiganj (Vadasa)", "Dhanora", "Etapalli", "Gadchiroli", "Korchi", "Kurkheda", "Mulchera", "Sironcha",

   // Raigad
   "Alibag", "Karjat", "Khalapur", "Mahad", "Mangaon", "Mhasla", "Murud", "Panvel", "Pen", "Poladpur", "Roha", "Shrivardhan", "Sudhagad", "Tala", "Uran",
 
   // Solapur
   "Akkalkot", "Barshi", "Karmala", "Madha", "Malshiras", "Mangalvedhe", "Mohol", "Pandharpur", "Sangole", "Solapur North", "Solapur South",
 
   // Dhule
   "Dhule", "Sakri", "Shirpur", "Sindkhede",
 
   // Amravati
   "Achalpur", "Amravati", "Anjangaon Surji", "Bhatkuli", "Chandur Railway", "Chandurbazar", "Chikhaldara", "Daryapur", "Dhamangaon Railway", "Dharni", "Morshi", "Nandgaon-Khandeshwar", "Teosa", "Warud",
 
   // Akola
   "Akola", "Akot", "Balapur", "Barshitakli", "Murtijapur", "Patur", "Telhara",
 
   // Aurangabad
   "Aurangabad", "Gangapur", "Kannad", "khultabad", "Paithan", "Phulambri", "Sillod", "Soygaon", "Vaijapur",
 
   // Beed
   "Ambejogai", "Ashti", "Beed", "Dharur", "Georai", "Kaij", "Manjlegaon", "Parli", "Patoda", "Shirur (Kasar)", "Wadwani",
 
   // Ratnagiri
   "Chiplun", "Dapoli", "Guhagar", "Khed", "Lanja", "Mandangad", "Rajapur", "Ratnagiri", "Sangameshwar",
 
   // Nanded
   "Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Himayatnagar", "Kandhar", "Kinwat", "Loha", "Mahoor", "Mudkhed", "Mukhed", "Naigaon (Khairgaon)", "Nanded", "Umri",
 
   // Ahmednagar
   "Akole", "Jamkhed", "Karjat", "Kopargaon", "Nagar", "Nevasa", "Parner", "Pathardi", "Rahta", "Rahuri", "Sangamner", "Shevgaon", "Shrigonda", "Shrirampur",
 
   // Nandurbar & Dhule
   "Akkalkuwa", "Akrani", "Nandurbar", "Nawapur", "Shahade", "Talode",
 
   // Thane
   "Ambarnath", "Bhiwandi", "Kalyan", "Murbad", "Shahapur", "Thane", "Ulhasnagar",
 
   // Wardha
   "Arvi", "Ashti", "Deoli", "Hinganghat", "Karanja", "Samudrapur", "Seloo", "Wardha",
 
   // Washim
   "Karanja", "Malegaon", "Mangrulpir", "Manora", "Risod", "Washim",
 
   // Gondia
   "Amgaon", "Arjuni Morgaon", "Deori", "Gondiya", "Goregaon", "Sadak-Arjuni", "Salekasa", "Tirora",
 
   // Osmanabad
   "Bhoom", "Kalamb", "Lohara", "Osmanabad", "Paranda", "Tuljapur", "Umarga", "Washi",
 
   // Bhandara
   "Bhandara", "Lakhandur", "Lakhani", "Mohadi", "Pauni", "Sakoli", "Tumsar",
 
   // Kolhapur
   "Ajra", "Bavda", "Bhudargad", "Chandgad", "Gadhinglaj", "Hatkanangle", "Kagal", "Karvir", "Panhala", "Radhanagari", "Shahuwadi", "Shirol",
 
   // Yavatmal
   "Arni", "Babulgaon", "Darwha", "Digras", "Ghatanji", "Kalamb", "Kelapur", "Mahagaon", "Maregaon", "Ner", "Pusad", "Ralegaon", "Umarkhed", "Wani", "Yavatmal",
 
   // Hingoli
   "Zari-Jamani", "Aundha (Nagnath)", "Basmath", "Hingoli", "Kalamnuri", "Sengaon",
 
   // Sindhudurg
   "Devgad", "Dodamarg", "Kankavli", "Kudal", "Malwan", "Sawantwadi", "Vaibhavvadi", "Vengurla",
 
   // Pune
   "Ambegaon", "Baramati", "Bhor", "Daund", "Haveli", "Indapur", "Junnar", "Khed", "Mawal", "Mulshi", "Pune City", "Purandhar", "Shirur", "Velhe",
 
   // Mumbai City (Wards)
   "Ward ABCD", "Ward E", "Ward FNorth", "Ward FSouth", "Ward GNorth", "Ward GSouth",
 
   // Satara
   "Jaoli", "Karad", "Khandala", "Khatav", "Koregaon", "Mahabaleshwar", "Man", "Patan", "Phaltan", "Satara", "Wai",
 
   // Mumbai Suburban
   "Andheri", "Borivali", "Kurla", "Mumbai Suburban",
 
   // Jalna
   "Ambad", "Badnapur", "Bhokardan", "Ghansawangi", "Jafferabad", "Jalna", "Mantha", "Partur",
 
   // Nashik
   "Baglan", "Chandvad", "Deola", "Dindori", "Igatpuri", "Kalwan", "Malegaon", "Nandgaon", "Nashik", "Niphad", "Peint", "Sinnar", "Surgana", "Trimbakeshwar", "Yeola",
 
   // Jalgaon
   "Amalner", "Bhadgaon", "Bhusawal", "Bodwad", "Chalisgaon", "Chopda", "Dharangaon", "Erandol", "Jalgaon", "Jamner", "Muktainagar (Edlabad)", "Pachora", "Parola", "Raver", "Yawal",
 
   // Sangli
   "Atpadi", "Jat", "Kadegaon", "Kavathemahankal", "Khanapur", "Miraj", "Palus", "Shirala", "Tasgaon", "Walwa",
 
   // Latur
   "Ahmadpur", "Ausa", "Chakur",

    // Gadchiroli
  "Aheri", "Armori", "Bhamragad", "Chamorshi", "Desaiganj (Vadasa)", "Dhanora", "Etapalli", "Gadchiroli", "Korchi", "Kurkheda", "Mulchera", "Sironcha",

  // Raigad
  "Alibag", "Karjat", "Khalapur", "Mahad", "Mangaon", "Mhasla", "Murud", "Panvel", "Pen", "Poladpur", "Roha", "Shrivardhan", "Sudhagad", "Tala", "Uran",

  // Solapur
  "Akkalkot", "Barshi", "Karmala", "Madha", "Malshiras", "Mangalvedhe", "Mohol", "Pandharpur", "Sangole", "Solapur North", "Solapur South",

  // Dhule
  "Dhule", "Sakri", "Shirpur", "Sindkhede",

  // Amravati
  "Achalpur", "Amravati", "Anjangaon Surji", "Bhatkuli", "Chandur Railway", "Chandurbazar", "Chikhaldara", "Daryapur", "Dhamangaon Railway", "Dharni", "Morshi", "Nandgaon-Khandeshwar", "Teosa", "Warud",

  // Akola
  "Akola", "Akot", "Balapur", "Barshitakli", "Murtijapur", "Patur", "Telhara",

  // Aurangabad
  "Aurangabad", "Gangapur", "Kannad", "khultabad", "Paithan", "Phulambri", "Sillod", "Soygaon", "Vaijapur",

  // Beed
  "Ambejogai", "Ashti", "Beed", "Dharur", "Georai", "Kaij", "Manjlegaon", "Parli", "Patoda", "Shirur (Kasar)", "Wadwani",

  // Ratnagiri
  "Chiplun", "Dapoli", "Guhagar", "Khed", "Lanja", "Mandangad", "Rajapur", "Ratnagiri", "Sangameshwar",

  // Nanded
  "Ardhapur", "Bhokar", "Biloli", "Deglur", "Dharmabad", "Hadgaon", "Himayatnagar", "Kandhar", "Kinwat", "Loha", "Mahoor", "Mudkhed", "Mukhed", "Naigaon (Khairgaon)", "Nanded", "Umri",

  // Ahmednagar
  "Akole", "Jamkhed", "Karjat", "Kopargaon", "Nagar", "Nevasa", "Parner", "Pathardi", "Rahta", "Rahuri", "Sangamner", "Shevgaon", "Shrigonda", "Shrirampur",

  // Nandurbar & Dhule
  "Akkalkuwa", "Akrani", "Nandurbar", "Nawapur", "Shahade", "Talode",

  // Thane
  "Ambarnath", "Bhiwandi", "Kalyan", "Murbad", "Shahapur", "Thane", "Ulhasnagar",

  // Wardha
  "Arvi", "Ashti", "Deoli", "Hinganghat", "Karanja", "Samudrapur", "Seloo", "Wardha",

  // Washim
  "Karanja", "Malegaon", "Mangrulpir", "Manora", "Risod", "Washim",

  // Gondia
  "Amgaon", "Arjuni Morgaon", "Deori", "Gondiya", "Goregaon", "Sadak-Arjuni", "Salekasa", "Tirora",

  // Osmanabad
  "Bhoom", "Kalamb", "Lohara", "Osmanabad", "Paranda", "Tuljapur", "Umarga", "Washi",

  // Bhandara
  "Bhandara", "Lakhandur", "Lakhani", "Mohadi", "Pauni", "Sakoli", "Tumsar",

  // Kolhapur
  "Ajra", "Bavda", "Bhudargad", "Chandgad", "Gadhinglaj", "Hatkanangle", "Kagal", "Karvir", "Panhala", "Radhanagari", "Shahuwadi", "Shirol",

  // Yavatmal
  "Arni", "Babulgaon", "Darwha", "Digras", "Ghatanji", "Kalamb", "Kelapur", "Mahagaon", "Maregaon", "Ner", "Pusad", "Ralegaon", "Umarkhed", "Wani", "Yavatmal",

  // Hingoli
  "Zari-Jamani", "Aundha (Nagnath)", "Basmath", "Hingoli", "Kalamnuri", "Sengaon",

  // Sindhudurg
  "Devgad", "Dodamarg", "Kankavli", "Kudal", "Malwan", "Sawantwadi", "Vaibhavvadi", "Vengurla",

  // Pune
  "Ambegaon", "Baramati", "Bhor", "Daund", "Haveli", "Indapur", "Junnar", "Khed", "Mawal", "Mulshi", "Pune City", "Purandhar", "Shirur", "Velhe",

  // Mumbai City (Wards)
  "Ward ABCD", "Ward E", "Ward FNorth", "Ward FSouth", "Ward GNorth", "Ward GSouth",

  // Satara
  "Jaoli", "Karad", "Khandala", "Khatav", "Koregaon", "Mahabaleshwar", "Man", "Patan", "Phaltan", "Satara", "Wai",

  // Mumbai Suburban
  "Andheri", "Borivali", "Kurla", "Mumbai Suburban",

  // Jalna
  "Ambad", "Badnapur", "Bhokardan", "Ghansawangi", "Jafferabad", "Jalna", "Mantha", "Partur",

  // Nashik
  "Baglan", "Chandvad", "Deola", "Dindori", "Igatpuri", "Kalwan", "Malegaon", "Nandgaon", "Nashik", "Niphad", "Peint", "Sinnar", "Surgana", "Trimbakeshwar", "Yeola",

  // Jalgaon
  "Amalner", "Bhadgaon", "Bhusawal", "Bodwad", "Chalisgaon", "Chopda", "Dharangaon", "Erandol", "Jalgaon", "Jamner", "Muktainagar (Edlabad)", "Pachora", "Parola", "Raver", "Yawal",

  // Sangli
  "Atpadi", "Jat", "Kadegaon", "Kavathemahankal", "Khanapur", "Miraj", "Palus", "Shirala", "Tasgaon", "Walwa",

  // Latur
  "Ahmadpur", "Ausa", "Chakur", "Deoni", "Jalkot", "Latur", "Nilanga", "Renapur", "Shirur-Anantpal", "Udgir",

  // Buldhana
  "Buldana", "Chikhli", "Deolgaon Raja", "Jalgaon (Jamod)", "Khamgaon", "Lonar", "Malkapur", "Mehkar", "Motala", "Nandura", "Sangrampur", "Shegaon", "Sindkhed Raja",

  // Chandrapur
  "Ballarpur", "Bhadravati", "Brahmapuri", "Chandrapur", "Chimur", "Gondpipri", "Jiwati", "Korpana", "Mul", "Nagbhir", "Pombhurna", "Rajura", "Sawali", "Sindewahi", "Warora",

  // Nagpur
  "Bhiwapur", "Hingna", "Kalameshwar", "Kamptee", "Katol", "Kuhi", "Mauda", "Nagpur (Rural)", "Nagpur (Urban)", "Narkhed", "Parseoni", "Ramtek", "Savner", "Umred",

  // Parbhani
  "Gangakhed", "Jintur", "Manwath", "Parbhani", "Pathri", "Purna", "Sailu", "Sonpeth",

  // Palghar
  "Dahanu", "Jawhar", "Mokhada", "Palghar", "Talasari", "Vada", "Vasai", "Vikramgad"

];
  
  
  function normalizeTaluka(input = "") {
    const cleaned = input.trim().toLowerCase().replace(/[\s\-()]/g, "");
    for (const taluka of talukas) {
      const ref = taluka.toLowerCase().replace(/[\s\-()]/g, "");
      if (cleaned === ref) return taluka;
    }
    return input; // return original if not found
  }
  
  module.exports = { normalizeTaluka };
  