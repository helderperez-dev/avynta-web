// Multi-language support for Avynta website
// Refactored to use individual locale files

class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('avynta-language') || 'en';
        this.translationElements = new Map();
        this.languages = {};
        this.availableLanguages = ['en', 'es', 'pt'];
        this.init();
    }

    async init() {
        // Load all language data
        await this.loadAllLanguages();
        
        // Scan for translatable elements
        this.scanTranslatableElements();
        
        // Create language selector
        this.createLanguageSelector();
        
        // Bind events
        this.bindEvents();
        
        // Load current language
        this.loadLanguage(this.currentLanguage);
    }

    async loadAllLanguages() {
        try {
            // Load all language files
            const promises = this.availableLanguages.map(async (lang) => {
                const response = await fetch(`./locales/${lang}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${lang}.json`);
                }
                const data = await response.json();
                this.languages[lang] = data;
            });

            await Promise.all(promises);
            console.log('All language files loaded successfully');
        } catch (error) {
            console.error('Error loading language files:', error);
            // Fallback to English if loading fails
            this.currentLanguage = 'en';
        }
    }

    scanTranslatableElements() {
        // Scan for data-translate attributes
        const dataElements = document.querySelectorAll('[data-translate]');
        dataElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (!this.translationElements.has(key)) {
                this.translationElements.set(key, []);
            }
            this.translationElements.get(key).push(element);
        });

        // Scan for <t> tags with key attribute
        const tElements = document.querySelectorAll('t[key]');
        tElements.forEach(element => {
            const key = element.getAttribute('key');
            if (!this.translationElements.has(key)) {
                this.translationElements.set(key, []);
            }
            this.translationElements.get(key).push(element);
        });

        // Scan for data-t attributes (alternative to <t> tags)
        const dataTElements = document.querySelectorAll('[data-t]');
        dataTElements.forEach(element => {
            const key = element.getAttribute('data-t');
            if (!this.translationElements.has(key)) {
                this.translationElements.set(key, []);
            }
            this.translationElements.get(key).push(element);
        });
    }

    createLanguageSelector() {
        // Create desktop modal language options
        const desktopOptions = document.getElementById('language-options');
        if (desktopOptions) {
            desktopOptions.innerHTML = '';
            
            this.availableLanguages.forEach(langCode => {
                const lang = this.languages[langCode];
                if (lang) {
                    const option = document.createElement('button');
                    option.className = 'w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors';
                    option.innerHTML = `
                        <i class="fas fa-globe text-gray-400 text-sm"></i>
                        <span class="flex-1 text-left">${lang.name}</span>
                        ${langCode === this.currentLanguage ? '<i class="fas fa-check text-primary text-xs"></i>' : ''}
                    `;
                    option.addEventListener('click', () => {
                        this.changeLanguage(langCode);
                        this.hideLanguageModal();
                    });
                    desktopOptions.appendChild(option);
                }
            });
        }

        // Create mobile modal language options
        const mobileOptions = document.getElementById('mobile-language-options');
        if (mobileOptions) {
            mobileOptions.innerHTML = '';
            
            this.availableLanguages.forEach(langCode => {
                const lang = this.languages[langCode];
                if (lang) {
                    const option = document.createElement('button');
                    option.className = 'w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors';
                    option.innerHTML = `
                        <i class="fas fa-globe text-gray-400"></i>
                        <span class="flex-1 text-left font-medium">${lang.name}</span>
                        ${langCode === this.currentLanguage ? '<i class="fas fa-check text-primary"></i>' : ''}
                    `;
                    option.addEventListener('click', () => {
                        this.changeLanguage(langCode);
                        this.hideMobileLanguageModal();
                    });
                    mobileOptions.appendChild(option);
                }
            });
        }

        // Update current language display
        this.updateCurrentLanguageDisplay();
    }

    bindEvents() {
        // Desktop language selector button
        const desktopBtn = document.getElementById('language-selector-btn');
        if (desktopBtn) {
            desktopBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLanguageModal();
            });
        }

        // Mobile language selector button
        const mobileBtn = document.getElementById('language-selector-mobile-btn');
        if (mobileBtn) {
            mobileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showMobileLanguageModal();
            });
        }

        // Close mobile modal button
        const closeMobileBtn = document.getElementById('close-mobile-language-modal');
        if (closeMobileBtn) {
            closeMobileBtn.addEventListener('click', () => {
                this.hideMobileLanguageModal();
            });
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            const desktopModal = document.getElementById('language-modal');
            const mobileModal = document.getElementById('mobile-language-modal');
            
            if (desktopModal && !desktopModal.contains(e.target) && !desktopBtn?.contains(e.target)) {
                this.hideLanguageModal();
            }
            
            if (mobileModal && e.target === mobileModal) {
                this.hideMobileLanguageModal();
            }
        });
    }

    changeLanguage(lang) {
        if (this.languages[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('avynta-language', lang);
            this.loadLanguage(lang);
            this.updateLanguageSelector();
        }
    }

    updateLanguageSelector() {
        // Update current language display
        this.updateCurrentLanguageDisplay();
        
        // Recreate language options to update checkmarks
        this.createLanguageSelector();
    }

    updateCurrentLanguageDisplay() {
        const currentLang = this.languages[this.currentLanguage];
        if (!currentLang) return;

        // Update desktop display
        const desktopName = document.getElementById('current-language-name');
        if (desktopName) desktopName.textContent = currentLang.name;

        // Update mobile display
        const mobileName = document.getElementById('current-language-name-mobile');
        if (mobileName) mobileName.textContent = currentLang.name;
    }

    toggleLanguageModal() {
        const modal = document.getElementById('language-modal');
        if (!modal) return;

        const isVisible = !modal.classList.contains('opacity-0');
        if (isVisible) {
            this.hideLanguageModal();
        } else {
            this.showLanguageModal();
        }
    }

    showLanguageModal() {
        const modal = document.getElementById('language-modal');
        if (!modal) return;

        modal.classList.remove('opacity-0', 'invisible', 'scale-95');
        modal.classList.add('opacity-100', 'visible', 'scale-100');
    }

    hideLanguageModal() {
        const modal = document.getElementById('language-modal');
        if (!modal) return;

        modal.classList.remove('opacity-100', 'visible', 'scale-100');
        modal.classList.add('opacity-0', 'invisible', 'scale-95');
    }

    showMobileLanguageModal() {
        const modal = document.getElementById('mobile-language-modal');
        const content = document.getElementById('mobile-language-modal-content');
        if (!modal || !content) return;

        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
        
        setTimeout(() => {
            content.classList.remove('translate-y-full');
            content.classList.add('translate-y-0');
        }, 10);
    }

    hideMobileLanguageModal() {
        const modal = document.getElementById('mobile-language-modal');
        const content = document.getElementById('mobile-language-modal-content');
        if (!modal || !content) return;

        content.classList.remove('translate-y-0');
        content.classList.add('translate-y-full');
        
        setTimeout(() => {
            modal.classList.remove('opacity-100', 'visible');
            modal.classList.add('opacity-0', 'invisible');
        }, 300);
    }

    loadLanguage(lang) {
        const langData = this.languages[lang];
        if (!langData) {
            console.error(`Language ${lang} not found`);
            return;
        }

        const content = langData.content;

        // Update simple translatable elements
        this.translationElements.forEach((elements, key) => {
            const value = this.getNestedValue(content, key);
            if (value) {
                elements.forEach(element => {
                    // Handle form elements with placeholders
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        // Check if element has data-placeholder attribute to force placeholder mode
                        if (element.hasAttribute('data-placeholder') || 
                            element.type === 'text' || element.type === 'email' || 
                            element.tagName === 'TEXTAREA') {
                            element.placeholder = value;
                        } else {
                            element.value = value;
                        }
                    }
                    // Handle button elements
                    else if (element.tagName === 'BUTTON' || element.type === 'submit') {
                        element.textContent = value;
                    }
                    // Handle <t> tags and regular elements
                    else {
                        // For <t> tags, replace the entire element content
                        if (element.tagName.toLowerCase() === 't') {
                            element.innerHTML = value;
                        } else {
                            element.textContent = value;
                        }
                    }
                });
            }
        });

        // Update complex elements that require special handling
        this.updateComplexElements(content);
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    updateComplexElements(content) {
        // Update navigation
        this.updateNavigation(content.nav);
        
        // Update hero section
        this.updateHero(content.hero);
        
        // Update solutions section
        this.updateSolutions(content.solutions);
        
        // Update process section
        this.updateProcess(content.process);
        
        // Update about section
        this.updateAbout(content.about);
        
        // Update contact section
        this.updateContact(content.contact);
        
        // Update footer
        this.updateFooter(content.footer);
    }

    updateNavigation(nav) {
        if (!nav) return;

        // Update navigation links
        const navLinks = {
            'nav-home': nav.home,
            'nav-solutions': nav.solutions,
            'nav-about': nav.about,
            'nav-contact': nav.contact,
            'nav-get-started': nav.getStarted
        };

        Object.entries(navLinks).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element && text) {
                element.textContent = text;
            }
        });
    }

    updateHero(hero) {
        if (!hero) return;

        // Update hero title with highlight
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && hero.title && hero.titleHighlight) {
            heroTitle.innerHTML = `${hero.title} <span class="highlight">${hero.titleHighlight}</span>`;
        }

        // Update other hero elements
        const heroElements = {
            'hero-subtitle': hero.subtitle,
            'hero-cta': hero.cta,
            'hero-learn-more': hero.learnMore,
            'hero-tech-stack-title': hero.techStackTitle
        };

        Object.entries(heroElements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element && text) {
                element.textContent = text;
            }
        });
    }

    updateSolutions(solutions) {
        if (!solutions) return;

        // Update solutions title with highlight
        const solutionsTitle = document.getElementById('solutions-title');
        if (solutionsTitle && solutions.title && solutions.titleHighlight) {
            solutionsTitle.innerHTML = `${solutions.title} <span class="highlight">${solutions.titleHighlight}</span>`;
        }

        // Update solutions subtitle
        const solutionsSubtitle = document.getElementById('solutions-subtitle');
        if (solutionsSubtitle && solutions.subtitle) {
            solutionsSubtitle.textContent = solutions.subtitle;
        }

        // Update solution cards
        const solutionCards = {
            'ai-agents': solutions.aiAgents,
            'web-apps': solutions.webApps,
            'mobile-apps': solutions.mobileApps,
            'iot': solutions.iot,
            'automation': solutions.automation,
            'consulting': solutions.consulting
        };

        Object.entries(solutionCards).forEach(([cardId, cardData]) => {
            if (cardData) {
                const titleElement = document.getElementById(`${cardId}-title`);
                const descElement = document.getElementById(`${cardId}-description`);
                
                if (titleElement && cardData.title) {
                    titleElement.textContent = cardData.title;
                }
                if (descElement && cardData.description) {
                    descElement.textContent = cardData.description;
                }
            }
        });
    }

    updateProcess(process) {
        if (!process) return;

        // Update process title with highlight
        const processTitle = document.getElementById('process-title');
        if (processTitle && process.title && process.titleHighlight) {
            processTitle.innerHTML = `${process.title} <span class="highlight">${process.titleHighlight}</span>`;
        }

        // Update process subtitle
        const processSubtitle = document.getElementById('process-subtitle');
        if (processSubtitle && process.subtitle) {
            processSubtitle.textContent = process.subtitle;
        }

        // Update process steps
        const processSteps = {
            'discovery': process.steps?.discovery,
            'design': process.steps?.design,
            'development': process.steps?.development,
            'deployment': process.steps?.deployment
        };

        Object.entries(processSteps).forEach(([stepId, stepData]) => {
            if (stepData) {
                const titleElement = document.getElementById(`${stepId}-title`);
                const descElement = document.getElementById(`${stepId}-description`);
                
                if (titleElement && stepData.title) {
                    titleElement.textContent = stepData.title;
                }
                if (descElement && stepData.description) {
                    descElement.textContent = stepData.description;
                }
            }
        });
    }

    updateAbout(about) {
        if (!about) return;

        // Update about title with highlight
        const aboutTitle = document.getElementById('about-title');
        if (aboutTitle && about.title && about.titleHighlight) {
            aboutTitle.innerHTML = `${about.title} <span class="highlight">${about.titleHighlight}</span>`;
        }

        // Update about subtitle
        const aboutSubtitle = document.getElementById('about-subtitle');
        if (aboutSubtitle && about.subtitle) {
            aboutSubtitle.textContent = about.subtitle;
        }

        // Update about features
        const aboutFeatures = {
            'expertise': about.features?.expertise,
            'results': about.features?.results,
            'support': about.features?.support
        };

        Object.entries(aboutFeatures).forEach(([featureId, featureData]) => {
            if (featureData) {
                const titleElement = document.getElementById(`${featureId}-title`);
                const descElement = document.getElementById(`${featureId}-description`);
                
                if (titleElement && featureData.title) {
                    titleElement.textContent = featureData.title;
                }
                if (descElement && featureData.description) {
                    descElement.textContent = featureData.description;
                }
            }
        });
    }

    updateContact(contact) {
        if (!contact) return;

        // Update contact title and subtitle
        const contactTitle = document.getElementById('contact-title');
        const contactSubtitle = document.getElementById('contact-subtitle');
        
        if (contactTitle && contact.title) {
            contactTitle.textContent = contact.title;
        }
        if (contactSubtitle && contact.subtitle) {
            contactSubtitle.textContent = contact.subtitle;
        }

        // Update form placeholders
        const formFields = {
            'contact-name': contact.form?.name,
            'contact-email': contact.form?.email,
            'contact-company': contact.form?.company,
            'contact-message': contact.form?.message
        };

        Object.entries(formFields).forEach(([fieldId, placeholder]) => {
            const element = document.getElementById(fieldId);
            if (element && placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Update submit button
        const submitButton = document.getElementById('contact-submit');
        if (submitButton && contact.form?.submit) {
            submitButton.textContent = contact.form.submit;
        }
    }

    updateFooter(footer) {
        if (!footer) return;

        // Update footer elements
        const footerElements = {
            'footer-description': footer.description,
            'footer-quick-links': footer.quickLinks,
            'footer-contact': footer.contact,
            'footer-follow-us': footer.followUs,
            'footer-copyright': footer.copyright
        };

        Object.entries(footerElements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element && text) {
                element.textContent = text;
            }
        });
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    window.languageManager = new LanguageManager();
});
