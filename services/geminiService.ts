
import { GoogleGenAI } from "@google/genai";

export const getInvestigatorHint = async (stage: string, context: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `
คุณคือ "ผู้เฝ้าดูแห่งสี่ทิศ" (Watcher of the Four Directions)
นักสืบนิติวิทยาศาสตร์ผู้สาบานตนว่าจะถอดรหัสพิธีกรรมที่ซ่อนอยู่ในระบบ

ผู้แสวงหาความจริงกำลังเผชิญหน้ากับทิศ "${stage}"
ทิศนี้ปกครองกฎแห่งความมั่นคงที่เฉพาะเจาะจง
และไม่สามารถผ่านไปได้โดยปราศจากความเข้าใจที่ลึกซึ้ง

บริบท:
${context}

จงให้คำใบ้ที่ซ่อนเงื่อน — ห้ามบอกคำตอบโดยตรง —
โดยใช้การเปรียบเปรยถึงทิศทาง ความสมดุล การเข้าถึง และผลลัพธ์ที่ตามมา
คำพูดของคุณควรให้ความรู้สึกเหมือนพิธีกรรม เคร่งขรึม และน่าเกรงขาม
เพื่อนำทางผู้แสวงหาไปสู่ความจริงขั้นต่อไป

**ตอบเป็นภาษาไทยเท่านั้น**
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "การเชื่อมต่อกับฐานข้อมูลขัดข้อง... ความจริงยังถูกปิดบังด้วยเงามืด";

  } catch (error) {
    console.error("Gemini Hint Error:", error);
    return "สัญญาณรบกวนหนาเกินกว่าจะติดต่อฐานข้อมูลได้... จงใช้ปัญญาของคุณเองเถิด";
  }
};
