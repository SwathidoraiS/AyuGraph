// backend/utils/doshaCalculator.js

const doshaMappings = {
  // Characteristics that point to Vata
  vata: {
    bodyFrame: { "thin": 3, "medium": 1, "large": 0 },
    skinType: { "dry": 3, "normal": 1, "oily": 0 },
    hairType: { "frizzy": 3, "fine": 1, "thick": 0 },
    appetiteDigestion: { "irregular": 3, "strong": 1, "slow": 0 },
    sleepPattern: { "light": 3, "moderate": 1, "deep": 0 },
    memory: { "quick": 3, "sharp": 1, "slow": 0 },
    decisionMaking: { "indecisive": 3, "firm": 1, "calm": 0 },
    bowelHabits: { "irregular": 3, "regular": 1, "slow": 0 },
    stressLevels: { "anxious": 3, "irritable": 1, "calm": 0 },
  },

  // Characteristics that point to Pitta
  pitta: {
    bodyFrame: { "thin": 1, "medium": 3, "large": 0 },
    skinType: { "sensitive": 3, "acneProne": 3, "normal": 1, "oily": 0, "dry": 0 },
    hairType: { "thinning": 3, "fine": 1, "thick": 0 },
    appetiteDigestion: { "strong": 3, "slow": 1, "irregular": 0 },
    sleepPattern: { "light": 0, "moderate": 1, "deep": 3 },
    memory: { "sharp": 3, "quick": 1, "slow": 0 },
    decisionMaking: { "decisive": 3, "indecisive": 1, "calm": 0 },
    bowelHabits: { "loose": 3, "regular": 1, "slow": 0 },
    stressLevels: { "irritable": 3, "calm": 1, "anxious": 0 },
  },

  // Characteristics that point to Kapha
  kapha: {
    bodyFrame: { "large": 3, "medium": 1, "thin": 0 },
    skinType: { "oily": 3, "normal": 1, "dry": 0 },
    hairType: { "thick": 3, "fine": 1, "frizzy": 0 },
    appetiteDigestion: { "slow": 3, "moderate": 1, "irregular": 0 },
    sleepPattern: { "deep": 3, "moderate": 1, "light": 0 },
    memory: { "slow": 3, "sharp": 1, "quick": 0 },
    decisionMaking: { "calm": 3, "indecisive": 1, "firm": 0 },
    bowelHabits: { "slow": 3, "regular": 1, "irregular": 0 },
    stressLevels: { "calm": 3, "irritable": 1, "anxious": 0 },
  },
};

export const calculateDoshaScores = (patientData) => {
  let vataScore = 0;
  let pittaScore = 0;
  let kaphaScore = 0;

  for (const key in patientData) {
    const value = patientData[key] ? patientData[key].toLowerCase() : '';

    if (doshaMappings.vata[key] && doshaMappings.vata[key][value] !== undefined) {
      vataScore += doshaMappings.vata[key][value];
    }
    
    if (doshaMappings.pitta[key] && doshaMappings.pitta[key][value] !== undefined) {
      pittaScore += doshaMappings.pitta[key][value];
    }

    if (doshaMappings.kapha[key] && doshaMappings.kapha[key][value] !== undefined) {
      kaphaScore += doshaMappings.kapha[key][value];
    }
  }

  return { vataScore, pittaScore, kaphaScore };
};