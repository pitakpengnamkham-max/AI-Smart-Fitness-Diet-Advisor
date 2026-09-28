export function calculateHealthMetrics({ gender, age, weightKg, heightCm, activityLevel, goal }) {
  // 1. BMI
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  
  // 2. BMR (Mifflin-St Jeor)
  const baseBMR = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  const bmr = Math.round(gender === 'male' ? baseBMR + 5 : baseBMR - 161);

  // 3. TDEE
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  const tdee = Math.round(bmr * (activityFactors[activityLevel] || 1.2));

  // 4. Target Calories & Macros
  let targetCalories = tdee;
  if (goal === 'weight_loss') targetCalories = tdee - 500;
  if (goal === 'muscle_gain') targetCalories = tdee + 300;

  const proteinGrams = Math.round(weightKg * 2); // 2g ต่อน้ำหนักตัว 1kg
  const fatGrams = Math.round((targetCalories * 0.25) / 9); // ไขมัน 25% ของพลังงาน
  const carbGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);

  return { bmi, bmr, tdee, targetCalories, proteinGrams, carbGrams, fatGrams };
}