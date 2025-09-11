// Apollo School Website - Main JavaScript File
// Handles all interactive functionality for index.html and videos.html

// Video data array for the video library
const apolloVideos = [
  {
    id: 1,
    grade: "الروضة",
    title: "الحروف أ - ج",
    duration: "06:45",
    thumb: "assets/img/v1.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تعلم الحروف الأولى من الأبجدية العربية بطريقة ممتعة وتفاعلية",
  },
  {
    id: 2,
    grade: "الصف الأول",
    title: "الأرقام من 1 إلى 10",
    duration: "08:30",
    thumb: "assets/img/v2.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تعلم الأرقام والعد بطريقة سهلة ومبسطة",
  },
  {
    id: 3,
    grade: "الصف الثاني",
    title: "القراءة والكتابة",
    duration: "12:15",
    thumb: "assets/img/v3.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تطوير مهارات القراءة والكتابة للمبتدئين",
  },
  {
    id: 4,
    grade: "الصف الثالث",
    title: "العلوم الأساسية",
    duration: "10:20",
    thumb: "assets/img/v4.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "مقدمة في العلوم الطبيعية والتجارب البسيطة",
  },
  {
    id: 5,
    grade: "الصف الأول",
    title: "الألوان والأشكال",
    duration: "07:45",
    thumb: "assets/img/v5.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تعرف على الألوان والأشكال الهندسية الأساسية",
  },
  {
    id: 6,
    grade: "الروضة",
    title: "الحيوانات والأصوات",
    duration: "09:10",
    thumb: "assets/img/v6.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تعلم أسماء الحيوانات وأصواتها",
  },
  {
    id: 7,
    grade: "الصف الثاني",
    title: "الرياضيات الممتعة",
    duration: "11:30",
    thumb: "assets/img/v7.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "حل المسائل الرياضية بطرق إبداعية",
  },
  {
    id: 8,
    grade: "الصف الثالث",
    title: "اللغة الإنجليزية للمبتدئين",
    duration: "13:25",
    thumb: "assets/img/v8.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "أساسيات اللغة الإنجليزية والمفردات الأولى",
  },
  {
    id: 9,
    grade: "الصف الأول",
    title: "الفصول والطقس",
    duration: "08:55",
    thumb: "assets/img/v9.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تعرف على فصول السنة وحالات الطقس المختلفة",
  },
  {
    id: 10,
    grade: "الروضة",
    title: "الأسرة والمنزل",
    duration: "06:20",
    thumb: "assets/img/v10.jpg",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "تعلم أسماء أفراد الأسرة وأجزاء المنزل",
  },
]

// Global variables
let currentVideos = [...apolloVideos]
let currentPage = 1
const videosPerPage = 12

// Import Bootstrap
const bootstrap = window.bootstrap

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize application
function initializeApp() {
  // Check which page we're on
  const isVideoPage = window.location.pathname.includes("videos.html")
  const isIndexPage = window.location.pathname.includes("index.html") || window.location.pathname === "/"

  if (isIndexPage) {
    initializeIndexPage()
  } else if (isVideoPage) {
    initializeVideoPage()
  }

  // Common functionality for both pages
  initializeCommonFeatures()

  // Initialize hero animations
  initializeHeroAnimations()
}

// Initialize index page functionality
function initializeIndexPage() {
  initializeHeroTypewriter()
  initializePulsingCTA()
  initializeSmoothScroll()
  initializeRegistrationForm()
  initializeIntersectionObserver()
}

// Initialize video page functionality
function initializeVideoPage() {
  renderVideoGrid()
  initializeVideoSearch()
  initializeVideoFilters()
  initializeVideoSort()
  initializePagination()

  // Load saved grade preference
  const savedGrade = localStorage.getItem("apolloPreferredGrade")
  if (savedGrade) {
    const gradeFilter = document.getElementById("gradeFilter")
    if (gradeFilter) {
      gradeFilter.value = savedGrade
      filterVideosByGrade(savedGrade)
    }
  }
}

