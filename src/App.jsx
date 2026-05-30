import { useState, useEffect } from 'react';

// Check if mobile device
const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth <= 768;
};

// Hook to detect reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

// Floating Hearts Effect
const FloatingHearts = ({ trigger }) => {
  const prefersReducedMotion = useReducedMotion();
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Don't show floating hearts if reduced motion is preferred
    if (!trigger || prefersReducedMotion) return;

    const newHearts = [];
    // Reduce particle count on mobile for better performance
    const count = isMobile() ? 20 : 40;
    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        startDelay: Math.random() * 1,
        duration: 2 + Math.random() * 3,
        size: 15 + Math.random() * 25,
        color: Math.random() > 0.5 ? '#B76E79' : '#D4AF37',
        drift: Math.random() * 150 - 75,
        rotation: Math.random() * 360,
      });
    }
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 5000);
  }, [trigger, prefersReducedMotion]);

  if (!trigger || hearts.length === 0) return null;

  return (
    <div className="floating-hearts-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.startDelay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            '--drift': `${heart.drift}px`,
            '--rotation': `${heart.rotation}deg`,
          }}
        >
          <i className="fas fa-heart"></i>
        </div>
      ))}
    </div>
  );
};

// Sakura Petal Component
const SakuraPetals = () => {
  const prefersReducedMotion = useReducedMotion();
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const createPetal = () => {
      const petal = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 6,
        size: 12 + Math.random() * 12,
        rotation: Math.random() * 360,
        drift: Math.random() * 100 - 50,
      };
      setPetals(prev => [...prev, petal]);

      setTimeout(() => {
        setPetals(prev => prev.filter(p => p.id !== petal.id));
      }, (petal.delay + petal.duration) * 1000);
    };

    for (let i = 0; i < 3; i++) {
      setTimeout(() => createPetal(), i * 2000);
    }

    // Reduce petal generation on mobile
    const intervalTime = isMobile() ? 6000 : 4000;

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        createPetal();
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="sakura-container">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            '--drift': `${petal.drift}px`,
            '--rotation': `${petal.rotation}deg`,
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 Q65 25 50 50 Q35 25 50 5" fill="rgba(255, 182, 193, 0.8)" />
            <path d="M50 5 Q65 25 50 50 Q35 25 50 5" fill="rgba(255, 192, 203, 0.6)" transform="rotate(72 50 50)" />
            <path d="M50 5 Q65 25 50 50 Q35 25 50 5" fill="rgba(255, 218, 233, 0.7)" transform="rotate(144 50 50)" />
            <path d="M50 5 Q65 25 50 50 Q35 25 50 5" fill="rgba(255, 182, 193, 0.5)" transform="rotate(216 50 50)" />
            <path d="M50 5 Q65 25 50 50 Q35 25 50 5" fill="rgba(255, 192, 203, 0.6)" transform="rotate(288 50 50)" />
            <circle cx="50" cy="50" r="6" fill="rgba(255, 255, 255, 0.9)" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Sparkle Effect
