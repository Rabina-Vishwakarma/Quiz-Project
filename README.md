# Interactive Quiz Application

An engaging web-based quiz application with real-time feedback, progress tracking, and a sleek user interface.

![Quiz App Screenshot](screenshots/quiz-page.png)

## 🎥 Demo

[Watch Demo Video](demo/quiz-walkthrough.mp4)

## ✨ Features

- Dynamic question loading from API
- Real-time progress tracking
- Timer for each question
- Immediate feedback with correct/incorrect indicators
- Responsive design for mobile and desktop
- Score tracking and results page
- Animated transitions and visual feedback
- Progress bar with question counter
- Local storage for maintaining scores

## 🚀 Live Demo

Try the quiz here: [QuizWeb.com]((https://quiz-project-ecru-rho.vercel.app/))

## 🛠️ Tech Stack

- HTML5
- CSS3 (with animations)
- Vanilla JavaScript
- REST API
- Local Storage API

## 📸 Screenshots

### Home Screen
![Home Screen](screenshots/home-screen.jpeg)
*Initial quiz interface with start button*

### Question Interface
![Question Interface](screenshots/quiz-page.jpeg)
*Question display with multiple choice options*

### Results Page
![Results Page](screenshots/result-page.jpeg)
*Final score display with retry option*

## 🏗️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Rabina-Vishwakarma/Quiz-project.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiz-application
   ```

3. Open `index.html` in your preferred web browser, or set up a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```
quiz-application/
├── index.html
├── Quiz.html
├── result.html
├── css/
│   └── style.css
    ├── quiz.css
    ├── result.css

├── js/
│   └── quiz.js
    ├── script.js
    ├── result.js

├── screenshots/
│   ├── home-screen.jpeg
│   ├── quiz-page.jpeg
│   └── result-page.jpeg
└── demo/
    └── quiz-walkthrough.mp4
```

## 🎯 Key Components

1. **Question Loading**
   - Questions are fetched from an external API
   - Error handling for API failures
   - Loading state management

2. **Timer System**
   - 30-second countdown per question
   - Visual feedback for remaining time
   - Auto-progression when time expires

3. **Progress Tracking**
   - Visual progress bar
   - Question counter (X of Y format)
   - Score calculation

4. **User Interface**
   - Responsive design
   - Animated transitions
   - Clear visual feedback
   - Accessibility considerations

## 🔧 Configuration

The quiz can be customized by modifying the following parameters in `quiz.js`:

```javascript
// Timer duration (in seconds)
let timeLeft = 30;

// API endpoint
const apiUrl = 'https://api.jsonserve.com/Uw5CrX';
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🙏 Acknowledgments

- OpenTrivia DB for question API inspiration
- FontAwesome for icons
- Google Fonts for typography

## 📞 Contact

Rabina Vishwakrma - rabinamothupur@gmail.com

Project Link:(https://github.com/Rabina-Vishwakarma/Quiz-project)

## 🔄 Future Updates

- [ ] Add difficulty levels
- [ ] Implement category selection
- [ ] Add user authentication
- [ ] Include leaderboard functionality
- [ ] Support for multiple languages

---
*Note: Remember to replace placeholder images, links, and contact information with your actual project details.*
