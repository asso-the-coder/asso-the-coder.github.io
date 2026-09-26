// Single source of truth for all visible site text/data.
// Both designs/classic and designs/snazzy render from this file so their
// content can never drift apart. Edit content here, not in either design's HTML.

const SITE_CONTENT = {
  meta: {
    title: "Asser Abdelgawad",
    description: "Embedded systems portfolio • projects, experience, and contact"
  },

  nav: {
    brand: "Asser Abdelgawad",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" }
    ],
    resume: { label: "Resume", href: "assets/resume.pdf" }
  },

  about: {
    heading: "About",
    profileImage: { src: "assets/profile.jpg", alt: "Asser Abdelgawad" },
    bullets: [
      {
        text: "Engineering Science student at University of Toronto",
        sub: [
          "Majoring in Electrical and Computer Engineering",
          "Minoring in Artificial Intelligence"
        ]
      },
      { text: "Likes basketball and cats" },
      { text: "Loves writing software that makes hardware visibly do stuff" },
      { text: "Interested in embedded systems and machine learning applications" },
      { text: "Currently finishing my senior year on exchange in Taiwan" },
      { text: "Previously @ Hiroshi Ishiguro Labs, Tesla, Kepler Comms, Pulsenics, uOttawa Heart Institute, and more" }
    ]
  },

  projectsIntro: {
    heading: "Projects",
    subtitle: "Click any project to check out the source files!",
    footnote: "Project blog coming soon..."
  },

  experienceIntro: {
    heading: "Experience",
    subtitle: "Internships & engineering roles"
  },

  skillsIntro: {
    heading: "Skills",
    coreLabel: "Core languages and tools",
    notesLabel: "Notes",
    notesText: "I am most well-versed in C, C++, and Python, and am constantly learning new things every day."
  },

  contact: {
    heading: "Contact",
    email: "asser.abdelgawad@mail.utoronto.ca",
    github: { label: "GitHub", handle: "asso-the-coder", url: "https://github.com/asso-the-coder" },
    linkedin: { label: "LinkedIn", handle: "/in/asser-abdelgawad-928359229", url: "https://www.linkedin.com/in/asser-abdelgawad-928359229/" },
    resumeLabel: "Resume",
    resumeHref: "assets/resume.pdf",
    copyButtonLabel: "Copy email",
    toastCopied: "Copied email ✔",
    toastFailed: "Copy failed — you can select it manually."
  },

  footer: {
    name: "Asser Abdelgawad"
  },

  // ====== EDIT HERE: Projects (image slots + GitHub links) ======
  // Put images under: assets/projects/<image>
  // Entire card clicks through to `github`.
  projects: [
    {
      title: "Plastania Video Game",
      blurb: "Beta release of an original single-player video game I built in high school",
      tags: ["C++", "Allegro"],
      image: "assets/projects/plastania.jpg",
      github: "https://github.com/asso-the-coder/plastania-video-game"
    },
    {
      title: "Humanoid Robot Voice Research",
      blurb: "Researched (and achieved!) improvements for the conversational system of the Geminoid HI-6 android",
      tags: ["RAG", "ElevenLabs", "TCP", "Azure TTS", "C#"],
      image: "assets/projects/HI6_chat.jpg",
      github: "https://docs.google.com/presentation/d/1s0VNKLozoCnUK1JAVj0YUkKp7VNHPSir/edit?usp=sharing&ouid=110950224963111531859&rtpof=true&sd=true",     // replace with actual repo
      beforeVideo: "https://www.youtube.com/embed/mZcfqajEHBA",
      afterVideo: "https://drive.google.com/file/d/1VJuWPizd03zFIFKplr9wfLs4pd2lkQd-/preview"
    },
    {
      title: "Smart Home Security System (WIP)",
      blurb: "Distance and motion sensing system in FreeRTOS, layered atop custom Vivado platform on a Xilinx Pynq-Z2 SoC.",
      tags: ["C", "FreeRTOS", "Verilog", "TCL", "SPI", "CMake"],
      image: "assets/projects/pynq.jpg",
      github: "https://github.com/asso-the-coder/home-security-system-pynq-z2"     // replace with actual repo
    },
    {
      title: "Custom Software-In-The-Loop (SIL) Environment",
      blurb: "General-purpose SIL enviroment for automotive sensor validation; tested by simuating a SPI temperature sensor for a bare-metal ARM system.",
      tags: ["C", "GTest", "CMake", "SPI"],
      image: "assets/projects/sil.jpg",
      github: "https://github.com/asso-the-coder/SIL-environment"     // replace with actual repo
    },
    {
      title: "Biomedical Imaging Software Research",
      blurb: "Published research on signal processing algorithms to deconvolve thermal images alongside CADIPT team.",
      tags: ["MATLAB"],
      image: "assets/projects/imaging.jpg",
      github: "https://www.science.org/doi/10.1126/sciadv.adi1899"
    },
    {
      title: "Electric Racecar Circuits",
      blurb: "Designed, physically built, and tested several critical PCBs end-to-end for my university's (winning!) EV racing team.",
      tags: ["Altium", "C++", "SPICE", "Teensy MCUs", "I2C", "UART", "CAN", "E-loads", "Oscilloscopes"],
      image: "assets/projects/RC.jpg",
      github: "https://drive.google.com/drive/folders/1Gp0THWEDytKAZaY5z9e0QTf7O2gkgbx3"
    },
    {
      title: "Assembly Games",
      blurb: "Designed several games in RISC-V Assembly for university course using low-level computing concepts, tested on Altera DE1-SoC.",
      tags: ["RISC-V Assembly", "C"],
      image: "assets/projects/simon.jpg",
      github: "https://github.com/asso-the-coder/memory-game",
      github: "https://github.com/asso-the-coder/space-invaders"
    },
    {
      title: "Amazon Customer Review Analyzer Hackathon Project",
      blurb: "Reached Daisy Hackathon finals using this Word2Vec-based pipeline to extract product satisfaction info from Amazon reviews. Created with two friends.",
      tags: ["ML", "NLP", "Word2Vec", "Python"],
      image: "assets/projects/reviews.jpg",
      github: "https://github.com/asso-the-coder/synonyms-finder"
    },
    {
      title: "Gomuku Bot",
      blurb: "Single or dual player Gomuku (a Japanese board game) terminal game. Created with a partner for a university programming course.",
      tags: ["Python"],
      image: "assets/projects/gomoku.jpg",
      github: "https://github.com/asso-the-coder/gomoku-bot",
    },
    {
      title: "File Transfer App",
      blurb: "Server and client code for a general file transfer app over UDP sockets with ACKs and timeouts.",
      tags: ["C", "UDP"],
      image: "assets/projects/files.jpg",
      github: "https://github.com/asso-the-coder/file-transfer-udp",
    },
    /* Hidden for now — re-enable by uncommenting.
    {
      title: "WhatsUp Instant Messaging",
      blurb: "Server and client code for a WhatsApp-style multi-user text conferencing app over TCP sockets.",
      tags: ["C", "TCP"],
      image: "assets/projects/whatsup.jpg",
      github: "https://github.com/asso-the-coder/whatsup-conferencing",
    },
    */
  ],

  experience: [
    {
      org: "Hiroshi Ishiguro Labs",
      date: "May 2026 — Aug 2026",
      role: "Robotics Researcher",
      bullets: [
        "Built a non-invasive benchmarking framework using realtime traffic capture and voice activity detection",
        "Decreased system response time by 44% through voice synthesis redesign, LLM inference-stage tuning, and data pipeline optimization",
        "Trained voice models to improve the robot's perceived MOS naturalness by 31%"
      ]
    },
    {
      org: "Tesla",
      date: "Sep 2024 — Dec 2024",
      role: "Low Voltage Test & Automation Intern",
      bullets: [
        "Created C drivers for port-mapped I/O devices and integrated into a Python app via shared objects.",
        "Built CAN-FD routines using PCAN-Pro and UDS APIs; designed and brought up AFE + high-side drive PCBA with NI DAQs.",
        "Built a ResNet/OpenCV model to detect vehicle features (99.01% accuracy) for production line checks."
      ]
    },
    {
      org: "Tesla",
      date: "May 2024 — Aug 2024",
      role: "Electronics Design Engineering Intern",
      bullets: [
        "Owned MCU signal flow architecture for a next-gen Supercharger main controller PCB.",
        "Designed logic in Altium and a high-voltage interrupt loop with timing analysis.",
        "Ran 1000BASE-T1 PAM3 Ethernet signal integrity tests by quantifying packet error rates on a Linux SoC."
      ]
    },
    {
      org: "Kepler Communications",
      date: "Sep 2023 — Apr 2024",
      role: "Power Systems Engineering Intern",
      bullets: [
        "Verified Battery Management System's safety logic, control loops, UART buses, and cell voltage monitoring by building a hardware-in-the-loop test suite with a custom PCBA and Raspberry Pi.",
        "Used multithreading for telemetry acquisition (with SMBus library for I2C) and safety controls for a 1.6 kiloWatt system.",
        "Designed a snubbed, transformer-based isolated flyback converter, DACs, EEPROMs, communication buses, and more."
      ]
    },
    {
      org: "Pulsenics",
      date: "Jun 2023 — Sep 2023",
      role: "Firmware QA Intern",
      bullets: [
        "Developed a PID controller in C for a PFC/DAB power system using TI tooling and Cortex-M MCUs.",
        "Wrote ISRs in C for sensor qualification and ADC configuration.",
        "Designed a PoE switch for 1000BASE-T Ethernet communications."
      ]
    },
    {
      org: "University of Toronto Formula Racing",
      date: "Sep 2021 — Sep 2023",
      role: "Controllers Lead",
      bullets: [
        "Designed several custom PCBs with Altium Designer for powertrain integration, including differential I2C and CAN bus communications to an isolated 600V accumulator, and internal power distribution using SMPS, LDOs, and eFuses.",
        "Implemented communication across major embedded protocols including CAN, I2C, SPI, and UART.",
        "Debugged integrated circuits and PCBs with oscilloscopes, logic analyzers, e-loads, digital multimeters, and function generators in preparation for highly successful racing competitions in Germany and the USA.",
        "Integrated sensors including thermistors, pressure transducers, tachometers, and Hall-effect wheel speed sensors.",
        "Programmed Teensy 4.1 microcontrollers for 1-Mbps CAN communication using the FlexCAN library, and used PCAN Explorer for debugging.",
        "Created project management workflows, helped orchestrate key vehicle architecture decisions, and secured over $90,000 of in-kind sponsorships.",
        "Mentored junior members on electrical engineering principles, Altium Designer through a lecture series, and Arduino IDE development."
      ]
    },
    {
      org: "Center for Advanced Diffusion-Wave and Photoacoustic Technologies",
      date: "May 2022 — Aug 2022",
      role: "Biomedical Imaging Software Researcher",
      bullets: [
        "Co-authored a paper on MATLAB-based image processing algorithms I developed for analyzing biological tissues using a novel thermophotonic biomedical imaging technique, eTC-PCT, published in a 14.1 impact factor journal."
      ]
    },
  ],

  skills: [
    "C", "C++", "Python", "Verilog", "Assembly",
    "FreeRTOS", "GTest", "OpenCV", "PyTorch", "ROS2",
    "CAN / CAN-FD", "SPI / Quad SPI", "I2C / SMBus", "UART", "Ethernet",
    "Linux", "CMake", "Git", "Altium", "MATLAB",
    "C#", ".NET 8", "PyAudio", "ElevenLabs", "GPT", "Azure", "RAG"
  ]
};
