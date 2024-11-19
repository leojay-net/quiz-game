# Interactive Quiz Game

A responsive web-based quiz application with a timer, score tracking, and immediate feedback. The quiz loads questions from a JSON file.

## Features

-  30-second countdown timer per question
-  Responsive design for all screen sizes
- Immediate visual feedback for correct/incorrect answers
- Progress and score tracking
- Final score calculation with percentage
- Easily customizable questions via JSON


## Setup and Running

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (due to JSON file loading requirements)

### Running the Application

1. **Using Node.js**
   ```bash
   npx serve
   ```
   Then open the URL shown in the terminal

2. **Using VS Code**
   - Install the "Live Server" extension
   - Right-click on `quiz.html`
   - Select "Open with Live Server"



### Customizing Questions

Edit the `questions.json` file to add or modify questions. Each question should follow this format:

```json
{
    "question": "Your question text here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": "Correct option text here"
}
```

## Game Flow

1. Question is displayed with a 30-second timer
2. User selects an answer:
   - Correct answer turns green
   - Incorrect answer turns red and shows the correct answer
3. "Next Question" button appears
4. Process repeats until all questions are answered
5. Final score and percentage are displayed

