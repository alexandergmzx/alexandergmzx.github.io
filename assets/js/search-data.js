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
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Embedded systems, robotics, and computer-vision projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Course materials, schedules, and resources for classes taught.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-about-me",
          title: "about me",
          description: "Mission, vision, maker journey, and values.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "projects-delta-robot-parallel-manipulator",
          title: 'Delta robot parallel manipulator',
          description: "3-DOF parallel manipulator with ROS2 Jazzy and real-time motion control",
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
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/alexander_gomez_cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6C%65%78%61%6E%64%65%72.%67%6F%6D%65%7A.%63%6F%6E%74%61%63%74@%67%6D%61%69%6C.%63%6F%6D", "_blank");
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