const Sparkles = ({ show }) => {
  const prefersReducedMotion = useReducedMotion();
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Don't show sparkles if reduced motion is preferred
    if (!show || prefersReducedMotion) return;

    const newSparkles = [];
    // Reduce sparkle count on mobile for better performance
    const count = isMobile() ? 25 : 50;
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 1,
        duration: 0.8 + Math.random() * 0.8,
        size: 3 + Math.random() * 5,
      });
    }
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2000);
  }, [show, prefersReducedMotion]);

  if (!show || sparkles.length === 0) return null;

  return (
    <div className="sparkles-container">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

// Template Photos
const TEMPLATE_PHOTOS = {
  female: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
  ],
  male: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  ],
  prewedding: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529636798458-92182e66248a?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-fa222c1ae5c8?w=600&h=400&fit=crop",
  ]
};

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpened, setIsOpened] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showEffects, setShowEffects] = useState(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const [bridePhoto, setBridePhoto] = useState(TEMPLATE_PHOTOS.female[0]);
  const [groomPhoto, setGroomPhoto] = useState(TEMPLATE_PHOTOS.male[0]);
  const [galleryPhotos, setGalleryPhotos] = useState(TEMPLATE_PHOTOS.prewedding.slice(0, 6));
  const [timeLeft, setTimeLeft] = useState({});
  const [formData, setFormData] = useState({ name: '', attendance: 'Hadir', message: '' });
  const [wishes, setWishes] = useState([
    { id: 1, name: 'Siti Rahayu', message: 'Selamat married ya! Semoga sakinah mawaddah warahmah.', date: '15 Jun 2025', attendance: 'Hadir' },
    { id: 2, name: 'Budi Santoso', message: 'Happy wedding Meylisa & Rizky! Semoga menjadi keluarga yang bahagia selalu.', date: '14 Jun 2025', attendance: 'Hadir' },
    { id: 3, name: 'Dewi Lestari', message: 'Semoga lancar sampai hari H ya! Congrats couple!', date: '13 Jun 2025', attendance: 'Hadir' },
  ]);

  const weddingDate = new Date('2025-06-20T10:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, show all elements immediately
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('reveal-active');
      });
      return;
    }

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        } else {
          entry.target.classList.remove('reveal-active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showContent, prefersReducedMotion]);

  const handleOpenInvitation = () => {
    setShowEffects(true);
    setShowFloatingHearts(true);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsOpened(true);
    }, 1000);

    setTimeout(() => {
      setShowContent(true);
      setIsTransitioning(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      const newWish = {
        id: Date.now(),
        name: formData.name,
        message: formData.message,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        attendance: formData.attendance,
      };
      setWishes([newWish, ...wishes]);
      setFormData({ name: '', attendance: 'Hadir', message: '' });
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const shuffleGallery = () => {
    const shuffled = [...TEMPLATE_PHOTOS.prewedding].sort(() => Math.random() - 0.5);
    setGalleryPhotos(shuffled.slice(0, 6));
  };

  if (!showContent) {
    return (
      <div className={`cover-overlay ${isOpened ? 'cover-closed' : ''} ${isTransitioning ? 'cover-transitioning' : ''}`}>
        <div className="aurora-bg">
          <div className="aurora-layer"></div>
          <div className="aurora-layer"></div>
          <div className="aurora-layer"></div>
          <div className="aurora-light aurora-light-1"></div>
          <div className="aurora-light aurora-light-2"></div>
          <div className="aurora-light aurora-light-3"></div>
          <div className="aurora-light aurora-light-4"></div>
        </div>
        <SakuraPetals />
        <Sparkles show={showEffects} />
        <FloatingHearts trigger={showFloatingHearts} />
        <div className="cover-content">
          <div className="cover-ornament">&#10022;</div>
          <p className="cover-invitation">UNDANGAN Pernikahan</p>
          <h1 className="cover-names">Meylisa & Rizky</h1>
          <p className="cover-date">20 Juni 2025</p>
          <div className="cover-ornament">&#10022;</div>
          <button
            className="cover-button"
            onClick={handleOpenInvitation}
            disabled={isTransitioning}
          >
            <i className={`fas ${isTransitioning ? 'fa-heart' : 'fa-envelope'}`}></i>
            {isTransitioning ? 'Membuka...' : 'Buka Undangan'}
          </button>
        </div>
        <div className="cover-hint">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="main-app content-appear">
      <div className="aurora-bg">
        <div className="aurora-layer"></div>
        <div className="aurora-layer"></div>
        <div className="aurora-layer"></div>
        <div className="aurora-light aurora-light-1"></div>
        <div className="aurora-light aurora-light-2"></div>
        <div className="aurora-light aurora-light-3"></div>
        <div className="aurora-light aurora-light-4"></div>
      </div>
      <SakuraPetals />

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content scroll-reveal">
          <div className="hero-ornament">&#10022;</div>
          <p className="hero-invitation">Dengan Rahmat Tuhan Yang Maha Esa</p>
          <h1 className="hero-names">Meylisa & Rizky</h1>
          <p className="hero-date">20 Juni 2025</p>
          <div className="hero-ornament">&#10022;</div>
          <p className="hero-tagline">Kami Undang Anda untuk Hadir di Hari Bahagia Kami</p>
        </div>
      </section>

      {/* Countdown */}
      <section className="countdown-section">
        <h2 className="section-title scroll-reveal">Menuju Hari Bahagia</h2>
        <div className="countdown-container scroll-reveal">
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.days || 0}</span>
            <span className="countdown-label">Hari</span>
          </div>
          <span className="countdown-separator">:</span>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.hours || 0}</span>
            <span className="countdown-label">Jam</span>
          </div>
          <span className="countdown-separator">:</span>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.minutes || 0}</span>
            <span className="countdown-label">Menit</span>
          </div>
          <span className="countdown-separator">:</span>
          <div className="countdown-item">
            <span className="countdown-number">{timeLeft.seconds || 0}</span>
            <span className="countdown-label">Detik</span>
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <section id="couple" className="couple-section">
        <h2 className="section-title scroll-reveal">Mempelai</h2>
        <p className="section-subtitle scroll-reveal">Bertaut dalam cinta, terjalin dalam kasih</p>
        <div className="couple-grid">
          <div className="couple-card scroll-reveal">
            <div className="couple-photo-wrapper">
              <img src={bridePhoto} alt="Meylisa" className="couple-photo female" />
              <div className="photo-badge"><i className="fas fa-heart"></i></div>
            </div>
            <h3 className="couple-name">Meylisa Amelia</h3>
            <p className="couple-role">Putri pertama dari</p>
            <p className="couple-parents">Bpk. Hasan & Ibu Suryani</p>
            <div className="photo-selector">
              <span className="photo-label">Ganti template:</span>
              <div className="photo-options">
                {TEMPLATE_PHOTOS.female.map((photo, i) => (
                  <button
                    key={i}
                    className={`photo-option ${bridePhoto === photo ? 'active' : ''}`}
                    onClick={() => setBridePhoto(photo)}
                  >
                    <img src={photo} alt={`Template ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="couple-heart scroll-reveal">
            <i className="fas fa-heart"></i>
          </div>
          <div className="couple-card scroll-reveal">
            <div className="couple-photo-wrapper">
              <img src={groomPhoto} alt="Rizky" className="couple-photo male" />
              <div className="photo-badge"><i className="fas fa-ring"></i></div>
            </div>
            <h3 className="couple-name">Rizky Pratama</h3>
            <p className="couple-role">Putra pertama dari</p>
            <p className="couple-parents">Bpk. Wijaya & Ibukartini</p>
            <div className="photo-selector">
              <span className="photo-label">Ganti template:</span>
              <div className="photo-options">
                {TEMPLATE_PHOTOS.male.map((photo, i) => (
                  <button
                    key={i}
                    className={`photo-option ${groomPhoto === photo ? 'active' : ''}`}
                    onClick={() => setGroomPhoto(photo)}
                  >
                    <img src={photo} alt={`Template ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="timeline-section">
        <h2 className="section-title scroll-reveal">Timeline</h2>
        <p className="section-subtitle scroll-reveal">Perjalanan cinta kami</p>
        <div className="timeline">
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker"><i className="fas fa-heart"></i></div>
            <div className="timeline-content">
              <span className="timeline-year">2020</span>
              <h4>Pertama Bertemu</h4>
              <p>Awal cerita kami dimulai di sebuah kafe kecil di Jakarta</p>
            </div>
          </div>
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker"><i className="fas fa-coffee"></i></div>
            <div className="timeline-content">
              <span className="timeline-year">2021</span>
              <h4>Jadi Pasangan</h4>
              <p>Mulai menjalani hubungan spesial sebagai sepasang kekasih</p>
            </div>
          </div>
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker"><i className="fas fa-ring"></i></div>
            <div className="timeline-content">
              <span className="timeline-year">2024</span>
              <h4>Melamar</h4>
              <p>Dengan penuh keberanian, Rizky melamar Meylisa</p>
            </div>
          </div>
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker"><i className="fas fa-church"></i></div>
            <div className="timeline-content">
              <span className="timeline-year">2025</span>
              <h4>Akad & Resepsi</h4>
              <p>Saksi pernikahan kami di hari yang berbahagia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <h2 className="section-title scroll-reveal">Acara</h2>
        <p className="section-subtitle scroll-reveal">Rangkaian acara pernikahan</p>
        <div className="events-grid">
          <div className="event-card scroll-reveal">
            <div className="event-icon"><i className="fas fa-mosque"></i></div>
            <h3>Akad Nikah</h3>
            <p className="event-date">20 Juni 2025</p>
            <p className="event-time">10:00 - 12:00 WIB</p>
            <p className="event-location"><i className="fas fa-map-marker-alt"></i>Masjid Al-Hidayah, Jakarta</p>
          </div>
          <div className="event-card scroll-reveal">
            <div className="event-icon"><i className="fas fa-glass-cheers"></i></div>
            <h3>Resepsi</h3>
            <p className="event-date">20 Juni 2025</p>
            <p className="event-time">18:00 - 22:00 WIB</p>
            <p className="event-location"><i className="fas fa-map-marker-alt"></i>Gedung Pertemuan Graha, Jakarta</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <h2 className="section-title scroll-reveal">Galeri</h2>
        <p className="section-subtitle scroll-reveal">Momen berharga kami</p>
        <div className="gallery-grid">
          {galleryPhotos.map((photo, i) => (
            <div key={i} className={`gallery-item ${i === 0 || i === 5 ? 'large' : ''} scroll-reveal`}>
              <img src={photo} alt={`Pre-wedding ${i + 1}`} className="gallery-image" />
              <div className="gallery-overlay">
                <span><i className="fas fa-heart"></i> Pre-wedding {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-actions scroll-reveal">
          <button className="shuffle-button" onClick={shuffleGallery}>
            <i className="fas fa-random"></i> Acak Foto
          </button>
        </div>
        <div className="gallery-templates scroll-reveal">
          <p className="templates-label">Pilih template foto prewedding:</p>
          <div className="templates-grid">
            {TEMPLATE_PHOTOS.prewedding.map((photo, i) => (
              <button
                key={i}
                className={`template-item ${galleryPhotos.includes(photo) ? 'active' : ''}`}
                onClick={() => {
                  const newPhotos = [...galleryPhotos];
                  const idx = i % 6;
                  newPhotos[idx] = photo;
                  setGalleryPhotos(newPhotos);
                }}
              >
                <img src={photo} alt={`Template ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="rsvp-section">
        <h2 className="section-title scroll-reveal">RSVP & Ucapan</h2>
        <p className="section-subtitle scroll-reveal">Konfirmasi kehadiran Anda</p>
        <div className="rsvp-container scroll-reveal">
          <form onSubmit={handleSubmit} className="rsvp-form">
            <h3 className="form-title">Konfirmasi Kehadiran</h3>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Masukkan nama Anda" required />
            </div>
            <div className="form-group">
              <label>Konfirmasi Kehadiran</label>
              <select value={formData.attendance} onChange={(e) => setFormData({...formData, attendance: e.target.value})}>
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Masih Ragu">Masih Ragu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pesan & Doa</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tuliskan pesan dan doa terbaik Anda..." rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-button">
              <i className="fas fa-paper-plane"></i> Kirim Ucapan
            </button>
          </form>
        </div>
        <div className="wishes-list">
          <h3 className="wishes-title scroll-reveal">Ucapan & Doa</h3>
          {wishes.map((wish, index) => (
            <div key={wish.id} className="wish-card scroll-reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="wish-header">
                <div className="wish-avatar"><i className="fas fa-user"></i></div>
                <div className="wish-info">
                  <h4>{wish.name}</h4>
                  <span className="wish-date">{wish.date}</span>
                </div>
                <span className={`wish-attendance attendance-${wish.attendance.toLowerCase().replace(/ /g, '-')}`}>{wish.attendance}</span>
              </div>
              <p className="wish-message">{wish.message}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gift Section */}
      <section id="gift" className="gift-section">
        <h2 className="section-title scroll-reveal">Kirim Hadiah</h2>
        <p className="section-subtitle scroll-reveal">Doa restu Anda adalah hadiah terindah</p>
        <div className="gifts-grid">
          <div className="gift-card scroll-reveal">
            <div className="gift-icon"><i className="fas fa-university"></i></div>
            <h3>Bank BCA</h3>
            <p className="gift-number">123-456-7890</p>
            <p className="gift-holder">a.n. Meylisa Amelia</p>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText('1234567890')}>
              <i className="fas fa-copy"></i> Salin
            </button>
          </div>
          <div className="gift-card scroll-reveal">
            <div className="gift-icon"><i className="fas fa-university"></i></div>
            <h3>Bank Mandiri</h3>
            <p className="gift-number">987-654-3210</p>
            <p className="gift-holder">a.n. Rizky Pratama</p>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText('9876543210')}>
              <i className="fas fa-copy"></i> Salin
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-ornament">&#10022;</div>
        <h2 className="footer-names">Meylisa & Rizky</h2>
        <p className="footer-date">20 Juni 2025</p>
        <p className="footer-message">Merupakan kehormatan dan kebahagiaan bagi kami<br />apabila Anda berkenan hadir untuk memberikan doa restu</p>
        <div className="footer-hearts">
          <i className="fas fa-heart"></i>
          <i className="fas fa-heart"></i>
          <i className="fas fa-heart"></i>
        </div>
        <p className="footer-copyright">Created with <i className="fas fa-heart"></i> for Meylisa & Rizky</p>
      </footer>
    </div>
  );
}

export default App;