// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar todas as funcionalidades
    initCountdown();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScroll();
    initMobileMenu();
    initExitIntent();
    initScrollTracking();
    initConversionOptimizations();
    
    console.log('Método Accent - Nova versão carregada com sucesso!');
});

// Countdown Timer Avançado
function initCountdown() {
    const countdownElements = [
        { hours: 'hours', minutes: 'minutes', seconds: 'seconds' },
        { element: 'countdown-hero' },
        { element: 'countdown-final' }
    ];
    
    // Define o tempo inicial (24 horas a partir de agora)
    let endTime = localStorage.getItem('countdownEndTime');
    if (!endTime) {
        endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', endTime);
    } else {
        endTime = parseInt(endTime);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Atualiza contadores principais
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            
            if (hoursElement && minutesElement && secondsElement) {
                hoursElement.textContent = hours.toString().padStart(2, '0');
                minutesElement.textContent = minutes.toString().padStart(2, '0');
                secondsElement.textContent = seconds.toString().padStart(2, '0');
            }
            
            // Atualiza contadores inline
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            const heroCountdown = document.getElementById('countdown-hero');
            const finalCountdown = document.getElementById('countdown-final');
            
            if (heroCountdown) heroCountdown.textContent = timeString;
            if (finalCountdown) finalCountdown.textContent = timeString;
            
        } else {
            // Quando o tempo acabar, reinicia o countdown
            resetCountdown();
        }
    }
    
    function resetCountdown() {
        const newEndTime = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', newEndTime);
        endTime = newEndTime;
        
        // Mostra notificação de nova oferta
        showNewOfferNotification();
    }
    
    // Atualiza a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Accordion Melhorado
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
                
                // Track FAQ interaction
                trackEvent('faq_opened', {
                    question: question.querySelector('h4').textContent
                });
            }
        });
    });
}

// Animações de Scroll Avançadas
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
                
                // Track section views
                const sectionName = entry.target.className.split(' ')[0];
                trackEvent('section_viewed', { section: sectionName });
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ser animados
    const animatedElements = document.querySelectorAll(`
        .problem-card,
        .step-card,
        .testimonial-card,
        .stat-item,
        .benefit-item,
        .include-item,
        .bonus-item
    `);
    
    animatedElements.forEach((el, index) => {
        // Adiciona delay progressivo
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
}

// Scroll Suave Melhorado
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
                
                // Track navigation clicks
                trackEvent('navigation_click', {
                    target: targetId,
                    source: link.textContent.trim()
                });
            }
        });
    });
}

// Header com efeito de scroll melhorado
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Esconde/mostra header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Menu Mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Fecha menu ao clicar em link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
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
        
        // Track CTA clicks
        trackEvent('cta_click', {
            type: 'scroll_to_offer',
            source: event.target.textContent.trim()
        });
    }
}

// Função de checkout melhorada
function checkout() {
    // Adiciona loading ao botão
    const button = event.target;
    const originalText = button.innerHTML;
    
    button.innerHTML = '<span>Processando...</span>';
    button.classList.add('loading');
    button.disabled = true;
    
    // Track checkout attempt
    trackEvent('checkout_initiated', {
        button_text: originalText,
        page_section: button.closest('section')?.className || 'unknown'
    });
    
    // Simula processamento
    setTimeout(() => {
        // Aqui você integraria com seu sistema de pagamento real
        const confirmed = confirm(`🚀 REDIRECIONANDO PARA CHECKOUT SEGURO\n\n✅ Método Accent Completo - R$ 197\n✅ Todos os bônus incluídos\n✅ Garantia de 30 dias\n✅ Acesso imediato\n\nClique OK para continuar com o pagamento seguro.`);
        
        if (confirmed) {
            // Track conversion
            trackEvent('checkout_confirmed', {
                value: 197,
                currency: 'BRL'
            });
            
            // Aqui seria o redirecionamento real para o gateway de pagamento
            window.open('https://pay.hotmart.com/exemplo-checkout', '_blank');
        } else {
            trackEvent('checkout_cancelled');
        }
        
        // Restaura o botão
        button.innerHTML = originalText;
        button.classList.remove('loading');
        button.disabled = false;
    }, 2000);
}

// Tracking de eventos avançado
function trackEvent(eventName, eventData = {}) {
    // Adiciona timestamp e dados da sessão
    const enrichedData = {
        ...eventData,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Event tracked:', eventName, enrichedData);
    
    // Integração com Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, enrichedData);
    }
    
    // Integração com Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, enrichedData);
    }
    
    // Salva no localStorage para análise posterior
    const events = JSON.parse(localStorage.getItem('userEvents') || '[]');
    events.push({ event: eventName, data: enrichedData });
    localStorage.setItem('userEvents', JSON.stringify(events.slice(-50))); // Mantém apenas os últimos 50 eventos
}

// Tracking de scroll depth melhorado
function initScrollTracking() {
    let maxScrollDepth = 0;
    let scrollMilestones = [25, 50, 75, 90];
    let trackedMilestones = [];
    
    function trackScrollDepth() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
            
            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                    trackedMilestones.push(milestone);
                    trackEvent('scroll_depth', { 
                        depth: `${milestone}%`,
                        max_depth: maxScrollDepth
                    });
                }
            });
        }
    }
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(trackScrollDepth, 100);
    });
}

