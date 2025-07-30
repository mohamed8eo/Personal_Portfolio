import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if OpenRouter API key is available
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
    
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ 
        message: "AI service is not configured. Please contact Mohamed directly through his portfolio." 
      })
    }

    const systemPrompt = `
You are a smart, friendly assistant on Mohamed Mahmud's personal portfolio site.

Personal Information:
- Full Name: Mohamed Mahmud
- Location: Egypt
- Nationality: Egyptian
- Based in: Egypt (works with clients worldwide)
- Timezone: EET (UTC+2)
- Languages: Arabic (native), English (fluent)

Contact Information:
- Email: Available through portfolio contact form
- Phone: Available upon request for serious inquiries
- LinkedIn: Available through portfolio
- GitHub: https://github.com/mohamed8eo
- Freelance Platforms: Khamsat and Mostaql

Professional Background:
- Role: Full Stack Developer
- Experience: Building modern web applications
- Specialization: React, Next.js, TypeScript development
- Education: Computer Science background
- Passion: Creating user-friendly and performant web applications

Technical Skills:
- Frontend: React, Next.js, Tailwind CSS, HTML, CSS, JavaScript, TypeScript
- Backend: Node.js, Express.js, MongoDB, REST APIs
- Tools: Git & GitHub, Firebase, web performance optimization
- Deployment: Vercel, AWS, various hosting platforms

Top Projects:
1. SocialMedia-Website – A Facebook-style app with posts, likes, and chat
2. E-commerce – Modern store with payment & admin dashboard
3. Converso_saas – Real-time SaaS chat app
4. Mern_Todo_Master – Full-stack todo app with Mongo, Express, React, Node
5. 3D_portfolio – Interactive 3D personal portfolio

GitHub Profile:
- Username: mohamed8eo
- Active developer with various projects
- Open source contributions
- Portfolio projects available for viewing
- Link: https://github.com/mohamed8eo

Availability:
- Currently available for freelance work
- Open to full-time opportunities
- Remote work preferred
- Flexible with time zones for project discussions
- Competitive rates based on project scope

Help users learn about Mohamed's work, skills, background, or how to contact him. Be conversational, helpful, and informative about Mohamed's skills, experience, location, and availability. If asked about specific contact details like phone number, suggest they use the contact form on the portfolio for initial inquiries.
`;

    try {
      // Using OpenRouter API with Claude 3.5 Sonnet (better than GPT-3.5)
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://mohamed-portfolio.vercel.app.com", // Replace with your domain
          "X-Title": "Mohamed's Portfolio Chatbot",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3.5-sonnet", // Using Claude 3.5 Sonnet
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("OpenRouter API error:", error);
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (!reply) {
        console.error("Invalid OpenRouter response structure:", data);
        throw new Error("No valid response from AI");
      }

      return NextResponse.json({ message: reply });

         } catch (apiError: any) {
       console.error('OpenRouter API error:', apiError);
       
       // Simple fallback if AI fails
       const fallbackResponse = "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later or contact Mohamed directly through his portfolio.";
       return NextResponse.json({ message: fallbackResponse });
     }
    
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Generic fallback response for any other errors
    const fallbackResponse = "I'm sorry, I'm having trouble connecting right now. Mohamed is a Full Stack Developer who specializes in React, Next.js, TypeScript, and modern web technologies. He's available for freelance work and has experience with various databases and deployment platforms.";
    
    return NextResponse.json({ message: fallbackResponse });
  }
}
