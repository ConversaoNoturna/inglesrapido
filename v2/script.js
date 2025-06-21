// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas as funcionalidades
    initCountdown();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScroll();
    
    console.log('Método Accent - Página carregada com sucesso!');
});

// Countdown Timer
function initCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Define o tempo inicial (24 horas a partir de agora)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Quando o tempo acabar, reinicia o countdown
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Reinicia para mais 24 horas
            setTimeout(() => {
                initCountdown();
            }, 1000);
        }
    }
    
    // Atualiza a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Animações de Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Para elementos com delay
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ser animados
    const animatedElements = document.querySelectorAll(`
        .problem-item,
        .step-item,
        .testimonial-item,
        .stat-item,
        .benefit-item
    `);
    
    animatedElements.forEach((el, index) => {
        // Adiciona delay progressivo
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
}

// Scroll Suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header com efeito de scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        // Esconde/mostra header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Função para scroll até a oferta
function scrollToOffer() {
    const offerSection = document.querySelector('.offer-section');
    if (offerSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = offerSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Adiciona efeito de destaque na seção
        offerSection.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            offerSection.style.animation = '';
        }, 1000);
    }
}

// Função de checkout (simulada)
function checkout() {
    // Adiciona loading ao botão
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = 'Processando...';
    button.classList.add('loading');
    button.disabled = true;
    
    // Simula processamento
    setTimeout(() => {
        // Aqui você integraria com seu sistema de pagamento real
        alert('Redirecionando para o checkout seguro...\n\nEm uma implementação real, aqui seria integrado com:\n- Stripe\n- PayPal\n- PagSeguro\n- Mercado Pago\n- Ou outro gateway de pagamento');
        
        // Restaura o botão
        button.innerHTML = originalText;
        button.classList.remove('loading');
        button.disabled = false;
    }, 2000);
}

// Tracking de eventos (para analytics)
function trackEvent(eventName, eventData = {}) {
    // Aqui você integraria com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Exemplo de integração com Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Exemplo de integração com Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Adiciona tracking aos botões CTA
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page_section: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Tracking de scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Trackeia marcos importantes
        if (scrollDepth >= 25 && maxScrollDepth < 25) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollDepth >= 50 && maxScrollDepth < 50) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollDepth >= 75 && maxScrollDepth < 75) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollDepth >= 90 && maxScrollDepth < 90) {
            trackEvent('scroll_depth', { depth: '90%' });
        }
    }
});

// Detecta quando o usuário está prestes a sair da página
let exitIntentShown = false;
document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        showExitIntent();
    }
});

function showExitIntent() {
    // Aqui você pode mostrar um popup de última chance
    const confirmed = confirm('Espere! Não perca esta oportunidade única!\n\nVocê está prestes a perder 60% de desconto no Método Accent.\n\nClique em "OK" para garantir sua vaga com desconto ou "Cancelar" para sair.');
    
    if (confirmed) {
        scrollToOffer();
        trackEvent('exit_intent_conversion');
    } else {
        trackEvent('exit_intent_dismissed');
    }
}

// Adiciona efeitos de hover personalizados
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('cta-button')) {
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('cta-button')) {
        e.target.style.transform = '';
    }
});

// Lazy loading para imagens (se houver)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializa lazy loading se houver imagens
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Função para adicionar urgência dinâmica
function updateUrgencyMessages() {
    const urgencyElements = document.querySelectorAll('.urgency-badge, .urgency-text');
    const messages = [
        '🔥 OFERTA LIMITADA - Apenas 48 horas restantes!',
        '⚠️ Últimas vagas disponíveis!',
        '🚨 Promoção expira em breve!',
        '⏰ Tempo limitado - Não perca!'
    ];
    
    urgencyElements.forEach((element, index) => {
        if (messages[index]) {
            element.textContent = messages[index];
        }
    });
}

// Atualiza mensagens de urgência periodicamente
setInterval(updateUrgencyMessages, 30000); // A cada 30 segundos

// Adiciona efeito de digitação ao título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplica efeito de digitação quando a página carrega
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Adiciona partículas de fundo (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 107, 53, 0.1);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// CSS para animação das partículas
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Inicializa partículas (descomente se desejar)
// createParticles();

// Função para salvar progresso do usuário (localStorage)
function saveUserProgress(section) {
    const progress = JSON.parse(localStorage.getItem('metodoAccentProgress') || '{}');
    progress[section] = new Date().toISOString();
    progress.lastVisit = new Date().toISOString();
    localStorage.setItem('metodoAccentProgress', JSON.stringify(progress));
}

// Salva progresso quando o usuário interage com seções importantes
document.addEventListener('click', (e) => {
    const section = e.target.closest('section');
    if (section) {
        const sectionClass = section.className.split(' ')[0];
        saveUserProgress(sectionClass);
    }
});

// Mostra mensagem de boas-vindas para usuários recorrentes
function showWelcomeMessage() {
    const progress = JSON.parse(localStorage.getItem('metodoAccentProgress') || '{}');
    
    if (progress.lastVisit) {
        const lastVisit = new Date(progress.lastVisit);
        const now = new Date();
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit > 0 && daysSinceLastVisit < 7) {
            setTimeout(() => {
                const message = `Bem-vindo de volta! Você visitou nossa página há ${daysSinceLastVisit} dia${daysSinceLastVisit > 1 ? 's' : ''}. A oferta especial ainda está disponível!`;
                
                // Cria notificação discreta
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--primary-color);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 1001;
                    max-width: 300px;
                    font-size: 14px;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                `;
                notification.textContent = message;
                
                document.body.appendChild(notification);
                
                // Anima entrada
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                // Remove após 5 segundos
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 5000);
                
            }, 2000);
        }
    }
}

// Mostra mensagem de boas-vindas
showWelcomeMessage();

// Adiciona funcionalidade de compartilhamento social
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Descobri o Método Accent - transforma seu sotaque em inglês em 30 dias!');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        trackEvent('social_share', { platform: platform });
    }
}

// Adiciona botões de compartilhamento (se necessário)
function addSocialShareButtons() {
    const shareContainer = document.createElement('div');
    shareContainer.className = 'social-share';
    shareContainer.style.cssText = `
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
    `;
    
    const platforms = ['facebook', 'twitter', 'whatsapp', 'linkedin'];
    
    platforms.forEach(platform => {
        const button = document.createElement('button');
        button.style.cssText = `
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-color);
            color: white;
            cursor: pointer;
            font-size: 18px;
            transition: transform 0.2s ease;
        `;
        
        button.innerHTML = getShareIcon(platform);
        button.onclick = () => shareOnSocial(platform);
        button.onmouseover = () => button.style.transform = 'scale(1.1)';
        button.onmouseout = () => button.style.transform = 'scale(1)';
        
        shareContainer.appendChild(button);
    });
    
    document.body.appendChild(shareContainer);
}

function getShareIcon(platform) {
    const icons = {
        facebook: '📘',
        twitter: '🐦',
        whatsapp: '💬',
        linkedin: '💼'
    };
    return icons[platform] || '📤';
}

// Descomente para adicionar botões de compartilhamento
// addSocialShareButtons();

console.log('🚀 Método Accent - Todos os scripts carregados com sucesso!');

