import { GoogleGenAI } from "@google/genai";
import { FortuneRecord } from '../types';

// Initialize the API client
// Note: In a real production app, you might proxy this through a backend to protect the key,
// but for this frontend demo, we use the env variable directly as instructed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWeeklyReport = async (records: FortuneRecord[]): Promise<string> => {
  const model = "gemini-2.5-flash"; // Good balance of speed and reasoning for text summary
  
  if (records.length === 0) {
    return "本周没有足够的占卜记录来生成报告。多和小绿茶聊聊吧！";
  }

  const recordText = records.map(r => 
    `- 日期: ${r.date}, 主题: ${r.topic}, 心情指数: ${r.moodScore}, 结果摘要: ${r.summary}`
  ).join("\n");

  const prompt = `
    你是一个名叫"小绿茶"的神秘占卜AI玩偶。
    请根据用户过去一周的占卜记录，生成一份周运势总结报告。
    
    风格要求：
    1. 语气要带一点点傲娇和神秘，像一个古灵精怪的茶系少女。
    2. 分析用户的心情变化趋势。
    3. 给出下周的一个简短建议（"绿茶箴言"）。
    4. 不要太长，控制在300字以内。
    
    用户记录如下：
    ${recordText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text || "哎呀，星象有点模糊，小绿茶暂时看不清呢。请稍后再试。";
  } catch (error) {
    console.error("Error generating report:", error);
    return "连接宇宙能量失败（网络错误），请检查网络设置。";
  }
};