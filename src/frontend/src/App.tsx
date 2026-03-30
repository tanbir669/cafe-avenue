import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Star,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  {
    src: "/assets/uploads/unnamed_7-019d3d37-8443-77dd-8a34-41da5a173834-1.jpg",
    caption: "Delicious Noodle Dishes",
  },
  {
    src: "/assets/uploads/unnamed_6-019d3d37-843c-7640-8794-e24bdf598637-2.jpg",
    caption: "Warm & Inviting Ambiance",
  },
  {
    src: "/assets/uploads/unnamed_8-019d3d45-f83d-74db-90a5-d541608112b5-1.jpg",
    caption: "Artisan Cappuccino",
  },
  {
    src: "/assets/uploads/unnamed_4-019d3d37-84fa-7149-bd18-0da95a69d7b4-4.jpg",
    caption: "Chocolate Ice Cream Sundae",
  },
  {
    src: "/assets/uploads/unnamed_5-019d3d37-85a0-7307-be36-4acdd45a65cb-5.jpg",
    caption: "Our Menu",
  },
  {
    src: "/assets/uploads/unnamed_3-019d3d37-860d-7292-86d1-64dca72b08a3-6.jpg",
    caption: "Indulgent Milkshakes",
  },
  {
    src: "/assets/uploads/unnamed_1-019d3d37-8686-75c7-9df7-bee6ae8dfdcc-7.jpg",
    caption: "Avenue Plaza — Our Home",
  },
];

const MENU_CATEGORIES = [
  {
    name: "Sandwiches",
    emoji: "🥪",
    items: [
      { name: "Veg Sandwich", price: "₹70" },
      { name: "Chicken Club Sandwich", price: "₹170" },
      { name: "Fish Sandwich", price: "₹200" },
    ],
  },
  {
    name: "Fresh Made Specials",
    emoji: "🌯",
    items: [
      { name: "Classic Veg Wrap", price: "₹120" },
      { name: "Chicken Mayo Wrap", price: "₹150" },
    ],
  },
  {
    name: "All Time Nutritious",
    emoji: "🍳",
    items: [
      { name: "French Toast", price: "₹100" },
      { name: "Chicken Omelette", price: "₹150" },
      { name: "Cheese Omelette", price: "₹90" },
    ],
  },
];

