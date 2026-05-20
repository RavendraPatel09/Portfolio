export const skillGroups = [
  {
    title: 'Languages',
    glow: 'from-neon/30 to-electric/20',
    items: [
      { name: 'Python', icon: '🐍', percent: 85 },
      { name: 'C', icon: null, percent: 75 },
      { name: 'C++', icon: null, percent: 80 },
      { name: 'HTML', icon: '📄', percent: 90 },
      { name: 'CSS', icon: '🎨', percent: 85 },
    ],
  },
  {
    title: 'Database',
    glow: 'from-electric/30 to-neon/10',
    items: [{ name: 'MySQL', icon: '🗄️', percent: 75 }],
  },
  {
    title: 'Tools',
    glow: 'from-neon/20 to-electric/30',
    items: [
      { name: 'Git', icon: '🔀', percent: 85 },
      { name: 'Linux', icon: '🐧', percent: 70 },
      { name: 'Docker', icon: '🐳', percent: 65 },
    ],
  },
  {
    title: 'Learning',
    glow: 'from-electric/25 to-neon/25',
    items: [
      { name: 'Generative AI', icon: '🔥', percent: null, label: 'Generative AI 🔥' },
      { name: 'Advanced DSA', icon: '⚡', percent: null, label: 'Advanced DSA ⚡' },
    ],
  },
]
