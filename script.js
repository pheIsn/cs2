let isCringeMode = false;
const music = document.getElementById('music');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const musicControl = document.getElementById('musicControl');
const volumePanel = document.getElementById('volumePanel');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
let emojiInterval;

// Звук клика - новый звук
const clickSound = new Audio('music/click.mp3');
clickSound.volume = 0.3;

// Звук закрытия модалки
const closeSound = new Audio('music/close.mp3');
closeSound.volume = 0.3;

// Прелоадер с частицами на canvas
let preloaderAnimRunning = true;
(function initPreloader() {
    const canvas = document.getElementById('preloaderCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleCount = isMobileUA ? 24 : 60;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() > 0.5 ? 235 : 270; // синий или фиолетовый
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Создаём частицы
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Соединяем линиями
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(88, 101, 242, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        if (!preloaderAnimRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
})();

// Прелоадер
window.addEventListener('load', function() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloaderAnimRunning = false;
                preloader.remove();
            }, 600);
        }
    }, 3000); // 3 секунды
});

// Анимированный счетчик статистики
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Запуск анимации счетчика при загрузке
window.addEventListener('load', function() {
    setTimeout(() => {
        animateCounter();
    }, 1200);
});

// Установка начальной громкости
music.volume = 0.5;

// Preload изображений для быстрой загрузки
window.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
});

// Запуск анимации счетчика при загрузке
window.addEventListener('load', function() {
    setTimeout(() => {
        animateCounter();
    }, 1200);
});

// Языковые переводы
let currentLanguage = 'ru';

