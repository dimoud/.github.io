/**
 * site-init.js — Site Initializer & Rendering Engine
 * ════════════════════════════════════════════════════════════════════════════
 * LOAD ORDER CRITICAL — no defer, no async.
 * Must be loaded at the bottom of <body>, AFTER config.js (which is in <head>),
 * and BEFORE eng-animations.js and i18n.js.
 *
 * Why synchronous (no DOMContentLoaded wrapper):
 *   Scripts at the bottom of <body> run after all HTML above them is parsed.
 *   The DOM is fully available. Rendering here synchronously means that when
 *   eng-animations.js runs next, it can observe ALL [data-reveal] elements —
 *   including the dynamically rendered service cards and project cards.
 *   Using DOMContentLoaded would delay rendering until after eng-animations.js
 *   has already scanned the DOM, causing those cards to never animate.
 *
 * Responsibilities:
 *   1. Build window.SITE_CONFIG.translations from config data  →  for i18n.js
 *   2. Inject CSS theme variables (accent color override)
 *   3. Set <title> and <meta description>
 *   4. Set asset sources (logo, photo, hero slides)
 *   5. Set contact links (phone, email)
 *   6. Set measurement labels (auto-generated from array lengths)
 *   7. Set name fields (nav brand, contact person, footer)
 *   8. Render marquee items
 *   9. Render about features
 *  10. Render services grid
 *  11. Render projects grid
 *  12. Render contact form dropdown options
 * ════════════════════════════════════════════════════════════════════════════
 */

/* LOAD ORDER CRITICAL — no defer, no async */

