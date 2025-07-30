# AI Chatbot Setup Guide

## Overview
Your portfolio website now includes an AI chatbot that can answer questions about Mohamed Mahmoud. The chatbot appears as a floating chat button in the bottom-right corner of the website.

## Features
- ✅ Floating chat interface
- ✅ Real-time messaging
- ✅ AI-powered responses about Mohamed
- ✅ Fallback responses when API is unavailable
- ✅ Modern UI with animations
- ✅ Mobile-responsive design

## Setup Instructions

### Option 1: With OpenAI API (Recommended)
1. Get an OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in your project root
3. Add your API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Restart your development server

### Option 2: Without API Key
The chatbot will work with pre-defined fallback responses even without an API key. This is perfect for testing or if you don't want to use OpenAI.

## Customization

### Personal Information
To customize the information the AI knows about you, edit the `personalInfo` variable in `app/api/chat/route.ts`. You can update:
- Technical skills
- Experience
- Education
- Projects
- Contact information
- Personality traits

### Chatbot Appearance
To customize the chatbot appearance, edit `components/chatbot.tsx`:
- Change colors by modifying the className props
- Adjust size by changing the width/height classes
- Modify the welcome message in the initial state

### Fallback Responses
If you're not using the OpenAI API, you can customize the fallback responses in the `fallbackResponses` array in `app/api/chat/route.ts`.

## Usage
1. Click the chat button (message circle icon) in the bottom-right corner
2. Type your question about Mohamed
3. The AI will respond with information about his skills, experience, and background
4. Click the X button to close the chat

## Example Questions
- "What are Mohamed's technical skills?"
- "Tell me about Mohamed's experience"
- "What projects has Mohamed worked on?"
- "Is Mohamed available for hire?"
- "What technologies does Mohamed use?"

## Troubleshooting
- If the chatbot doesn't respond, check your browser's console for errors
- Make sure your API key is correct if using OpenAI
- The chatbot will work with fallback responses even without an API key
- Check that all dependencies are installed: `pnpm install`

## Security Notes
- Never commit your `.env.local` file to version control
- The API key is only used server-side and never exposed to the client
- Consider rate limiting for production use 