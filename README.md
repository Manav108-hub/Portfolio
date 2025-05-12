<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manav Adwani - Full Stack Developer</title>
    <!-- Add Hudson CSS here -->
    <link rel="stylesheet" href="path/to/hudson.css">
    <style>
        :root {
            --color-1: #1A73E8;
            --color-1-lighter: #66B2FF;
        }
        
        .intro-content {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
            gap: 1rem;
        }
        
        .language-card {
            background: var(--color-gray-4);
            padding: 1rem;
            border-radius: var(--border-radius);
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .language-card:hover {
            transform: translateY(-5px);
            background: var(--color-gray-5);
        }
    </style>
</head>
<body>
    <!-- Preloader -->
    <div id="preloader">
        <div id="loader" class="dots-pulse">
            <div></div><div></div><div></div>
        </div>
    </div>

    <!-- Site Header -->
    <header class="s-header">
        <div class="row">
            <div class="column xl-12">
                <div class="s-header__logo">
                    <a href="#intro">Manav Adwani</a>
                </div>
                
                <nav class="s-header__nav">
                    <ul>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                
                <a class="s-header__menu-toggle" href="#0">
                    <span>Menu</span>
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main id="main-content">
        <!-- Intro Section -->
        <section id="intro" class="target-section intro">
            <div class="row">
                <div class="column xl-12 intro-content">
                    <h1 class="text-center" style="font-size: var(--text-display-2);">Hi 👋, I'm Manav Adwani</h1>
                    <h3 class="text-center" style="font-size: var(--text-xxl);">A Passionate Developer from India 🚀</h3>
                    
                    <div class="u-flex-center">
                        <img src="https://readme-typing-svg.demolab.com ?font=Fira+Code&size=22&pause=1000&color=1A73E8&center=true&width=435&lines=Full-Stack+Developer;DevOps+Enthusiast;Lifelong+Learner+%F0%9F%8C%9F" 
                             alt="Typing SVG"
                             class="u-fullwidth">
                    </div>
                </div>
            </div>
        </section>

        <!-- Currently Exploring -->
        <section class="target-section">
            <div class="row">
                <div class="column xl-12">
                    <h2 class="text-center">Currently Exploring</h2>
                    <div class="skills-grid">
                        <div class="language-card">
                            <img src="https://img.icons8.com/color/48/react-native.png " alt="React">
                            <p class="text-center">React</p>
                        </div>
                        <div class="language-card">
                            <img src="https://img.icons8.com/color/48/docker.png " alt="Docker">
                            <p class="text-center">Docker</p>
                        </div>
                        <div class="language-card">
                            <img src="https://img.icons8.com/color/48/kubernetes.png " alt="Kubernetes">
                            <p class="text-center">Kubernetes</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="target-section">
            <div class="row">
                <div class="column xl-12 text-center">
                    <h3>Let's Connect</h3>
                    <p class="lead">
                        <a class="btn btn--primary" href="mailto:manavadwani86@gmail.com">
                            manavadwani86@gmail.com
                        </a>
                    </p>
                    
                    <div class="social-links">
                        <a href="https://twitter.com/manavadwani86 " class="btn btn--stroke">
                            <img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg " alt="Twitter">
                        </a>
                        <a href="https://linkedin.com/in/manav-adwani-1146a221b " class="btn btn--stroke">
                            <img src="https://img.shields.io/badge/LinkedIn-%230A66C2.svg " alt="LinkedIn">
                        </a>
                        <a href="https://www.leetcode.com/manav10 " class="btn btn--stroke">
                            <img src="https://img.shields.io/badge/LeetCode-%23FFA116.svg " alt="LeetCode">
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Back to Top Button -->
    <a class="ss-go-top" href="#top" title="Back to Top">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L12 8L19 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>

    <!-- Add Hudson JS -->
    <script src="path/to/hudson.js"></script>
    <script src="path/to/plugins.js"></script>
    <script>
        // Custom script for LeetCode stats
        document.addEventListener('DOMContentLoaded', function() {
            // Add any additional initialization code here
        });
    </script>
</body>
</html>
