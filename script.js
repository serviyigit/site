document.addEventListener('DOMContentLoaded', function() {
    // Animasyon numaraları
    animateStats();
    
    // Mobil menü
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Header Scroll Efekti
    const header = document.querySelector('header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('active');
        }
        
        // Animasyon sınıflarını ekle
        const animatedElements = document.querySelectorAll('section');
        animatedElements.forEach(element => {
            const position = element.getBoundingClientRect();
            if(position.top < window.innerHeight - 150) {
                const animItems = element.querySelectorAll('.animate');
                animItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 100);
                });
            }
        });
    });
    
    // Menü bağlantıları için kaydırma efekti
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Eğer dış bağlantı değilse
            if (this.getAttribute('href').charAt(0) === '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Mobil menüyü kapat
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    // Hedef bölüme kaydır
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Komut kategorileri filtreleme
    const tabBtns = document.querySelectorAll('.tab-btn');
    const commandItems = document.querySelectorAll('.command-item');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aktif buton sınıfını kaldır
            tabBtns.forEach(b => b.classList.remove('active'));
            // Bu butona aktif sınıfı ekle
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Komutları filtrele
            commandItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category').includes(category)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // SSS Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Diğer açık olanları kapat
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            
            // Bu öğeyi aç/kapat
            item.classList.toggle('active');
        });
    });
    
    // Geri Yukarı Butonu
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // İstatistikler animasyonu
    function animateStats() {
        const stats = [
            { element: document.getElementById('serverCount'), targetValue: 20, duration: 1500 },
            { element: document.getElementById('userCount'), targetValue: 500, duration: 1500 },
            { element: document.getElementById('commandCount'), targetValue: 55, duration: 1500 }
        ];
        
        stats.forEach(stat => {
            animateValue(stat.element, 0, stat.targetValue, stat.duration);
        });
    }
    
    function animateValue(element, start, end, duration) {
        if (!element) return;
        
        let startTime = null;
        const step = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (end >= 1000) {
                element.textContent = formatNumber(value);
            } else {
                element.textContent = value;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    }
    
    // Sayfa yüklendiğinde ilk animasyonları başlat
    const initialAnimations = document.querySelectorAll('.hero .animate');
    initialAnimations.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('show');
        }, 300 + index * 200);
    });
    
    // Konuşma balonu efekti
    const discordMessages = document.querySelectorAll('.discord-message');
    
    discordMessages.forEach((message, index) => {
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 300 + index * 150);
    });
    
    // Gönder butonunu devre dışı bırak
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Formunuz başarıyla gönderildi! Yakında sizinle iletişime geçeceğiz.');
            this.reset();
        });
    }

});