(function () {
    'use strict';

    var C = window.SITE_CONFIG;
    if (!C) {
        console.error('[site-init] window.SITE_CONFIG not found. Did config.js load before site-init.js?');
        return;
    }

    var P = C.profile;
    var A = C.about;


    // ── 1. BUILD TRANSLATIONS ────────────────────────────────────────────────
    var T = {};

    var yearsExp = new Date().getFullYear() - (P.expStartYear || 2000);
    function injectYears(str) {
        return (str || '').replace(/\{years\}/g, yearsExp);
    }

    // NAV
    T['nav.title']    = { el: P.professionEl,  en: P.professionEn };
    T['nav.about']    = { el: 'Σχετικά',       en: 'About' };
    T['nav.services'] = { el: 'Υπηρεσίες',     en: 'Services' };
    T['nav.projects'] = { el: 'Έργα',          en: 'Projects' };
    T['nav.contact']  = { el: 'Επικοινωνία',   en: 'Contact' };

    // HERO
    T['hero.name1']   = { el: P.firstNameEl,   en: P.firstNameEn };
    T['hero.name2']   = { el: P.lastNameEl,    en: P.lastNameEn };
    T['hero.eyebrow'] = {
        el: P.universityEl ? P.professionEl + ' ' + P.universityEl : P.professionEl,
        en: P.universityEn ? P.professionEn + ' \u2014 ' + P.universityEn : P.professionEn,
    };
    T['hero.cta']     = { el: 'Επικοινωνία',   en: 'Get in Touch' };

    // MARQUEE
    (C.marquee || []).forEach(function (m, i) {
        T['marquee.m' + (i + 1)] = { el: m.el, en: m.en };
    });

    // ABOUT
    T['about.heading'] = { el: A.headingEl, en: A.headingEn };
    T['about.lead']    = { el: injectYears(A.leadEl), en: injectYears(A.leadEn) };
    T['about.dim']     = { el: P.locationEl, en: P.locationEn };

    (A.features || []).forEach(function (f, i) {
        var n = i + 1;
        T['feature.' + n + '.label'] = { el: f.labelEl, en: f.labelEn };
        T['feature.' + n + '.text']  = { el: f.textEl,  en: f.textEn };
    });

    // SERVICES
    T['services.eyebrow'] = { el: 'Τι προσφέρουμε', en: 'What we offer' };
    T['services.heading'] = { el: 'Οι <em>Υπηρεσίες</em> μας', en: 'Our <em>Services</em>' };
    (C.services || []).forEach(function (s, i) {
        var n = i + 1;
        T['s' + n + '.title'] = { el: s.titleEl, en: s.titleEn };
        T['s' + n + '.text']  = { el: s.textEl,  en: s.textEn };
    });

    // PROJECTS
    T['projects.eyebrow'] = { el: 'Το χαρτοφυλάκιό μας', en: 'Our Portfolio' };
    T['projects.heading'] = { el: 'Επιλεγμένα <em>Έργα</em>', en: 'Selected <em>Projects</em>' };
    (C.projects || []).forEach(function (p, i) {
        var n = i + 1;
        T['p' + n + '.cat']   = { el: p.catEl,   en: p.catEn };
        T['p' + n + '.title'] = { el: p.titleEl,  en: p.titleEn };
        T['p' + n + '.desc']  = { el: p.descEl,   en: p.descEn };
    });

    // CONTACT
    T['contact.eyebrow'] = { el: 'Επικοινωνία', en: 'Contact' };
    T['contact.heading'] = { el: 'Μιλήστε <em>μαζί μας</em>', en: 'Let\'s <em>talk</em>' };
    T['contact.lead']    = {
        el: 'Είμαστε εδώ για κάθε ερώτηση ή ανάγκη. Επικοινωνήστε μαζί μας σήμερα για δωρεάν αρχική ενημέρωση.',
        en: 'We\'re here for any question or need. Get in touch today for a free initial consultation.',
    };
    T['contact.role'] = { el: P.fullTitleEl, en: P.fullTitleEn };
    T['contact.area'] = { el: P.areaEl,      en: P.areaEn };

    // FORM
    T['form.title']          = { el: 'Στείλτε μήνυμα',                      en: 'Send a Message' };
    T['form.label.name']     = { el: 'Ονοματεπώνυμο',                       en: 'Full Name' };
    T['form.ph.name']        = { el: 'Το όνομά σας',                        en: 'Your name' };
    T['form.label.phone']    = { el: 'Τηλέφωνο',                            en: 'Phone' };
    T['form.label.email']    = { el: 'Email',                                en: 'Email' };
    T['form.ph.email']       = { el: 'email@example.gr',                     en: 'email@example.com' };
    T['form.label.subject']  = { el: 'Αντικείμενο',                         en: 'Subject' };
    T['form.select.default'] = { el: 'Επιλέξτε υπηρεσία',                   en: 'Select a service' };
    T['form.label.message']  = { el: 'Μήνυμα',                              en: 'Message' };
    T['form.ph.message']     = { el: 'Περιγράψτε σύντομα το αίτημά σας...', en: 'Briefly describe your request...' };
    T['form.submit']         = { el: 'Αποστολή Μηνύματος',                  en: 'Send Message' };
    (C.formOptions || []).forEach(function (o, i) {
        T['form.opt.' + (i + 1)] = { el: o.el, en: o.en };
    });

    // FOOTER
    T['footer.title'] = { el: P.fullTitleEl, en: P.fullTitleEn };

    C.translations = T;


    // ── 2. CSS THEME VARIABLES ───────────────────────────────────────────────
    if (C.theme && C.theme.accent) {
        var themeStyle = document.createElement('style');
        themeStyle.textContent =
            ':root { --gold: ' + C.theme.accent + '; --gold2: ' + (C.theme.accentLight || C.theme.accent) + '; }';
        document.head.appendChild(themeStyle);
    }


    // ── 3. META TAGS ─────────────────────────────────────────────────────────
    var savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || C.meta.lang || 'el';
    var langKey   = savedLang === 'en' ? 'En' : 'El';

    document.title = C.meta['title' + langKey] || C.meta.titleEl || '';
    var descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.content = C.meta['description' + langKey] || C.meta.descriptionEl || '';

    document.documentElement.lang = savedLang;


    // ── 4. ASSETS ─────────────────────────────────────────────────────────────
    var accentColor = (C.theme && C.theme.accent) ? C.theme.accent : '#c9a86c';
    var fallbackInitials =
        '<div style="width:100%;height:100%;background:linear-gradient(135deg,#1a1410,#2d2010);' +
        'display:flex;align-items:center;justify-content:center;font-family:serif;' +
        'font-size:18px;font-weight:700;color:' + accentColor + '">' + P.initials + '</div>';

    document.querySelectorAll('.logo-img').forEach(function (img) {
        img.src = C.assets.logo;
        img.alt = P.displayNameEl + ' Logo';
        img.onerror = function () { this.parentElement.innerHTML = fallbackInitials; };
    });

    var heroPhoto = document.getElementById('heroPhoto');
    if (heroPhoto) {
        heroPhoto.src = C.assets.photo;
        heroPhoto.alt = P.displayNameEl;
        heroPhoto.onerror = function () {
            this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800';
        };
    }

    var slides = document.querySelectorAll('.hero-slide');
    (C.assets.heroSlides || []).forEach(function (src, i) {
        if (slides[i]) slides[i].style.backgroundImage = "url('" + src + "')";
    });

    var personPhoto = document.getElementById('personPhoto');
    if (personPhoto) {
        personPhoto.src = C.assets.photo;
        personPhoto.alt = P.displayNameEl;
        personPhoto.onerror = function () {
            this.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
        };
    }


    // ── 5. NAMES ──────────────────────────────────────────────────────────────
    // Nav brand: short format "Β. ΛΙΑΠΗΣ"
    var navBrandName = document.getElementById('navBrandName');
    if (navBrandName) navBrandName.textContent = P.firstNameEl.charAt(0) + '. ' + P.lastNameEl;

    // Contact + footer: natural case from config (e.g. "Βάϊος Λιάπης")
    var personName = document.getElementById('personName');
    if (personName) personName.textContent = P.displayNameEl;

    var footerBrandName = document.getElementById('footerBrandName');
    if (footerBrandName) footerBrandName.textContent = P.displayNameEl;

    // Hero crosshair university label — hide if not set
    var chLabel = document.querySelector('.ch-label');
    if (chLabel) {
        chLabel.textContent = P.universityEl || '';
        if (!P.universityEl) chLabel.style.display = 'none';
    }


    // ── 6. CONTACT LINKS ──────────────────────────────────────────────────────
    document.querySelectorAll('.contact-phone').forEach(function (el) {
        el.href = C.contact.phoneTel;
        var span = el.querySelector('span');
        if (span) span.textContent = C.contact.phone;
        else el.appendChild(document.createTextNode(C.contact.phone));
    });

    document.querySelectorAll('.contact-email').forEach(function (el) {
        el.href = 'mailto:' + C.contact.email;
        var span = el.querySelector('span');
        if (span) span.textContent = C.contact.email;
        else el.appendChild(document.createTextNode(C.contact.email));
    });

    var footerEmail = document.getElementById('footerEmail');
    if (footerEmail) footerEmail.href = 'mailto:' + C.contact.email;

    var footerPhone = document.getElementById('footerPhone');
    if (footerPhone) footerPhone.href = C.contact.phoneTel;


    // ── 7. MEASUREMENT LABELS (auto-generated from array lengths) ─────────────
    var heroMeas = document.getElementById('heroMeasLabel');
    if (heroMeas) heroMeas.textContent = 'ΠΡΟΣΟΨΗ \u2014 24.000 m';

    var servicesMeas = document.getElementById('servicesMeasLabel');
    if (servicesMeas) {
        var sCount = (C.services || []).length;
        servicesMeas.textContent = sCount + ' \u03A5\u03A0\u0397\u03A1\u0395\u03A3\u0399\u0395\u03A3 \u2014 ' + (sCount * 40).toFixed(2) + ' m\u00B2';
    }

    var projectsMeas = document.getElementById('projectsMeasLabel');
    if (projectsMeas) {
        var pCount = (C.projects || []).length;
        projectsMeas.textContent = pCount + ' \u0395\u03A1\u0393\u0391 \u2014 ' + (pCount * 208).toFixed(2) + ' m\u00B2';
    }


    // ── 8. RENDER MARQUEE ─────────────────────────────────────────────────────
    var marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack) {
        var mHtml = '';
        // Render twice for seamless CSS infinite loop
        [0, 1].forEach(function () {
            (C.marquee || []).forEach(function (m, i) {
                mHtml +=
                    '<div class="marquee-item">' +
                    '<span class="marquee-dot"></span>' +
                    '<span data-i18n="marquee.m' + (i + 1) + '">' + m.el + '</span>' +
                    '</div>';
            });
        });
        marqueeTrack.innerHTML = mHtml;
    }


    // ── 9. RENDER ABOUT FEATURES ──────────────────────────────────────────────
    var aboutFeatures = document.getElementById('aboutFeatures');
    if (aboutFeatures) {
        var fHtml = '';
        (A.features || []).forEach(function (f, i) {
            var n = i + 1;
            fHtml +=
                '<div class="feature-row" data-reveal>' +
                '<i class="fa-solid ' + f.icon + '"></i>' +
                '<strong data-i18n="feature.' + n + '.label">' + f.labelEl + '</strong>' +
                '<span data-i18n="feature.' + n + '.text">' + f.textEl + '</span>' +
                '</div>';
        });
        aboutFeatures.innerHTML = fHtml;
    }


    // ── 10. RENDER SERVICES GRID ──────────────────────────────────────────────
    var servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid) {
        var sHtml = '';
        (C.services || []).forEach(function (s, i) {
            var n   = i + 1;
            var pad = n < 10 ? '0' + n : '' + n;
            sHtml +=
                '<div class="service-card" data-reveal>' +
                '<div class="service-num">' + pad + '</div>' +
                '<i class="fa-solid ' + s.icon + ' service-icon"></i>' +
                '<h3 data-i18n="s' + n + '.title">' + s.titleEl + '</h3>' +
                '<p data-i18n="s' + n + '.text">'   + s.textEl  + '</p>' +
                '</div>';
        });
        servicesGrid.innerHTML = sHtml;

        // Mobile accordion: tap to expand/collapse description
        if (window.matchMedia('(max-width: 768px)').matches) {
            servicesGrid.addEventListener('click', function (e) {
                var card = e.target.closest('.service-card');
                if (!card) return;
                var isOpen = card.classList.contains('open');
                // Close all others
                servicesGrid.querySelectorAll('.service-card.open').forEach(function (c) {
                    if (c !== card) c.classList.remove('open');
                });
                card.classList.toggle('open', !isOpen);
            });
        }
    }


    // ── 11. RENDER PROJECTS GRID ──────────────────────────────────────────────
    var projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        var pHtml = '';
        (C.projects || []).forEach(function (p, i) {
            var n = i + 1;
            pHtml +=
                '<div class="project-card" data-reveal>' +
                '<img src="' + p.image + '" alt="" ' +
                'onerror="this.src=\'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800\'">' +
                '<div class="project-card-overlay"></div>' +
                '<div class="project-card-info">' +
                '<div class="project-cat" data-i18n="p' + n + '.cat">'  + p.catEl   + '</div>' +
                '<h3 data-i18n="p' + n + '.title">'                     + p.titleEl + '</h3>' +
                '<p data-i18n="p' + n + '.desc">'                       + p.descEl  + '</p>' +
                '</div>' +
                '</div>';
        });
        projectsGrid.innerHTML = pHtml;
    }


    // ── 12. RENDER FORM DROPDOWN ──────────────────────────────────────────────
    var serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
        var optHtml = '<option value="" disabled selected data-i18n="form.select.default">Επιλέξτε υπηρεσία</option>';
        (C.formOptions || []).forEach(function (o, i) {
            optHtml += '<option value="' + (i + 1) + '" data-i18n="form.opt.' + (i + 1) + '">' + o.el + '</option>';
        });
        serviceSelect.innerHTML = optHtml;
    }

    // No re-apply needed: i18n.js runs after this script and sees the fully-rendered DOM.

})();
