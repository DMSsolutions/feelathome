import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const expertises = [
  {
    code: 'GS',
    title: 'Gestion Strategique',
    description: "Une vision orientee performance pour accroître la desirabilite de votre bien et optimiser sa rentabilite toute l'annee.",
    items: [
      'Optimisation complete des annonces',
      'Photographies professionnelles',
      'Tarification dynamique',
      'Synchronisation des calendriers',
      'Analyse des performances',
      "Optimisation du taux d'occupation",
    ],
  },
  {
    code: 'CP',
    title: 'Conciergerie Premium',
    description: 'Un accompagnement attentionne a chaque etape du sejour pour offrir une experience sans couture.',
    items: [
      'Accueil personnalise',
      'Check-in / Check-out',
      'Assistance voyageurs 7j/7',
      'Communication multilingue',
      'Gestion des demandes speciales',
    ],
  },
  {
    code: 'EH',
    title: 'Excellence Hoteliere',
    description: "Les standards de l'hotellerie de luxe appliques a votre logement jusque dans les moindres details.",
    items: [
      'Nettoyage professionnel',
      'Preparation complete des logements',
      'Blanchisserie premium',
      'Linge hotelier',
      'Controle qualite systematique',
    ],
  },
  {
    code: 'MI',
    title: 'Maintenance & Intendance',
    description: 'Une vigilance continue pour preserver la valeur de votre patrimoine et anticiper les incidents.',
    items: [
      'Suivi technique',
      'Petites reparations',
      'Gestion des artisans',
      'Controle regulier du logement',
      'Prevention des incidents',
    ],
  },
  {
    code: 'TP',
    title: 'Transport Prive',
    description: "Des transferts premium pour prolonger l'impression de confort et de distinction avant meme l'arrivee.",
    items: [
      'Transfert aeroport',
      'Transfert gare',
      'Chauffeur prive',
      'Accueil personnalise',
      'Transport VIP',
      'Organisation des deplacements',
    ],
  },
  {
    code: 'SE',
    title: 'Services Exclusifs',
    description: 'Des attentions sur mesure pour transformer chaque sejour en souvenir memorable.',
    items: [
      'Courses avant arrivee',
      'Decoration romantique',
      'Champagne',
      'Chef prive',
      'Baby-sitting',
      'Reservations de restaurants',
      'Experiences personnalisees',
    ],
  },
] as const

const ownerBenefits = [
  'Revenus optimises',
  'Gestion totalement deleguee',
  'Bien entretenu',
  'Transparence totale',
  'Aucun stress',
]

const travelerBenefits = [
  'Accueil personnalise',
  'Hebergement irreprochable',
  'Assistance permanente',
  'Services sur mesure',
  'Experience inoubliable',
]

const methodSteps = [
  {
    number: '01',
    title: 'Prise de contact',
    text: 'Nous decouvrons votre bien ainsi que vos objectifs afin de definir une strategie sur mesure.',
  },
  {
    number: '02',
    title: 'Preparation',
    text: 'Photographies, optimisation, mise en ligne et organisation complete avant la premiere reservation.',
  },
  {
    number: '03',
    title: 'Gestion quotidienne',
    text: 'Nous pilotons reservations, voyageurs, menage, maintenance et communication au quotidien.',
  },
  {
    number: '04',
    title: 'Valorisation continue',
    text: 'Analyse, optimisation, amelioration et suivi pour faire progresser la valeur de votre patrimoine.',
  },
] as const

const stats = [
  { value: 98, suffix: '%', label: 'de voyageurs satisfaits' },
  { value: 24, suffix: 'h/24', label: 'Assistance disponible' },
  { value: 7, suffix: 'j/7', label: 'Suivi personnalise' },
  { value: 100, suffix: '%', label: 'Gestion complete' },
] as const