const translations = {
    ru: {
        title: 'CS2 ПРО АКАДЕМИЯ',
        titleCringe: 'ХУЕВЫЕ ИГРОКИ В КС2',
        aboutTitle: 'О команде',
        aboutText1: 'CS2 Pro Academy — это профессиональная киберспортивная команда, основанная в 2020 году. Мы специализируемся на Counter-Strike 2 и участвуем в крупнейших международных турнирах.',
        aboutText2: 'Наша команда состоит из пяти талантливых игроков, каждый из которых является мастером своего дела. За годы существования мы завоевали множество наград и продолжаем стремиться к новым вершинам.',
        aboutText1Cringe: 'CS2 Про Академия — это ёбаная команда школьников, основанная в 2020 году когда мамка купила компы. Мы специализируемся на сливах в Counter-Strike 2 и участвуем в турнирах районного масштаба.',
        aboutText2Cringe: 'Наша команда состоит из пяти токсичных задротов, каждый из которых мастер тимкиллов и флешей по своим. За годы существования мы завоевали кучу банов и продолжаем стремиться к новым днам в сильвере.',
        achievement1: '23 победы в турнирах',
        achievement2: '47 турниров сыграно',
        achievement3: 'Топ-10 команд мира',
        achievement1Cringe: '0 побед (все проиграли)',
        achievement2Cringe: '47 сливов подряд',
        achievement3Cringe: 'Топ-1 худших команд',
        playersTitle: 'Игроки',
        discordTitle: 'Присоединяйся к нам!',
        discordText: 'Чтобы связаться с нами и вступить в ряды Орда фейсит 228 заходи сюда 👉',
        discordButton: 'Присоединиться к Discord',
        footerText: '© 2026 CS2 Pro Academy. Все права защищены.',
        footerLink: 'Официальный сайт',
        viewPlayersBtn: 'Смотреть игроков ↓'
    },
    en: {
        title: 'CS2 PRO ACADEMY',
        titleCringe: 'SHITTY CS2 PLAYERS',
        aboutTitle: 'About Team',
        aboutText1: 'CS2 Pro Academy is a professional esports team founded in 2020. We specialize in Counter-Strike 2 and participate in major international tournaments.',
        aboutText2: 'Our team consists of five talented players, each a master of their craft. Over the years, we have won numerous awards and continue to strive for new heights.',
        aboutText1Cringe: 'CS2 Pro Academy is a fucking team of schoolkids, founded in 2020 when mommy bought computers. We specialize in losing in Counter-Strike 2 and participate in local district tournaments.',
        aboutText2Cringe: 'Our team consists of five toxic nerds, each a master of teamkills and flashing teammates. Over the years we have earned a bunch of bans and continue to strive for new days in silver.',
        achievement1: '23 tournament wins',
        achievement2: '47 tournaments played',
        achievement3: 'Top-10 teams worldwide',
        achievement1Cringe: '0 wins (lost everything)',
        achievement2Cringe: '47 losses in a row',
        achievement3Cringe: 'Top-1 worst teams',
        playersTitle: 'Players',
        discordTitle: 'Join Us!',
        discordText: 'To contact us and join the ranks of Orda faceit 228 click here 👉',
        discordButton: 'Join Discord',
        footerText: '© 2026 CS2 Pro Academy. All rights reserved.',
        footerLink: 'Official Website',
        viewPlayersBtn: 'View Players ↓'
    }
};

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    document.getElementById('currentLang').textContent = currentLanguage.toUpperCase();
    updateLanguage();

    // Сохраняем выбор языка
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguage() {
    const t = translations[currentLanguage];

    // Обновляем заголовок
    if (!isCringeMode) {
        title.textContent = t.title;
    } else {
        title.textContent = t.titleCringe;
    }

    // Обновляем "О команде"
    document.querySelector('.section-title').textContent = t.aboutTitle;

    const aboutTexts = document.querySelectorAll('.about-text-container.serious .about-text');
    if (aboutTexts[0]) aboutTexts[0].textContent = t.aboutText1;
    if (aboutTexts[1]) aboutTexts[1].textContent = t.aboutText2;

    const aboutTextsCringe = document.querySelectorAll('.about-text-container.cringe .about-text');
    if (aboutTextsCringe[0]) aboutTextsCringe[0].textContent = t.aboutText1Cringe;
    if (aboutTextsCringe[1]) aboutTextsCringe[1].textContent = t.aboutText2Cringe;

    // Достижения
    const achievements = document.querySelectorAll('.about-text-container.serious .achievement-text');
    if (achievements[0]) achievements[0].textContent = t.achievement1;
    if (achievements[1]) achievements[1].textContent = t.achievement2;
    if (achievements[2]) achievements[2].textContent = t.achievement3;

    const achievementsCringe = document.querySelectorAll('.about-text-container.cringe .achievement-text');
    if (achievementsCringe[0]) achievementsCringe[0].textContent = t.achievement1Cringe;
    if (achievementsCringe[1]) achievementsCringe[1].textContent = t.achievement2Cringe;
    if (achievementsCringe[2]) achievementsCringe[2].textContent = t.achievement3Cringe;

    // Заголовок "Игроки"
    const playersTitle = document.querySelector('.players-title');
    if (playersTitle) playersTitle.textContent = t.playersTitle;

    // Discord блок
    const discordTitle = document.querySelector('.discord-cta-title');
    if (discordTitle) discordTitle.textContent = t.discordTitle;

    const discordText = document.querySelector('.discord-cta-text');
    if (discordText) discordText.textContent = t.discordText;

    const discordButton = document.querySelector('.discord-cta-button');
    if (discordButton) {
        const buttonText = discordButton.childNodes[discordButton.childNodes.length - 1];
        if (buttonText) buttonText.textContent = t.discordButton;
    }

    // Футер
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.innerHTML = `${t.footerText} | <a href="https://arikooidd2.github.io/cs2/" class="footer-link">${t.footerLink}</a>`;
    }

    // Кнопка "Смотреть игроков"
    const viewBtn = document.querySelector('header button');
    if (viewBtn) viewBtn.textContent = t.viewPlayersBtn;
}

// Загрузка сохраненного языка при старте
window.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'ru') {
        currentLanguage = savedLang;
        document.getElementById('currentLang').textContent = currentLanguage.toUpperCase();
        updateLanguage();
    }
});

// Определение устройства
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);

    if (isMobile && !isTablet) {
        document.body.classList.add('mobile-device');
        console.log('Устройство: Мобильный телефон');
    } else if (isTablet) {
        document.body.classList.add('tablet-device');
        console.log('Устройство: Планшет');
    } else {
        document.body.classList.add('desktop-device');
        console.log('Устройство: ПК');
    }
}

// Запускаем определение устройства при загрузке
detectDevice();

