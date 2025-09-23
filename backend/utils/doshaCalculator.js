// backend/utils/doshaCalculator.js

const doshaVata = {
  // Mind and Body Attributes
  bodyFrame: ['thin', 'slender'],
  skinType: ['dry', 'rough', 'cracked'],
  hairType: ['dry', 'brittle', 'curly'],
  pulseType: ['thready', 'weak'],
  appetiteDigestion: ['irregular', 'gassy', 'bloated', 'constipation'],
  bowelHabits: ['irregular', 'constipation'],
  energyLevels: ['fluctuating', 'variable'],
  sleepPattern: ['light', 'interrupted', 'insomnia'],
  stressLevels: ['anxious', 'fearful'],
  memory: ['short-term', 'quick to learn, quick to forget'],
  decisionMaking: ['indecisive'],
  preferredTastes: ['sweet', 'sour', 'salty'],
  cravings: ['warm food', 'moist food'],
  lifestyle: ['active', 'spontaneous'],
  exercise: ['light'],
  waterIntake: ['low'],
};

const doshaPitta = {
  // Mind and Body Attributes
  bodyFrame: ['medium', 'athletic'],
  skinType: ['oily', 'acne-prone', 'sensitive'],
  hairType: ['fine', 'straight', 'prematurely grey'],
  pulseType: ['strong', 'jumping'],
  appetiteDigestion: ['strong', 'sharp', 'acidic reflux'],
  bowelHabits: ['loose stools', 'regular'],
  energyLevels: ['strong', 'focused'],
  sleepPattern: ['moderate', 'sound'],
  stressLevels: ['irritable', 'angry'],
  memory: ['sharp', 'clear'],
  decisionMaking: ['decisive', 'driven'],
  preferredTastes: ['sweet', 'bitter', 'astringent'],
  cravings: ['cold food', 'bitter food'],
  lifestyle: ['ambitious', 'goal-oriented'],
  exercise: ['moderate'],
  waterIntake: ['high'],
};

const doshaKapha = {
  // Mind and Body Attributes
  bodyFrame: ['large', 'sturdy', 'stocky'],
  skinType: ['smooth', 'oily', 'pale', 'cool'],
  hairType: ['thick', 'wavy', 'oily'],
  pulseType: ['slow', 'steady'],
  appetiteDigestion: ['slow', 'sluggish'],
  bowelHabits: ['slow', 'regular'],
  energyLevels: ['steady', 'enduring'],
  sleepPattern: ['deep', 'long'],
  stressLevels: ['calm', 'lethargic'],
  memory: ['long-term', 'slow to learn, but retains well'],
  decisionMaking: ['slow', 'thoughtful'],
  preferredTastes: ['pungent', 'bitter', 'astringent'],
  cravings: ['spicy food', 'dry food'],
  lifestyle: ['calm', 'methodical'],
  exercise: ['low', 'slow'],
  waterIntake: ['low'],
};

export const calculateDoshaScores = (patientData) => {
  let vataScore = 0;
  let pittaScore = 0;
  let kaphaScore = 0;

  for (const key in patientData) {
    if (typeof patientData[key] === 'string') {
      const patientValue = patientData[key].toLowerCase().trim();

      // Check for Vata matches
      if (doshaVata[key] && doshaVata[key].includes(patientValue)) {
        vataScore++;
      }
      
      // Check for Pitta matches
      if (doshaPitta[key] && doshaPitta[key].includes(patientValue)) {
        pittaScore++;
      }

      // Check for Kapha matches
      if (doshaKapha[key] && doshaKapha[key].includes(patientValue)) {
        kaphaScore++;
      }
    }
  }

  return { vataScore, pittaScore, kaphaScore };
};