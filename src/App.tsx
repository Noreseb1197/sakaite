 "use client";

import "./App.css";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Menu, X } from "lucide-react";
import {motion, AnimatePresence, stagger} from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Auto-import Logo, Hero, Gallery, Room Images
const LogoSrc = () => {
  const modules: Record<string, { default: string }> = import.meta.glob(
    "./assets/logo/*",
    { eager: true }
  );
  return Object.keys(modules).map((key, index) => ({
    id: index + 1,
    img: modules[key].default,
  }));
};

const importRooms = () => {
  const modules: Record<string, { default: string }> = import.meta.glob(
    "./assets/room-gallery/*",
    { eager: true }
  );

  const roomData = [
    {
      name: "Family Suite",
      description: "Spacious and comfortable, perfect for families.",
      price: 120,
    },
    {
      name: "Couple Retreat",
      description: "A cozy and romantic space for two.",
      price: 90,
    },
    {
      name: "Single Comfort",
      description: "Compact and budget-friendly.",
      price: 60,
    },
  ];
  return Object.keys(modules).map((key, index) => ({
    id: index + 1,
    img: modules[key].default,
    ...roomData[index % roomData.length],
  }));
};

const importHero = () => {
  const modules: Record<string, { default: string }> = import.meta.glob(
    "./assets/hero/*",
    { eager: true }
  );
  return Object.keys(modules).map((key, index) => ({
    id: index + 1,
    img: modules[key].default,
  }));
};

const importGallery = () => {
  const modules: Record<string, { default: string }> = import.meta.glob(
    "./assets/gallery/*",
    { eager: true }
  );
  return Object.keys(modules).map((key, index) => ({
    id: index + 1,
    img: modules[key].default,
  }));
};