// Генерация уникального ID пользователя на основе браузера
function generateUserFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);

    const fingerprint = canvas.toDataURL() +
                       navigator.userAgent +
                       navigator.language +
                       screen.colorDepth +
                       screen.width +
                       screen.height;

    // Простой хеш
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return 'user_' + Math.abs(hash);
}

// Плавный скролл к карточкам
function smoothScrollToCards() {
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Звуковые эффекты убраны

// Генерация частиц - интерактивный canvas с эффектами CS2
function createParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const mouse = { x: null, y: null, radius: 150 };

    // Частицы дыма
    class SmokeParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = Math.random() * 30 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    const dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    const dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }

            this.baseX += this.speedX;
            this.baseY += this.speedY;

            if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
            if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;
        }
    }

    // Молнии
    class Lightning {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.segments = [];
            this.active = Math.random() < 0.02; // 2% шанс появления
            this.opacity = 1;
            this.generateSegments();
        }

        generateSegments() {
            let currentX = this.x;
            let currentY = this.y;
            const segmentCount = Math.floor(Math.random() * 5) + 3;

            for (let i = 0; i < segmentCount; i++) {
                const nextX = currentX + (Math.random() - 0.5) * 100;
                const nextY = currentY + Math.random() * 150 + 50;
                this.segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
                currentX = nextX;
                currentY = nextY;
            }
        }

        draw() {
            if (!this.active) return;

            ctx.strokeStyle = `rgba(88, 101, 242, ${this.opacity})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(88, 101, 242, 0.8)';

            this.segments.forEach(segment => {
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();
            });

            ctx.shadowBlur = 0;
        }

        update() {
            if (this.active) {
                this.opacity -= 0.05;
                if (this.opacity <= 0) {
                    this.active = false;
                    setTimeout(() => this.reset(), Math.random() * 5000 + 2000);
                }
            }
        }
    }

    function init() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new SmokeParticle());
        }
        // Добавляем 3 молнии
        for (let i = 0; i < 3; i++) {
            particles.push(new Lightning());
        }
    }

    function connect() {
        for (let a = 0; a < particleCount; a++) {
            for (let b = a; b < particleCount; b++) {
                if (particles[a] instanceof SmokeParticle && particles[b] instanceof SmokeParticle) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        const opacity = 1 - distance / 100;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// Не крутим тяжёлый canvas с частицами на мобильных — экономим батарею и FPS
if (!document.body.classList.contains('mobile-device')) {
    createParticles();
}

// Маппинг аватарок
const avatarMapping = {
    0: '4.jpg',
    1: 'photo_2_2026-04-10_22-19-10.jpg',
    2: '1.jpg',
    3: '2.jpg',
    4: '3.jpg'
};

const originalAvatars = {
    0: 'photo_1_2026-04-10_22-19-10.jpg',
    1: 'photo_2_2026-04-10_22-19-10.jpg',
    2: 'photo_3_2026-04-10_22-19-10.jpg',
    3: 'photo_4_2026-04-10_22-19-10.jpg',
    4: 'photo_5_2026-04-10_22-19-10.jpg'
};

// FACEIT API интеграция - используем публичный API без ключа
// FACEIT никнеймы игроков (реальные профили)
const faceitNicknames = {
    0: 'PoyexQ',        // Ванек Сиська
    1: 'shhhshhh',      // Константин Садырев
    2: 'shishka2121',   // Иван Исаев
    3: 'MOON_111',      // Муник Яричек
    4: 'vlad_swag'      // Влiд Swag (заглушка, нужен реальный ник)
};

async function getFaceitStats(playerIndex) {
    const nickname = faceitNicknames[playerIndex];
    if (!nickname) return getMockFaceitStats(playerIndex);

    try {
        console.log(`Загрузка данных для ${nickname}...`);

        // Определяем URL прокси (для локальной разработки или продакшена)
        const proxyUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:8001'
            : 'https://cs2-pro-academy.vercel.app/api/faceit';

        // Шаг 1: Получаем основную информацию игрока
        const playerResponse = await fetch(`${proxyUrl}?nickname=${encodeURIComponent(nickname)}&type=player`);

        if (!playerResponse.ok) {
            console.log(`API вернул ошибку ${playerResponse.status}, используем сохраненные данные`);
            return getMockFaceitStats(playerIndex);
        }

        const playerData = await playerResponse.json();
        const playerId = playerData.player_id;
        const cs2Game = playerData.games?.cs2 || playerData.games?.csgo || {};

        // Шаг 2: Получаем детальную статистику CS2
        let detailedStats = null;
        try {
            const statsResponse = await fetch(`${proxyUrl}?player_id=${playerId}&type=stats`);

            if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                detailedStats = statsData.lifetime || {};
            }
        } catch (e) {
            console.log('Детальная статистика недоступна');
        }

        console.log(`✓ Реальные данные загружены с FACEIT API для ${nickname}`);
        console.log('Level:', cs2Game.skill_level, 'ELO:', cs2Game.faceit_elo);
        console.log('Детальная статистика:', detailedStats);

        return {
            level: cs2Game.skill_level || 1,
            elo: cs2Game.faceit_elo || 1000,
            matches: parseInt(detailedStats?.['Matches'] || detailedStats?.['Games'] || 0),
            winRate: parseFloat(detailedStats?.['Win Rate %'] || detailedStats?.['Average Win Rate %'] || 50),
            avgKD: parseFloat(detailedStats?.['Average K/D Ratio'] || detailedStats?.['K/D Ratio'] || 1.0),
            avgHS: parseFloat(detailedStats?.['Average Headshots %'] || detailedStats?.['Headshots %'] || 40)
        };

    } catch (error) {
        console.error(`Ошибка загрузки FACEIT для ${nickname}:`, error);
        console.log('Используем сохраненные данные');
        return getMockFaceitStats(playerIndex);
    }
}

// Моковые данные если API недоступен (реальная статистика с FACEIT)
function getMockFaceitStats(playerIndex) {
    const mockStats = [
        { level: 1, elo: 1486, matches: 588, winRate: 50.0, avgKD: 1.15, avgHS: 49 },  // PoyexQ
        { level: 1, elo: 900, matches: 56, winRate: 43.0, avgKD: 1.25, avgHS: 47 },    // shhhshhh
        { level: 1, elo: 728, matches: 144, winRate: 46.0, avgKD: 0.87, avgHS: 31 },   // shishka2121
        { level: 1, elo: 690, matches: 97, winRate: 44.0, avgKD: 0.92, avgHS: 39 },    // MOON_111
        { level: 10, elo: 3100, matches: 2600, winRate: 54, avgKD: 1.10, avgHS: 46 }   // vlad_swag (заглушка)
    ];
    return mockStats[playerIndex] || mockStats[0];
}

// Данные игроков
const playersData = [
    {
        name: 'Ванек Сиська',
        role: 'Профессиональный игрок Counter-Strike 2',
        stats: { accuracy: 92, tactics: 85, teamwork: 88 },
        serious: [
            'Активный игрок FACEIT с опытом 588+ матчей',
            'Стабильный винрейт 50% в рейтинговых играх',
            'Отличный K/D 1.15 - больше убийств чем смертей',
            'Высокий процент хедшотов 49%',
            'Средний урон за раунд 92.8 ADR',
            'Специализируется на агрессивной игре',
            'Постоянно совершенствует навыки'
        ],
        cringe: [
            '🤡 Достиг сильвера в 25 лет',
            '💀 Упал с 10 lvl до 1 за неделю',
            '🏆 Победитель турнира "Мамина Гордость 2024"',
            '🎪 Чемпион по тимкиллам на спавне',
            '😭 Последнее место в школьном турнире',
            '🐀 Забанен на всех серверах за токсичность',
            '💩 Сейчас играет в казуал и плачет'
        ]
    },
    {
        name: 'Константин Садырев',
        role: 'IGL и тактик команды',
        stats: { accuracy: 78, tactics: 98, teamwork: 95 },
        serious: [
            'Опытный игрок с глубоким пониманием игры',
            'Капитан команды и главный стратег',
            'Отличный K/D 1.25 - лучший в команде',
            'Средний урон за раунд 93.2 ADR',
            'Процент хедшотов 47%',
            'Активно развивается на FACEIT',
            'Мастер тактических решений'
        ],
        cringe: [
            '🧠 "Тактик" который знает только раш B',
            '📢 Орет "PLANT PLANT PLANT" весь матч',
            '🤓 Списывает стратегии с ютуба',
            '💩 Команда его не слушает',
            '😭 Проиграл турнир против школьников',
            '🎪 Забывает купить дефуз каждый раунд',
            '🐀 Стратегия: "Делайте что хотите"'
        ]
    },
    {
        name: 'Иван Исаев',
        role: 'AWP-ер и снайпер команды',
        stats: { accuracy: 97, tactics: 86, teamwork: 84 },
        serious: [
            'Опыт 144+ матчей на FACEIT',
            'Винрейт 46% с постоянным ростом',
            'K/D 0.87 - фокус на поддержке команды',
            'Средний урон 73.0 ADR',
            'Процент хедшотов 31%',
            'Специализируется на AWP',
            'Надежный игрок в защите'
        ],
        cringe: [
            '🎯 Промахивается по стоящим противникам',
            '💀 Средний ADR 15 (урон по своим)',
            '🤡 Купил AWP один раз, больше не дают',
            '😱 Трясутся руки при виде врага',
            '🏆 Рекорд: 0 фрагов за весь матч',
            '💩 Топ-1 худший снайпер СНГ',
            '🐀 Играет за команду "Мамкины Бустеры"'
        ]
    },
    {
        name: 'Муник Яричек',
        role: 'Entry Fragger и штурмовик',
        stats: { accuracy: 88, tactics: 82, teamwork: 90 },
        serious: [
            'Агрессивный entry fragger команды',
            '97+ матчей опыта на FACEIT',
            'K/D 0.92 - первым входит на точки',
            'Средний урон 72.0 ADR',
            'Процент хедшотов 39%',
            'Создает пространство для команды',
            'Непредсказуемый стиль игры',
            '',
            'Любимая фраза: ЧТО ТЫ МАТЬ ЕГО ДЕЛАЕШЬ?'
        ],
        cringe: [
            '🤡 "Entry fragger" который умирает на спавне',
            '💀 Процент успешных входов 2%',
            '😭 Проиграл 1v1 против бота',
            '🎪 Известен тем что флешит себя',
            '💩 Последнее место на районном турнире',
            '🐀 Прячется в углу весь раунд',
            '🤦 Забывает купить броню каждую игру',
            '',
            'Любимая фраза: ЧТО ТЫ МАТЬ ЕГО ДЕЛАЕШЬ?'
        ]
    },
    {
        name: 'Влiд Swag',
        role: 'Support и специалист по утилити',
        stats: { accuracy: 84, tactics: 91, teamwork: 97 },
        serious: [
            'Мастер всех гранат на всех картах',
            'Средний utility damage 45+ за раунд',
            'Победитель ESL Pro League Season 19',
            'Победитель BLAST Premier Spring 2025',
            'Лучший support игрок 2024 по версии HLTV',
            'Создал обучающие видео по гранатам',
            'Играет за FaZe Clan'
        ],
        cringe: [
            '💨 Кидает смоки себе под ноги',
            '💣 Флешит команду каждый раунд',
            '🤡 Знает одну гранату на одной карте',
            '😭 Средний utility damage -50 (по своим)',
            '🎪 Забывает купить гранаты',
            '💩 Команда его кикает каждую игру',
            '🐀 Играет за "Токсичные Школьники"'
        ]
    }
];

function createFallingEmoji() {
    const emojis = ['🤡', '💀', '😭', '🎪', '💩', '🐀', '🤦', '😱', '💣', '🔥'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.top = '-50px';
    emoji.style.fontSize = (Math.random() * 30 + 20) + 'px';
    emoji.style.zIndex = '9998';
    emoji.style.animation = `fall ${Math.random() * 3 + 2}s linear`;

    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 5000);
}

function toggleMode() {
    isCringeMode = !isCringeMode;
    document.body.classList.toggle('cringe-mode');

    const avatars = document.querySelectorAll('.player-avatar img');
    const secretBtn = document.querySelector('.secret-btn');
    const musicControl = document.getElementById('musicControl');

    if (isCringeMode) {
        music.play();
        document.title = "🤡 КРИНЖ АКАДЕМИЯ 🤡";
        title.textContent = "ХУЕВЫЕ ИГРОКИ В КС2";

        avatars.forEach((img, index) => {
            img.src = `avatars/${avatarMapping[index]}`;
        });

        emojiInterval = setInterval(createFallingEmoji, 300);
    } else {
        music.pause();
        music.currentTime = 0;
        document.title = "CS2 Pro Academy | Профессиональные игроки Counter-Strike 2";
        title.textContent = "CS2 ПРО АКАДЕМИЯ";

        avatars.forEach((img, index) => {
            img.src = `avatars/${originalAvatars[index]}`;
        });

        clearInterval(emojiInterval);
        document.querySelectorAll('body > div[style*="position: fixed"]').forEach(el => el.remove());

        // ВСЕГДА возвращаем элементы на исходные позиции при выходе из cringe режима
        if (musicControl) {
            musicControl.style.left = '30px';
            musicControl.style.bottom = '30px';
            musicControl.style.transform = '';
        }
        if (secretBtn) {
            secretBtn.style.right = '20px';
            secretBtn.style.top = '20px';
            secretBtn.style.transform = '';
        }
        volumePanel.classList.remove('show');
    }
}

async function openModal(playerIndex) {
    console.log('Opening modal for player:', playerIndex);

    try {
        const modal = document.getElementById('modal');
        const player = playersData[playerIndex];

        if (!player) {
            console.error('Player not found:', playerIndex);
            return;
        }

        // Сразу открываем модалку
        modal.classList.add('show');

        document.getElementById('modalName').textContent = player.name;
        document.getElementById('modalRole').textContent = player.role;

        const achievements = isCringeMode ? player.cringe : player.serious;
        const achievementsHTML = achievements.map(a => a ? `<p>${a}</p>` : '<br>').join('');
        document.getElementById('modalAchievements').innerHTML = achievementsHTML;

        const avatarSrc = isCringeMode ? avatarMapping[playerIndex] : originalAvatars[playerIndex];
        document.getElementById('modalAvatar').src = `avatars/${avatarSrc}`;

        // Показываем индикатор загрузки для FACEIT
        document.getElementById('faceitLevel').textContent = '...';
        document.getElementById('faceitElo').textContent = '...';
        document.getElementById('faceitMatches').textContent = '...';
        document.getElementById('faceitWinRate').textContent = '...';
        document.getElementById('faceitKD').textContent = '...';
        document.getElementById('faceitHS').textContent = '...';

        // Звук клика
        clickSound.play().catch(() => {});

        // Загружаем FACEIT статистику асинхронно
        console.log('Loading FACEIT stats...');
        getFaceitStats(playerIndex).then(faceitStats => {
            console.log('FACEIT stats loaded:', faceitStats);
            if (faceitStats) {
                document.getElementById('faceitLevel').textContent = faceitStats.level;
                document.getElementById('faceitElo').textContent = faceitStats.elo;
                document.getElementById('faceitMatches').textContent = faceitStats.matches;
                document.getElementById('faceitWinRate').textContent = faceitStats.winRate.toFixed(1) + '%';
                document.getElementById('faceitKD').textContent = faceitStats.avgKD.toFixed(2);
                document.getElementById('faceitHS').textContent = Math.round(faceitStats.avgHS) + '%';
            }
        }).catch(error => {
            console.error('Error loading FACEIT stats:', error);
            // Показываем сохраненные данные при ошибке
            const fallbackStats = getMockFaceitStats(playerIndex);
            document.getElementById('faceitLevel').textContent = fallbackStats.level;
            document.getElementById('faceitElo').textContent = fallbackStats.elo;
            document.getElementById('faceitMatches').textContent = fallbackStats.matches;
            document.getElementById('faceitWinRate').textContent = fallbackStats.winRate.toFixed(1) + '%';
            document.getElementById('faceitKD').textContent = fallbackStats.avgKD.toFixed(2);
            document.getElementById('faceitHS').textContent = Math.round(fallbackStats.avgHS) + '%';
        });

        console.log('Modal opened successfully');
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function animateStatValue(elementId, targetValue) {
    const element = document.getElementById(elementId);
    let currentValue = 0;
    const increment = targetValue / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.round(currentValue) + '%';
    }, stepTime);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');

    // Звук закрытия
    closeSound.play().catch(() => {});
}

// Закрытие модалки по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal && modal.classList.contains('show')) {
            closeModal();
        }
    }
});

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Оптимизация: debounce для скролла
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Простой скролл без багов + параллакс эффект (оптимизировано)
const handleScroll = debounce(function() {
    const scrolled = window.scrollY;

    // Параллакс для фона (только если не мобильное устройство)
    if (!document.body.classList.contains('mobile-device')) {
        const yPos = scrolled * 0.5;
        document.body.style.setProperty('--parallax-y', `${yPos}px`);
    }

    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        if (scrolled > 200) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.player-card');
    const aboutSection = document.querySelector('.about-section');
    const playersTitle = document.querySelector('.players-title');
    const footer = document.querySelector('.footer');

    cards.forEach(card => {
        observer.observe(card);
    });

    if (aboutSection) observer.observe(aboutSection);
    if (playersTitle) observer.observe(playersTitle);
    if (footer) observer.observe(footer);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Ленивая загрузка изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="eager"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        imageObserver.observe(img);
    });
});

function shareProfile(event, playerName) {
    event.stopPropagation();
    const url = 'https://arikooidd2.github.io/cs2/';

    navigator.clipboard.writeText(url).then(() => {
        showNotification('Ссылка скопирована!');
    }).catch(() => {
        alert('Не удалось скопировать ссылку');
    });
}

function shareSite() {
    const url = 'https://arikooidd2.github.io/cs2/';

    navigator.clipboard.writeText(url).then(() => {
        showNotification('Ссылка скопирована!');
    }).catch(() => {
        alert('Не удалось скопировать ссылку');
    });
}

// Красивое уведомление вместо alert
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(255, 255, 255, 0.95);
        color: #000000;
        padding: 12px 24px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10002;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.player-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

musicControl.addEventListener('click', function(e) {
    e.stopPropagation();
    volumePanel.classList.toggle('show');
});

volumeSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    music.volume = volume;
    volumeValue.textContent = this.value + '%';
});

document.addEventListener('click', function(e) {
    if (!musicControl.contains(e.target)) {
        volumePanel.classList.remove('show');
    }
});

document.addEventListener('mousemove', function(e) {
    if (!isCringeMode) return;

    const musicRect = musicControl.getBoundingClientRect();
    const musicCenterX = musicRect.left + musicRect.width / 2;
    const musicCenterY = musicRect.top + musicRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const musicDistance = Math.sqrt(
        Math.pow(mouseX - musicCenterX, 2) +
        Math.pow(mouseY - musicCenterY, 2)
    );

    if (musicDistance < 150) {
        const angle = Math.atan2(musicCenterY - mouseY, musicCenterX - mouseX);
        const moveDistance = 150 - musicDistance;

        let newLeft = musicRect.left + Math.cos(angle) * moveDistance;
        let newBottom = window.innerHeight - musicRect.bottom + Math.sin(angle) * moveDistance;

        newLeft = Math.max(10, Math.min(window.innerWidth - musicRect.width - 10, newLeft));
        newBottom = Math.max(10, Math.min(window.innerHeight - musicRect.height - 10, newBottom));

        musicControl.style.left = newLeft + 'px';
        musicControl.style.bottom = newBottom + 'px';
    }

    const secretBtn = document.querySelector('.secret-btn');
    const secretRect = secretBtn.getBoundingClientRect();
    const secretCenterX = secretRect.left + secretRect.width / 2;
    const secretCenterY = secretRect.top + secretRect.height / 2;

    const secretDistance = Math.sqrt(
        Math.pow(mouseX - secretCenterX, 2) +
        Math.pow(mouseY - secretCenterY, 2)
    );

    if (secretDistance < 400) {
        const angle = Math.atan2(secretCenterY - mouseY, secretCenterX - mouseX);
        const moveDistance = (400 - secretDistance) * 3; // Увеличили множитель с 2 до 3

        let newRight = window.innerWidth - secretRect.right + Math.cos(angle) * moveDistance;
        let newTop = secretRect.top + Math.sin(angle) * moveDistance;

        newRight = Math.max(-100, Math.min(window.innerWidth + 100, newRight));
        newTop = Math.max(-100, Math.min(window.innerHeight + 100, newTop));

        secretBtn.style.right = newRight + 'px';
        secretBtn.style.top = newTop + 'px';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'l' || e.key === 'L' || e.key === 'д' || e.key === 'Д') {
        e.preventDefault();
        if (isCringeMode) {
            toggleMode();
        }
    }
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}
