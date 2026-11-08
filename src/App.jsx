import { useState, useRef, useEffect } from 'react'
import './App.css'

const projects = [
  {
    number: '01',
    title: 'Campus Life',
    category: 'Frontend Development',
    image: '/images/project-campus.png',
    description:
      'A unified desktop environment designed to bring student productivity, learning and campus tools together in one interactive workspace.',
    features: [
      'Interactive desktop environment and window manager',
      'AI resume analyzer and job matching',
      'AI-powered interview preparation',
      'Adaptive learning dashboard',
      'Student academic and placement portal'
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand'
    ]
  },
  {
    number: '02',
    title: 'AI Health Triage',
    category: 'AI Healthcare System',
    image: '/images/project-health.png',
    description:
      'An AI-assisted healthcare platform designed to analyze patient symptoms, identify urgency levels and recommend appropriate medical specializations.',
    features: [
      'Patient and doctor login',
      'AI-assisted symptom analysis',
      'Emergency priority classification',
      'Appointment scheduling',
      'Healthcare chatbot',
      'Doctor and admin dashboards'
    ],
    technologies: [
      'Python',
      'Flask',
      'HTML',
      'CSS',
      'JavaScript',
      'Database'
    ]
  },
  {
    number: '03',
    title: 'BEC BillDesk',
    category: 'Full-Stack Web Application',
    image: '/images/project-billdesk.png',
    description:
      'A digital fee payment platform developed for Basaveshwar Engineering College to simplify online payments, digital receipts and transaction management.',
    features: [
      'Student authentication',
      'Online fee payment workflow',
      'Payment status tracking',
      'Digital receipt generation',
      'Payment history',
      'Administrative transaction management'
    ],
    technologies: [
      'React',
      'Tailwind CSS',
      'GSAP',
      'Framer Motion',
      'Node.js',
      'MongoDB'
    ]
  }
]

