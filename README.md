# Quiz App

## Overview

This is a dynamic quiz application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It fetches quiz data from an API and displays it with a modern, responsive UI.

## Features

- Fetches quiz data asynchronously.
- Displays quiz details including topic, number of questions, and marking system.
- Animated loading skeleton while fetching data.
- Styled using Tailwind CSS for a sleek UI.
- Navigation between pages using Next.js routing.

## Technologies Used

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Hooks (useState, useEffect)**

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/TusharBhatt-2003/testline-quiz-game
   ```
2. Navigate to the project folder:
   ```sh
   cd quiz-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
📂 app
 ├── 📂 components      # Reusable UI components
 ├── 📂 utils           # Utility functions like fetching quiz data
 ├── 📂 types           # TypeScript types
 ├── 📂 quiz            # Quiz page
 ├── 📂 result          # Result page
 ├── 📜 layout.tsx      # Global layout
 ├── 📜 page.tsx        # Homepage
```

## API Integration

Ensure that your `fetchQuizData` function inside `utils/fetchQuizData.ts` fetches data correctly from the API:

```ts
export const fetchQuizData = async () => {
  const response = await fetch("https://api.example.com/quiz");
  if (!response.ok) throw new Error("Failed to fetch quiz data");
  return response.json();
};
```

## Deployment

To build the app for production:

```sh
npm run build
```

To deploy on **Vercel**:

```sh
vercel
```

## License

This project is open-source and available under the **MIT License**.