// Common features for both pages
function initializeCommonFeatures() {
  initializeTooltips()
  initializeBackToTop()
  initializeModals()

  // Handle external links security
  const externalLinks = document.querySelectorAll('a[href^="http"]')
  externalLinks.forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer")
  })

  // Add click event listener to all nav-links to hide navbar on click (mobile)
  document.querySelectorAll('.nav-link').forEach(element => {
    element.addEventListener('click', (e) => {
      // Don't close if clicking on a dropdown toggle or its children
      if (e.target.closest('.dropdown-toggle')) {
        return;
      }
      
      const navbarCollapse = document.getElementById('navbarNav');
      const navbarToggler = document.querySelector('.navbar-toggler');
      
      // Check if navbar is expanded (mobile view)
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Close the navbar using Bootstrap's collapse
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
        
        // Reset the toggler button state for accessibility
        if (navbarToggler) {
          navbarToggler.setAttribute('aria-expanded', 'false');
          navbarToggler.classList.add('collapsed');
        }
      }
    });
  });
}

// Hero typewriter effect
function initializeHeroTypewriter() {
  const typewriterElement = document.querySelector(".typewriter-text")
  if (!typewriterElement) return

  const phrases = ["تعلم مرن", "معلمون معتمدون", "دعم مستمر"]

  let currentPhraseIndex = 0
  let currentCharIndex = 0
  let isDeleting = false

  function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex]

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1)
      currentCharIndex--
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1)
      currentCharIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
      typeSpeed = 500 // Pause before next phrase
    }

    setTimeout(typeWriter, typeSpeed)
  }

  typeWriter()
}

// Pulsing CTA button
function initializePulsingCTA() {
  const ctaButtons = document.querySelectorAll(".pulse-cta")
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })
  })
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Modal functionality
function initializeModals() {
  // Check if Bootstrap is loaded
  if (typeof bootstrap === 'undefined') {
    console.error('Bootstrap is not loaded. Make sure to include Bootstrap JS before main.js');
    return;
  }

  // Curriculum modal buttons
  document.querySelectorAll('[data-bs-target="#curriculumModal"]').forEach(button => {
    button.addEventListener('click', (e) => {
      const grade = e.currentTarget.getAttribute('data-grade');
      showCurriculumModal(grade);
    });
  });

  // Program modal buttons
  document.querySelectorAll('[data-bs-target="#programModal"]').forEach(button => {
    button.addEventListener('click', (e) => {
      const program = e.currentTarget.getAttribute('data-program');
      showProgramModal(program);
    });
  });

  // Print functionality for modals
  const printButtons = document.querySelectorAll(".print-modal");
  printButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.print();
    });
  });
}