function App() {
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [hasFormContent, setHasFormContent] = useState(false)
  const [emailDraftOpened, setEmailDraftOpened] = useState(false)

  const openingAudioRef = useRef(null)
  const massAudioRef = useRef(null)
  const switchTimerRef = useRef(null)

  const firstName = 'KRISHNA'
  const lastName = 'BHAJANTRI'

  const enableSound = async () => {
    const opening = openingAudioRef.current

    try {
      if (opening) {
        opening.muted = false
        opening.volume = 0.6
        await opening.play()
      }

      setSoundEnabled(true)
      setIsMuted(false)
    } catch (error) {
      console.log('Opening music error:', error)
    }
  }

 const enterPortfolio = async () => {
  if (started) return

  setStarted(true)

  const opening = openingAudioRef.current
  const mass = massAudioRef.current

  // Stop opening music immediately
  if (opening) {
    opening.pause()
    opening.currentTime = 0
  }

  // Start mass music immediately on button click
  if (mass) {
    mass.currentTime = 0
    mass.muted = isMuted
    mass.volume = 0.8

    mass.play().catch((error) => {
      console.log('Mass music error:', error)
    })
  }
}

  const toggleMute = () => {
    const newMutedState = !isMuted

    setIsMuted(newMutedState)

    if (openingAudioRef.current) {
      openingAudioRef.current.muted = newMutedState
    }

    if (massAudioRef.current) {
      massAudioRef.current.muted = newMutedState
    }
  }

  useEffect(() => {
    if (!started) return

    const timer = setTimeout(() => {
      setFinished(true)
    }, 10500)

    return () => clearTimeout(timer)
  }, [started])

  useEffect(() => {
    return () => clearTimeout(switchTimerRef.current)
  }, [])

  // Close project using Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent background scrolling while project is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  return (
    <main className="portfolio">

      <audio
        ref={openingAudioRef}
        src="/audio/opening.wav"
        loop
        preload="auto"
      />

      <audio
        ref={massAudioRef}
        src="/audio/mass.wav"
        loop
        preload="auto"
      />

      {/* OPENING SCREEN */}

      {!started && (
        <section className="cinema-intro">
          <div className="red-atmosphere" />

          <div className="intro-content">
            <p className="intro-label">
              A NEW CHAPTER BEGINS
            </p>

            <div className="intro-line" />

            <h1 className="intro-heading">
              YOUR NEXT
              <br />
              DESTINATION
            </h1>

            <button
              className="sound-button"
              onClick={enableSound}
              disabled={soundEnabled}
            >
              {soundEnabled ? '♪ SOUND ENABLED' : '♪ ENABLE SOUND'}
            </button>

            <button
              className="enter-button"
              onClick={enterPortfolio}
            >
              ENTER PORTFOLIO <span>↗</span>
            </button>
          </div>
        </section>
      )}

      {/* NAME ANIMATION */}

{started && !finished && (
  <section className="cinema-intro title-sequence">
    <div className="red-atmosphere" />
    <div className="cinema-glow" />

    <div className="movie-title">

      <div className="title-line krishna-line">
        {firstName.split('').map((letter, index) => (
          <span
            key={index}
            className={`shoot-letter letter-${letter.toLowerCase()}`}
            style={{
              '--delay': index === 2
                ? '0s'
                : index < 2
                  ? `${(2 - index) * 0.45}s`
                  : `${(index - 1) * 0.45}s`,
              '--from-x': `${(2 - index) * 100}%`
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="surname-wrap">
  <div className="title-line surname-line">
    {lastName.split('').map((letter, index) => (
      <span
        key={index}
        className="surname-letter"
        style={{ '--surname-delay': `${3.8 + index * 0.12}s` }}
      >
        {letter}
      </span>
    ))}
  </div>

  <div className="surname-underline" />
</div>
      <p className="movie-subtitle">
        SOFTWARE DEVELOPER
        <span> | </span>
        AI ENTHUSIAST
      </p>

    </div>
  </section>
)}
      {/* MAIN WEBSITE */}

      {finished && (
        <div className="main-website">

          <nav className="navbar">
            <a className="logo" href="#home">
              K<span>.</span>
            </a>

            <div className="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="nav-actions">
              <button
                className="mute-button"
                onClick={toggleMute}
              >
                {isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
              </button>

              <a className="hire-button" href="#contact">
                Let's Talk ↗
              </a>
            </div>
          </nav>

          {/* CINEMATIC MOVIE POSTER HERO */}

<section className="hero movie-hero" id="home">

  <div className="hero-content movie-hero-content">

    <p className="eyebrow">THE DEVELOPER BEHIND THE CODE</p>

    <h1 className="movie-hero-name">
      KRISHNA
      <span>BHAJANTRI.</span>
    </h1>

    <div className="hero-gold-line" />

    <h2>
      Software Developer <span>|</span> AI Enthusiast
    </h2>

    <p className="intro">
      I build digital experiences, explore artificial intelligence
      and turn creative ideas into meaningful solutions.
    </p>

    <div className="hero-buttons">
      <a href="#projects" className="primary-button explore-button">
  <span className="explore-label">EXPLORE MY WORK</span>
  <span className="explore-lens">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  </span>
</a>

      <a href="#contact" className="secondary-button connect-button">
  <span className="plug plug-left">
    <span className="plug-head">
      <i></i>
      <i></i>
    </span>
  </span>

  <span className="connect-label">LET'S CONNECT</span>

  <span className="plug plug-right">
    <span className="plug-head">
      <i></i>
      <i></i>
    </span>
  </span>
</a>
    </div>

    <div className="movie-hero-footer">
      <span>INFORMATION SCIENCE & ENGINEERING</span>
      <span>AVAILABLE FOR OPPORTUNITIES</span>
    </div>

  </div>

  <div className="visual movie-hero-visual">
    <div className="portrait-glow" />

    <img
      className="hero-portrait"
      src="/images/krishna.png"
      alt="Krishna Bhajantri"
    />

    <div className="portrait-caption">
      THE MIND BEHIND THE CODE
    </div>
  </div>

</section>

{/* ABOUT */}
<section className="about" id="about">
  <p className="eyebrow">GET TO KNOW THE DEVELOPER</p>

  <div className="about-layout">
    <div className="about-copy">
      <h2>
        Engineering ideas.
        <span> Building solutions.</span>
      </h2>

      <p>
        I'm Krishna Bhajantri, an Information Science and
        Engineering student interested in software development,
        artificial intelligence and modern web technologies.
      </p>

      <p>
        I enjoy turning ideas into practical digital solutions,
        exploring new technologies and improving my technical
        skills through hands-on projects.
      </p>
    </div>

    <div className="about-details">
      <div className="about-card">
        <span>01 / EDUCATION</span>
        <h3>Information Science & Engineering</h3>
        <p>Basaveshwar Engineering College, Bagalkot</p>
      </div>

      <div className="about-card">
        <span>02 / TECHNICAL INTERESTS</span>
        <h3>Software Development & AI</h3>
        <p>Web Technologies · Artificial Intelligence</p>
      </div>

      <div className="about-card">
        <span>03 / DEVELOPMENT</span>
        <h3>Learn. Build. Improve.</h3>
        <p>Hands-on projects and continuous learning</p>
      </div>
    </div>
  </div>
</section>

          {/* PROJECTS */}

          <section className="projects-section" id="projects">

            <div className="projects-heading">
              <div>
                <p className="eyebrow">SELECTED WORK · 2026</p>

                <h2>
                  PROJECTS<span>.</span>
                </h2>

                <p className="projects-subtitle">
                  Three ideas. Three journeys. Built with passion.
                </p>
              </div>

              <div className="project-count">
                03 <span>PROJECTS</span>
              </div>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <button
                  key={project.number}
                  className="project-card"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View ${project.title} project`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} project portrait`}
                    className="project-card-image"
                  />

                  <div className="project-card-shade" />

                  <div className="project-card-number">
                    {project.number}
                    <span> / 03</span>
                  </div>

                  <div className="project-card-arrow">
                    ↗
                  </div>

                  <div className="project-card-info">
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                    <span>EXPLORE PROJECT ↗</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="projects-bottom">
              <span>01 — 03</span>
              <span>SELECT A PROJECT TO EXPLORE</span>
            </div>

          </section>

          {/* EXPANDED PROJECT */}

          {selectedProject && (
            <div
              className="project-modal"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="project-modal-content"
                onClick={(event) => event.stopPropagation()}
              >

                <button
                  className="project-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project"
                >
                  ✕
                </button>

                <div className="modal-image-area">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                  />
                </div>

                <div className="modal-project-details">

                  <p className="eyebrow">
                    PROJECT {selectedProject.number} · {selectedProject.category}
                  </p>

                  <h2>{selectedProject.title}<span>.</span></h2>

                  <p className="modal-description">
                    {selectedProject.description}
                  </p>

                  <h3>KEY FEATURES</h3>

                  <ul className="feature-list">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>
                        <span>↗</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <h3>TECHNOLOGIES</h3>

                  <div className="technology-list">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <button
                    className="modal-back-button"
                    onClick={() => setSelectedProject(null)}
                  >
                    ← BACK TO PROJECTS
                  </button>

                </div>
              </div>
            </div>
          )}

          {/* CONTACT */}

         {/* CONTACT */}
<section className="contact-section" id="contact">
  <p className="eyebrow">LET'S CONNECT</p>

  <div className="contact-layout">
    <div className="contact-intro">
      <h2>
        Have an idea?
        <span> Let's build it.</span>
      </h2>

      <p>
        Open to exciting opportunities, collaborations
        and meaningful conversations. Let's create
        something impactful together.
      </p>
    </div>

    <div className="contact-panel">
      <span className="contact-label">DIRECT EMAIL</span>

      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=krishnabhajantri2308@gmail.com" target="_blank" rel="noreferrer"
        className="contact-email contact-email-main"
      >
        <span className="contact-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 7 9-7" />
  </svg>
</span>
<span>krishnabhajantri2308@gmail.com</span>
<span className="contact-arrow">↗</span>
      </a>
      <a
  href="https://www.linkedin.com/in/krishna-bhajantri-37251b440/"
  target="_blank"
  rel="noopener noreferrer"
  className="contact-email"
>
  CONNECT ON LINKEDIN ↗
</a>
<a
  href="https://github.com/krishna-exe-23"
  target="_blank"
  rel="noopener noreferrer"
  className="contact-email"
>
  EXPLORE MY GITHUB ↗
</a>

      <div className="contact-status">
        AVAILABLE FOR OPPORTUNITIES
      </div>
    </div>
  </div>
</section>

         {/* TALK TO ME */}
<section className="talk-section" id="talk">
  <p className="eyebrow">START A CONVERSATION</p>

  <h2>
    Let's talk.
    <span> What's on your mind?</span>
  </h2>

  <p className="talk-description">
    Have a project, opportunity or just want to connect?
    Send me a message.
  </p>

  <form
  className="talk-form"
  onChange={(event) => {
  const values = new FormData(event.currentTarget)
  setHasFormContent(
    [...values.values()].some(value => String(value).trim() !== '')
  )
}}
  onSubmit={(event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=krishnabhajantri2308@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(url, "_blank");
    setEmailDraftOpened(true)
  }}
>
    <div className="talk-input-row">
      <input type="text" name="name" placeholder="Your name" required />
<input type="email" name="email" placeholder="Your email" required />
    </div>

    <input type="text" name="subject" placeholder="Subject" required />

    <textarea
      name="message"
      placeholder="Write your message..."
      rows="5"
      required
    />
   {hasFormContent && (
  <button
    type="button"
    className="clear-button"
    onClick={(event) => {
      event.currentTarget.form.reset()
      setHasFormContent(false)
    }}
  >
    CLEAR ✕
  </button>
)}
    <button type="submit">SEND MESSAGE ↗</button>
  </form>
  {emailDraftOpened && (
  <p className="email-confirmation">
    ✓ Your message is ready in Gmail. Review and send it there.
  </p>
)}
</section> <footer>
            © 2026 Krishna Bhajantri · Built with passion.
          </footer>

        </div>
      )}
    </main>
  )
}

export default App