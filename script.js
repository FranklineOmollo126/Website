    // JAVASCRIPT//
    
    // Get elements
    const menuIcon = document.getElementById('menuIcon');
    const navbar = document.getElementById('navbar');
    
    // Check if elements exist (prevents errors)
    if (menuIcon && navbar) {
        // Toggle menu when hamburger clicked
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
        
        // Get all nav links
        const navLinks = document.querySelectorAll('.navbar a');
        
        // Close menu when any link is clicked
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }


    const YOUR_PHONE_NUMBER = "+254769230897";
    const smsForm = document.getElementById('smsForm');
    const statusMessage = document.getElementById('statusMessage');

    smsForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phoneNumber = document.getElementById('phoneNumber').value.trim();
      const subject = document.getElementById('emailSubject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!fullName || !email || !subject || !message) {
        showStatus('Please fill in all required fields', 'error');
        return;
      }

      const smsMessage = `New message from ${fullName}%0A%0A` +
        `Email: ${email}%0A` +
        `Subject: ${subject}%0A%0A` +
        `Message: ${message}%0A%0A` +
        `From: ${phoneNumber || 'Not provided'}`;

      const smsUrl = `sms:${YOUR_PHONE_NUMBER}?body=${smsMessage}`;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = smsUrl;
        showStatus('Opening SMS app... Send the message!', 'success');
        setTimeout(() => {
          if (confirm('Message opened in SMS app. Did you send it?')) {
            smsForm.reset();
          }
        }, 2000);
      } else {
        showStatus('📱 Copy the message below and send from your phone', 'success');
        const copyDiv = document.createElement('div');
        copyDiv.style.marginTop = '0.8rem';
        copyDiv.style.padding = '0.8rem';
        copyDiv.style.background = 'rgba(255,255,255,0.1)';
        copyDiv.style.borderRadius = '6px';
        copyDiv.style.border = '1px solid #00abf0';
        copyDiv.innerHTML = `<strong style="color:#00abf0;">Copy this message:</strong><br>
                                <textarea id="copyText" rows="4" style="width:100%; margin-top:0.5rem; background:#1a1a2e; color:white; border:1px solid #00abf0; border-radius:6px; padding:0.5rem; font-size:0.8rem;">${decodeURIComponent(smsMessage.replace(/%0A/g, '\n'))}</textarea>
                                <button id="copyBtn" style="margin-top:0.5rem; padding:0.4rem 0.8rem; background:#00abf0; color:white; border:none; border-radius:5px; cursor:pointer;">📋 Copy</button>`;
        const oldCopy = document.querySelector('.copy-container');
        if (oldCopy) oldCopy.remove();
        copyDiv.className = 'copy-container';
        statusMessage.parentNode.insertBefore(copyDiv, statusMessage.nextSibling);
        document.getElementById('copyBtn').addEventListener('click', function () {
          const copyText = document.getElementById('copyText');
          copyText.select();
          document.execCommand('copy');
          alert('Copied! Send from your phone.');
        });
            }
    });

    function showStatus(message, type) {
      statusMessage.textContent = message;
      statusMessage.className = `status-message ${type}`;
      setTimeout(() => {
        statusMessage.style.display = 'none';
        statusMessage.className = 'status-message';
      }, 5000);
    }

    // Simple interactive feedback for buttons (smooth alerts)
    const hireBtn = document.getElementById('hireBtn');
    const talkBtn = document.getElementById('talkBtn');

    if (hireBtn) {
      hireBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("✨ Thanks for your interest! Feel free to reach out via the contact section. Let's build something great.");
      });
    }
    if (talkBtn) {
      talkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("💬 Let's talk! You can connect with me on socials or send an email to franklinenduri@gmail.com");
      });
    }

    // active nav highlight on click 
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') {
          e.preventDefault();
        }
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
  
    // TYPEWRITER EFFECT - Words to cycle through
    const words = ["Full Stack Developer", "Web Designer", "Python Developer", "Java Programmer"];

    let wordIndex = 0;      // Which word we're on
    let charIndex = 0;      // Which character we're at
    let isDeleting = false;  // Are we deleting or typing?
    let typingSpeed = 150;   // Speed of typing

    const dynamicTextElement = document.getElementById("typing-word");

    function typeEffect() {
      const currentWord = words[wordIndex];

      // TYPING: adding characters
      if (!isDeleting && charIndex <= currentWord.length) {
        dynamicTextElement.textContent = currentWord.substring(0, charIndex);
        charIndex++;
        typingSpeed = 150;
      }
      // BACKSPACING: removing characters
      else if (isDeleting && charIndex >= 0) {
        dynamicTextElement.textContent = currentWord.substring(0, charIndex);
        charIndex--;
        typingSpeed = 100;
      }

      // Word fully typed -> pause then delete
      if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true;
        typingSpeed = 1500;  // Pause 1.5 seconds before deleting
      }
      // Word fully deleted -> move to next word
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;  // Loop through words
        typingSpeed = 500;  // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start the animation when page loads
    typeEffect();
