// ===================================
// Main JavaScript for Singer Website
// ===================================

(function() {
    'use strict';

    // ===================================
    // Data Loading Functions
    // ===================================
    
    async function loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('데이터 로딩 실패:', error);
            return null;
        }
    }
    
    function showError(container, message) {
        if (!container) return;
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: hsl(var(--muted-foreground));">
                <p>${message}</p>
            </div>
        `;
    }

    // ===================================
    // Albums Page Rendering
    // ===================================
    
    async function renderAlbumsPage() {
        const data = await loadJSON('assets/data/albums.json');
        if (!data) {
            showError(document.querySelector('#albums-content'), '앨범 정보를 불러올 수 없습니다.');
            return;
        }
        
        // Render Latest Album
        renderLatestAlbum(data.latest);
        
        // Render Previous Albums
        renderPreviousAlbums(data.previous);
        
        // Render Singles
        renderSingles(data.singles);
        
        // Render Music Videos
        renderMusicVideos(data.musicVideos);
        
        // Render Streaming Platforms
        renderStreamingPlatforms(data.streamingPlatforms);
    }
    
    function renderLatestAlbum(album) {
        const container = document.querySelector('#latest-album');
        if (!container || !album) return;
        
        const tracksHTML = album.tracks.map((track, index) => 
            `<li>${track}</li>`
        ).join('');
        
        container.innerHTML = `
            <div style="display: inline-block; background-color: hsl(var(--foreground)); color: hsl(var(--background)); padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">
                Latest Release
            </div>
            
            <div class="hero-grid" style="gap: 2rem;">
                <div class="card-image" style="border-radius: 8px;">
                    <img src="${album.image}" alt="${album.title} 앨범 커버" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">
                </div>
                
                <div style="display: flex; flex-direction: column; justify-content: center; gap: 1.5rem;">
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 0.5rem;">${album.title}</h2>
                        <p style="color: hsl(var(--muted-foreground)); margin-bottom: 1rem;">
                            ${album.subtitle} · ${album.year}년 ${album.month} 발매
                        </p>
                        <p style="color: hsl(var(--muted-foreground)); line-height: 1.6;">
                            ${album.description}
                        </p>
                    </div>
                    
                    <div>
                        <h3 style="font-weight: 600; margin-bottom: 0.75rem;">수록곡</h3>
                        <ol style="color: hsl(var(--muted-foreground)); line-height: 1.8; margin-left: 1.25rem;">
                            ${tracksHTML}
                        </ol>
                    </div>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <a href="${album.links.streaming}" class="btn btn-primary">스트리밍</a>
                        ${album.links.purchase ? `<a href="${album.links.purchase}" class="btn btn-outline">구매하기</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    function renderPreviousAlbums(albums) {
        const container = document.querySelector('#previous-albums');
        if (!container || !albums) return;
        
        const albumsHTML = albums.map(album => {
            const tracksHTML = album.tracks.map(track => `<li>${track}</li>`).join('');
            
            return `
                <article class="card">
                    <div class="card-image">
                        <img src="${album.image}" alt="${album.title} 앨범 커버" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${album.title}</h3>
                        <p class="card-text">${album.subtitle} · ${album.year}년 ${album.month}</p>
                        <p style="margin: 1rem 0; color: hsl(var(--muted-foreground)); line-height: 1.6;">
                            ${album.description}
                        </p>
                        <details style="margin-top: 1rem;">
                            <summary style="cursor: pointer; font-weight: 600; color: hsl(var(--foreground)); padding: 0.5rem 0;">
                                수록곡 보기
                            </summary>
                            <ol style="margin-top: 0.75rem; color: hsl(var(--muted-foreground)); line-height: 1.8; margin-left: 1.25rem;">
                                ${tracksHTML}
                            </ol>
                        </details>
                        <div style="margin-top: 1rem;">
                            <a href="${album.links.streaming}" class="btn btn-link">스트리밍 ›</a>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
        
        container.innerHTML = albumsHTML;
    }
    
    function renderSingles(singles) {
        const container = document.querySelector('#singles');
        if (!container || !singles) return;
        
        const singlesHTML = singles.map(single => `
            <article class="card">
                <div class="card-image">
                    <div style="width: 100%; height: 100%; background: ${single.gradient}; display: flex; align-items: center; justify-content: center; font-size: 3rem;">${single.icon}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${single.title}</h3>
                    <p class="card-text">${single.type} · ${single.year}년 ${single.month}</p>
                    <p class="card-text">${single.description}</p>
                </div>
            </article>
        `).join('');
        
        container.innerHTML = singlesHTML;
    }
    
    function renderMusicVideos(videos) {
        const container = document.querySelector('#music-videos');
        if (!container || !videos) return;
        
        const videosHTML = videos.map(video => `
            <article class="card video-card">
                <div class="card-image">
                    <img src="${video.image}" alt="${video.title} 뮤직비디오" onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">
                    <div class="video-overlay">
                        <div class="play-button">
                            <div class="play-icon"></div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${video.title}</h3>
                    <p class="card-text">${video.description} · ${video.year}</p>
                    <p class="card-text">조회수: ${video.views}회</p>
                </div>
            </article>
        `).join('');
        
        container.innerHTML = videosHTML;
    }
    
    function renderStreamingPlatforms(platforms) {
        const container = document.querySelector('#streaming-platforms');
        if (!container || !platforms) return;
        
        const platformsHTML = platforms.map(platform => `
            <a href="${platform.link}" class="card" style="text-decoration: none;">
                <div class="card-content text-center">
                    <div style="font-size: 3rem; margin-bottom: 0.5rem;">${platform.icon}</div>
                    <h3 class="card-title">${platform.name}</h3>
                </div>
            </a>
        `).join('');
        
        container.innerHTML = platformsHTML;
    }

    // ===================================
    // Performances Page Rendering
    // ===================================
    
    async function renderPerformancesPage() {
        const data = await loadJSON('assets/data/performances.json');
        if (!data) {
            showError(document.querySelector('#performances-content'), '공연 정보를 불러올 수 없습니다.');
            return;
        }
        
        // Render Upcoming Performances
        renderUpcomingPerformances(data.upcoming);
        
        // Render Tour Schedule
        renderTourSchedule(data.tour);
        
        // Render Past Performances
        renderPastPerformances(data.past);
    }
    
    function renderUpcomingPerformances(performances) {
        const container = document.querySelector('#upcoming-performances');
        if (!container || !performances) return;
        
        const performancesHTML = performances.map(perf => {
            const pricesHTML = perf.prices ? `
                <p style="margin-bottom: var(--spacing-xs);">
                    <strong>💰 가격:</strong> VIP ${perf.prices.vip} / R석 ${perf.prices.r} / S석 ${perf.prices.s}
                </p>
            ` : '<p style="margin-bottom: var(--spacing-xs);"><strong>💰 가격:</strong> 미정</p>';
            
            const linksHTML = perf.links.ticket ? `
                <a href="${perf.links.ticket}" class="btn btn-primary">티켓 예매</a>
                <a href="${perf.links.info}" class="btn btn-outline">상세 정보</a>
            ` : `
                <button class="btn" disabled style="opacity: 0.6; cursor: not-allowed;">곧 오픈</button>
                <a href="${perf.links.alert}" class="btn btn-outline">알림 신청</a>
            `;
            
            return `
                <article class="card" style="margin-bottom: var(--spacing-md);">
                    <div class="hero-grid" style="gap: 2rem;">
                        <div class="card-image" style="height: 300px; border-radius: 8px;" role="img" aria-label="공연 포스터">
                            <img src="${perf.image}" alt="${perf.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:3rem;\\'>🎤</div>';">
                        </div>
                        <div class="card-content" style="display: flex; flex-direction: column; justify-content: center;">
                            <span style="display: inline-block; background-color: ${perf.statusColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; width: fit-content; margin-bottom: var(--spacing-xs);">
                                ${perf.status}
                            </span>
                            <h3 style="font-size: 1.75rem; margin-bottom: var(--spacing-xs);">${perf.title}</h3>
                            
                            <div style="margin: var(--spacing-sm) 0;">
                                <p style="margin-bottom: var(--spacing-xs);">
                                    <strong>📅 날짜:</strong> ${perf.date} ${perf.time}
                                </p>
                                <p style="margin-bottom: var(--spacing-xs);">
                                    <strong>📍 장소:</strong> ${perf.venue}
                                </p>
                                ${pricesHTML}
                            </div>
                            
                            <p style="color: hsl(var(--muted-foreground)); margin-bottom: var(--spacing-sm);">
                                ${perf.description}
                            </p>
                            
                            <div style="display: flex; gap: var(--spacing-xs); flex-wrap: wrap;">
                                ${linksHTML}
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
        
        container.innerHTML = performancesHTML;
    }
    
    function renderTourSchedule(tour) {
        const container = document.querySelector('#tour-schedule');
        if (!container || !tour) return;
        
        const tourHTML = tour.map(item => `
            <article class="card">
                <div class="card-content">
                    <h3 class="card-title">${item.city}</h3>
                    <p class="card-text"><strong>날짜:</strong> ${item.date}</p>
                    <p class="card-text"><strong>장소:</strong> ${item.venue}</p>
                    <span style="display: inline-block; background-color: ${item.statusColor}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; margin-top: var(--spacing-xs);">
                        ${item.status}
                    </span>
                </div>
            </article>
        `).join('');
        
        container.innerHTML = tourHTML;
    }
    
    function renderPastPerformances(past) {
        const container = document.querySelector('#past-performances');
        if (!container || !past) return;
        
        const pastHTML = past.map(item => `
            <article class="card">
                <div class="card-image" role="img" aria-label="공연 사진">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; background: linear-gradient(135deg, hsl(var(--muted)), hsl(var(--border)));">
                        ${item.icon}
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.date}</p>
                    <p class="card-text">${item.venue}</p>
                    <p class="card-text" style="color: ${item.status.includes('매진') ? 'var(--secondary-color)' : 'var(--accent-color)'}; font-weight: bold;">
                        ${item.status}
                    </p>
                </div>
            </article>
        `).join('');
        
        container.innerHTML = pastHTML;
    }

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (!menuToggle || !nav) return;
        
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Update icon
            const icon = menuToggle.querySelector('.menu-icon');
            if (icon) {
                icon.textContent = isExpanded ? '✕' : '☰';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('.menu-icon');
                if (icon) {
                    icon.textContent = '☰';
                }
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
                const icon = menuToggle.querySelector('.menu-icon');
                if (icon) {
                    icon.textContent = '☰';
                }
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('.menu-icon');
                    if (icon) {
                        icon.textContent = '☰';
                    }
                }
            });
        });
        
        // Close menu on window resize to desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    const icon = menuToggle.querySelector('.menu-icon');
                    if (icon) {
                        icon.textContent = '☰';
                    }
                }
            }, 250);
        });
    }

    // ===================================
    // Active Navigation Link
    // ===================================
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page link
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Set focus to target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }

    // ===================================
    // Form Validation
    // ===================================
    
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const requiredFields = form.querySelectorAll('[required]');
                
                // Clear previous error messages
                const errorMessages = form.querySelectorAll('.error-message');
                errorMessages.forEach(msg => msg.remove());
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        showError(field, '이 필드는 필수입니다.');
                    } else if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        showError(field, '올바른 이메일 주소를 입력해주세요.');
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showSuccessMessage(form);
                    form.reset();
                }
            });
        });
    }
    
    function showError(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--secondary-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorDiv);
    }
    
    function showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.padding = 'var(--spacing-sm)';
        successDiv.style.backgroundColor = '#27ae60';
        successDiv.style.color = 'white';
        successDiv.style.borderRadius = '4px';
        successDiv.style.marginTop = 'var(--spacing-sm)';
        successDiv.textContent = '메시지가 성공적으로 전송되었습니다!';
        successDiv.setAttribute('role', 'alert');
        
        form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===================================
    // Lazy Loading Images
    // ===================================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ===================================
    // Current Year in Footer
    // ===================================
    
    function updateFooterYear() {
        const yearElement = document.querySelector('.current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ===================================
    // Initialize All Functions
    // ===================================
    
    function init() {
        initMobileMenu();
        setActiveNavLink();
        initSmoothScroll();
        initFormValidation();
        initLazyLoading();
        updateFooterYear();
        
        // Load page-specific data
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage === 'albums.html') {
            renderAlbumsPage();
        } else if (currentPage === 'performances.html') {
            renderPerformancesPage();
        }
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

