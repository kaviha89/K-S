
(() => {
  'use strict';

  const opening = document.getElementById('openingMusic');
  const memory = document.getElementById('memoryMusic');
  const openButton = document.getElementById('open');
  const memoryButton = document.getElementById('memoryPlay');
  const musicToggle = document.getElementById('musicToggle');
  const memoriesSection = document.getElementById('memories');

  let active = null;
  let fadeTimer = null;
  let memoriesInView = false;

  // Update music button labels
  function updateLabels() {
    if (memoryButton) {
      memoryButton.textContent =
        active === memory && !memory.paused
          ? '♫ Pause memories music'
          : '♫ Play memories music';
    }

    if (musicToggle) {
      musicToggle.textContent =
        active && !active.paused
          ? '♫ Pause music'
          : '♫ Music';
    }
  }

  // Play one track and stop the other
  async function playTrack(track) {
    if (!track) return;

    clearInterval(fadeTimer);

    [opening, memory].forEach(audio => {
      if (audio && audio !== track) {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
      }
    });

    track.volume = 1;
    active = track;

    try {
      await track.play();
    } catch (error) {
      // Browser autoplay restriction:
      // Guest can use the manual music button.
    }

    updateLabels();
  }

  // Fade music out smoothly
  function fadeOut(track, duration = 1200) {
    if (!track || track.paused) return;

    clearInterval(fadeTimer);

    const initialVolume = track.volume;
    const steps = 20;
    let step = 0;

    fadeTimer = setInterval(() => {
      step++;

      track.volume = Math.max(
        0,
        initialVolume * (1 - step / steps)
      );

      if (step >= steps) {
        clearInterval(fadeTimer);

        track.pause();
        track.currentTime = 0;
        track.volume = 1;

        if (active === track) {
          active = null;
        }

        updateLabels();
      }
    }, duration / steps);
  }

  // OPEN INVITATION
  if (openButton) {
    openButton.addEventListener('click', () => {
      document.getElementById('cover').hidden = true;
      document.getElementById('site').hidden = false;

      window.scrollTo(0, 0);

      // Opening music starts after guest interaction
      playTrack(opening);

      petals();
    });
  }

  // AUTOMATIC MEMORIES MUSIC
  if ('IntersectionObserver' in window && memoriesSection) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.35
        ) {
          memoriesInView = true;

          // Stop opening music and play memories music
          if (active !== memory || memory.paused) {
            playTrack(memory);
          }

        } else if (memoriesInView) {

          memoriesInView = false;

          // Fade out memories music when leaving section
          if (active === memory && !memory.paused) {
            fadeOut(memory);
          }
        }

      });

    }, {
      threshold: [0, 0.35, 0.6]
    });

    observer.observe(memoriesSection);
  }

  // MAIN MUSIC BUTTON
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {

      if (active && !active.paused) {
        active.pause();
        updateLabels();

      } else {
        playTrack(
          memoriesInView ? memory : opening
        );
      }

    });
  }

  // MANUAL MEMORIES MUSIC BUTTON
  if (memoryButton) {
    memoryButton.addEventListener('click', () => {

      if (active === memory && !memory.paused) {
        memory.pause();
        updateLabels();

      } else {
        playTrack(memory);
      }

    });
  }

  // BACK TO TOP
  const topButton = document.getElementById('top');

  if (topButton) {
    topButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // PERSONALIZED GUEST DETAILS
  const guestMap =
    typeof GUESTS !== 'undefined' ? GUESTS : {};

  const id =
    new URLSearchParams(location.search).get('guest');

  if (id && guestMap[id]) {

    const guest = guestMap[id];

    document.getElementById('guestName').textContent =
      guest.name || 'OUR FAMILY & FRIENDS';

    document.getElementById('ticketName').textContent =
      guest.name || 'Our loved one';

    document.getElementById('ticketTable').textContent =
      guest.table || 'To be confirmed';

    document.title =
      'For ' + guest.name + ' | Kavidu & Sanji';
  }

  // WEDDING COUNTDOWN
  const target =
    new Date('2027-01-20T09:30:00+05:30').getTime();

  function tick() {

    const remaining = target - Date.now();

    const countdown =
      document.getElementById('countdown');

    if (!countdown) return;

    countdown.textContent =
      remaining <= 0
        ? 'Today is our day! ♡'
        : Math.floor(remaining / 86400000) +
          ' days · ' +
          Math.floor(
            (remaining % 86400000) / 3600000
          ) +
          ' hours · ' +
          Math.floor(
            (remaining % 3600000) / 60000
          ) +
          ' minutes to go';
  }

  tick();
  setInterval(tick, 60000);

  // GOOGLE CALENDAR
  const calendar =
    document.getElementById('calendar');

  if (calendar) {

    calendar.href =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
      encodeURIComponent('Wedding of Kavidu & Sanji') +
      '&dates=20270120T040000Z/20270120T070000Z&location=' +
      encodeURIComponent(
        'Saffron Beach Hotel, Wadduwa, Sri Lanka'
      ) +
      '&details=' +
      encodeURIComponent(
        'Join us to celebrate the wedding of Kavidu & Sanji.'
      );
  }

  // FALLING FLOWER PETALS
  let petalTimer;

  function petals() {

    if (
      petalTimer ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const layer =
      document.getElementById('petals');

    if (!layer) return;

    function drop() {

      const petal =
        document.createElement('span');

      petal.className = 'petal';

      petal.style.left =
        Math.random() * 100 + 'vw';

      petal.style.setProperty(
        '--drift',
        (Math.random() * 180 - 90) + 'px'
      );

      petal.style.animationDuration =
        (7 + Math.random() * 7) + 's';

      layer.appendChild(petal);

      setTimeout(() => petal.remove(), 15000);
    }

    for (let i = 0; i < 12; i++) {
      setTimeout(drop, i * 220);
    }

    petalTimer = setInterval(drop, 850);
  }

})();
