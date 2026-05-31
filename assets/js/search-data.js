// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Embedded systems, robotics, and computer-vision projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Live cohorts, 1:1 mentoring, and code review in Python and DevOps — delivered through didakta.automato.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "nav-vision-amp-venture",
          title: "Vision &amp; Venture",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/vision/";
          },
        },{id: "dropdown-cv",
              title: "CV",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/cv/";
              },
            },{id: "dropdown-repositories",
              title: "repositories",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/repositories/";
              },
            },{id: "news-resurrected-my-delta-robot-parallel-manipulator-project-the-code-is-live-on-github-back-at-it-with-my-collaborator-armando-rodriguez-who-nudged-me-to-pick-it-up-again-robot",
          title: 'Resurrected my Delta robot parallel manipulator project — the code is live on...',
          description: "",
          section: "News",},{id: "projects-delta-robot-parallel-manipulator",
          title: 'Delta robot parallel manipulator',
          description: "3-DOF parallel manipulator simulated in ROS 2 Jazzy with RViz and a browser dashboard",
          section: "Projects",handler: () => {
              window.location.href = "/projects/01_delta_robot/";
            },},{id: "projects-hostile-zone-rescue-robot-with-slam",
          title: 'Hostile-zone rescue robot with SLAM',
          description: "Mobile robot for detection of a closed environment using SLAM",
          section: "Projects",handler: () => {
              window.location.href = "/projects/02_slam_rescue_robot/";
            },},{id: "projects-mexican-sign-language-recognition-opencv-keras",
          title: 'Mexican Sign Language recognition (OpenCV + Keras)',
          description: "Real-time recognition of the LSM hand-sign alphabet from a webcam",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03_sign_language_cv/";
            },},{id: "projects-furuta-self-balancing-pendulum",
          title: 'Furuta self-balancing pendulum',
          description: "PID-stabilized inverted pendulum on Arduino",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04_furuta_pendulum/";
            },},{id: "projects-pomulator-verizon-connect",
          title: 'Pomulator — Verizon Connect',
          description: "Embedded system to emulate car trips for high-level testing",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05_verizon_pomulator/";
            },},{id: "projects-body-control-module-diagnostics-continental",
          title: 'Body Control Module diagnostics — Continental',
          description: "Diagnostics modules in a car BCM real-time system",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06_continental_bcm/";
            },},{id: "projects-bare-metal-stm32-driver-development",
          title: 'Bare-metal STM32 driver development',
          description: "Register-level GPIO, UART, and display drivers — no HAL",
          section: "Projects",handler: () => {
              window.location.href = "/projects/07_stm32_baremetal/";
            },},{id: "projects-billy-mouth-animatronic-text-to-speech",
          title: 'Billy Mouth — animatronic text-to-speech',
          description: "Self text-to-speech-to-movements system driving an animatronic",
          section: "Projects",handler: () => {
              window.location.href = "/projects/08_billy_mouth_animatronic/";
            },},{id: "teachings-python-for-devops",
          title: 'Python for DevOps',
          description: "Hands-on 12-week course covering Python tooling for automation, infrastructure, and CI/CD.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/python-for-devops/";
            },},{id: "teachings-live-python-dev-course-july-2026-cohort-2-months",
          title: 'Live Python Dev Course — July 2026 Cohort (2 months)',
          description: "2-month live weekly Python development course launching July 2026. $500/seat.",
          section: "Teachings",handler: () => {
              window.location.href = "/teaching/weekly-live-july-2026/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/alexander_gomez_cv.pdf", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/alexandergmzx", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/alexandergmzx", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