// Show curriculum modal
function showCurriculumModal(grade) {
  const curriculumData = {
    kg: {
      title: "منهج الروضة",
      content: "<p>منهج شامل يركز على تطوير المهارات الأساسية للطفل من خلال:</p>" +
               "<ul>" +
               "<li>تعلم الحروف والأرقام</li>" +
               "<li>تنمية المهارات الحركية الدقيقة</li>" +
               "<li>تنمية المهارات الاجتماعية والعاطفية</li>" +
               "<li>تعلم المفاهيم الأساسية في الرياضيات والعلوم</li>" +
               "</ul>"
    },
    grade1: {
      title: "منهج الصف الأول",
      content: "<p>منهج متكامل يشمل:</p>" +
               "<ul>" +
               "<li>اللغة العربية: القراءة والكتابة والإملاء</li>" +
               "<li>الرياضيات: الأعداد والعمليات الحسابية الأساسية</li>" +
               "<li>العلوم: المفاهيم العلمية البسيطة</li>" +
               "<li>التربية الدينية: تعلم الآداب والأخلاق الإسلامية</li>" +
               "</ul>"
    },
    grade2: {
      title: "منهج الصف الثاني",
      content: "<p>تطوير المهارات الأساسية مع إضافة:</p>" +
               "<ul>" +
               "<li>تطوير مهارات القراءة والكتابة</li>" +
               "<li>تعلم العمليات الحسابية الأكثر تعقيداً</li>" +
               "<li>مقدمة في العلوم والدراسات الاجتماعية</li>" +
               "<li>تنمية مهارات التفكير الناقد</li>" +
               "</ul>"
    },
    grade3: {
      title: "منهج الصف الثالث",
      content: "<p>تعميق المفاهيم الأساسية مع التركيز على:</p>" +
               "<ul>" +
               "<li>القراءة والفهم والتحليل</li>" +
               "<li>حل المسائل الرياضية</li>" +
               "<li>التجارب العلمية البسيطة</li>" +
               "<li>مهارات البحث والاستكشاف</li>" +
               "</ul>"
    },
    grade4: {
      title: "منهج الصف الرابع",
      content: "<p>مرحلة متقدمة تشمل:</p>" +
               "<ul>" +
               "<li>القراءة النقدية والفهم العميق</li>" +
               "<li>الرياضيات التطبيقية</li>" +
               "<li>العلوم العملية</li>" +
               "<li>الدراسات الاجتماعية والوطنية</li>" +
               "</ul>"
    },
    grade5: {
      title: "منهج الصف الخامس",
      content: "<p>إعداد الطلاب للمرحلة المتوسطة من خلال:</p>" +
               "<ul>" +
               "<li>تعميق مهارات القراءة والكتابة</li>" +
               "<li>الرياضيات المتقدمة</li>" +
               "<li>العلوم التطبيقية</li>" +
               "<li>مهارات البحث العلمي</li>" +
               "<li>اللغة الإنجليزية كلغة ثانية</li>" +
               "</ul>"
    }
  }

  const data = curriculumData[grade] || {
    title: "المنهج التعليمي",
    content: "<p>تفاصيل المنهج غير متوفرة حالياً. يرجى المحاولة لاحقاً.</p>"
  };

  // Update modal content
  const modalTitle = document.querySelector('#curriculumModalLabel');
  const modalBody = document.querySelector('#curriculumModalBody');
  
  if (modalTitle && modalBody) {
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;
    
    // Initialize and show the modal
    const modalElement = document.getElementById('curriculumModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}

// Show program modal
function showProgramModal(program) {
  const programData = {
    english: {
      title: "البرنامج الإنجليزي التدريجي",
      content: "برنامج متدرج لتعليم اللغة الإنجليزية من المستوى المبتدئ إلى المتقدم مع التركيز على المهارات الأربع.",
    },
    stem: {
      title: "برنامج STEM المصغر",
      content: "برنامج تعليمي يركز على العلوم والتكنولوجيا والهندسة والرياضيات بطريقة عملية وتفاعلية.",
    },
    bridge: {
      title: "البرنامج الجسر",
      content: "برنامج انتقالي يساعد الطلاب على الانتقال من التعليم باللغة العربية إلى التعليم باللغة الإنجليزية.",
    },
  }

  const data = programData[program]
  if (data) {
    showModal("تفاصيل البرنامج", `<h5>${data.title}</h5><p>${data.content}</p>`)
  }
}

// Generic modal function
function showModal(title, content) {
  const modalHtml = `
    <div class="modal fade" id="dynamicModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
            <button type="button" class="btn btn-primary print-modal">طباعة</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById('dynamicModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Add new modal
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Initialize and show the modal
  const modalElement = document.getElementById('dynamicModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    // Handle print button
    const printButton = modalElement.querySelector('.print-modal');
    if (printButton) {
      printButton.addEventListener('click', () => {
        window.print();
      });
    }
  }
}

// Registration form functionality
function initializeRegistrationForm() {
  const form = document.getElementById("registrationForm")
  if (!form) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      submitForm()
    }
  })

  // Real-time validation
  const inputs = form.querySelectorAll("input, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })
}

// Form validation
// Form validation
function validateForm() {
  const form = document.getElementById("registrationForm")
  let isValid = true

  // Clear previous errors
  clearFormErrors()

  // Validate student name
  const studentName = form.querySelector("#studentName")
  if (!studentName.value.trim()) {
    showFieldError(studentName, "اسم الطالب مطلوب")
    isValid = false
  }

  // Validate country
  const country = form.querySelector("#country")
  if (!country.value) {
    showFieldError(country, "يرجى اختيار الدولة")
    isValid = false
  }

  // Validate grade
  const grade = form.querySelector("#grade")
  if (!grade.value) {
    showFieldError(grade, "يرجى اختيار الصف")
    isValid = false
  }

  // Validate WhatsApp if provided
  const whatsapp = form.querySelector("#whatsapp")
  if (whatsapp.value && !isValidPhone(whatsapp.value)) {
    showFieldError(whatsapp, "يرجى إدخال رقم واتساب صحيح")
    isValid = false
  }

  // Validate email if provided
  const email = form.querySelector("#email")
  if (email.value && !isValidEmail(email.value)) {
    showFieldError(email, "يرجى إدخال بريد إلكتروني صحيح")
    isValid = false
  }

  return isValid
}
// Validate individual field
function validateField(field) {
  const value = field.value.trim()

  // Clear previous error
  clearFieldError(field)

  switch (field.id) {
    case "studentName":
      if (!value) {
        showFieldError(field, "اسم الطالب مطلوب")
        return false
      } else if (value.length < 2) {
        showFieldError(field, "اسم الطالب يجب أن يكون حرفين على الأقل")
        return false
      }
      break

    case "email":
      if (value && !isValidEmail(value)) {
        showFieldError(field, "يرجى إدخال بريد إلكتروني صحيح")
        return false
      }
      break

    case "whatsapp":
      if (value && !isValidPhone(value)) {
        showFieldError(field, "يرجى إدخال رقم واتساب صحيح")
        return false
      }
      break
  }

  return true
}

// Phone validation
function isValidPhone(phone) {
  const phoneRegex = /^[0-9\s\-\(\)]{8,}$/
  return phoneRegex.test(phone)
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Show field error
function showFieldError(field, message) {
  field.classList.add("is-invalid")

  let errorDiv = field.parentNode.querySelector(".invalid-feedback")
  if (!errorDiv) {
    errorDiv = document.createElement("div")
    errorDiv.className = "invalid-feedback"
    field.parentNode.appendChild(errorDiv)
  }

  errorDiv.textContent = message
}

// Clear field error
function clearFieldError(field) {
  field.classList.remove("is-invalid")
  const errorDiv = field.parentNode.querySelector(".invalid-feedback")
  if (errorDiv) {
    errorDiv.remove()
  }
}

// Show form error
function showFormError(message) {
  showToast("خطأ في النموذج", message, "error")
}

// Clear all form errors
function clearFormErrors() {
  const form = document.getElementById("registrationForm")
  const invalidFields = form.querySelectorAll(".is-invalid")
  invalidFields.forEach((field) => {
    clearFieldError(field)
  })
}


// Submit form
async function submitForm() {
  const form = document.getElementById("registrationForm");
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData.entries());

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "جاري الإرسال...";
  submitButton.disabled = true;

  try {
    // 1. First, prepare and send WhatsApp message
    const whatsappNumber = '+201226092950';
    const message = `*تسجيل جديد*\n\n` +
                   `*الاسم:* ${formValues.studentName || 'غير محدد'}\n` +
                   `*البلد:* ${formValues.country || 'غير محدد'}\n` +
                   `*الصف:* ${formValues.grade || 'غير محدد'}\n` +
                   `*ولي الأمر:* ${formValues.guardian || 'غير محدد'}\n` +
                   `*البريد الإلكتروني:* ${formValues.email || 'غير محدد'}\n` +
                   `*واتساب:* ${formValues.whatsapp || 'غير محدد'}`;
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // 2. Try to submit to Google Sheets
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!response.ok) {
        throw new Error('فشل في إرسال البيانات إلى جوجل شيت');
      }
    } catch (error) {
      console.warn('Warning: Could not submit to Google Sheets:', error.message);
      // Continue with WhatsApp even if Google Sheets fails
    }
    
    // 3. Show success message and redirect to WhatsApp
    showToast("تم التسجيل بنجاح", "سيتم تحويلك إلى واتساب", "success");
    
    // 4. Open WhatsApp in a new tab after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
    
    // 5. Reset form
    form.reset();
    clearFormErrors();
    
  } catch (error) {
    console.error('Error:', error);
    showToast("حدث خطأ", "تعذر إرسال البيانات، يرجى المحاولة مرة أخرى", "error");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}
// Toast notification system
function showToast(title, message, type = "info") {
  const toastContainer = getOrCreateToastContainer()

  const toastId = "toast-" + Date.now()
  const iconClass =
    type === "success" ? "bi-check-circle" : type === "error" ? "bi-exclamation-triangle" : "bi-info-circle"

  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-bg-${type === "error" ? "danger" : type}" role="alert">
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi ${iconClass} me-2"></i>
          <strong>${title}</strong><br>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `

  // Remove existing toast
  const existingToast = document.getElementById("dynamicToast")
  if (existingToast) {
    existingToast.remove()
  }

  // Add new toast
  toastContainer.insertAdjacentHTML("beforeend", toastHtml)

  const toastElement = document.getElementById(toastId)
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 5000,
  })

  toast.show()

  // Remove toast element after it's hidden
  toastElement.addEventListener("hidden.bs.toast", function () {
    this.remove()
  })
}

// Get or create toast container
function getOrCreateToastContainer() {
  let container = document.querySelector(".toast-container")

  if (!container) {
    container = document.createElement("div")
    container.className = "toast-container position-fixed top-0 end-0 p-3"
    container.style.zIndex = "9999"
    document.body.appendChild(container)
  }

  return container
}

// Video page functionality
function renderVideoGrid() {
  const videoGrid = document.getElementById("videoGrid")
  if (!videoGrid) return

  const startIndex = (currentPage - 1) * videosPerPage
  const endIndex = startIndex + videosPerPage
  const videosToShow = currentVideos.slice(startIndex, endIndex)

  videoGrid.innerHTML = ""

  videosToShow.forEach((video) => {
    const videoCard = createVideoCard(video)
    videoGrid.appendChild(videoCard)
  })

  updateVideoCount()
  updatePagination()
}

// Create video card element
function createVideoCard(video) {
  const card = document.createElement("div")
  card.className = "col-md-6 col-lg-4 mb-4"

  card.innerHTML = `
    <div class="card h-100 video-card" data-video-id="${video.id}">
      <div class="position-relative">
        <img src="${video.thumb}" class="card-img-top" alt="${video.title}" loading="lazy">
        <div class="position-absolute top-0 start-0 m-2">
          <span class="badge bg-primary">${video.grade}</span>
        </div>
        <div class="position-absolute bottom-0 end-0 m-2">
          <span class="badge bg-dark">${video.duration}</span>
        </div>
        <div class="position-absolute top-50 start-50 translate-middle">
          <button class="btn btn-light btn-lg rounded-circle play-btn">
            <i class="bi bi-play-fill"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <h6 class="card-title">${video.title}</h6>
        <p class="card-text text-muted small">${video.description}</p>
      </div>
    </div>
  `

  // Add click event to play video
  card.addEventListener("click", () => {
    playVideo(video)
  })

  return card
}

// Play video in modal
function playVideo(video) {
  const modalHtml = `
    <div class="modal fade" id="videoModal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${video.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body p-0">
            <div class="ratio ratio-16x9">
              <iframe src="${video.src}" allowfullscreen></iframe>
            </div>
          </div>
          <div class="modal-footer">
            <div class="me-auto">
              <span class="badge bg-primary me-2">${video.grade}</span>
              <span class="badge bg-secondary">${video.duration}</span>
            </div>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
          </div>
        </div>
      </div>
    </div>
  `

  // Remove existing modal
  const existingModal = document.getElementById("videoModal")
  if (existingModal) {
    existingModal.remove()
  }

  // Add new modal
  document.body.insertAdjacentHTML("beforeend", modalHtml)

  const modal = new bootstrap.Modal(document.getElementById("videoModal"))
  modal.show()

  // Stop video when modal is closed
  document.getElementById("videoModal").addEventListener("hidden.bs.modal", function () {
    this.remove()
  })
}

// Video search functionality
function initializeVideoSearch() {
  const searchInput = document.getElementById("videoSearch")
  if (!searchInput) return

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim()
    filterVideos(searchTerm)
  })
}

