// In your component or API route
export const fetchQuizData = async () => {
  try {
    const response = await fetch("/api/quizdata");
    if (!response.ok) throw new Error("Failed to fetch quiz data");
    const data = await response.json();
    //console.log("Fetched data: ", data);
    return data;
  } catch (error) {
    //console.error("Error fetching quiz data:", error);
    return null;
  }
};
