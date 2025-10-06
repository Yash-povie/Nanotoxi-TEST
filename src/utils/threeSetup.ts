import * as THREE from 'three'

export class ThreeJSScene {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private animationId: number | null = null

  constructor(container: HTMLElement) {
    // Initialize scene
    this.scene = new THREE.Scene()

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    this.camera.position.z = 5

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setClearColor(0x000000, 0) // Transparent background
    container.appendChild(this.renderer.domElement)

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  private handleResize() {
    const container = this.renderer.domElement.parentElement
    if (!container) return

    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(container.clientWidth, container.clientHeight)
  }

  // Add objects to scene
  addToScene(object: THREE.Object3D) {
    this.scene.add(object)
  }

  // Remove objects from scene
  removeFromScene(object: THREE.Object3D) {
    this.scene.remove(object)
  }

  // Start animation loop
  startAnimation(animateCallback?: () => void) {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate)
      
      if (animateCallback) {
        animateCallback()
      }
      
      this.renderer.render(this.scene, this.camera)
    }
    animate()
  }

  // Stop animation loop
  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  // Clean up resources
  dispose() {
    this.stopAnimation()
    window.removeEventListener('resize', this.handleResize.bind(this))
    
    // Dispose of renderer
    this.renderer.dispose()
    
    // Remove canvas from DOM
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
    }
  }

  // Getters for direct access
  getScene() { return this.scene }
  getCamera() { return this.camera }
  getRenderer() { return this.renderer }
}

// Helper function to create basic geometries
export const createBasicMesh = (
  geometry: THREE.BufferGeometry,
  color: number = 0x00ff00,
  wireframe: boolean = false
): THREE.Mesh => {
  const material = new THREE.MeshBasicMaterial({ 
    color, 
    wireframe,
    transparent: true,
    opacity: 0.8
  })
  return new THREE.Mesh(geometry, material)
}

// Helper function to create a basic cube
export const createCube = (size: number = 1, color: number = 0x00ff00): THREE.Mesh => {
  const geometry = new THREE.BoxGeometry(size, size, size)
  return createBasicMesh(geometry, color)
}

// Helper function to create a basic sphere
export const createSphere = (radius: number = 1, color: number = 0x0077ff): THREE.Mesh => {
  const geometry = new THREE.SphereGeometry(radius, 32, 32)
  return createBasicMesh(geometry, color)
}

// Helper function to create a basic torus (donut shape)
export const createTorus = (radius: number = 1, tube: number = 0.4, color: number = 0xff7700): THREE.Mesh => {
  const geometry = new THREE.TorusGeometry(radius, tube, 16, 100)
  return createBasicMesh(geometry, color)
}