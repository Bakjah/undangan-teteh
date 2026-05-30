import { useState, useEffect, useRef } from 'react';

function App() {
  const [isOpened, setIsOpened] = useState(false);
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

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

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
  }, [isOpened]);

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

  if (!isOpened) {
    return (
      <div className="cover-overlay">
        <div className="aurora-bg"></div>
        <div className="cover-content">
          <div className="cover-ornament">&#10022;</div>
          <p className="cover-invitation">UNDANGAN Pernikahan</p>
          <h1 className="cover-names">Meylisa & Rizky</h1>
          <p className="cover-date">20 Juni 2025</p>
          <div className="cover-ornament">&#10022;</div>
          <button className="cover-button" onClick={() => setIsOpened(true)}>
            <i className="fas fa-envelope"></i>
            Buka Undangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-app">
      <div className="aurora-bg"></div>

      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('couple')} className="nav-link">Pasangan</button>
            <button onClick={() => scrollToSection('timeline')} className="nav-link">Timeline</button>
            <button onClick={() => scrollToSection('events')} className="nav-link">Acara</button>
            <button onClick={() => scrollToSection('gallery')} className="nav-link">Galeri</button>
            <button onClick={() => scrollToSection('rsvp')} className="nav-link">RSVP</button>
          </div>
        </div>
      </nav>

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
            <div className="couple-avatar female">
              <i className="fas fa-user"></i>
            </div>
            <h3 className="couple-name">Meylisa Amelia</h3>
            <p className="couple-role">Putri pertama dari</p>
            <p className="couple-parents">Bpk. Hasan & Ibu Suryani</p>
            <div className="couple-social">
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="couple-heart scroll-reveal">
            <i className="fas fa-heart"></i>
          </div>
          <div className="couple-card scroll-reveal">
            <div className="couple-avatar male">
              <i className="fas fa-user"></i>
            </div>
            <h3 className="couple-name">Rizky Pratama</h3>
            <p className="couple-role">Putra pertama dari</p>
            <p className="couple-parents">Bpk. Wijaya & Ibukartini</p>
            <div className="couple-social">
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
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
            <div className="timeline-marker">
              <i className="fas fa-heart"></i>
            </div>
            <div className="timeline-content">
              <span className="timeline-year">2020</span>
              <h4>Pertama Bertemu</h4>
              <p>Awal cerita kami dimulai di sebuah kafe kecil di Jakarta</p>
            </div>
          </div>
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker">
              <i className="fas fa-coffee"></i>
            </div>
            <div className="timeline-content">
              <span className="timeline-year">2021</span>
              <h4>Jadi Pasangan</h4>
              <p>Mulai menjalani hubungan spesial sebagai sepasang kekasih</p>
            </div>
          </div>
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker">
              <i className="fas fa-ring"></i>
            </div>
            <div className="timeline-content">
              <span className="timeline-year">2024</span>
              <h4>Melamar</h4>
              <p>Dengan penuh keberanian, Rizky melamar Meylisa</p>
            </div>
          </div>
          <div className="timeline-item scroll-reveal">
            <div className="timeline-marker">
              <i className="fas fa-church"></i>
            </div>
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
            <div className="event-icon">
              <i className="fas fa-mosque"></i>
            </div>
            <h3>Akad Nikah</h3>
            <p className="event-date">20 Juni 2025</p>
            <p className="event-time">10:00 - 12:00 WIB</p>
            <p className="event-location">
              <i className="fas fa-map-marker-alt"></i>
              Masjid Al-Hidayah, Jakarta
            </p>
          </div>
          <div className="event-card scroll-reveal">
            <div className="event-icon">
              <i className="fas fa-glass-cheers"></i>
            </div>
            <h3>Resepsi</h3>
            <p className="event-date">20 Juni 2025</p>
            <p className="event-time">18:00 - 22:00 WIB</p>
            <p className="event-location">
              <i className="fas fa-map-marker-alt"></i>
              Gedung Pertemuan Graha, Jakarta
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <h2 className="section-title scroll-reveal">Galeri</h2>
        <p className="section-subtitle scroll-reveal">Momen berharga kami</p>
        <div className="gallery-grid">
          <div className="gallery-item large scroll-reveal">
            <div className="gallery-placeholder">
              <i className="fas fa-image"></i>
              <span>Pre-wedding 1</span>
            </div>
          </div>
          <div className="gallery-item scroll-reveal">
            <div className="gallery-placeholder">
              <i className="fas fa-image"></i>
              <span>Pre-wedding 2</span>
            </div>
          </div>
          <div className="gallery-item scroll-reveal">
            <div className="gallery-placeholder">
              <i className="fas fa-image"></i>
              <span>Pre-wedding 3</span>
            </div>
          </div>
          <div className="gallery-item scroll-reveal">
            <div className="gallery-placeholder">
              <i className="fas fa-image"></i>
              <span>Pre-wedding 4</span>
            </div>
          </div>
          <div className="gallery-item scroll-reveal">
            <div className="gallery-placeholder">
              <i className="fas fa-image"></i>
              <span>Pre-wedding 5</span>
            </div>
          </div>
          <div className="gallery-item large scroll-reveal">
            <div className="gallery-placeholder">
              <i className="fas fa-image"></i>
              <span>Pre-wedding 6</span>
            </div>
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
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            <div className="form-group">
              <label>Konfirmasi Kehadiran</label>
              <select
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: e.target.value})}
              >
                <option value="Hadir">Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Masih Ragu">Masih Ragu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pesan & Doa</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Tuliskan pesan dan doa terbaik Anda..."
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              <i className="fas fa-paper-plane"></i>
              Kirim Ucapan
            </button>
          </form>
        </div>

        <div className="wishes-list">
          <h3 className="wishes-title scroll-reveal">Ucapan & Doa</h3>
          {wishes.map((wish, index) => (
            <div key={wish.id} className="wish-card scroll-reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="wish-header">
                <div className="wish-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="wish-info">
                  <h4>{wish.name}</h4>
                  <span className="wish-date">{wish.date}</span>
                </div>
                <span className={`wish-attendance attendance-${wish.attendance.toLowerCase().replace(/ /g, '-')}`}>
                  {wish.attendance}
                </span>
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
            <div className="gift-icon">
              <i className="fas fa-university"></i>
            </div>
            <h3>Bank BCA</h3>
            <p className="gift-number">123-456-7890</p>
            <p className="gift-holder">a.n. Meylisa Amelia</p>
            <button className="copy-button" onClick={() => navigator.clipboard.writeText('1234567890')}>
              <i className="fas fa-copy"></i> Salin
            </button>
          </div>
          <div className="gift-card scroll-reveal">
            <div className="gift-icon">
              <i className="fas fa-university"></i>
            </div>
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
        <p className="footer-message">
          Merupakan kehormatan dan kebahagiaan bagi kami<br />
          apabila Anda berkenan hadir untuk memberikan doa restu
        </p>
        <div className="footer-hearts">
          <i className="fas fa-heart"></i>
          <i className="fas fa-heart"></i>
          <i className="fas fa-heart"></i>
        </div>
        <p className="footer-copyright">
          Created with <i className="fas fa-heart"></i> for Meylisa & Rizky
        </p>
      </footer>
    </div>
  );
}

export default App;