document.addEventListener('DOMContentLoaded', () => {
    // Initialize Pomodoro Timer
    const startTimerButton = document.getElementById('start-timer');
    if (startTimerButton) {
        startTimerButton.addEventListener('click', function() {
            let timer = 1500;
            const timerElement = document.getElementById('timer');
            const interval = setInterval(() => {
                let minutes = Math.floor(timer / 60);
                let seconds = timer % 60;
                timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Fixed template literal
                if (timer > 0) {
                    timer--;
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        });
    }

    // Initialize Mood-Based Task Recommender
    const moodSelect = document.getElementById('mood');
    const taskList = document.getElementById('task-list');
    const insightText = document.getElementById('insight-text');

    if (moodSelect && taskList && insightText) {
        const tasks = {
            happy: ['Go for a walk', 'Start a creative project', 'Call a friend'],
            stressed: ['Practice deep breathing', 'Take a short nap', 'Do a quick workout'],
            bored: ['Read a book', 'Watch a documentary', 'Try a new hobby'],
            tired: ['Take a rest', 'Listen to soothing music', 'Do light stretching']
        };

        const insights = {
            happy: 'You seem to be in a great mood! Keep up the positive vibes.',
            stressed: 'It might be a good idea to take a break and relax a bit.',
            bored: 'Consider trying something new to break the monotony.',
            tired: 'Make sure to get enough rest and take it easy for now.'
        };

        function updateWidget() {
            const mood = moodSelect.value;

            // Update task suggestions
            taskList.innerHTML = '';
            tasks[mood].forEach(task => {
                const li = document.createElement('li');
                li.textContent = task;
                taskList.appendChild(li);
            });

            // Update emotional insights
            insightText.textContent = insights[mood];
        }

        moodSelect.addEventListener('change', updateWidget);

        // Initialize widget
        updateWidget();
    }

    // Initialize Countdown Timer
    const minutesInput = document.getElementById('minutes-input');
    const startButtonCountdown = document.getElementById('start-timer-countdown');
    const countdownDisplay = document.getElementById('countdown-display');

    let countdownInterval;

    function startCountdown(minutes) {
        const endTime = Date.now() + minutes * 60000;

        if (countdownInterval) clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            const remainingTime = endTime - Date.now();
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = '00:00';
                return;
            }

            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Fixed template literal
        }, 1000);
    }

    startButtonCountdown.addEventListener('click', () => {
        const minutes = parseInt(minutesInput.value, 10);
        if (!isNaN(minutes) && minutes > 0) {
            startCountdown(minutes);
        }
    });
});