// Filter videos by search term
function filterVideos(searchTerm = "") {
  const gradeFilter = document.getElementById("gradeFilter")
  const selectedGrade = gradeFilter ? gradeFilter.value : ""

  currentVideos = apolloVideos.filter((video) => {
    const matchesSearch =
      searchTerm === "" ||
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm)

    const matchesGrade = selectedGrade === "" || video.grade === selectedGrade

    return matchesSearch && matchesGrade
  })

  currentPage = 1
  renderVideoGrid()
}

// Video filters
function initializeVideoFilters() {
  const gradeFilter = document.getElementById("gradeFilter")
  if (!gradeFilter) return

  gradeFilter.addEventListener("change", function () {
    const selectedGrade = this.value
    localStorage.setItem("apolloPreferredGrade", selectedGrade)
    filterVideosByGrade(selectedGrade)
  })
}

// Filter videos by grade
function filterVideosByGrade(grade) {
  const searchInput = document.getElementById("videoSearch")
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : ""

  currentVideos = apolloVideos.filter((video) => {
    const matchesSearch =
      searchTerm === "" ||
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm)

    const matchesGrade = grade === "" || video.grade === grade

    return matchesSearch && matchesGrade
  })

  currentPage = 1
  renderVideoGrid()
}

// Video sorting
function initializeVideoSort() {
  const sortSelect = document.getElementById("videoSort")
  if (!sortSelect) return

  sortSelect.addEventListener("change", function () {
    sortVideos(this.value)
  })
}

