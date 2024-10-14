let questionCount = 1;

document.getElementById('addQuestion').addEventListener('click', () => {
    questionCount++;

    const questionsContainer = document.getElementById('questionsContainer');
    const questionBlock = document.createElement('div');
    questionBlock.classList.add('question-block');
    
    questionBlock.innerHTML = `
        <div class="form-group">
            <label>Question ${questionCount}</label>
            <input type="text" class="questionText" placeholder="Enter the question" required>
        </div>
        <div class="form-group">
            <label>Options (Comma-separated)</label>
            <input type="text" class="options" placeholder="Option1, Option2, Option3" required>
        </div>
        <div class="form-group">
            <label>Correct Answer</label>
            <input type="text" class="correctAnswer" placeholder="Enter the correct answer" required>
        </div>
    `;

    questionsContainer.appendChild(questionBlock);
});

document.getElementById('quizForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;

    // Collect all questions
    const questions = [];
    document.querySelectorAll('.question-block').forEach(block => {
        const questionText = block.querySelector('.questionText').value;
        const options = block.querySelector('.options').value.split(',').map(option => option.trim());
        const correctAnswer = block.querySelector('.correctAnswer').value;

        questions.push({
            questionText: questionText,
            options: options,
            correctAnswer: correctAnswer
        });
    });

    const quizData = {
        title: title,
        category: category,
        questions: questions
    };

    try {
        // Fetch token from local storage (if using token-based authentication)
        const token = localStorage.getItem('token');

        const response = await fetch('https://safety-fad7.onrender.com/createquiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header if needed
            },
            body: JSON.stringify(quizData)
        });

        const result = await response.json();

        if (response.status === 201) {
            document.getElementById('responseMessage').innerHTML = 'Quiz created successfully!';
        } else {
            document.getElementById('responseMessage').innerHTML = 'Error: ' + result.error;
        }
    } catch (error) {
        document.getElementById('responseMessage').innerHTML = 'Error: ' + error.message;
    }
});
