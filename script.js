// Quiz Data
const quizData = [
    {
        question: "Qual é a sua idade?",
        options: [
            "18-25 anos",
            "26-35 anos", 
            "36-45 anos",
            "46-55 anos",
            "Acima de 55 anos"
        ]
    },
    {
    question: "Como você avalia o nível de esperança que tem no futuro do Brasil?",
    options: [
        "Muito baixa - já perdi a esperança no sistema",
        "Baixa - acredito pouco que algo vá mudar",
        "Moderada - ainda tenho alguma esperança de mudança",
        "Alta - acredito que o Brasil pode mudar com esforço coletivo",
        "Muito alta - acredito totalmente na virada em 2026"
    ]
},
{
    question: "Com que frequência você acompanha notícias sobre política e o país?",
    options: [
        "Diariamente",
        "3-4 vezes por semana",
        "1-2 vezes por semana", 
        "Raramente",
        "Nunca"
    ]
},
{
    question: "Como você descreveria sua visão sobre os governantes atuais?",
    options: [
        "Muito positiva - acredito que estão fazendo o certo",
        "Razoável - há erros, mas ainda vejo avanços",
        "Neutra - nem confio nem desconfio",
        "Negativa - não acredito nas intenções deles",
        "Muito negativa - vejo corrupção e manipulação em tudo"
    ]
},
{
    question: "Com que frequência você conversa sobre política com amigos ou família?",
    options: [
        "Todos os dias",
        "3-4 vezes por semana",
        "1-2 vezes por semana",
        "Raramente",
        "Nunca"
    ]
},
{
    question: "Você já participou de manifestações ou campanhas políticas?",
    options: [
        "Sim, várias vezes",
        "Sim, algumas vezes",
        "Apenas uma vez",
        "Não, mas tenho vontade",
        "Nunca participei"
    ]
},
{
    question: "Com que frequência você confia na mídia tradicional?",
    options: [
        "Sempre",
        "Frequentemente",
        "Às vezes",
        "Raramente",
        "Nunca"
    ]
},
{
    question: "Como você se sente em relação ao seu poder de voto em 2026?",
    options: [
        "Muito confiante - meu voto pode mudar o país",
        "Confiante - acredito que fará diferença",
        "Moderado - não sei se realmente muda algo",
        "Pouco confiante - parece que já está tudo decidido",
        "Sem confiança - acho que meu voto não tem valor"
    ]
}

];

// Quiz State
let currentQuestion = 0;
let answers = [];
let quizStarted = false;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const startQuizBtn = document.getElementById('start-quiz-btn');
const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('progress-fill');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// Event Listeners
startQuizBtn.addEventListener('click', startQuiz);
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Animation utilities
function animateElement(element, animation, duration = 500) {
    return new Promise(resolve => {
        element.style.animation = `${animation} ${duration}ms ease-out`;
        setTimeout(() => {
            element.style.animation = '';
            resolve();
        }, duration);
    });
}

function fadeOut(element, duration = 300) {
    return new Promise(resolve => {
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        element.style.opacity = '0';
        element.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            element.classList.add('hidden');
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = '';
            resolve();
        }, duration);
    });
}

function fadeIn(element, duration = 300) {
    return new Promise(resolve => {
        element.classList.remove('hidden');
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            setTimeout(() => {
                element.style.opacity = '';
                element.style.transform = '';
                element.style.transition = '';
                resolve();
            }, duration);
        }, 10);
    });
}

function slideIn(element, direction = 'right', duration = 400) {
    return new Promise(resolve => {
        const translateX = direction === 'right' ? '100%' : '-100%';
        element.style.transform = `translateX(${translateX})`;
        element.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            setTimeout(() => {
                element.style.transform = '';
                element.style.transition = '';
                resolve();
            }, duration);
        }, 10);
    });
}

