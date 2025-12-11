# Overview

4S (Sub-Saharan Sustainability Solutions) is a React-based web application that showcases AI-powered sustainability solutions for Sub-Saharan Africa. The platform serves as a comprehensive hub for investors, government partners, and NGOs, featuring interactive tools like an AI-powered Impact Calculator, Solution Matchmaker quiz, and a custom chatbot named "SustainaBot." The application emphasizes accessibility with features like low-bandwidth mode, voice search functionality, and full WCAG compliance, while maintaining a modern, responsive design optimized for the target region's connectivity challenges.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React stack built with Vite as the build tool and bundler. The frontend follows a component-based architecture with TypeScript for type safety. The UI is built using shadcn/ui components with Radix UI primitives, providing a consistent and accessible design system. Styling is handled through Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes with an Afro-centric color palette (earthy greens, tech blues, warm ochres).

## Routing and Navigation
Client-side routing is implemented using Wouter, a lightweight routing library. The application features a main navigation structure with dedicated pages for Home, Solutions, Impact, Theory of Change, Investors, and Insights. Each page serves a specific purpose in the user journey, from initial engagement to detailed solution exploration.

## State Management and Data Fetching
The application uses TanStack Query (React Query) for server state management, caching, and data synchronization. This choice provides efficient data fetching with built-in caching mechanisms, optimistic updates, and background synchronization - crucial for users with poor connectivity.

## Backend Architecture
The backend is built with Express.js as the web server, following a RESTful API design pattern. The server handles various endpoints including AI-powered services, investment opportunities, and user interactions. The backend includes middleware for request logging, error handling, and CORS support.

## AI Integration
AI functionality is centralized through a dedicated AIService class that interfaces with OpenAI's GPT models. The service provides two main features: impact calculations based on user input parameters (country, population, solution type, budget, SDGs) and solution recommendations through a quiz-based matching system. This architecture allows for easy extension of AI capabilities while maintaining consistent API interfaces.

## Database Layer
The application uses Drizzle ORM with PostgreSQL as the primary database, configured through Neon Database serverless. The schema includes tables for users, impact calculations, solutions, quiz results, chat messages, and investment opportunities. Drizzle provides type-safe database queries and migrations, ensuring data integrity and developer productivity.

## Authentication and Session Management
User authentication is handled through a combination of session-based authentication with PostgreSQL session storage using connect-pg-simple. This approach ensures secure user sessions while maintaining simplicity for the target use case.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting with automatic scaling
- **PostgreSQL**: Primary relational database for storing user data, solutions, and analytics

## AI and ML Services
- **OpenAI GPT API**: Powers the Impact Calculator and Solution Matchmaker through natural language processing
- **Custom AI Service Layer**: Abstracts AI interactions and provides consistent interfaces for sustainability-focused calculations

## UI and Design Systems
- **shadcn/ui**: Component library built on Radix UI primitives for accessible, customizable components
- **Radix UI**: Low-level UI primitives ensuring accessibility compliance (WCAG)
- **Tailwind CSS**: Utility-first CSS framework for responsive design and theming
- **Framer Motion**: Animation library for enhanced user experience and visual feedback

## Development and Build Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Type safety and improved developer experience
- **Drizzle Kit**: Database migration and schema management tools
- **ESBuild**: Fast JavaScript bundler for production builds

## Third-party Integrations
- **Google Fonts**: Typography system with Inter and Ubuntu font families
- **Font Awesome**: Icon library for consistent visual elements
- **Unsplash**: Image service for high-quality stock photography
- **Web Speech API**: Browser-based voice recognition for accessibility features

## Hosting and Deployment
- **Replit**: Development and hosting platform with integrated version control
- **Node.js**: Runtime environment for the Express.js backend server
- **Environment Variables**: Secure configuration management for API keys and database connections

# Local Development Setup

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and fill in your credentials

## Environment Variables

### Email Configuration (Required for contact form)
```
SMTP_USER=your-email@4ssolutions.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
```

To get Gmail App Password:
1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate a new app password for "Mail"

### Optional Variables
```
CONTACT_EMAIL=alternate-email@domain.com  # If different from SMTP_USER
OPENAI_API_KEY=your-openai-key           # For AI chatbot features
XAI_API_KEY=your-xai-key                 # For Grok AI features
DATABASE_URL=postgresql://...            # For persistent storage
```

## Running the Application
```bash
npm run dev
```
The application will start on http://localhost:5000

## What Happens When You Submit the Contact Form
1. Form data is validated on the frontend
2. Request is sent to `/api/contact` endpoint
3. If SMTP credentials are configured:
   - Email is sent to your inbox with the message details
   - Confirmation email is sent to the visitor
4. Success message is displayed to the visitor