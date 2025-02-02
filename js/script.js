 // Animate stats on scroll
 const stats = document.querySelectorAll('.stat-number');
 let animated = false;

 function animateStats() {
     if (animated) return;
     
     stats.forEach(stat => {
         const target = parseInt(stat.textContent);
         let current = 0;
         const increment = target / 50;
         const timer = setInterval(() => {
             current += increment;
             if (current >= target) {
                 clearInterval(timer);
                 stat.textContent = target + '+';
             } else {
                 stat.textContent = Math.floor(current) + '+';
             }
         }, 20);
     });
     
     animated = true;
 }

 // Trigger animation when stats are in view
 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             animateStats();
         }
     });
 });

 document.querySelectorAll('.stats').forEach(stat => observer.observe(stat));

 // Start Quiz button interaction
 document.getElementById("startQuiz").addEventListener("click", function() {
     this.innerHTML = "Loading...";
     this.style.opacity = "0.7";
     setTimeout(() => {
         alert("Quiz Started! Implement your interactive features here.");
         this.innerHTML = "Start Quiz";
         this.style.opacity = "1";
     }, 1000);
 });

 document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        let count = 0;
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            if (count < target) {
                count += Math.ceil(target / 100);
                counter.innerText = count;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
});

// for stroing username
function saveUsername() {
    const username = document.getElementById("username").value;
    if (username.trim() !== "") {
        localStorage.setItem("quizUsername", username);
    }
}
