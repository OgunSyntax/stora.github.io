/* ============================================================
   Stora Landing Page — interactions
   No framework, no build step. The setup walkthrough video is
   served locally from the video folder.
   ============================================================ */

(function () {
  'use strict';

  const VIDEO_SOURCE = 'video/Stora%20setup.mp4';

  function initVideo() {
    const frame = document.querySelector('[data-video-frame]');
    if (!frame) return;

    const placeholder = frame.querySelector('[data-video-placeholder]');
    if (!placeholder) return;

    if (!VIDEO_SOURCE) {
      placeholder.setAttribute('aria-disabled', 'true');
      return;
    }

    placeholder.setAttribute('role', 'button');
    placeholder.setAttribute('tabindex', '0');
    placeholder.setAttribute('aria-label', 'Play the Stora setup walkthrough');

    const loadVideo = () => {
      const video = document.createElement('video');
      video.className = 'video-frame__embed';
      video.src = VIDEO_SOURCE;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.title = 'Stora setup walkthrough';
      frame.innerHTML = '';
      frame.appendChild(video);
    };

    placeholder.addEventListener('click', loadVideo);
    placeholder.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadVideo();
      }
    });
  }

  function initNavShadow() {
    const nav = document.querySelector('[data-landing-nav]');
    if (!nav) return;
    const onScroll = () => {
      nav.style.boxShadow = window.scrollY > 4 ? '0 1px 0 rgba(17,17,17,0.04)' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

   function initNavToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const links = document.querySelector('[data-nav-links]');
    if (!toggle || !links) return;

    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // close on link tap
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // close on outside click
    document.addEventListener('click', (e) => {
      if (!links.classList.contains('is-open')) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initVideo();
    initNavShadow();
    initNavToggle();
  });
})();
