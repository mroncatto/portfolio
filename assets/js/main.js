const URL_ENDPOINT = 'https://portfolio-marcelo-roncatto-default-rtdb.firebaseio.com';
const SKILLS = 'skills.json';
const ABOUT = 'about.json';
const CARRER = 'carrer.json';
const SPECIALITIES = 'specialities.json';
const PROJECTS = 'projects.json';

loadAbout();
loadSkills();
loadCarrer();
loadSpecialities();
//loadProjects();

// ============================ LOADINGS  FIREBASE =========================================

function loadAbout() {
    fetch(`${URL_ENDPOINT}/${ABOUT}`)
        .then((res) => {
            if (!res.ok) throw new Error("Fail loading about!");
            return res.json();
        }).then(data => {
            const me = document.getElementById("txt_me");
            const about = document.getElementById("txt_about");

            me.innerText = data.me;
            about.innerText = data.about;
        })
        .catch((err) => {
            console.error(err);
        });
}

function loadSkills() {
    fetch(`${URL_ENDPOINT}/${SKILLS}`)
        .then((res) => {
            if (!res.ok) throw new Error("Fail loading skills!");
            return res.json();
        }).then(data => {
            const skillUpdate = document.getElementById("skill-update-date");
            const languageSkillList = document.getElementById("languages-skill-list");
            const toolsSkillList = document.getElementById("tools-skill-list");
            const softwaredesign = document.getElementById("softwaredesign-skill-list");
            const devopsSkillList = document.getElementById("devops-skill-list");
            const databaseSkillList = document.getElementById("database-skill-list");
            const softskillsSkillList = document.getElementById("softskills-skill-list");

            skillUpdate.innerHTML = skillUpdate.innerText + ` <i>${data.updated}</i>`;
            languageSkillList.innerHTML = composeSkills(data.language);
            toolsSkillList.innerHTML = composeSkills(data.tools);
            softwaredesign.innerHTML = composeSkills(data.softwaredesign);
            devopsSkillList.innerHTML = composeSkills(data.devops);
            databaseSkillList.innerHTML = composeSkills(data.database);
            softskillsSkillList.innerHTML = composeSkills(data.softskills);
        })
        .catch((err) => {
            console.error(err);
        });
}

function composeSkills(skills) {
    let list_skill = "";
    if (skills) {
        skills.forEach(skill => {
            if(skill == null) return;
            if (skill.level) {
                list_skill += `<div class="skills__data">
                            <div class="skills__titles">
                                <h3 class="skills__name">${skill.name}</h3>
                                <span class="skills_number">${skill.level}</span>
                            </div>
                            <div class="skills__bar">
                                <span class="skills__level skills__${skill.level}"></span>
                            </div>
                        </div>`;
            } else {

                list_skill += `<div>
                            <span class="badge-name">${skill.name}</span>
                       </div>`;
            }
        });
    }
    return list_skill;
}

function loadCarrer() {
    fetch(`${URL_ENDPOINT}/${CARRER}`)
        .then((res) => {
            if (!res.ok) throw new Error("Fail loading carrer!");
            return res.json();
        }).then(data => {
            const educationList = document.getElementById("education");
            const experienceList = document.getElementById("work");

            educationList.innerHTML = composeEducation(data.education);
            experienceList.innerHTML = composeExperience(data.experience);
        })
        .catch((err) => {
            console.error(err);
        });
}

function composeEducation(learnings) {
    let list_leanings = "";
    learnings.forEach((learn, index) => {
        list_leanings += `<div class="qualification__data">`;

        list_leanings += addTimelineTrackBefore(learnings.length, index);

        list_leanings += `<div>
                                <h3 class="qualification__title">${learn.course}</h3>
                                <span class="qualification__subtitle">${learn.institution ?? learn.description}</span>
                                ${composeEducationCertificate(learn.credential)}
                                <div class="qualification__calendar">
                                    <i class="uil uil-calendar-alt"></i>
                                    ${learn.duration}
                                </div>
                            </div>`;

        list_leanings += addTimelineTrackAfter(learnings.length, index);

        list_leanings += `</div>`;
    });

    return list_leanings;
}

function composeEducationCertificate(credential) {
    certificate_link = "";
    if(credential) {
        certificate_link += `<div class="qualification__certificate">
                                    <i class="uil uil-file-bookmark-alt"></i>
                                    <a title="Open the certificate" target="_blank" href="${credential}">Certificate</a>
                                </div>`;
    }
    return certificate_link;
}

function composeExperience(jobs) {
    let list_leanings = "";
    jobs.forEach((job, index) => {
        list_leanings += `<div class="qualification__data">`;

        list_leanings += addTimelineTrackBefore(jobs.length, index);

        list_leanings += `<div>
                                <h3 class="qualification__title">${job.title}</h3>
                                <span class="qualification__subtitle">${job.company}</span>
                                ${composeExperienceRoles(job.roles)}
                                <div class="qualification__calendar">
                                    <i class="uil uil-calendar-alt"></i>
                                    ${job.duration}
                                </div>
                                
                            </div>`;

        list_leanings += addTimelineTrackAfter(jobs.length, index);

        list_leanings += `</div>`;
    });

    return list_leanings;
}

