# ✉️ AI Email Writer

An AI-powered full-stack web application that helps users generate professional emails based on their **purpose, tone, and key points**.

The application uses **Google Gemini Generative AI** to create natural and context-aware email drafts while providing user authentication and a modern web interface.

## 🚀 Live Demo

**Frontend:** https://ai-email-writerr.vercel.app/

**Backend API:** https://ai-email-writer-backend.vercel.app/

---

## 📌 Project Overview

Writing professional emails can be time-consuming, especially when users need to decide the appropriate structure, wording, and tone.

AI Email Writer simplifies this process by allowing users to provide:

- 📋 Email purpose
- 🎭 Desired tone
- 📝 Important key points

The application sends this information to the backend, which generates a structured prompt and communicates with the **Gemini API** to produce the final email.

---

## ✨ Features

- 🤖 **AI Email Generation** using Google Gemini
- 🎭 **Customizable Email Tone**
- 📋 **Purpose and Key Points based generation**
- 🔐 **User Registration and Login**
- 🔑 **JWT Authentication**
- 🔒 **Password Hashing with bcrypt**
- 🗄️ **MongoDB Atlas Database**
- 🌐 **REST API Architecture**
- 📡 **Axios-based Frontend-Backend Communication**
- 🔐 **Environment Variable based Secret Management**
- 🚀 **Cloud Deployment using Vercel**

---

## 🏗️ System Architecture

```text
                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │ React + Vite     │
                  │    Frontend      │
                  └────────┬─────────┘
                           │
                         Axios
                           │
                           ▼
                  ┌──────────────────┐
                  │ Node.js + Express│
                  │     Backend      │
                  └───────┬────┬─────┘
                          │    │
                 ┌────────┘    └────────┐
                 ▼                      ▼
        ┌─────────────────┐    ┌─────────────────┐
        │ MongoDB Atlas   │    │   Gemini API    │
        │                 │    │                 │
        │   User Data     │    │ Email Generation│
        └─────────────────┘    └─────────────────┘
