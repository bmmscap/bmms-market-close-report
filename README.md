<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1NuRQ-hb7z3V8OhbYebQSnRd2_4ge53bO

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file from the example:
   ```bash
   cp .env.local.example .env.local
   ```

3. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   - Get your API key from: https://aistudio.google.com/app/apikey
   - Replace `your_api_key_here` with your actual API key

4. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your project to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository

3. Configure environment variables in Vercel:
   - In your Vercel project settings, go to "Environment Variables"
   - Add a new variable:
     - **Name:** `GEMINI_API_KEY`
     - **Value:** Your Gemini API key from https://aistudio.google.com/app/apikey
   - Make sure to add it for all environments (Production, Preview, Development)

4. Deploy:
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-project.vercel.app`

## Features

- Real-time AI-generated market close reports using Gemini 2.5 Flash
- Interactive tabs: Overview, Stories, Details, and Analysis
- Dark theme UI optimized for financial data
- Responsive design for desktop and mobile