// Exit Intent melhorado
function initExitIntent() {
    let exitIntentShown = false;
    let mouseLeaveCount = 0;
    
    function showExitIntent() {
        if (exitIntentShown) return;
        
        exitIntentShown = true;
        trackEvent('exit_intent_triggered');
        
        // Cria modal de exit intent
        const modal = createExitIntentModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 100);
    }
    
    function createExitIntentModal() {
        const modal = document.createElement('div');
        modal.className = 'exit-intent-modal';
        modal.innerHTML = `
            <div class="exit-intent-content">
                <button class="exit-intent-close">&times;</button>
                <h3>⚠️ Espere! Não Perca Esta Oportunidade!</h3>
                <p>Você está prestes a perder <strong>60% de desconto</strong> no Método Accent.</p>
                <p>Esta oferta especial expira em breve e pode não estar disponível quando você voltar.</p>
                <div class="exit-intent-offer">
                    <div class="exit-price">
                        <span class="old-price">De R$ 497</span>
                        <span class="new-price">Por apenas R$ 197</span>
                    </div>
                    <button class="cta-button" onclick="acceptExitOffer()">
                        🚀 SIM! QUERO GARANTIR MEU DESCONTO
                    </button>
                </div>
                <p class="exit-guarantee">✅ Garantia de 30 dias ou seu dinheiro de volta</p>
            </div>
        `;
        
        // Adiciona estilos
        const style = document.createElement('style');
        style.textContent = `
            .exit-intent-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            .exit-intent-modal.show {
                opacity: 1;
                visibility: visible;
            }
            .exit-intent-content {
                background: white;
                padding: 2rem;
                border-radius: 16px;
                max-width: 500px;
                margin: 1rem;
                text-align: center;
                position: relative;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .exit-intent-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
            }
            .exit-intent-content h3 {
                color: #FF6B35;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
            .exit-intent-offer {
                background: #f9fafb;
                padding: 1.5rem;
                border-radius: 12px;
                margin: 1.5rem 0;
            }
            .exit-price {
                margin-bottom: 1rem;
            }
            .old-price {
                text-decoration: line-through;
                color: #666;
                margin-right: 1rem;
            }
            .new-price {
                color: #FF6B35;
                font-weight: bold;
                font-size: 1.25rem;
            }
            .exit-guarantee {
                color: #10B981;
                font-weight: 600;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners
        modal.querySelector('.exit-intent-close').addEventListener('click', () => {
            modal.remove();
            trackEvent('exit_intent_dismissed');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                trackEvent('exit_intent_dismissed');
            }
        });
        
        return modal;
    }
    
    // Detecta mouse leave
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) {
            mouseLeaveCount++;
            if (mouseLeaveCount >= 2) { // Só mostra após 2 tentativas de saída
                showExitIntent();
            }
        }
    });
    
    // Detecta tentativa de fechar aba
    window.addEventListener('beforeunload', (e) => {
        if (!exitIntentShown) {
            e.preventDefault();
            e.returnValue = 'Tem certeza que deseja sair? Você pode perder esta oferta especial!';
            trackEvent('page_exit_attempt');
        }
    });
}

// Função para aceitar oferta do exit intent
function acceptExitOffer() {
    trackEvent('exit_intent_conversion');
    document.querySelector('.exit-intent-modal').remove();
    scrollToOffer();
}

// Otimizações de conversão
function initConversionOptimizations() {
    // Adiciona urgência dinâmica
    updateUrgencyMessages();
    setInterval(updateUrgencyMessages, 30000);
    
    // Mostra notificação de outros comprando
    showSocialProofNotifications();
    
    // Adiciona efeitos de hover melhorados
    addAdvancedHoverEffects();
    
    // Inicializa lazy loading
    initLazyLoading();
    
    // Salva progresso do usuário
    trackUserProgress();
}

// Atualiza mensagens de urgência
function updateUrgencyMessages() {
    const urgencyMessages = [
        '🔥 OFERTA LIMITADA - Termina em breve!',
        '⚠️ Últimas vagas disponíveis!',
        '🚨 Promoção expira hoje!',
        '⏰ Tempo limitado - Não perca!',
        '🎯 Oferta especial por tempo limitado!'
    ];
    
    const urgencyElements = document.querySelectorAll('.urgency-badge');
    urgencyElements.forEach((element, index) => {
        if (urgencyMessages[index % urgencyMessages.length]) {
            const message = urgencyMessages[index % urgencyMessages.length];
            const countdownPart = element.textContent.includes('Termina em') ? 
                ' - Termina em ' + element.querySelector('#countdown-hero, span')?.textContent : '';
            element.innerHTML = message + countdownPart;
        }
    });
}

// Mostra notificações de prova social
function showSocialProofNotifications() {
    const notifications = [
        'João de São Paulo acabou de se inscrever!',
        'Maria do Rio de Janeiro garantiu sua vaga!',
        'Carlos de Belo Horizonte está assistindo o curso!',
        'Ana de Porto Alegre completou o módulo 1!',
        'Pedro de Brasília conseguiu seu primeiro resultado!'
    ];
    
    let notificationIndex = 0;
    
    function showNotification() {
        const notification = document.createElement('div');
        notification.className = 'social-proof-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">👤</span>
                <span class="notification-text">${notifications[notificationIndex]}</span>
            </div>
        `;
        
        // Adiciona estilos se não existirem
        if (!document.querySelector('#social-proof-styles')) {
            const style = document.createElement('style');
            style.id = 'social-proof-styles';
            style.textContent = `
                .social-proof-notification {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
                    z-index: 1000;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    border-left: 4px solid #10B981;
                }
                .social-proof-notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .notification-icon {
                    font-size: 1.25rem;
                }
                .notification-text {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #374151;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
        
        notificationIndex = (notificationIndex + 1) % notifications.length;
    }
    
    // Mostra primeira notificação após 10 segundos
    setTimeout(showNotification, 10000);
    
    // Continua mostrando a cada 30-60 segundos
    setInterval(showNotification, Math.random() * 30000 + 30000);
}

// Adiciona efeitos de hover avançados
function addAdvancedHoverEffects() {
    // Efeito de hover para CTAs
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
    
    // Efeito de hover para cards
    document.querySelectorAll('.testimonial-card, .problem-card, .step-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Tracking de progresso do usuário
function trackUserProgress() {
    const sections = document.querySelectorAll('section');
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    
    sections.forEach(section => {
        const sectionId = section.id || section.className.split(' ')[0];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progress[sectionId] = {
                        viewed: true,
                        timestamp: new Date().toISOString(),
                        timeSpent: (progress[sectionId]?.timeSpent || 0)
                    };
                    
                    localStorage.setItem('userProgress', JSON.stringify(progress));
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(section);
    });
    
    // Track time spent on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - startTime;
        trackEvent('page_time_spent', { 
            duration_seconds: Math.round(timeSpent / 1000),
            page_url: window.location.href
        });
    });
}

// Mostra notificação de nova oferta
function showNewOfferNotification() {
    const notification = document.createElement('div');
    notification.className = 'new-offer-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>🎉 Nova Oferta Disponível!</h4>
            <p>O contador foi renovado! Aproveite mais 24 horas de desconto especial.</p>
            <button onclick="this.parentElement.parentElement.remove()">Entendi</button>
        </div>
    `;
    
    // Adiciona estilos
    const style = document.createElement('style');
    style.textContent = `
        .new-offer-notification {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            z-index: 10000;
            text-align: center;
            border: 3px solid #FF6B35;
        }
        .new-offer-notification h4 {
            color: #FF6B35;
            margin-bottom: 1rem;
        }
        .new-offer-notification button {
            background: #FF6B35;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Função para compartilhamento social
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Descobri o Método Accent para dominar o sotaque americano! Incrível!');
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        trackEvent('social_share', { platform });
    }
}

// Adiciona funcionalidade de scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adiciona efeito de typing ao título principal
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.dataset.typed) {
        heroTitle.dataset.typed = 'true';
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Inicializa efeito de typing quando a página carrega
window.addEventListener('load', () => {
    setTimeout(addTypingEffect, 500);
});

// Adiciona funcionalidade de feedback visual para formulários
function addFormFeedback() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim()) {
                    input.classList.add('filled');
                } else {
                    input.classList.remove('filled');
                }
            });
            
            input.addEventListener('focus', () => {
                input.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.classList.remove('focused');
            });
        });
    });
}

// Inicializa feedback de formulários
addFormFeedback();

// Adiciona funcionalidade de auto-save para formulários
function initAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const saveKey = `autosave_${form.id || 'form'}_${input.name || input.id}`;
            
            // Carrega valor salvo
            const savedValue = localStorage.getItem(saveKey);
            if (savedValue && input.type !== 'password') {
                input.value = savedValue;
            }
            
            // Salva valor ao digitar
            input.addEventListener('input', () => {
                if (input.type !== 'password') {
                    localStorage.setItem(saveKey, input.value);
                }
            });
        });
    });
}

// Inicializa auto-save
initAutoSave();

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitora tempo de carregamento
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_time', { 
            load_time_ms: loadTime,
            load_time_seconds: Math.round(loadTime / 1000)
        });
    });
    
    // Monitora Core Web Vitals
    if ('web-vitals' in window) {
        import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(metric => trackEvent('core_web_vital', { metric: 'CLS', value: metric.value }));
            getFID(metric => trackEvent('core_web_vital', { metric: 'FID', value: metric.value }));
            getFCP(metric => trackEvent('core_web_vital', { metric: 'FCP', value: metric.value }));
            getLCP(metric => trackEvent('core_web_vital', { metric: 'LCP', value: metric.value }));
            getTTFB(metric => trackEvent('core_web_vital', { metric: 'TTFB', value: metric.value }));
        });
    }
}

// Inicializa monitoramento de performance
initPerformanceMonitoring();

