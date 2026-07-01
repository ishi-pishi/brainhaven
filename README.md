# brainhaven
Brainhaven is a full-stack study tracker app. As users run a pomodoro timer, they earn points that can be spent on rewards. After a study session, the app records information about the study session, allows users to view insights about their study session, provides AI-generated study tips based on the recorded sessions + user reflections.

## Tech stack
- **React** was used for the frontend, with **Tailwind CSS** and **shadcn/ui** and **lucid** for animations.
- **Firebase** was used for the backend, including auth, DataConnect (for storing user sessions) and functions (for serverless backend logic).

## Screenshots/Video
<iframe width="560" height="315" src="https://www.youtube.com/watch?v=NlMYNNfv_4I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To run:
- Clone the repo
- Add a `.env` file to `\client` and set `OPENAI_API_KEY` and `VITE_FIREBASE_API_KEY`
- Add a `.env` file to `\client\functions` and set `OPENAI_API_KEY`
- From the repo root, run `npm start`
