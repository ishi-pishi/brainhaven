# Brainhaven
Brainhaven is a full-stack gamified study tracker app. Users earn points for running a pomodoro timer, which can be spent on rewards.

The app tracks information about study sessions such as the study time, subject studied, and user-reported reflections and productivity ratings. Users can view charts with these insights, generate personalized study tips using AI, and see their past study sessions.

I made this app to help me balance study time to help me get an idea of how I actually am splitting my study time.

Watch the demo here: https://www.youtube.com/watch?v=NlMYNNfv_4I

## Features
- email auth
- customizable pomodoro timer (with spotify embed + mini-todo list on pomodoro screen)
- personalized study tips using Gemini
- charts showing study insights
- customizable rewards shop
- reflections log

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, with Tailwind CSS v4, Radix UI, react-router-dom. I used recharts for displaying study session insights.
- **Backend**: Firebase (Auth, Cloud Functions, Data Connect). Having used separate tools for these before, I wanted to see how Firebase simplified everything. 
- **AI**: Gemini API (model gemini-flash-2.5)

## Architecture
- **Authentication**: I used Firebase auth to implement email auth with 2FA.
- **Data Storage**: I chose Firebase **Data Connect** over **Firestore**. DataConnect is PostgreSQL, and Firestore is NoSQL. I chose DataConnect for its more rigid structure because I prioritized being able to do complex queries quickly, and it suited the data's relational structure.
- **Backend**: I used Firebase Cloud Functions for the backend, including data storage and talking to the Gemini API securely. Since I was using Firebase DataConnect already and didn't have too much complex backend logic, and also because Cloud Functions is serverless, this was much easier to set up compared to using Express.
- **AI**: I fed Gemini the last 7 days of the user's stored JSON study session data to generate study tips. See improvements on this below.

## Improvements
The main improvement I'd like to make in the future is generating AI insights more accurately. Rather than feeding it the past 7 days' worth of raw data, I'd like to do some analysis first

Ideally, I would like to make queries or statistically analyze the data before feeding it into an LLM to present the insights. There are many options for this; for example, it could query the user's most/least productive sessions and include their reflections, let the user know which subject they feel least productive in, or if there is enough data, even predict productivity based on study time/session length. Then a collection of insights along with the most relevant reflections could be fed into the LLM.

However, this approach was out-of-scope for the current project.

## Instructions
After cloning the repo, run **npm start** and follow the instructions to set up .env with a Gemini API key.

If you don't want AI insights, you don't need to add an API key.