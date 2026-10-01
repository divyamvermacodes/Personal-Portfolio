import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ThreeCanvas.css'

function ThreeCanvas() {
  const containerRef = useRef(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const isMobile = window.innerWidth < 768

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 4.8

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
    container.appendChild(renderer.domElement)

    // Group for mouse interaction
    const group = new THREE.Group()
    scene.add(group)

    // Outer Tech Wireframe (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.6, isMobile ? 1 : 2)
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerMat)
    group.add(outerMesh)

    // Inner Geometric Core (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(0.9, 0)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    group.add(innerMesh)

    // Floating Particles (Constellation Nodes)
    const particleCount = isMobile ? 25 : 65
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5
      positions[i + 1] = (Math.random() - 0.5) * 5
      positions[i + 2] = (Math.random() - 0.5) * 3
    }
    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    const particlesMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: isMobile ? 0.03 : 0.045,
      transparent: true,
      opacity: 0.5,
    })
    const particles = new THREE.Points(particlesGeo, particlesMat)
    group.add(particles)

    // Mouse tracking with lerp
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetX = x * 0.4
      targetY = y * 0.3
    }

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // Resize handling
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Pause rendering when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // Animation Loop
    let animId = null
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      const delta = clock.getDelta()

      if (!prefersReducedMotion) {
        // Continuous subtle rotation
        outerMesh.rotation.y += delta * 0.12
        outerMesh.rotation.x += delta * 0.06
        innerMesh.rotation.y -= delta * 0.2
        innerMesh.rotation.z += delta * 0.1
        particles.rotation.y += delta * 0.04

        // Mouse tilt interpolation (smooth damp)
        mouseX += (targetX - mouseX) * 0.05
        mouseY += (targetY - mouseY) * 0.05
        group.rotation.y = mouseX
        group.rotation.x = -mouseY
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on unmount
    return () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()

      outerGeo.dispose()
      outerMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      particlesGeo.dispose()
      particlesMat.dispose()
      renderer.dispose()

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="three-canvas-container"
      aria-hidden="true"
    />
  )
}

export default ThreeCanvas
