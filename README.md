# ✉️ AI Email Writer

An AI-powered email generation platform that helps users create professional, personalized emails in seconds using Google Gemini.

Users can provide the purpose, tone, and key points, and the application generates a polished email that can be edited and copied instantly.

## 🌐 Live Demo

**Frontend:** https://ai-email-writerr.vercel.app/

**GitHub:** https://github.com/srivachan-2/ai-email-writer

---

## ✨ Features

- 🔐 User Registration & Login
- 🔑 JWT-based Authentication
- 🔒 Password Hashing with bcrypt
- 🤖 AI-powered Email Generation
- 🎯 Custom Email Purpose
- 🎨 Custom Tone Selection
- 📝 Key Points Based Generation
- 📋 Copy Generated Email
- 💎 Modern Glassmorphism UI
- 📱 Responsive Frontend
- ☁️ MongoDB Atlas Database
- ⚡ Fast React + Express Architecture

---

## 🧠 How It Works

```text
User
 │
 │ Purpose + Tone + Key Points
 ▼
React Frontend
 │
 │ HTTP Request
 ▼
Node.js + Express Backend
 │
 ├───────────────┐
 │               │
 ▼               ▼
Gemini API    MongoDB Atlas
 │               │
 ▼               ▼
Generated      User Data
Email
 │
 ▼
React Frontend
 │
 ▼
Edit / Copy Email