const REVIEWS = [
  {
    name: "Sayani Paul",
    badge: "Local Guide",
    time: "2 months ago",
    rating: 5,
    text: "The food was really tasty. The service was good. Staffs were very polite and decent. Overall liked the ambience.",
    initials: "SP",
  },
  {
    name: "Aritra Roy",
    badge: null,
    time: "a month ago",
    rating: 5,
    text: "Very good ambience and the food is also very very good… must recommended! Every visit has been a delight.",
    initials: "AR",
  },
  {
    name: "Meghna Podder",
    badge: "Local Guide",
    time: "2 months ago",
    rating: 5,
    text: "We had a wonderful experience having lunch at this place. Everything was great — be it food, portion size, service or ambience. The price is reasonable as well.",
    initials: "MP",
  },
];

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_POSITIONS.map((pos) => (
        <Star
          key={pos}
          className="w-4 h-4"
          style={
            pos <= count
              ? { fill: "oklch(var(--amber))", color: "oklch(var(--amber))" }
              : { color: "oklch(var(--muted-foreground))" }
          }
        />
      ))}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Gallery", id: "gallery" },
    { label: "Menu", id: "menu" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-cream font-body">
      {/* ─── Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-espresso shadow-warm-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              type="button"
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <span className="font-display font-bold text-xl text-white tracking-wide">
                Cafe Avenue
              </span>
              <span
                className="text-xs font-body opacity-70 text-white hidden sm:block"
                style={{ letterSpacing: "0.05em" }}
              >
                ক্যাফে এভিনিউ
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: "oklch(var(--amber))",
                  color: "oklch(var(--espresso))",
                }}
                data-ocid="nav.primary_button"
              >
                Reserve a Table
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-espresso border-t border-white/10"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-white/80 hover:text-white text-left py-2 text-base font-medium"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Hero */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/uploads/unnamed_1-019d3d37-8686-75c7-9df7-bee6ae8dfdcc-7.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="font-body text-white/70 tracking-[0.3em] text-sm uppercase mb-3">
              Welcome to
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-tight mb-2">
              Cafe Avenue
            </h1>
            <p
              className="font-display italic text-2xl md:text-3xl mb-6"
              style={{ color: "oklch(var(--amber))" }}
            >
              ক্যাফে এভিনিউ
            </p>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <Star
                  className="w-4 h-4"
                  style={{
                    fill: "oklch(var(--amber))",
                    color: "oklch(var(--amber))",
                  }}
                />
                <span className="text-white font-semibold">4.6</span>
                <span className="text-white/60 text-sm">|</span>
                <span className="text-white/80 text-sm">852 reviews</span>
              </div>
              <div
                className="px-3 py-2 rounded-full backdrop-blur-sm text-sm text-white/80"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                ₹200–400 per person
              </div>
            </div>

            <p className="text-white/70 text-base mb-10 tracking-wide">
              Dine-in · Takeaway · No-contact Delivery
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "oklch(var(--amber))",
                  color: "oklch(var(--espresso))",
                  border: "none",
                }}
                onClick={() => scrollTo("menu")}
                data-ocid="hero.primary_button"
              >
                View Menu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "2px solid rgba(255,255,255,0.5)",
                  color: "white",
                }}
                onClick={() => scrollTo("contact")}
                data-ocid="hero.secondary_button"
              >
                Reserve a Table
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      {/* ─── About */}
      <section id="about" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-warm-lg"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/assets/uploads/unnamed_6-019d3d37-843c-7640-8794-e24bdf598637-2.jpg"
                alt="Cafe Avenue interior"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: "oklch(0.72 0.14 72 / 0.30)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div
                className="absolute bottom-6 left-6 px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm"
                style={{ background: "oklch(var(--amber) / 0.85)" }}
              >
                Serampore, West Bengal
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <p
                className="text-sm uppercase tracking-[0.25em] font-semibold mb-3"
                style={{ color: "oklch(var(--amber))" }}
              >
                Our Story
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso leading-tight mb-6">
                A Place Where
                <br />
                <span
                  className="italic"
                  style={{ color: "oklch(var(--amber))" }}
                >
                  Every Sip Matters
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-base">
                Nestled at 158 N.S. Avenue, Serampore, Cafe Avenue is more than
                just a coffee shop — it's a community gathering place where warm
                aromas, friendly faces, and exceptional flavors come together.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                From our artisan cappuccinos and hearty sandwiches to our
                indulgent milkshakes, every dish is crafted with care. With
                meals priced between ₹200–400, we believe great food should be
                accessible to everyone.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: UtensilsCrossed, label: "Dine-in" },
                  { icon: ShoppingBag, label: "Takeaway" },
                  { icon: Truck, label: "Delivery" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl text-center"
                    style={{ background: "oklch(var(--latte))" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "oklch(var(--amber))" }}
                    />
                    <span className="text-sm font-medium text-espresso">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Gallery */}
      <section
        id="gallery"
        className="py-24"
        style={{ background: "oklch(var(--espresso))" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm uppercase tracking-[0.25em] font-semibold mb-3"
              style={{ color: "oklch(var(--amber))" }}
            >
              Visual Delights
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Our Gallery
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.caption}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                  i === 1 ? "row-span-2" : ""
                } ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onMouseEnter={() => setHoveredPhoto(i)}
                onMouseLeave={() => setHoveredPhoto(null)}
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 flex items-end transition-opacity duration-300 ${
                    hoveredPhoto === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                >
                  <motion.p
                    className="p-4 text-white font-semibold text-sm"
                    initial={{ y: 16, opacity: 0 }}
                    animate={
                      hoveredPhoto === i
                        ? { y: 0, opacity: 1 }
                        : { y: 16, opacity: 0 }
                    }
                    transition={{ duration: 0.25 }}
                  >
                    {photo.caption}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Menu */}
      <section id="menu" className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm uppercase tracking-[0.25em] font-semibold mb-3"
              style={{ color: "oklch(var(--amber))" }}
            >
              What We Serve
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso">
              Menu Highlights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {MENU_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.12 }}
              >
                <Card
                  className="h-full shadow-warm border-0 overflow-hidden"
                  style={{ background: "oklch(var(--latte))" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-3xl">{cat.emoji}</span>
                      <Badge
                        className="text-xs font-semibold"
                        style={{
                          background: "oklch(var(--amber) / 0.15)",
                          color: "oklch(var(--espresso))",
                          border: "1px solid oklch(var(--amber) / 0.3)",
                        }}
                      >
                        {cat.name}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                          style={{ borderColor: "oklch(var(--amber) / 0.2)" }}
                        >
                          <span className="text-sm font-medium text-espresso">
                            {item.name}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: "oklch(var(--amber))" }}
                          >
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Collapsible open={menuOpen} onOpenChange={setMenuOpen}>
            <div className="flex justify-center">
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-5 font-semibold gap-2 transition-all duration-300"
                  style={{
                    borderColor: "oklch(var(--amber))",
                    color: "oklch(var(--espresso))",
                  }}
                  data-ocid="menu.toggle"
                >
                  {menuOpen ? "Hide Full Menu" : "View Full Menu Board"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-8">
              <div className="rounded-2xl overflow-hidden shadow-warm-lg max-w-2xl mx-auto">
                <img
                  src="/assets/uploads/unnamed_5-019d3d37-85a0-7307-be36-4acdd45a65cb-5.jpg"
                  alt="Cafe Avenue Full Menu Board"
                  className="w-full h-auto"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* ─── Reviews */}
      <section
        id="reviews"
        className="py-24"
        style={{ background: "oklch(var(--latte))" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm uppercase tracking-[0.25em] font-semibold mb-3"
              style={{ color: "oklch(var(--amber))" }}
            >
              Guest Experiences
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Star
                  className="w-6 h-6"
                  style={{
                    fill: "oklch(var(--amber))",
                    color: "oklch(var(--amber))",
                  }}
                />
                <span className="font-display text-3xl font-bold text-espresso">
                  4.6
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                Based on{" "}
                <span className="font-semibold text-espresso">852 reviews</span>{" "}
                on Google Maps
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                data-ocid={`reviews.item.${i + 1}`}
              >
                <Card className="h-full shadow-warm border-0 bg-card">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ background: "oklch(var(--espresso))" }}
                      >
                        {review.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-espresso text-sm">
                            {review.name}
                          </p>
                          {review.badge && (
                            <Badge
                              className="text-xs"
                              style={{
                                background: "oklch(var(--amber) / 0.15)",
                                color: "oklch(var(--espresso))",
                                border: "1px solid oklch(var(--amber) / 0.3)",
                              }}
                            >
                              {review.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {review.time}
                        </p>
                      </div>
                    </div>
                    <StarRating count={review.rating} />
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact */}
      <section
        id="contact"
        className="py-24"
        style={{ background: "oklch(var(--espresso))" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm uppercase tracking-[0.25em] font-semibold mb-3"
              style={{ color: "oklch(var(--amber))" }}
            >
              Come Visit Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Contact & Info
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "158, N.S.Avenue, Serampore, West Bengal 712201",
                  href: undefined as string | undefined,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "070449 34494",
                  href: "tel:07044934494",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Open · Closes 10 pm",
                  href: undefined as string | undefined,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "oklch(var(--amber) / 0.15)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "oklch(var(--amber))" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-widest font-semibold mb-1"
                      style={{ color: "oklch(var(--amber))" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-white/90 hover:text-white transition-colors text-sm"
                        data-ocid="contact.link"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/90 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div
                className="p-5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <p
                  className="text-xs uppercase tracking-widest font-semibold mb-3"
                  style={{ color: "oklch(var(--amber))" }}
                >
                  Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Dine-in", "Takeaway", "No-contact Delivery"].map((s) => (
                    <Badge
                      key={s}
                      className="text-sm font-medium"
                      style={{
                        background: "oklch(var(--amber) / 0.2)",
                        color: "white",
                        border: "1px solid oklch(var(--amber) / 0.4)",
                      }}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                className="relative h-full min-h-[360px] rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center p-8"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.28 0.07 60) 0%, oklch(0.22 0.05 50) 100%)",
                  border: "1px solid oklch(var(--amber) / 0.2)",
                }}
                data-ocid="contact.card"
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(var(--amber)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--amber)) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "oklch(var(--amber) / 0.2)" }}
                  >
                    <MapPin
                      className="w-8 h-8"
                      style={{ color: "oklch(var(--amber))" }}
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    Find Us
                  </h3>
                  <p className="text-white/70 text-sm mb-6 max-w-xs">
                    158, N.S.Avenue, Serampore,
                    <br />
                    West Bengal 712201
                  </p>
                  <a
                    href="https://maps.google.com/?q=Cafe+Avenue,158+NS+Avenue+Serampore+West+Bengal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{
                      background: "oklch(var(--amber))",
                      color: "oklch(var(--espresso))",
                    }}
                    data-ocid="contact.primary_button"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer */}
      <footer
        className="py-8 text-center text-sm"
        style={{
          background: "oklch(0.18 0.04 50)",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <p className="font-display italic text-white/70 text-base mb-1">
          Cafe Avenue — ক্যাফে এভিনিউ
        </p>
        <p className="text-xs">
          158, N.S. Avenue, Serampore, West Bengal 712201
        </p>
        <p className="mt-3 text-xs">
          &copy; {new Date().getFullYear()}. Built with{" "}
          <span style={{ color: "oklch(var(--amber))" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