const apartmentShots = [
  {
    src: '/image/IMG_1527.jpg',
    title: 'Salon lumineux',
    location: 'Appartement Paris',
    note: "Lumiere naturelle et matieres nobles pour un effet 'chez soi' instantane.",
    tilt: -2,
  },
  {
    src: '/image/IMG_1528.jpg',
    title: 'Suite parentale',
    location: 'Villa parisienne',
    note: 'Linge haut de gamme, oreillers personnalises et literie premium systematique.',
    tilt: 1.5,
  },
  {
    src: '/image/IMG_1529.jpg',
    title: 'Cuisine equipee',
    location: 'Appartement Paris',
    note: 'Vaisselle complete, machines haut de gamme et produits d accueil offers.',
    tilt: -1,
  },
  {
    src: '/image/IMG_1530.jpg',
    title: 'Espace petit dejeuner',
    location: 'Poitiers',
    note: "Chaque arrivee est preparee avec les memes standards qu'un palace.",
    tilt: 2,
  },
  {
    src: '/image/IMG_1531.jpg',
    title: 'Salle de bain',
    location: 'Appartement Paris',
    note: 'Serviettes epaisses, peignoirs, et produits d hote premium completes.',
    tilt: -1.5,
  },
  {
    src: '/image/IMG_1532.jpg',
    title: 'Coin salon',
    location: 'Appartement Paris',
    note: 'Assises confortables, luminaires doux, decoration harmonieuse.',
    tilt: 1,
  },
  {
    src: '/image/IMG_1533.jpg',
    title: 'Chambre seconde',
    location: 'Residence secondaire',
    note: 'Toutes les pieces sont soignees avec la meme exigence.',
    tilt: -2.5,
  },
  {
    src: '/image/IMG_1534.jpg',
    title: 'Detroit chambre',
    location: 'Appartement Paris',
    note: 'Finitions elegantes, tableaux, lampes, chaque detail compte.',
    tilt: 2.5,
  },
  {
    src: '/image/IMG_1592.jpg',
    title: 'Entree privee',
    location: 'Pavillon Poitiers',
    note: "L'accueil commence des le seuil, avec une ambiance rassurante.",
    tilt: -1,
  },
  {
    src: '/image/IMG_1594.jpg',
    title: 'Salon convivial',
    location: 'Appartement Poitiers',
    note: 'Espaces penses pour se detendre comme a la maison.',
    tilt: 1.5,
  },
  {
    src: '/image/IMG_1595.jpg',
    title: 'Salle a manger',
    location: 'Appartement Poitiers',
    note: 'Parfait pour les soirees entre amis ou en famille.',
    tilt: -2,
  },
  {
    src: '/image/IMG_1596.jpg',
    title: 'Salon cosy',
    location: 'Appartement Paris',
    note: 'Tapisseries, puffs, textures chaleureuses pour l hiver comme l ete.',
    tilt: 2,
  },
  {
    src: '/image/IMG_1597.jpg',
    title: 'Vue sur le salon',
    location: 'Appartement Poitiers',
    note: 'Chaque cliche est une invitation a venir vivre ces espaces.',
    tilt: -1.5,
  },
  {
    src: '/image/IMG_1598.jpg',
    title: 'Salle de bain design',
    location: 'Appartement Paris',
    note: 'Robinetterie soignee, miroirs eclairages, espacement premium.',
    tilt: 1,
  },
  {
    src: '/image/IMG_1599.jpg',
    title: 'Salle de bain lumineuse',
    location: 'Appartement Paris',
    note: 'Une bonne hygiene passe par un cadre inspire et propre.',
    tilt: -0.5,
  },
  {
    src: '/image/IMG_1600.jpg',
    title: 'Cuisine equipee premium',
    location: 'Appartement Paris',
    note: "Ustensiles, machines, tout est pret pour l'arrivante.",
    tilt: 1,
  },
  {
    src: '/image/IMG_1601.jpg',
    title: 'Chambre elegante',
    location: 'Appartement Poitiers',
    note: 'Draps, tete de lit, eclairage, un resultat digne d un palace.',
    tilt: -1.5,
  },
  {
    src: '/image/IMG_1530 (1).jpg',
    title: 'Espace repas',
    location: 'Appartement Poitiers',
    note: 'Le lieu ideal pour partager de vrais moments.',
    tilt: 2,
  },
] as const

const founders = [
  {
    name: 'Sam',
    role: 'Fondateur',
    photo: '/Sam.jpg',
    bio: "Fondateur de Feel At Home, Sam accompagne les proprietaires avec une vision simple : offrir une gestion humaine, professionnelle et sereine de vos biens. A seulement 24 ans, fort d'une solide experience en conciergerie et d'une veritable passion pour l'immobilier, il met son sens du service et son exigence au cœur de chaque logement, en etroite collaboration avec ses partenaires.",
    strengths: ['Gestion humaine & sereine', 'Exigence et sens du service', 'Partenariats de confiance'],
  },
  {
    name: 'Marie',
    role: 'Responsable Voyageurs & Proprietaires',
    photo: '/marie.jpg',
    bio: "Responsable de la relation voyageurs et proprietaires, Marie veille a ce que chaque sejour soit une experience fluide et chaleureuse, du premier message jusqu'a la remise des cles. Passee par la relation client et le developpement commercial, elle est egalement en charge du demarchage proprietaires : elle identifie de nouveaux biens, presente notre accompagnement et noue des partenariats durables, fondes sur la confiance.",
    strengths: ['Experience client fluide', 'Relation proprietaire premium', 'Developpement durable'],
  },
] as const

