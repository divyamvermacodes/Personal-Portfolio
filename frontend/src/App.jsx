import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import LeetCode from './components/LeetCode.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Courses from './components/Courses.jsx'
import Certifications from './components/Certifications.jsx'
import Experience from './components/Experience.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'

function App() {
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    let frameId
    function raf(time) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <LeetCode />
        <Projects />
        <Education />
        <Courses />
        <Certifications />
        <Experience />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App
