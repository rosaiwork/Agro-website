// Функціональність слайдерів для FARMERAMA сайту

// Змінні для слайдера інструкцій
let currentInstructionSlide = 0;
const totalInstructionSlides = 15;

// Змінні для автослайдера скріншотів
let currentScreenshotSlide = 0;
const totalScreenshotSlides = 10;

// Функція для слайдера інструкцій
function slideInstructions(direction) {
    const slider = document.getElementById('instructionsSlider');
    if (!slider) return;
    
    // Оновлюємо поточний слайд
    currentInstructionSlide += direction;
    
    // Перевіряємо межі
    if (currentInstructionSlide < 0) {
        currentInstructionSlide = totalInstructionSlides - 1;
    } else if (currentInstructionSlide >= totalInstructionSlides) {
        currentInstructionSlide = 0;
    }
    
    // Застосовуємо трансформацію
    const translateX = -currentInstructionSlide * 100;
    slider.style.transform = `translateX(${translateX}%)`;
    
    // Оновлюємо індикатори (якщо є)
    updateInstructionIndicators();
}

// Функція для оновлення індикаторів інструкцій
function updateInstructionIndicators() {
    const indicators = document.querySelectorAll('.instruction-indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentInstructionSlide);
    });
}

// Функція для створення слайдів інструкцій
function createInstructionSlides() {
    const slider = document.getElementById('instructionsSlider');
    if (!slider) return;
    
    // Очищаємо контейнер
    slider.innerHTML = '';
    
    // Створюємо слайди для кожної інструкції
    for (let i = 1; i <= totalInstructionSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'instruction-slide';
        slide.style.backgroundImage = `url('./assets/screenshots/instruction-${i}.jpg')`;
        
        slide.innerHTML = `
            <div class="instruction-overlay">
                <h3 data-translate="step${i}Title">Крок ${i}</h3>
                <p data-translate="step${i}Description">Опис кроку ${i}</p>
            </div>
        `;
        
        slider.appendChild(slide);
    }
    
    // Оновлюємо переклади після створення слайдів
    if (window.updateTranslations) {
        window.updateTranslations();
    }
}

// Функція для створення слайдів скріншотів
function createScreenshotSlides() {
    const slider = document.getElementById('screenshotsSlider');
    if (!slider) return;
    
    // Очищаємо контейнер
    slider.innerHTML = '';
    
    // Створюємо слайди для кожного скріншота
    for (let i = 1; i <= totalScreenshotSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'screenshot-slide';
        slide.style.backgroundImage = `url('./assets/screenshots/game-${i}.jpg')`;
        
        slider.appendChild(slide);
    }
    
    // Дублюємо слайди для безперервної анімації
    for (let i = 1; i <= totalScreenshotSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'screenshot-slide';
        slide.style.backgroundImage = `url('./assets/screenshots/game-${i}.jpg')`;
        
        slider.appendChild(slide);
    }
}

// Функція для автоматичного слайдера скріншотів
function startScreenshotAutoSlide() {
    const slider = document.getElementById('screenshotsSlider');
    if (!slider) return;
    
    // Додаємо CSS анімацію програматично
    slider.style.animation = 'autoSlide 30s infinite linear';
    
    // Паузимо анімацію при наведенні
    slider.addEventListener('mouseenter', () => {
        slider.style.animationPlayState = 'paused';
    });
    
    slider.addEventListener('mouseleave', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Функція для створення індикаторів
function createInstructionIndicators() {
    const container = document.querySelector('.instructions-container');
    if (!container) return;
    
    // Перевіряємо чи вже є індикатори
    if (container.querySelector('.indicators')) return;
    
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'indicators';
    
    for (let i = 0; i < totalInstructionSlides; i++) {
        const indicator = document.createElement('button');
        indicator.className = `instruction-indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToInstructionSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    container.appendChild(indicatorsContainer);
}

// Функція для переходу до конкретного слайда інструкцій
function goToInstructionSlide(slideIndex) {
    const slider = document.getElementById('instructionsSlider');
    if (!slider) return;
    
    currentInstructionSlide = slideIndex;
    const translateX = -currentInstructionSlide * 100;
    slider.style.transform = `translateX(${translateX}%)`;
    
    updateInstructionIndicators();
}

// Функція для обробки свайпів на мобільних пристроях
function addTouchSupport() {
    const instructionSlider = document.querySelector('.instructions-slider');
    if (!instructionSlider) return;
    
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    
    instructionSlider.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });
    
    instructionSlider.addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
    
    instructionSlider.addEventListener('touchend', (e) => {
        const touch = e.changedTouches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
        
        // Перевіряємо чи це горизонтальний свайп
        if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > 50) {
            if (distX > 0) {
                slideInstructions(-1); // Свайп вправо - попередній слайд
            } else {
                slideInstructions(1); // Свайп вліво - наступний слайд
            }
        }
    });
}

// Функція для обробки клавіатури
function addKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        // Перевіряємо чи фокус на слайдері інструкцій
        const instructionSlider = document.querySelector('.instructions-slider');
        if (!instructionSlider) return;
        
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slideInstructions(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            slideInstructions(1);
        }
    });
}

// Функція для ініціалізації всіх слайдерів
function initializeSliders() {
    // Створюємо слайди
    createInstructionSlides();
    createScreenshotSlides();
    
    // Створюємо індикатори
    createInstructionIndicators();
    
    // Запускаємо автослайдер
    startScreenshotAutoSlide();
    
    // Додаємо підтримку дотиків та клавіатури
    addTouchSupport();
    addKeyboardSupport();
    
    // Встановлюємо початковий стан
    updateInstructionIndicators();
}

// Функція для зупинки всіх анімацій (для економії ресурсів)
function pauseSliders() {
    const screenshotSlider = document.getElementById('screenshotsSlider');
    if (screenshotSlider) {
        screenshotSlider.style.animationPlayState = 'paused';
    }
}

// Функція для відновлення анімацій
function resumeSliders() {
    const screenshotSlider = document.getElementById('screenshotsSlider');
    if (screenshotSlider) {
        screenshotSlider.style.animationPlayState = 'running';
    }
}

// Обробка видимості сторінки для оптимізації
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseSliders();
    } else {
        resumeSliders();
    }
});

// --- Кнопка паузи для автослайдера скріншотів ---
const pauseBtn = document.getElementById('pauseScreenshotsBtn');
const slider = document.getElementById('screenshotsSlider');
const pauseIcon = document.getElementById('pauseIcon');
const playIcon = document.getElementById('playIcon');
let isPaused = false;

if (pauseBtn && slider) {
    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            slider.style.animationPlayState = 'paused';
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'inline';
        } else {
            slider.style.animationPlayState = 'running';
            pauseIcon.style.display = 'inline';
            playIcon.style.display = 'none';
        }
    });
}

// Експорт функцій для використання в HTML
window.slideInstructions = slideInstructions;
window.goToInstructionSlide = goToInstructionSlide;
window.initializeSliders = initializeSliders;