// Sort videos
function sortVideos(sortBy) {
  switch (sortBy) {
    case "newest":
      currentVideos.sort((a, b) => b.id - a.id)
      break
    case "longest":
      currentVideos.sort((a, b) => {
        const aDuration = parseDuration(a.duration)
        const bDuration = parseDuration(b.duration)
        return bDuration - aDuration
      })
      break
    case "shortest":
      currentVideos.sort((a, b) => {
        const aDuration = parseDuration(a.duration)
        const bDuration = parseDuration(b.duration)
        return aDuration - bDuration
      })
      break
    default:
      currentVideos.sort((a, b) => a.id - b.id)
  }

  renderVideoGrid()
}

// Parse duration string to seconds
function parseDuration(duration) {
  const parts = duration.split(":")
  return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
}

// Update video count display
function updateVideoCount() {
  const countElement = document.getElementById("videoCount")
  if (countElement) {
    countElement.textContent = `${currentVideos.length} فيديو`
  }
}

// Pagination functionality
function initializePagination() {
  updatePagination()
}

// Update pagination
function updatePagination() {
  const paginationContainer = document.getElementById("pagination")
  if (!paginationContainer) return

  const totalPages = Math.ceil(currentVideos.length / videosPerPage)

  if (totalPages <= 1) {
    paginationContainer.innerHTML = ""
    return
  }

  let paginationHtml = '<nav><ul class="pagination justify-content-center">'

  // Previous button
  paginationHtml += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" data-page="${currentPage - 1}">السابق</a>
    </li>
  `

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `
  }

  // Next button
  paginationHtml += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" data-page="${currentPage + 1}">التالي</a>
    </li>
  `

  paginationHtml += "</ul></nav>"

  paginationContainer.innerHTML = paginationHtml

  // Add click events
  paginationContainer.querySelectorAll(".page-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const page = Number.parseInt(this.getAttribute("data-page"))
      if (page && page !== currentPage && page >= 1 && page <= totalPages) {
        currentPage = page
        renderVideoGrid()

        // Scroll to top of video grid
        const videoGrid = document.getElementById("videoGrid")
        if (videoGrid) {
          videoGrid.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
}

// Initialize tooltips
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
}

// Back to top functionality
function initializeBackToTop() {
  const backToTopButton = document.getElementById("backToTop")
  if (!backToTopButton) return

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = "block"
    } else {
      backToTopButton.style.display = "none"
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Intersection Observer for animations
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes when hero section is in view
        const elements = entry.target.querySelectorAll(".fade-in")
        elements.forEach((el, index) => {
          const delay = index * 0.2
          el.style.animationDelay = `${delay}s`
          el.style.opacity = 1
        })
      }
    })
  }, observerOptions)

  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .slide-in-up")
  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Utility function to sanitize input
function sanitizeInput(input) {
  const div = document.createElement("div")
  div.textContent = input
  return div.innerHTML
}

// Utility function to debounce function calls
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Export functions for global access (if needed)
window.ApolloSchool = {
  showToast,
  showModal,
  filterVideos: debounce(filterVideos, 300),
  playVideo,
}

// Initialize hero section animations
function initializeHeroAnimations() {
  // Typewriter effect
  const typewriterText = document.getElementById('typewriter-text')
  const words = [  "أفضل المعلمين المتخصصين",
    "مناهج تعليمية تفاعلية",
    "تقنيات تعلم حديثة",
    "بيئة تعليمية آمنة",
    "متابعة دراسية مستمرة",
    "أنشطة تعليمية ممتعة"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typeSpeed = 100
  let deleteSpeed = 50
  let pauseTime = 2000
  let currentText = ''

  function type() {
    const currentWord = words[wordIndex % words.length]

    if (isDeleting) {
      // Delete characters
      currentText = currentWord.substring(0, charIndex - 1)
      charIndex--
      typewriterText.textContent = currentText
      typeSpeed = deleteSpeed
    } else {
      // Type characters
      currentText = currentWord.substring(0, charIndex + 1)
      charIndex++
      typewriterText.textContent = currentText
      typeSpeed = 100 + Math.random() * 50 // Natural typing speed variation
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at the end of the word
      typeSpeed = pauseTime
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false
      wordIndex++
      typeSpeed = 200 // Slight delay before typing next word
    }

    setTimeout(type, typeSpeed)
  }

  // Start the typewriter effect after a short delay
  if (typewriterText) {
    setTimeout(type, 1000)
  }

  // Add scroll-triggered animations
  const heroSection = document.querySelector('.hero-section')
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes when hero section is in view
          const elements = entry.target.querySelectorAll('.fade-in')
          elements.forEach((el, index) => {
            const delay = index * 0.2
            el.style.animationDelay = `${delay}s`
            el.style.opacity = 1
          })
        }
      })
    }, { threshold: 0.1 })

    observer.observe(heroSection)
  }

  // Add hover effect to CTA buttons
  const ctaButtons = document.querySelectorAll('.hero-section .btn')
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)'
      button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)'
      button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)'
    })

    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(1px)'
    })

    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-3px)'
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageBtn = document.querySelector('.language-btn');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Toggle language dropdown on mobile
    if (window.innerWidth <= 991.98) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            languageSwitcher.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageSwitcher.contains(e.target)) {
                languageSwitcher.classList.remove('active');
            }
        });
    }
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Update button text and flag
            const flag = this.querySelector('.language-flag').textContent;
            const text = this.querySelector('span:not(.language-flag)').textContent;
            
            languageBtn.innerHTML = `
                <span class="language-flag">${flag}</span>
                <span class="language-text d-none d-sm-inline">${text}</span>
                <i class="fas fa-chevron-down ms-1"></i>
            `;
            
            // Close dropdown on mobile
            if (window.innerWidth <= 991.98) {
                languageSwitcher.classList.remove('active');
            }
        });
    });
    
    // Function to handle language change
    function changeLanguage(lang) {
        // Here you would typically:
        // 1. Save the selected language preference (e.g., in localStorage)
        localStorage.setItem('preferredLanguage', lang);
        
        // 2. Update the document direction for RTL/LTR
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // 3. In a real app, you would load translations here
        // loadTranslations(lang);
        
        // 4. Show a feedback message
        showLanguageFeedback(lang);
    }
    
    // Show feedback when language changes
    function showLanguageFeedback(lang) {
        // You can customize this feedback message
        const message = lang === 'ar' 
            ? 'تم تغيير اللغة إلى العربية' 
            : 'Language changed to English';
        
        // Create and show a toast/snackbar
        const toast = document.createElement('div');
        toast.className = 'language-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Add show class with a small delay to trigger the animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove toast after animation
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'ar';
    if (savedLang) {
        // Find and click the saved language option
        const savedOption = document.querySelector(`.language-option[data-lang="${savedLang}"]`);
        if (savedOption) {
            savedOption.click();
        }
    }
});

// Add styles for the language toast
const style = document.createElement('style');
style.textContent = `
    .language-toast {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--gray-800);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-size: 0.95rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1100;
        pointer-events: none;
    }
    
    .language-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    
    @media (max-width: 576px) {
        .language-toast {
            width: 90%;
            text-align: center;
            padding: 10px 16px;
            font-size: 0.9rem;
        }
    }
`;
document.head.appendChild(style);