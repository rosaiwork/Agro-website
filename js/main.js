// Конфігурація
const CONFIG = {
    gameUrl: 'https://t.me/agrofarm_crypto_bot',        // ✏️ Замініть на ваш Telegram бот
    telegramGroup: 'https://t.me/agrofarm_game',     // ✏️ Замініть на вашу Telegram групу
    facebookGroup: 'https://facebook.com/', // ✏️ Facebook група
    youtubeChannel: 'https://youtube.com/@AIWork-n8n', // ✏️ YouTube канал
    tokenInfo: 'https://aiwork.com.ua/',     // ✏️ Сторінка з інформацією про токен
    contactEmail: 'https://t.me/Rosko_Dorosh'         // ✏️ Контактний telegram
};

// Функція для запуску гри
function playGame() {
    // Додаємо анімацію кнопки
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playButton.style.transform = '';
        }, 150);
    }
    
    // Відкриваємо гру
    window.open(CONFIG.gameUrl, '_blank');
    
    // Трекінг події (для аналітики)
    trackEvent('game_start', { source: 'website' });
}

// Функція для відкриття Telegram групи
function openTelegramGroup() {
    window.open(CONFIG.telegramGroup, '_blank');
    trackEvent('social_click', { platform: 'telegram' });
}

// Функція для відкриття Facebook групи
function openFacebookGroup() {
    window.open(CONFIG.facebookGroup, '_blank');
    trackEvent('social_click', { platform: 'facebook' });
}

// Функція для відкриття YouTube каналу
function openYouTubeChannel() {
    window.open(CONFIG.youtubeChannel, '_blank');
    trackEvent('social_click', { platform: 'youtube' });
}

// Функція для відкриття інформації про токен
function openTokenInfo() {
    window.open(CONFIG.tokenInfo, '_blank');
    trackEvent('token_info_click');
}

// Функція для контактів
function openContact() {
    window.open(CONFIG.contactEmail, '_blank');
    trackEvent('contact_click');
}

// Функція для трекінгу подій (для аналітики)
function trackEvent(eventName, parameters = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Yandex Metrica
    if (typeof ym !== 'undefined') {
        ym(12345678, 'reachGoal', eventName, parameters);
    }
    
    // Консоль для відладки
    console.log('Event tracked:', eventName, parameters);
}

// Функція для обробки кліків на соціальні кнопки
function setupSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const buttonClass = button.className;
            
            if (buttonClass.includes('telegram')) {
                openTelegramGroup();
            } else if (buttonClass.includes('facebook')) {
                openFacebookGroup();
            } else if (buttonClass.includes('youtube')) {
                openYouTubeChannel();
            } else if (buttonClass.includes('token')) {
                openTokenInfo();
            } else if (buttonClass.includes('contact')) {
                openContact();
            }
        });
    });
}

// Функція для налаштування перемикача мови
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            if (window.switchLanguage) {
                window.switchLanguage(lang);
                trackEvent('language_switch', { language: lang });
            }
        });
    });
}

// Функція для плавної прокрутки до секцій
function setupSmoothScroll() {
    // Додаємо обробники для навігації (якщо буде додано)
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Функція для lazy loading зображень
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Функція для обробки помилок завантаження зображень
function setupImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', () => {
            // Замінюємо на placeholder зображення
            img.src = './assets/images/placeholder.jpg';
            img.alt = 'Зображення не завантажилось';
            console.warn('Failed to load image:', img.src);
        });
    });
}

// Функція для анімації елементів при прокрутці
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-card');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            animationObserver.observe(element);
        });
    }
}

// Функція для обробки розміру вікна
function setupResponsiveHandling() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Оновлюємо розміри відео
            updateVideoSize();
            
            // Оновлюємо слайдери
            if (window.initializeSliders) {
                window.initializeSliders();
            }
        }, 250);
    });
}

