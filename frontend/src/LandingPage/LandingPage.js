import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'
import { BsBasket } from 'react-icons/bs'
import { TbMeat, TbClockSearch } from 'react-icons/tb'
import { IoCartOutline } from 'react-icons/io5'
import { FaGithub } from 'react-icons/fa'

const ORBIT = ['🥕', '🍅', '🥦', '🍋', '🧀', '🥚', '🍞', '🍎']

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
}

function CountUp({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setValue })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{value.toFixed(decimals)}{suffix}</span>
}

function HeroArt() {
  return (
    <div className='hero-art' aria-hidden>
      <motion.div
        className='hero-ring'
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {ORBIT.map((e, i) => {
          const a = (i / ORBIT.length) * Math.PI * 2
          return (
            <span key={i} className='orbit-item' style={{ left: `${50 + 46 * Math.cos(a)}%`, top: `${50 + 46 * Math.sin(a)}%` }}>
              <motion.span
                style={{ display: 'inline-block' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
              >
                {e}
              </motion.span>
            </span>
          )
        })}
      </motion.div>
      <motion.div
        className='hero-logo'
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 }}
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <BsBasket />
        </motion.div>
      </motion.div>
    </div>
  )
}

const FEATURES = [
  { icon: <TbMeat />, title: 'Inventory', text: 'Keep track of items in your kitchen, set expiry dates and see what needs eating first.', to: '/inventory' },
  { icon: <IoCartOutline />, title: 'Shopping list', text: 'Check off items as you shop and they move straight into your inventory.', to: '/shoppingList' },
  { icon: <TbClockSearch />, title: 'Monitor', text: 'In development: see how your choices affect your budget and the environment.', soon: true },
]

const STEPS = [
  { emoji: '🧺', title: 'Log what you have', text: 'Search an ingredient and add it to your inventory in one click.' },
  { emoji: '⏰', title: 'Watch the clock', text: 'Add expiry dates; the Expiring panel sorts food by urgency.' },
  { emoji: '🍲', title: 'Cook it, don\'t bin it', text: 'Recipes are ranked by how many of your ingredients they use.' },
]

function LandingPage() {
  return (
    <div className='landing'>
      <section className='hero'>
        <div className='hero-blob hero-blob-a' />
        <div className='hero-blob hero-blob-b' />
        <div className='hero-inner'>
          <div className='hero-text'>
            <motion.p className='eyebrow' variants={fadeUp} initial='hidden' animate='show' custom={0}>
              Google DevFest hackathon · Team 7
            </motion.p>
            <motion.h1 variants={fadeUp} initial='hidden' animate='show' custom={1}>
              Waste<span>Less</span>
            </motion.h1>
            <motion.p className='hero-tag' variants={fadeUp} initial='hidden' animate='show' custom={2}>
              Minimising waste, maximising impact. Track the food you have, catch it before it
              expires, and find recipes that use it up.
            </motion.p>
            <motion.div className='hero-cta' variants={fadeUp} initial='hidden' animate='show' custom={3}>
              <Link to='/inventory' className='btn btn-primary'>Open my kitchen</Link>
              <Link to='/shoppingList' className='btn btn-ghost'>Shopping list</Link>
            </motion.div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section className='stats'>
        <motion.div className='stat' variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }}>
          <div className='stat-num'>~<CountUp to={33} suffix='%' /></div>
          <p>of food produced for people is lost or wasted (FAO)</p>
        </motion.div>
        <motion.div className='stat' variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }} custom={1}>
          <div className='stat-num'><CountUp to={8} />-<CountUp to={10} suffix='%' /></div>
          <p>of global greenhouse-gas emissions come from food we never eat (UNEP)</p>
        </motion.div>
        <motion.div className='stat' variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }} custom={2}>
          <div className='stat-num'>CH<sub>4</sub></div>
          <p>food in landfill rots into methane, a far stronger greenhouse gas than CO<sub>2</sub></p>
        </motion.div>
      </section>

      <section className='features'>
        <motion.p className='eyebrow' variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }}>Utilities</motion.p>
        <motion.h2 variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }} custom={1}>Getting started</motion.h2>
        <div className='feature-grid'>
          {FEATURES.map((f, i) => {
            const card = (
              <motion.div
                className={`feature-card ${f.soon ? 'is-soon' : ''}`}
                variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }} custom={i}
                whileHover={f.soon ? undefined : { y: -6 }}
              >
                <div className='feature-icon'>{f.icon}</div>
                <h3>{f.title}{f.soon && <span className='soon'>soon</span>}</h3>
                <p>{f.text}</p>
              </motion.div>
            )
            return f.to ? <Link key={f.title} to={f.to}>{card}</Link> : <div key={f.title}>{card}</div>
          })}
        </div>
      </section>

      <section className='steps'>
        {STEPS.map((s, i) => (
          <motion.div key={s.title} className='step' variants={fadeUp} initial='hidden' whileInView='show' viewport={{ once: true }} custom={i}>
            <div className='step-emoji'>{s.emoji}</div>
            <div className='step-num'>{i + 1}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.div>
        ))}
      </section>

      <footer className='footer'>
        <div>
          <div className='footer-brand'><BsBasket /> WasteLess</div>
          <p>Built in four days for a Google DevFest hackathon, 5-8 December 2023.</p>
        </div>
        <div>
          <h4>Team</h4>
          <p>Thomas, Deeni, Ameera and Aria</p>
          <p className='footer-handles'>@duc-minh-droid · @Aura4G · @deeniaffendi · @ameeraarfaa</p>
        </div>
        <div>
          <h4>Code</h4>
          <a href='https://github.com/duc-minh-droid/food-waste-management-website' target='_blank' rel='noreferrer'>
            <FaGithub /> duc-minh-droid/food-waste-management-website
          </a>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
