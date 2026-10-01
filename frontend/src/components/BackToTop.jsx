import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import './BackToTop.css'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top of page"
      title="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}

export default BackToTop