const partners = [
  {
    name: 'Airbnb',
    logo: '/img/airbnb.webp',
  },
  {
    name: 'Booking',
    logo: '/img/booking.png',
  },
  {
    name: 'Vrbo',
    logo: '/img/vrbo.png',
  },
  {
    name: 'Hotelify',
    logo: '/img/hotelify.webp',
  },
  {
    name: 'Expedia',
    logo: '/img/expedia_logo.jpg',
  },
  {
    name: 'AMA Selections',
    logo: '/img/ama selections.avif',
  },
  {
    name: 'HVMI',
    logo: '/img/hvmi-logo.avif',
  },
  {
    name: 'Kactus',
    logo: '/img/kactus.png',
  },
  {
    name: 'PeerSpace',
    logo: '/img/peerspace-logo.png',
  },
  {
    name: 'SnapEvent',
    logo: '/img/snapevent-logo.png',
  },
  {
    name: 'Office Riders',
    logo: '/img/Logo_OfficeRiders_2023.svg.webp',
  },
  {
    name: 'Oliver Travels',
    logo: '/img/Oliver Travels.jpg',
  },
] as const

const testimonials = [
  {
    quote: "Notre appartement n'a jamais ete aussi rentable.",
    author: 'Proprietaire a Paris',
  },
  {
    quote: 'Une equipe disponible et extremement professionnelle.',
    author: 'Investisseur a Poitiers',
  },
  {
    quote: "Nos voyageurs parlent regulierement de la qualite de l'accueil.",
    author: 'Hote premium',
  },
] as const

const faqs = [
  {
    question: 'Combien coutent vos services ?',
    answer:
      'Nos tarifs varient selon les prestations choisies et le niveau de gestion souhaite. Contactez-nous pour obtenir un devis personnalise et gratuit.',
  },
  {
    question: 'Dois-je etre present pour accueillir les voyageurs ?',
    answer:
      "Non. Nous nous chargeons de l'accueil, de la remise des cles (ou de l'arrivee autonome), des departs et de l'assistance pendant tout le sejour.",
  },
  {
    question: 'Comment les menages sont-ils organises ?',
    answer:
      "Chaque depart de voyageur est suivi d'un menage professionnel, d'un controle qualite et du remplacement du linge afin de garantir un logement impeccable.",
  },
  {
    question: 'Le linge est-il inclus ?',
    answer:
      'Oui. Nous pouvons fournir et entretenir le linge de lit ainsi que le linge de toilette selon la formule choisie.',
  },
  {
    question: 'Qui fixe les prix des nuitees ?',
    answer:
      "Nous optimisons les tarifs en fonction de la saison, de la demande locale et des evenements afin de maximiser votre rentabilite tout en maintenant un bon taux d'occupation.",
  },
  {
    question: 'Les proprietaires ont-ils acces aux reservations ?',
    answer:
      "Oui. Vous pouvez consulter le calendrier des reservations et suivre l'activite de votre logement a tout moment.",
  },
  {
    question: 'Que se passe-t-il en cas de probleme pendant un sejour ?',
    answer:
      'Notre equipe reste disponible pour assister les voyageurs et intervenir rapidement en cas de besoin afin de garantir une experience sereine.',
  },
  {
    question: 'Mon logement est-il assure ?',
    answer:
      "L'assurance du logement reste a la charge du proprietaire. Certaines plateformes proposent egalement une couverture complementaire. Nous vous conseillons sur les meilleures solutions.",
  },
  {
    question: 'Puis-je utiliser mon logement quand je le souhaite ?',
    answer:
      'Oui. Vous restez libre de bloquer les dates de votre choix pour votre usage personnel.',
  },
  {
    question: 'Quels types de logements acceptez-vous ?',
    answer:
      'Nous gerons des appartements, maisons, studios, residences secondaires et autres biens destines a la location courte duree.',
  },
  {
    question: 'Comment commencer ?',
    answer:
      'Il suffit de nous contacter pour un premier rendez-vous. Nous evaluerons votre logement et vous proposerons une solution adaptee a vos besoins.',
  },
] as const

const navigationItems = [
  { label: 'Services', href: '#services' },
  { label: 'Methode', href: '#methode' },
  { label: 'Appartements', href: '#cliches' },
  { label: 'Qui sommes-nous', href: '#about' },
  { label: 'FAQ', href: '#faq' },
] as const