function slideOut(element, direction = 'left', duration = 400) {
    return new Promise(resolve => {
        const translateX = direction === 'left' ? '-100%' : '100%';
        element.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        element.style.transform = `translateX(${translateX})`;
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.transition = '';
            resolve();
        }, duration);
    });
}

// Quiz Functions
async function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    answers = [];
    
    await fadeOut(landingPage);
    await fadeIn(quizContainer);
    
    displayQuestion();
}

async function displayQuestion() {
    const question = quizData[currentQuestion];
    
    // Update progress with animation
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.transition = 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    progressFill.style.width = `${progress}%`;
    
    // Update question counter with fade effect
    questionCounter.style.transition = 'opacity 0.3s ease';
    questionCounter.style.opacity = '0';
    setTimeout(() => {
        questionCounter.textContent = `${currentQuestion + 1} de ${quizData.length}`;
        questionCounter.style.opacity = '1';
    }, 150);
    
    // Animate question text
    await animateElement(quizQuestion, 'fadeInUp 600ms');
    quizQuestion.textContent = question.question;
    
    // Clear options with slide out animation
    const existingOptions = document.querySelectorAll('.quiz-option');
    if (existingOptions.length > 0) {
        await Promise.all(Array.from(existingOptions).map((option, index) => 
            new Promise(resolve => {
                setTimeout(() => {
                    option.style.transition = 'all 0.3s ease';
                    option.style.opacity = '0';
                    option.style.transform = 'translateX(-50px)';
                    setTimeout(resolve, 300);
                }, index * 50);
            })
        ));
    }
    
    // Clear options container
    quizOptions.innerHTML = '';
    
    // Add new options with staggered animation
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.style.opacity = '0';
        optionElement.style.transform = 'translateX(50px)';
        
        // Check if this option was previously selected
        if (answers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        quizOptions.appendChild(optionElement);
        
        // Animate option in
        setTimeout(() => {
            optionElement.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            optionElement.style.opacity = '1';
            optionElement.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

function selectOption(optionIndex, optionElement) {
    // Remove selection from all options with animation
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
        if (option !== optionElement) {
            option.style.transition = 'all 0.3s ease';
            option.style.opacity = '0.6';
            option.style.transform = 'scale(0.98)';
        }
    });
    
    // Add selection to clicked option with enhanced animation
    optionElement.classList.add('selected');
    optionElement.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    optionElement.style.opacity = '1';
    optionElement.style.transform = 'scale(1.02)';
    
    // Store answer
    answers[currentQuestion] = optionIndex;
    
    // Enable next button with animation
    nextBtn.disabled = false;
    nextBtn.style.transition = 'all 0.3s ease';
    nextBtn.style.opacity = '1';
    nextBtn.style.transform = 'scale(1)';
    
    // Add ripple effect
    createRippleEffect(optionElement, event);
    
    // Add success feedback
    setTimeout(() => {
        optionElement.style.transform = 'scale(1)';
        document.querySelectorAll('.quiz-option').forEach(option => {
            if (option !== optionElement) {
                option.style.opacity = '0.8';
                option.style.transform = 'scale(1)';
            }
        });
    }, 400);
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(237, 28, 36, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function updateNavigationButtons() {
    // Previous button
    if (currentQuestion === 0) {
        prevBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
    }
    
    // Next button
    if (answers[currentQuestion] !== undefined) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
    
    // Change next button text on last question
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Ver Resultado';
    } else {
        nextBtn.textContent = 'Próxima';
    }
}

async function nextQuestion() {
    if (answers[currentQuestion] === undefined) return;
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        // Quiz completed, show results
        await showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

async function showResults() {
    await fadeOut(quizContainer);
    
    const score = calculateScore();
    const result = getResultDescription(score);
    
    // Update result content
    document.getElementById('result-score').innerHTML = `
        <div class="score-number">${score}%</div>
        <div class="score-label">Potencial de Crescimento</div>
    `;
    
    document.getElementById('result-description').innerHTML = `
        <h3>${result.title}</h3>
        <p>${result.description}</p>
        <p>${result.recommendation}</p>
    `;
    
    await fadeIn(resultContainer);
}

function calculateScore() {
    let totalScore = 0;
    
    answers.forEach((answer, questionIndex) => {
        // Different scoring logic for each question
        switch (questionIndex) {
            case 0: // Age
                totalScore += [100, 90, 80, 70, 60][answer] || 50;
                break;
            case 1: // Stress
                totalScore += [100, 80, 60, 40, 20][answer] || 20;
                break;
            case 2: // Exercise
                totalScore += [100, 90, 70, 50, 30][answer] || 30;
                break;
            case 3: // Diet
                totalScore += [100, 80, 60, 40, 20][answer] || 20;
                break;
            case 4: // Sleep
                totalScore += [100, 90, 70, 50, 30][answer] || 30;
                break;
            case 5: // Smoking
                totalScore += [100, 80, 60, 40, 20][answer] || 20;
                break;
            case 6: // Alcohol
                totalScore += [100, 90, 80, 60, 40][answer] || 40;
                break;
            case 7: // Confidence
                totalScore += [100, 80, 60, 40, 20][answer] || 20;
                break;
        }
    });
    
    return Math.round(totalScore / quizData.length);
}

function getResultDescription(score) {
    if (score >= 85) {
        return {
            title: "Potência Máxima de Influência",
            description: "Você é uma voz forte e desperta neste país. Já entendeu o jogo e sabe que 2026 não será uma eleição qualquer — é uma batalha pelo futuro do Brasil.",
            recommendation: "A Missão 2026 precisa de pessoas como você: firmes, conscientes e dispostas a lutar até o fim. Sua força pode inspirar milhares. Continue ativo, o país depende de líderes como você."
        };
    } else if (score >= 70) {
        return {
            title: "Alto Potencial de Influência",
            description: "Você já acordou — sabe que o sistema tentou te calar, mas você não se rendeu. Ainda assim, há espaço para agir com mais força e estratégia.",
            recommendation: "A Missão 2026 vai transformar sua voz em impacto real. Agora é hora de intensificar: fale, compartilhe, mobilize. Cada ação sua é um ato de resistência."
        };
    } else if (score >= 55) {
        return {
            title: "Potencial em Despertar",
            description: "Você sente que algo está errado, mas ainda não começou a agir com toda a intensidade que o momento exige. O sistema quer te manter distraído.",
            recommendation: "A Missão 2026 vai abrir seus olhos para o que realmente está em jogo. É hora de se posicionar, unir forças e ajudar a libertar o Brasil do controle que o aprisiona há décadas."
        };
    } else if (score >= 40) {
        return {
            title: "Influência Bloqueada - Sistema em Controle",
            description: "Você está entre os milhões que o sistema tentou silenciar. Mas isso pode mudar. Dentro de você ainda existe o espírito de quem quer ver o Brasil livre.",
            recommendation: "A Missão 2026 vai reacender sua chama. Quando o povo desperta, nenhum sistema consegue parar. Levante-se — é agora ou nunca."
        };
    } else {
        return {
            title: "Nação em Alerta - Silêncio Perigoso",
            description: "O sistema venceu quando o povo parou de acreditar. Mas ainda há tempo de reagir. Nenhum império dura para sempre quando o povo desperta.",
            recommendation: "A Missão 2026 é sua chance de recomeçar e lutar por um Brasil soberano. Rompa o silêncio, retome sua voz e entre na linha de frente dessa revolução pacífica."
        };
    }
}

async function restartQuiz() {
    await fadeOut(resultContainer);
    await fadeIn(landingPage);
    
    // Reset quiz state
    currentQuestion = 0;
    answers = [];
    quizStarted = false;
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Ensure landing page is visible on load
    landingPage.classList.remove('hidden');
    quizContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation for hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-cta, .hero-stats');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }, 100);
});