function composeExperienceRoles(roles) {
    roleList = "";
    if (roles) {
        roleList += `<div class="qualification__roles"><ul>`;
        roles.forEach(rol => {
            roleList += `<li>${rol.role}</li>`
        });
        roleList += `</div></ul>`;
    }
    return roleList;
}

function loadSpecialities() {
    fetch(`${URL_ENDPOINT}/${SPECIALITIES}`)
        .then((res) => {
            if (!res.ok) throw new Error("Fail loading specialities!");
            return res.json();
        }).then(data => {
            const specialities = document.getElementById("specialties");
            specialities.innerHTML = composeSpecialities(data);
        })
        .catch((err) => {
            console.error(err);
        });
}

function composeSpecialities(specialities) {
    let list_specialities = "";
    specialities.forEach(spec => {
        list_specialities += `<div class="services__content">
                            <div>
                                <i class='bx ${spec.icon} services__icon'></i>
                                <h3 class="services__title"> ${spec.title}</h3>
                            </div></div></div>`;

        //                 <span class="button button--flex button--small button--link services__button">
        //                     See more
        //                     <i class="uil uil-arrow-right button__icon"></i>
        //                 </span>

        //                 <div class="services__modal">
        //                     <div class="services__modal-content">
        //                         <h4 class="services__modal-title">${spec.title}</h4>
        //                         <i class="uil uil-times services__modal-close"></i>

        //                         <ul class="services__modal-services grid">`;

        //     list_specialities += `<li class="services__modal-service">
        //                             <i class="uil uil-check-circle services__modal-icon"></i>
        //                             <p>Diseño de interface.</p>
        //                         </li>`;

        // list_specialities += `</ul>
        //                         </div>
        //                     </div>
        //                 </div>`;
    });

    return list_specialities;
}

function loadProjects() {
    fetch(`${URL_ENDPOINT}/${PROJECTS}`)
        .then((res) => {
            if (!res.ok) throw new Error("Fail loading projects!");
            return res.json();
        }).then(data => {
            const projects = document.getElementById("portfolio-list");
            projects.innerHTML = composeProjects(data);
            loadPortfolioSwiper();
        })
        .catch((err) => {
            console.error(err);
        });
}

function composeProjects(portfolios) {
    let list_portfolios = "";
    portfolios.forEach((port, index) => {

        list_portfolios += `<div class="portfolio__content grid swiper-slide">
                                <img src="assets/img/${port.image}" alt="portfolio${index}" class="portfolio__img">

                                <div class="portfolio__data">
                                    <h3 class="portfolio__title">${port.title}</h3>
                                    <p class="portfolio__description">${port.description}</p>`;

        if (port.demo.length > 0) list_portfolios += `<a href="${port.demo}" target="_blank" class="button button--flex button--small portfolio__button">
                                                Demo <i class="uil uil-arrow-right button__icon"></i>
                                                </a>`;

        list_portfolios += `</div>
                            </div>`;

    });
    return list_portfolios;
}

// =================================================================================

function addTimelineTrackBefore(size, index) {

    if (!isPar(index)
        && lastPage(size, index)) return `<div></div>
                                      <div>
                                        <span class="qualification__rounder"></span>
                                      </div>`;

    if (!isPar(index))
        return `<div></div>
            <div>
              <span class="qualification__rounder"></span>
              <span class="qualification__line"></span>
            </div>`;


    return "";
}

function addTimelineTrackAfter(size, index) {

    if (isPar(index) && lastPage(size, index)) return `<div>
                                                        <span class="qualification__rounder"></span>
                                                      </div>`;

    if (isPar(index)) return `<div>
                                <span class="qualification__rounder"></span>
                                <span class="qualification__line"></span>
                            </div>`;


    // if(!lastPage(size, index) && isPar(index)) 
    // return `<div>
    //           <span class="qualification__rounder"></span>
    //           <span class="qualification__line"></span>
    //         </div>`;

    return "";
}

function lastPage(size, index) {
    return (index + 1 === size);
}

function isPar(value) {
    return (value % 2) === 0;
}


/*========================== MENU SHOW AND HIDDEN ==========================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');



/*====== SHOW MENU =======*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}



/*====== MENU HIDDEN ====== */
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}


/*========================== REMOVE MENU MOBILE ==========================*/
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));


/*========================== ACCORDION SKILLS ==========================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }

    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
})



/*========================== QUALIFICATION TABS ==========================*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContents => {
            tabContents.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        });

        tab.classList.add('qualification__active');


    })
})

/*========================== SERVICES MODAL ==========================*/
const modalViews = document.querySelectorAll('.services__modal'),
    modalBtns = document.querySelectorAll('.services__button'),
    modalCloses = document.querySelectorAll('.services__modal-close');

let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        });
    });
});

function loadPortfolioSwiper() {

    /*=============== PORTFOLIO SWIPER =========*/
    let swiperPortfolio = new Swiper(".portfolio__container", {
        cssMode: true,
        loop: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
    });
}

/*=============== TESTIMONIAL SWIPER =========*/
// let swiperTestimonial = new Swiper(".testimonial__container", {
//     loop: true,
//     grapCursor: true,
//     spaceBetween: 48,
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//         dynamicBullets: true
//     },
//     breakpoints: {
//         568: {
//             slidesPerView: 2,
//         }
//     }
// });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})