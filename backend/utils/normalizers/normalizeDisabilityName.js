function normalizeDisabilityName(input = "") {
    const disability = input.trim().toLowerCase();
  
    const disabilityMap = {

      "Blindness": ["blind", "blindness", "vision loss", "completely blind"],

      "Low Vision": ["low vision", "partial blindness", "weak eyesight", "partially blind"],

      "Hearing Impairment (Deaf and Hard of Hearing)": [
        "hearing impairment", "deaf", "hard of hearing", "hearing loss"
      ],

      "Leprosy Cured Persons": ["leprosy", "leprosy cured", "leprosy cured persons"],

      "Locomotor Disability": ["locomotor", "locomotor disability", "mobility disability"],

      "Mental Illness": ["mental illness", "psychological disorder", "mental disorder"],

      "Mental Retardation": ["mental retardation", "retarded", "mr", "intellectual delay"],

      "Severly Handicapped": ["severely handicapped", "severe disability"],

      "Severly Orthopaedically Handicapped": [
        "severely orthopaedically handicapped",
        "orthopedic disability",
        "orthopaedic handicap"
      ],

      "Dwarfism": ["dwarfism", "short stature"],

      "Intellectual Disability": ["intellectual disability", "cognitive disability"],

      "Autism Spectrum Disorder": ["autism", "asd", "autism spectrum"],

      "Cerebral Palsy": ["cerebral palsy", "cp disorder"],

      "Muscular Dystrophy": ["muscular dystrophy", "muscle weakness disorder"],

      "Chronic Neurological Conditions": [
        "chronic neurological conditions", "neurological disorder", "brain disorder"
      ],

      "Specific Learning Disabilities": [
        "specific learning disabilities", "learning disability", "dyslexia", "adhd"
      ],

      "Multiple Sclerosis": ["multiple sclerosis", "ms"],

      "Speech and Language Disability": [
        "speech disability", "language disorder", "speech impairment", "speech and language disability"
      ],

      "Thalassemia": ["thalassemia", "thalasaemia"],

      "Hemophilia": ["hemophilia", "haemophilia"],

      "Sickle Cell Disease": ["sickle cell", "sickle cell disease"],

      "Multiple Disabilities (more than one of the above specified disabilities)": [
        "multiple disabilities", "multiple handicap", "more than one disability"
      ],

      "Acid Attack Victim": ["acid attack", "acid attack victim"],

      "Parkinsons Disease": ["parkinsons", "parkinson's", "parkinson's disease"]

    };
  
    for (const [canonical, variants] of Object.entries(disabilityMap)) {
      if (variants.includes(disability)) {
        return canonical;
      }
    }
  
    return capitalizeWords(input); // fallback to cleaned input
  }
  
  // Capitalize each word
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  module.exports = { normalizeDisabilityName };
  