// Функція для оновлення розміру відео
function updateVideoSize() {
    const video = document.querySelector('.hero-video');
    if (!video) return;
    
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 480) {
        video.style.width = '250px';
        video.style.height = '188px';
    } else if (screenWidth <= 768) {
        video.style.width = '300px';
        video.style.height = '225px';
    } else {
        video.style.width = '400px';
        video.style.height = '300px';
    }
}

// Функція для показу/приховування елементів залежно від прокрутки
function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ефект паралаксу для фону
        const backgroundImage = document.querySelector('.background-image');
        if (backgroundImage) {
            const scrolled = scrollTop * 0.5;
            backgroundImage.style.transform = `translateY(${scrolled}px)`;
        }
        
        // Приховування/показ хедера
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Прокрутка вниз
            if (header) {
                header.style.transform = 'translateY(-100%)';
            }
        } else {
            // Прокрутка вгору
            if (header) {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Функція для ініціалізації всіх компонентів
function initializeWebsite() {
    // Ініціалізуємо мову
    if (window.initializeLanguage) {
        window.initializeLanguage();
    }
    
    // Ініціалізуємо слайдери
    if (window.initializeSliders) {
        window.initializeSliders();
    }
    
    // Налаштовуємо всі компоненти
    setupSocialButtons();
    setupLanguageSwitcher();
    setupSmoothScroll();
    setupLazyLoading();
    setupImageErrorHandling();
    setupScrollAnimations();
    setupResponsiveHandling();
    setupScrollEffects();
    
    // Оновлюємо розмір відео
    updateVideoSize();
    
    // Трекінг завантаження сторінки
    trackEvent('page_load');
    
    console.log('FARMERAMA website initialized successfully!');
}

// Функція для обробки помилок JavaScript
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        trackEvent('javascript_error', {
            message: e.message,
            filename: e.filename,
            line: e.lineno
        });
    });
}

// --- Pause button for screenshots auto-slider ---
document.addEventListener('DOMContentLoaded', function() {
    const pauseBtn = document.getElementById('pauseScreenshots');
    const slider = document.getElementById('screenshotsSlider');
    const pauseIcon = document.getElementById('pauseIcon');
    let paused = false;

    // Функція для оновлення стану кнопки паузи
    function updatePauseButton() {
        if (!pauseBtn || !pauseIcon) return;
        if (paused) {
            pauseIcon.innerHTML = '<polygon points="10,7 24,16 10,25" />'; // play icon
            pauseBtn.setAttribute('aria-label', getTranslation('resumeSlider') || 'Відновити');
        } else {
            pauseIcon.innerHTML = '<rect x="7" y="7" width="6" height="18"/><rect x="19" y="7" width="6" height="18"/>';
            pauseBtn.setAttribute('aria-label', getTranslation('pauseSlider') || 'Пауза');
        }
    }

    // Функція для отримання перекладу
    function getTranslation(key) {
        if (window.translations && window.currentLanguage && window.translations[window.currentLanguage]) {
            return window.translations[window.currentLanguage][key];
        }
        return null;
    }

    if (pauseBtn && slider && pauseIcon) {
        pauseBtn.addEventListener('click', function() {
            paused = !paused;
            slider.style.animationPlayState = paused ? 'paused' : 'running';
            updatePauseButton();
        });
        // Оновити кнопку при зміні мови
        if (window.addEventListener && window.switchLanguage) {
            document.addEventListener('languageChanged', updatePauseButton);
        }
        updatePauseButton();
    }
});

// Експорт функцій для використання в HTML
window.playGame = playGame;
window.openTelegramGroup = openTelegramGroup;
window.openFacebookGroup = openFacebookGroup;
window.openYouTubeChannel = openYouTubeChannel;
window.openTokenInfo = openTokenInfo;
window.openContact = openContact;

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    setupErrorHandling();
    initializeWebsite();
});

// Ініціалізація при повному завантаженні сторінки
window.addEventListener('load', () => {
    // Приховуємо екран завантаження (якщо є)
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    trackEvent('page_fully_loaded');
});