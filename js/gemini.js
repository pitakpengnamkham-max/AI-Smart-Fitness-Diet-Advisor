import { GoogleGenAI } from 'https://esm.run/@google/genai';

// หมายเหตุ: ในการใช้งานจริงบน Production ควรเรียกผ่าน Backend เพื่อซ่อน API Key
const apiKey = 'YOUR_GEMINI_API_KEY'; 
const ai = new GoogleGenAI({ apiKey });

export async function generateAIPlan(userProfile, metrics) {
  const prompt = `
  ช่วยจัดแผนอาหารและการออกกำลังกายเฉพาะบุคคลสำหรับผู้ใช้ต่อไปนี้:
  - เพศ: ${userProfile.gender}, อายุ: ${userProfile.age} ปี, น้ำหนัก: ${userProfile.weightKg} kg, ส่วนสูง: ${userProfile.heightCm} cm
  - BMR: ${metrics.bmr} kcal, TDEE: ${metrics.tdee} kcal, แคลอรีเป้าหมาย: ${metrics.targetCalories} kcal
  - เป้าหมาย: ${userProfile.goal}
  - ข้อจำกัดการกิน: ${userProfile.dietaryRestrictions || 'ไม่มี'}

  กรุณาสรุป:
  1. ตัวอย่างเมนูอาหาร 1 วัน (เช้า, กลางวัน, เย็น, ของว่าง)
  2. ตารางออกกำลังกายแนะนำประจำสัปดาห์
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ไม่สามารถดึงข้อมูลจาก AI ได้ในขณะนี้";
  }
}