function Navbar() {

  const [logoImg, setLogoImg] = useState<{ img: string } | null>(null);

  useEffect(() => {
    const images = LogoSrc();
    if (images.length > 0) {
      setLogoImg(images[0]);
    }
  }, []);

  const [open, setOpen] = useState(false);
  const links = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "gallery", label: "Gallery" },
    { id: "room-gallery", label: "Rooms" },
    { id: "contact", label: "Contact" },
    { id: "location", label: "Location" },
  ];

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {logoImg && (
              <motion.img
                src={logoImg?.img}
                alt="Sakaite's Logo"
                className="w-12 h-12 rounded-md object-contain shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
              />
            )}
            <div>
              <div className="text-lg font-semibold text-slate-100">
                Sakaite
              </div>
              <div className="text-xs text-slate-400">
                Self-catering Guesthouse
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="hover:text-blue-400 transition"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md hover:bg-slate-800"
            >
              {open ? (
                <X className="w-6 h-6 text-slate-100" />
              ) : (
                <Menu className="w-6 h-6 text-slate-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-slate-900 px-4 pt-2 pb-4 border-t border-slate-800"
          >
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  className="text-left w-full py-2 hover:text-blue-400 text-slate-200"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ----------------- Hero -----------------
function Hero() {
  const [heroImage, setHeroImage] = useState<{ img: string } | null>(null);

  useEffect(() => {
    const images = importHero();
    if (images.length > 0) {
      setHeroImage(images[0]);
    }
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex items-center bg-slate-900 relative overflow-hidden font-sans"
    >
      {/* Background Image */}
      {heroImage && (
        <motion.img
          src={heroImage?.img}
          alt="Sakaite Guesthouse"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        />
      )}

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text and Buttons */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="md:text-left text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-md"
            >
              Discover Comfort at <br />
              <span className="text-teal-400">Sakaite Guesthouse</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl text-slate-950 max-w-xl mx-auto md:mx-0 font-light drop-shadow"
            >
              Your home away from home in the heart of Kamanjab, Namibia.
              Experience local hospitality and a peaceful stay.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-center md:justify-start gap-4"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("room-gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 bg-teal-400 text-slate-900 px-6 py-3 rounded-full shadow-lg font-bold hover:bg-teal-300 transition-colors duration-300 transform hover:scale-105"
              >
                View Rooms
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-colors duration-300 transform hover:scale-105"
              >
                Book Your Stay
              </button>
            </motion.div>
          </motion.div>

          {/* Empty column for visual balance on desktop */}
          <div className="hidden md:block"></div>
        </div>
      </div>
    </section>
  );
}

// ----------------- About -----------------
function About() {
  return (
    <section id="about" className="bg-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Discover Sakaite
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-slate-200 leading-relaxed"
        >
          Welcome to **Sakaite Self-catering Guesthouse**, where Namibian
          hospitality meets the tranquility of home. Nestled in the heart of our
          vibrant community, we offer a peaceful escape for families and
          adventurers alike. Our thoughtfully appointed, self-catering rooms
          provide the perfect base for you to unwind after a day of exploring
          Namibia’s breathtaking landscapes. We pride ourselves on offering a
          warm, local touch, ensuring your stay is not just a visit but a
          memorable experience filled with comfort, independence, and the
          authentic spirit of our region.
        </motion.p>
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://www.facebook.com/p/Sakaite-Selfcatering-Guesthouse-Kamanjab-100063496256750/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit us on Facebook"
            className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
          >
            <FaFacebook className="w-8 h-8" />
          </a>
          <a
            href="https://www.instagram.com/explore/locations/2542494375975667/sakaite-selfcatering-guesthouse-kamanjab/?next=%2Fhadassafem%2Ftagged%2F"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit us on Instagram"
            className="text-slate-400 hover:text-pink-400 transition-colors duration-300"
          >
            <FaInstagram className="w-8 h-8" />
          </a>
          <a
            href="https://wa.me/+264814211392"
            target="_blank"
            rel="noreferrer"
            aria-label="Contact us on WhatsApp"
            className="text-slate-400 hover:text-green-400 transition-colors duration-300"
          >
            <FaWhatsapp className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ----------------- Entertainment Gallery --------------

function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);
  const galleryItems = importGallery();
  return (
    <section id="gallery" className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h3
          className="text-3xl font-bold text-center text-slate-900 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Entertainment Center
        </motion.h3>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { delayChildren: stagger(0.08) } } }}
        >
          {galleryItems.map((it) => (
            <motion.figure
              key={it.id}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(it.img)}
            >
              <img
                src={it.img}
                alt={`Gallery item ${it.id}`}
                className="w-full h-56 object-cover"
              />
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selected}
              alt="preview"
              className="max-w-[92%] max-h-[86%] rounded-lg shadow-2xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ----------------- RoomGallery -----------------
function RoomGallery() {
  const roomItems = importRooms();

  return (
    <section
      id="room-gallery"
      className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-bold text-center text-white mb-8"
        >
          Room Gallery
        </motion.h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {roomItems.map((r) => (
            <motion.div
              key={r.id}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg overflow-hidden shadow-lg bg-slate-800"
            >
              <img
                src={r.img}
                alt={r.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h4 className="font-semibold text-white">{r.name}</h4>
                <p className="text-sm text-slate-400">{r.description}</p>
                <p className="text-blue-400 font-bold mt-2">
                  ${r.price} / night
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------- Contact Form -----------------
function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("🎉 Booking sent successfully!");
        form.reset();
      } else {
        toast.error("🚫 Something went wrong. Try again.");
      }
    } catch {
      toast.error("❌ Network error. Try again later.");
    }
  };

  return (
    <div id="contact" className="max-w-2xl mx-auto px-4 py-10">
      <Toaster />
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Book Your Room
      </h2>

      {submitted && (
        <div className="text-green-400 text-center font-medium mb-4">
          ✅ Thank you! Your request has been received.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-800  shadow-lg p-6 rounded-xl transition-all duration-500"
      >
        {/* Full Name */}
        <AnimatedInput label="Full Name" name="fullName"  type="text" required />

        {/* Phone Number */}
        <AnimatedInput
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          required
        />

        {/* Email */}
        <AnimatedInput
          label="Email Address"
          name="email"
          type="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />

        {/* Room Type Dropdown */}
        <div className="transition-all duration-300">
          <label
            htmlFor="roomType"
            className="block text-sm font-semibold text-slate-300 mb-1"
          >
            Room Type
          </label>
          <select
            name="roomType"
            id="roomType"
            required
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Room Type</option>
            <option value="Single">Single Room</option>
            <option value="Double">Double Room</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        {/* Check-in */}
        <AnimatedInput
          label="Check-in Date"
          name="check_in"
          type="date"
          required
        />

        {/* Check-out */}
        <AnimatedInput
          label="Check-out Date"
          name="check_out"
          type="date"
          required
        />

        {/* Message */}
        <div className="transition-all duration-300">
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-slate-300 mb-1"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            placeholder="Optional notes (e.g. check-in time, special needs)"
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}

type InputProps = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  pattern?: string;
};

const AnimatedInput: React.FC<InputProps> = ({
  label,
  name,
  type,
  required,
  pattern,
}) => {
  return (
    <div className="relative transition-all duration-300 group">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        pattern={pattern}
        className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
};

// ----------------- Location -----------------
function Location() {
  const handleClick = () => {
    if (!("geolocation" in navigator)) {
      alert(
        "Geolocation is not supported by your browser. Please use a modern browser to get directions."
      );
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "denied") {
          alert(
            "Location access is denied. Please enable location services in your browser settings to get directions."
          );
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://www.google.com/maps/dir/${latitude},${longitude}/Sakaite+Self+Catering+Guesthouse,+Kamanjab,+Namibia`;
            // Create a temporary anchor element and trigger a click
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
          () => {
            alert(
              "Unable to retrieve your location. Please try again or check your device settings."
            );
          }
        );
      })
      .catch(() => {
        alert("An error occurred while checking location permissions.");
      });
  };

  return (
    <section
      id="location"
      className="bg-slate-900 py-12 px-4 sm:px-6 lg:px-8"
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Our Location
        </motion.h3>
        <p className="text-slate-200 mb-6">
          Sakaite is located in the heart of Kamanjab, Namibia — easily
          accessible and close to local attractions. Click anywhere in this
          section to get directions from your current location! 🗺️
        </p>

        <div className="rounded-xl overflow-hidden shadow border border-slate-800">
          <iframe
            title="Sakaite Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1441.208669136674!2d14.844756292547327!3d-19.626815590016545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1b8e63ea05231717%3A0x2bcb13e84753c1bf!2sSakaite%20Self%20Catering%20Guesthouse!5e0!3m2!1sen!2sna!4v1754864409678!5m2!1sen!2sna"
            width="100%"
            height={350}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

// ----------------- Footer -----------------
function Footer() {
  const [BrandLogo, setBrandLogo] = useState<{ img: string } | null>(null);
  useEffect(() => {
    const images = LogoSrc();
    if (images.length > 0) {
      setBrandLogo(images[0]);
    }
  }, []);
  return (
    <footer className="bg-slate-900 text-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          {BrandLogo && (
            <motion.div>
              <motion.img
                src={BrandLogo?.img}
                alt="Sakaite Logo"
                className="w-12 h-12 object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
              />
            </motion.div>
          )}

          <div>
            <div className="font-bold text-xl text-white">
              Sakaite Guesthouse
            </div>
            <div className="text-sm text-slate-400 mt-1">Kamanjab, Namibia</div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/p/Sakaite-Selfcatering-Guesthouse-Kamanjab-100063496256750/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Sakaite on Facebook"
            className="text-slate-400 hover:text-blue-500 transition-colors duration-300"
          >
            <FaFacebook className="w-7 h-7" />
          </a>
          <a
            href="https://www.instagram.com/explore/locations/2542494375975667/sakaite-selfcatering-guesthouse-kamanjab/?next=%2Fhadassafem%2Ftagged%2F"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Sakaite on Instagram"
            className="text-slate-400 hover:text-pink-500 transition-colors duration-300"
          >
            <FaInstagram className="w-7 h-7" />
          </a>
          <a
            href="https://wa.me/+264814211392"
            target="_blank"
            rel="noreferrer"
            aria-label="Contact Sakaite on WhatsApp"
            className="text-slate-400 hover:text-green-500 transition-colors duration-300"
          >
            <FaWhatsapp className="w-7 h-7" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} Sakaite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
// ----------------- Combined App -----------------
export default function App() {
  return (
    <div className="font-sans bg-slate-950 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <RoomGallery />
        <ContactForm />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
