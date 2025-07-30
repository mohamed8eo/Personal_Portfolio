# 🚀 Mohamed El-morsey - Full Stack Developer Portfolio

A modern, responsive portfolio website showcasing my skills, projects, and experience as a Full Stack Developer. Built with Next.js, TypeScript, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: Automatic theme switching with system preference detection
- **Smooth Animations**: GSAP-powered scroll-triggered animations and micro-interactions
- **Professional UI**: Clean, modern interface using shadcn/ui components

### 🤖 **AI-Powered Chatbot**
- **OpenRouter Integration**: Intelligent AI assistant using Claude 3.5 Sonnet
- **Context-Aware Responses**: Personalized answers about skills, experience, and availability
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Fallback System**: Graceful error handling when AI service is unavailable

### 📱 **Interactive Components**
- **Dynamic Hero Section**: Animated typing effect and floating profile image
- **Skills Visualization**: Interactive progress bars and technology icons
- **Project Showcase**: GitHub integration with live project data
- **Contact Form**: EmailJS integration with real-time validation

### 🔧 **Technical Excellence**
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Ready**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with keyboard navigation
- **Cross-browser**: Compatible with all modern browsers

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.2.4** - React framework with App Router
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React 19** - Latest React with concurrent features
- **GSAP** - Professional animations and scroll triggers

### **UI Components**
- **shadcn/ui** - Modern, accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful, customizable icons
- **React Icons** - Comprehensive icon library

### **Backend & APIs**
- **OpenRouter API** - AI chatbot powered by Claude 3.5 Sonnet
- **GitHub API** - Dynamic project data integration
- **EmailJS** - Contact form email delivery
- **Next.js API Routes** - Serverless backend functions

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing
- **TypeScript** - Static type checking

## 📁 Project Structure

```
developer-portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── chat/          # AI chatbot endpoint
│   │   └── github/        # GitHub API proxy
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── about.tsx         # About section
│   ├── chatbot.tsx       # AI chatbot
│   ├── contact.tsx       # Contact form
│   ├── footer.tsx        # Footer
│   ├── header.tsx        # Navigation
│   ├── hero.tsx          # Hero section
│   ├── projects.tsx      # Projects showcase
│   └── skills.tsx        # Skills section
├── lib/                  # Utility functions
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohamed8eo/developer-portfolio.git
   cd developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   ```env
   # OpenRouter API (for AI chatbot)
   OPENROUTER_API_KEY=sk-or-your-api-key-here
   
   # GitHub API (optional, for enhanced project data)
   GITHUB_TOKEN=your-github-token
   
   # EmailJS (for contact form)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
   NEXT_PUBLIC_EMAILJS_USER_ID=your-user-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Features Explained

### **AI Chatbot Integration**
The portfolio includes an intelligent AI assistant powered by OpenRouter's Claude 3.5 Sonnet model. The chatbot can answer questions about:
- Technical skills and experience
- Project details and GitHub profile
- Contact information and availability
- Location and background information

### **Dynamic Project Showcase**
Projects are automatically fetched from GitHub and displayed with:
- Real-time repository data
- Language statistics and GitHub metrics
- Project screenshots and descriptions
- Live demo and source code links

### **Responsive Design System**
Built with a mobile-first approach using:
- Tailwind CSS for utility-first styling
- shadcn/ui for consistent component design
- GSAP for smooth animations and interactions
- CSS Grid and Flexbox for responsive layouts

### **Performance Optimizations**
- Next.js Image optimization
- Code splitting and lazy loading
- Optimized bundle size
- Efficient API caching
- SEO-friendly meta tags

## 🎨 Customization

### **Personal Information**
Update your information in the following files:
- `components/hero.tsx` - Name, title, and social links
- `components/about.tsx` - Bio and timeline
- `components/contact.tsx` - Contact details
- `app/api/chat/route.ts` - AI chatbot personality

### **Styling**
- `tailwind.config.ts` - Color scheme and theme
- `app/globals.css` - Global styles and animations
- `components/ui/` - Component styling

### **Content**
- `public/` - Images and static assets
- `components/` - Section content and layout
- `app/page.tsx` - Page structure and sections

## 📱 Responsive Design

The portfolio is fully responsive across all devices:
- **Mobile**: Optimized touch interactions and compact layouts
- **Tablet**: Balanced spacing and navigation
- **Desktop**: Full-featured experience with hover effects
- **Large Screens**: Enhanced layouts and animations

## 🔧 API Integrations

### **OpenRouter AI Chatbot**
- Real-time AI responses
- Context-aware conversations
- Fallback error handling
- Rate limiting protection

### **GitHub API**
- Dynamic project data
- Repository statistics
- Image fetching from repos
- Caching for performance

### **EmailJS**
- Contact form functionality
- Email delivery
- Form validation
- Success/error handling

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Netlify**
1. Build command: `npm run build`
2. Publish directory: `out`
3. Add environment variables in Netlify dashboard

### **Other Platforms**
- **Railway**: Supports Next.js out of the box
- **Render**: Free tier available for personal projects
- **DigitalOcean App Platform**: Scalable deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### **Development Guidelines**
- Follow TypeScript best practices
- Use conventional commit messages
- Test on multiple devices and browsers
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful component library
- **GSAP** - Professional animation library
- **OpenRouter** - AI API service
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Team** - Amazing React framework

## 📞 Contact

- **Email**: mohamedmahomed403@gmail.com
- **Phone**: +20 103 256 2631
- **Location**: El-Dakahlia, Egypt
- **GitHub**: [mohamed8eo](https://github.com/mohamed8eo)
- **LinkedIn**: [Mohamed El-morsey](https://linkedin.com/in/mohamed-el-morsey)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Mohamed El-morsey](https://github.com/mohamed8eo) 