type EstimationStep = 1 | 2 | 3

type EstimationForm = {
  city: string
  propertyType: string
  surface: string
  rythme: string
  prenom: string
  telephone: string
  email: string
  message: string
}

const initialForm: EstimationForm = {
  city: '',
  propertyType: '',
  surface: '',
  rythme: '',
  prenom: '',
  telephone: '',
  email: '',
  message: '',
}

const propertyTypes = ['Studio', 'T2', 'T3 et plus', 'Maison'] as const
const rythmes = ['Occasionnellement', 'Regulierement', "Toute l'annee"] as const
const WHATSAPP_NUMBER = '33600000000'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0))
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const counterAnimatedRef = useRef(false)
  const [estimationStep, setEstimationStep] = useState<EstimationStep>(1)
  const [form, setForm] = useState<EstimationForm>(initialForm)

  const updateForm = <K extends keyof EstimationForm>(key: K, value: EstimationForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetEstimation = () => {
    setEstimationStep(1)
    setForm(initialForm)
  }

  const whatsappUrl = useMemo(() => {
    const lines = [
      'Bonjour Feel At Home,',
      'Je souhaite une estimation pour mon bien :',
      '',
      form.city ? `📍 Ville : ${form.city}` : null,
      form.propertyType ? `🏡 Type de bien : ${form.propertyType}` : null,
      form.surface ? `📐 Surface : ${form.surface}` : null,
      form.rythme ? `⏱ Rythme de location : ${form.rythme}` : null,
      '',
      form.prenom ? `👤 Prenom : ${form.prenom}` : null,
      form.telephone ? `📞 Telephone : ${form.telephone}` : null,
      form.email ? `✉️ Email : ${form.email}` : null,
      form.message ? `💬 Message : ${form.message}` : null,
    ].filter(Boolean) as string[]

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [form])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const statsSection = document.getElementById('impact')
    if (!statsSection) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting || counterAnimatedRef.current) {
          return
        }

        counterAnimatedRef.current = true
        const start = performance.now()
        const duration = 1600

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)

          setCounts(stats.map((stat) => Math.round(stat.value * eased)))

          if (progress < 1) {
            window.requestAnimationFrame(tick)
          }
        }

        window.requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(statsSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) {
      return
    }

    document.body.classList.add('has-custom-cursor')

    const moveCursor = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }

    window.addEventListener('mousemove', moveCursor)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const ripple = document.createElement('span')

    ripple.className = 'btn__ripple'
    ripple.style.left = `${event.clientX - rect.left}px`
    ripple.style.top = `${event.clientY - rect.top}px`

    target.appendChild(ripple)
    window.setTimeout(() => ripple.remove(), 650)
  }

  return (
    <div className="page-shell">
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"></div>

      <header className={`topbar ${isScrolled ? 'topbar--solid' : ''}`}>
        <a href="#hero" className="brand" onClick={createRipple}>
          <span>Feel</span> At Home
        </a>

        <nav className="topbar__nav" aria-label="Navigation principale">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--small" onClick={createRipple}>
          Estimation gratuite
        </a>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <div className="hero-section__media" aria-hidden="true">
            <img
              src="/image/amenagement_de_terrasse_dappartement_principal.jpg"
              alt="amenagement de terrasse dappartement"
              className="hero-section__image"
            />
            <div className="hero-section__overlay"></div>
            <div className="hero-section__grain"></div>
          </div>

          <div className="container hero-section__content">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Gestion locative haut de gamme & conciergerie privee</p>
              <h1>L&apos;Art de Sublimer Votre Bien.</h1>
              <p className="hero-copy__lead">
                Gestion locative haut de gamme • Conciergerie privee • Experience
                voyageur exceptionnelle.
              </p>
              <p className="hero-copy__text">
                Nous transformons chaque propriete en une experience d'hospitalite
                raffinee, ou chaque detail est pense pour valoriser votre patrimoine
                et satisfaire vos voyageurs.
              </p>

              <div className="hero-actions">
                <a href="#services" className="btn btn--primary" onClick={createRipple}>
                  Decouvrir nos services
                </a>
                <a href="#estimation" className="btn btn--secondary" onClick={createRipple}>
                  Obtenir une estimation gratuite
                </a>
                <a href="#contact" className="btn btn--tertiary" onClick={createRipple}>
                  Nous contacter
                </a>
              </div>
            </div>
          </div>

          <a href="#introduction" className="scroll-indicator" aria-label="Defiler vers la suite">
            <span>↓</span>
            <small>Scroll pour decouvrir</small>
          </a>
        </section>

        <section id="introduction" className="section section--soft">
          <div className="container intro-grid">
            <div data-reveal>
              <p className="eyebrow">Plus qu'une conciergerie</p>
              <h2>Un partenaire dedie a la valorisation de votre patrimoine.</h2>
            </div>
            <div className="intro-copy" data-reveal>
              <p>
                Votre bien merite une gestion irreprochable. Chez Feel At Home, nous
                orchestrons chaque etape avec exigence afin d optimiser vos revenus
                tout en offrant une experience memorable a chacun de vos voyageurs.
              </p>
              <p>
                <strong>Notre mission est simple :</strong>
                <br />
                vous permet de profiter de votre revenu locatif tout en deleguant la gestion.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Nos services</p>
              <h2>Nous prenons en charge l'integralite de la gestion de votre bien.</h2>
            </div>

            <div className="expertise-grid">
              {expertises.map((expertise, index) => (
                <article
                  key={expertise.title}
                  className="expertise-card"
                  data-reveal
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div className="icon-badge">{expertise.code}</div>
                  <h3>{expertise.title}</h3>
                  <p>{expertise.description}</p>
                  <ul>
                    {expertise.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contrast">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Une Experience 5 Etoiles</p>
              <h2>Des benefices tangibles pour les proprietaires comme pour les voyageurs.</h2>
            </div>

            <div className="experience-grid">
              <article className="experience-card" data-reveal>
                <p className="card-kicker">Pour les proprietaires</p>
                <ul>
                  {ownerBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="experience-card experience-card--accent" data-reveal>
                <p className="card-kicker">Pour les voyageurs</p>
                <ul>
                  {travelerBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="methode" className="section section--soft">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Notre Methode</p>
              <h2>4 etapes simples pour transformer votre bien.</h2>
            </div>

            <div className="timeline">
              {methodSteps.map((step, index) => (
                <article
                  key={step.number}
                  className="timeline-step timeline-step--reveal"
                  data-reveal
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="timeline-step__number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="impact" className="section section--accent">
          <div className="container">
            <div className="section-heading section-heading--light" data-reveal>
              <p className="eyebrow">Pourquoi Feel At Home ?</p>
              <h2>Un suivi premium, une disponibilite totale et des resultats concrets.</h2>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <article key={stat.label} className="stat-card" data-reveal>
                  <p className="stat-card__value">
                    {counts[index]}
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="stat-card__label">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cliches" className="section section--cliches">
          <div className="container">
            <div className="section-heading section-heading--center section-heading--strong" data-reveal>
              <p className="eyebrow">Quelques cliches de nos appartements</p>
              <h2>Chaque bien raconte une histoire. Voici les notres, sur le vif.</h2>
              <p className="editorial-copy">
                Des instants reels pris sur place, sans filtre, pour sentir la lumiere,
                les matieres et l'ambiance qui font la difference quand on arrive chez Feel At Home.
              </p>
            </div>

            <div className="shot-scene">
              <article className="shot-card shot-card--a" data-reveal>
                <div className="shot-card__media">
                  <img src={apartmentShots[0].src} alt={apartmentShots[0].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[0].location}</span>
              </article>

              <article className="shot-card shot-card--b" data-reveal style={{ transitionDelay: '60ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[1].src} alt={apartmentShots[1].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[1].location}</span>
              </article>

              <article className="shot-note shot-note--1" data-reveal style={{ transitionDelay: '140ms' }}>
                <h3>{apartmentShots[0].title}</h3>
                <p>{apartmentShots[0].note}</p>
              </article>

              <article className="shot-card shot-card--c" data-reveal style={{ transitionDelay: '100ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[2].src} alt={apartmentShots[2].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[2].location}</span>
              </article>

              <article className="shot-card shot-card--d" data-reveal style={{ transitionDelay: '180ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[3].src} alt={apartmentShots[3].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[3].location}</span>
              </article>

              <article className="shot-note shot-note--2" data-reveal style={{ transitionDelay: '220ms' }}>
                <h3>{apartmentShots[2].title}</h3>
                <p>{apartmentShots[2].note}</p>
              </article>

              <article className="shot-card shot-card--e" data-reveal style={{ transitionDelay: '160ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[4].src} alt={apartmentShots[4].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[4].location}</span>
              </article>

              <article className="shot-card shot-card--f" data-reveal style={{ transitionDelay: '240ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[5].src} alt={apartmentShots[5].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[5].location}</span>
              </article>

              <article className="shot-card shot-card--g" data-reveal style={{ transitionDelay: '280ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[6].src} alt={apartmentShots[6].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[6].location}</span>
              </article>

              <article className="shot-note shot-note--3" data-reveal style={{ transitionDelay: '300ms' }}>
                <h3>{apartmentShots[4].title}</h3>
                <p>{apartmentShots[4].note}</p>
              </article>

              <article className="shot-card shot-card--h" data-reveal style={{ transitionDelay: '220ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[7].src} alt={apartmentShots[7].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[7].location}</span>
              </article>

              <article className="shot-card shot-card--i" data-reveal style={{ transitionDelay: '320ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[8].src} alt={apartmentShots[8].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[8].location}</span>
              </article>

              <article className="shot-note shot-note--4" data-reveal style={{ transitionDelay: '360ms' }}>
                <h3>{apartmentShots[9].title}</h3>
                <p>{apartmentShots[9].note}</p>
              </article>

              <article className="shot-card shot-card--j" data-reveal style={{ transitionDelay: '340ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[9].src} alt={apartmentShots[9].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[9].location}</span>
              </article>

              <article className="shot-card shot-card--k" data-reveal style={{ transitionDelay: '380ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[10].src} alt={apartmentShots[10].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[10].location}</span>
              </article>

              <article className="shot-card shot-card--l" data-reveal style={{ transitionDelay: '400ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[11].src} alt={apartmentShots[11].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[11].location}</span>
              </article>

              <article className="shot-note shot-note--5" data-reveal style={{ transitionDelay: '440ms' }}>
                <h3>{apartmentShots[11].title}</h3>
                <p>{apartmentShots[11].note}</p>
              </article>

              <article className="shot-card shot-card--m" data-reveal style={{ transitionDelay: '420ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[12].src} alt={apartmentShots[12].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[12].location}</span>
              </article>

              <article className="shot-card shot-card--n" data-reveal style={{ transitionDelay: '460ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[13].src} alt={apartmentShots[13].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[13].location}</span>
              </article>

              <article className="shot-card shot-card--o" data-reveal style={{ transitionDelay: '480ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[14].src} alt={apartmentShots[14].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[14].location}</span>
              </article>

              <article className="shot-note shot-note--6" data-reveal style={{ transitionDelay: '520ms' }}>
                <h3>{apartmentShots[16].title}</h3>
                <p>{apartmentShots[16].note}</p>
              </article>

              <article className="shot-card shot-card--p" data-reveal style={{ transitionDelay: '500ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[15].src} alt={apartmentShots[15].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[15].location}</span>
              </article>

              <article className="shot-card shot-card--q" data-reveal style={{ transitionDelay: '540ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[16].src} alt={apartmentShots[16].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[16].location}</span>
              </article>

              <article className="shot-card shot-card--r" data-reveal style={{ transitionDelay: '560ms' }}>
                <div className="shot-card__media">
                  <img src={apartmentShots[17].src} alt={apartmentShots[17].title} loading="lazy" />
                </div>
                <span className="shot-card__tag">{apartmentShots[17].location}</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Ils nous font confiance</p>
              <h2>Des retours qui confirment la qualite de l'accueil, de la gestion et du resultat.</h2>
            </div>

            <div className="testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.quote}
                  className="testimonial-card"
                  data-reveal
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <p className="testimonial-card__stars">★★★★★</p>
                  <blockquote>{testimonial.quote}</blockquote>
                  <p className="testimonial-card__author">{testimonial.author}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section founders-section">
          <div className="container">
            <div className="section-heading section-heading--strong" data-reveal>
              <p className="eyebrow">Qui sommes-nous</p>
              <h2>Feel At Home, une equipe a taille humaine, au service de vos biens.</h2>
              <p className="editorial-copy">
                Derriere chaque logement prepare, chaque voyage accueilli et chaque
                proprietaire rassure, il y a une equipe presente, reactive et disponible.
                Rencontrez Sam et Marie, les visages de Feel At Home.
              </p>
            </div>

            <div className="founders-grid">
              {founders.map((founder, index) => (
                <article
                  key={founder.name}
                  className="founder-card"
                  data-reveal
                  style={{ transitionDelay: `${index * 140}ms` }}
                >
                  <div className="founder-card__photo">
                    <img src={founder.photo} alt={`Portrait de ${founder.name}, Feel At Home`} />
                    <div className="founder-card__badge">{founder.name.charAt(0)}</div>
                  </div>
                  <div className="founder-card__content">
                    <p className="founder-card__tag">
                      {founder.name === 'Sam' ? 'Fondateur Feel At Home' : 'Equipe Feel At Home'}
                    </p>
                    <h3>{founder.name}</h3>
                    <p className="founder-card__role">{founder.role}</p>
                    <p className="founder-card__bio">{founder.bio}</p>
                    <ul className="founder-card__strengths">
                      {founder.strengths.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container locations-grid">
            <div data-reveal>
              <p className="eyebrow">Nous intervenons</p>
              <h2>Nous intervenons dans toute la France.</h2>
              <p className="locations-copy">
                Nos equipes coordonnent chaque detail pour proposer une
                execution constante, elegante et fiable, partout ou votre bien se situe.
              </p>
            </div>

            <div className="map-card" data-reveal>
              <div className="map-card__marker map-card__marker--paris">
                <strong>France entiere</strong>
                <span>Gestion haut de gamme & partenaires locaux</span>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="section section--soft">
          <div className="container faq-grid">
            <div data-reveal>
              <p className="eyebrow">Questions frequentes</p>
              <h2>Des reponses claires pour envisager votre delegation en toute confiance.</h2>
            </div>

            <div className="faq-list" data-reveal>
              {faqs.map((faq) => (
                <article key={faq.question} className="faq-card">
                  <div className="faq-card__inner">
                    <div className="faq-card__face faq-card__face--front">
                      <p className="faq-card__label">Question frequente</p>
                      <h3>{faq.question}</h3>
                      <span>Survolez pour voir la reponse</span>
                    </div>
                    <div className="faq-card__face faq-card__face--back">
                      <p className="faq-card__label">Reponse</p>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section cta-section">
          <div className="container cta-panel" data-reveal>
            <p className="eyebrow">Confiez votre bien</p>
            <h2>Nous transformons votre propriete en une destination d'exception.</h2>
            <p>
              Pendant que vous profitez pleinement de votre investissement, nous prenons
              soin de chaque detail avec une approche premium, humaine et rigoureuse.
            </p>

            <div className="hero-actions">
              <a href="mailto:bonjour@feelathome.fr" className="btn btn--primary" onClick={createRipple}>
                Confier mon bien
              </a>
              <a href="tel:+33600000000" className="btn btn--secondary" onClick={createRipple}>
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </section>

        <section id="partenaires" className="section section--marquee partners-section">
          <div className="container">
            <div className="section-heading section-heading--center" data-reveal>
              <p className="eyebrow">Nos partenaires</p>
              <h2>Nous nous appuyons sur un reseau d'experts de confiance.</h2>
              <p className="editorial-copy">
                Plateformes, services, artisans et prestataires soigneusement selectionnes
                pour garantir le meme niveau d'exigence sur chaque bien.
              </p>
            </div>
          </div>

          <div className="media-marquee partners-marquee" aria-label="Nos partenaires defilent">
            <div className="media-track media-track--forward">
              {[...partners, ...partners].map((partner, index) => (
                <article key={`${partner.name}-forward-${index}`} className="media-chip partner-chip">
                  <div className="partner-chip__logo">
                    <img src={partner.logo} alt={`Logo de ${partner.name}, partenaire de Feel At Home`} loading="lazy" />
                  </div>
                  <div className="media-chip__label">{partner.name}</div>
                </article>
              ))}
            </div>

            <div className="media-track media-track--reverse">
              {[...partners.slice().reverse(), ...partners.slice().reverse()].map(
                (partner, index) => (
                  <article key={`${partner.name}-reverse-${index}`} className="media-chip partner-chip">
                    <div className="partner-chip__logo">
                      <img
                        src={partner.logo}
                        alt={`Logo de ${partner.name}, partenaire de Feel At Home`}
                        loading="lazy"
                      />
                    </div>
                    <div className="media-chip__label">{partner.name}</div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="estimation" className="section estimation-section">
          <div className="container">
            <div className="estimation-card" data-reveal>
              <div className="estimation-brand">
                <span className="estimation-brand__initials">FAH</span>
                <span className="estimation-brand__label">
                  <span></span>
                  Conciergerie
                  <span></span>
                </span>
              </div>

              <div className="estimation-copy">
                <p className="estimation-kicker">Estimez le potentiel reel de votre bien</p>
                <h2 className="estimation-title">Estimez le potentiel reel de votre bien</h2>
                <p className="estimation-subtitle">
                  Une analyse personnalisee, fiable et sans engagement, realisee sous 24h.
                </p>
              </div>

              <div className="estimation-steps" role="list" aria-label="Etapes du formulaire">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="estimation-steps__wrap">
                    <button
                      type="button"
                      className={`estimation-step ${step <= estimationStep ? 'is-active' : ''} ${step < estimationStep ? 'is-done' : ''}`}
                      onClick={() => setEstimationStep(step as EstimationStep)}
                      aria-current={estimationStep === step}
                    >
                      {step < estimationStep ? '✓' : step}
                    </button>
                    {step < 3 && (
                      <span
                        className={`estimation-steps__line ${step < estimationStep ? 'is-done' : ''}`}
                        aria-hidden="true"
                      ></span>
                    )}
                  </div>
                ))}
              </div>

              <div className="estimation-body">
                {estimationStep === 1 && (
                  <div className="estimation-fields">
                    <label className="field">
                      <span className="field__label">Ou se situe le logement ?</span>
                      <input
                        type="text"
                        placeholder="Ville"
                        value={form.city}
                        onChange={(event) => updateForm('city', event.target.value)}
                      />
                    </label>

                    <div className="field">
                      <span className="field__label">Quel type de bien ?</span>
                      <div className="chips">
                        {propertyTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            className={`chip ${form.propertyType === type ? 'is-active' : ''}`}
                            onClick={() => updateForm('propertyType', type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {estimationStep === 2 && (
                  <div className="estimation-fields">
                    <label className="field">
                      <span className="field__label">Surface approximative</span>
                      <input
                        type="text"
                        placeholder="Ex : 45 m²"
                        value={form.surface}
                        onChange={(event) => updateForm('surface', event.target.value)}
                      />
                    </label>

                    <div className="field">
                      <span className="field__label">A quel rythme souhaitez-vous louer ?</span>
                      <div className="chips">
                        {rythmes.map((rythme) => (
                          <button
                            type="button"
                            key={rythme}
                            className={`chip ${form.rythme === rythme ? 'is-active' : ''}`}
                            onClick={() => updateForm('rythme', rythme)}
                          >
                            {rythme}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {estimationStep === 3 && (
                  <div className="estimation-fields estimation-fields--final">
                    <label className="field field--inline">
                      <span className="field__label">Votre prenom</span>
                      <input
                        type="text"
                        placeholder="Prenom"
                        value={form.prenom}
                        onChange={(event) => updateForm('prenom', event.target.value)}
                      />
                    </label>

                    <div className="field field--grid">
                      <label className="field field--inline">
                        <span className="field__label">Telephone</span>
                        <input
                          type="tel"
                          placeholder="06 00 00 00 00"
                          value={form.telephone}
                          onChange={(event) => updateForm('telephone', event.target.value)}
                        />
                      </label>

                      <label className="field field--inline">
                        <span className="field__label">Email</span>
                        <input
                          type="email"
                          placeholder="prenom@email.com"
                          value={form.email}
                          onChange={(event) => updateForm('email', event.target.value)}
                        />
                      </label>
                    </div>

                    <label className="field field--inline">
                      <span className="field__label">Un mot pour nous ? (optionnel)</span>
                      <textarea
                        placeholder="Precisez nous le contexte de votre bien..."
                        rows={4}
                        value={form.message}
                        onChange={(event) => updateForm('message', event.target.value)}
                      ></textarea>
                    </label>
                  </div>
                )}
              </div>

              <div className="estimation-actions">
                {estimationStep > 1 && (
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => setEstimationStep((step) => (step > 1 ? ((step - 1) as EstimationStep) : step))}
                  >
                    Retour
                  </button>
                )}

                {estimationStep < 3 ? (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => setEstimationStep((step) => (step < 3 ? ((step + 1) as EstimationStep) : step))}
                  >
                    Continuer
                  </button>
                ) : (
                  <a className="btn btn--primary estimation-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                    Envoyer sur WhatsApp
                  </a>
                )}
              </div>

              {estimationStep === 3 && (
                <button type="button" className="estimation-reset" onClick={resetEstimation}>
                  Recommencer une estimation
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a href="#hero" className="brand brand--footer" onClick={createRipple}>
              <span>Feel</span> At Home
            </a>
            <p className="footer-note">
              Gestion locative haut de gamme, conciergerie privee et experience voyageur
              d'exception.
            </p>
          </div>

          <div className="footer-links">
            <a href="tel:+33600000000">Telephone</a>
            <a href="mailto:bonjour@feelathome.fr">Email</a>
            <a href="#zones">Paris</a>
            <a href="#zones">Poitiers</a>
          </div>

          <div className="footer-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="#mentions-legales">Mentions legales</a>
            <a href="#confidentialite">Politique de confidentialite</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
