// Real API service for NanoToxi AI predictions
// Integrated with live backend at https://web-production-8aaeb.up.railway.app

interface PredictionRequest {
  nanoparticle_id?: string
  core_size: number
  zeta_potential: number
  surface_area: number
  bandgap_energy: number
  electric_charge?: number
  oxygen_atoms: number
  dosage: number
  exposure_time: number
  environmental_pH?: number
  protein_corona: boolean
}

interface Stage1Response {
  predicted_hydrodynamic_diameter: string
  aggregation_factor: string
  stability_assessment: string
}

interface Stage2Response {
  toxicity_prediction: string
  confidence: number
  risk_level: string
  composite_score: number
}

interface Stage3Response {
  ros_generation: string
  apoptosis_induction: string
  membrane_damage: string
  cell_viability: string
}

interface KeyFactors {
  material: string
  size_effect: string
  surface_reactivity: string
  environmental: string
}

interface APIResponse {
  success: boolean
  nanoparticle_id: string
  stage1: Stage1Response
  stage2: Stage2Response
  stage3: Stage3Response
  key_factors: KeyFactors
}

interface PredictionResponse {
  toxicity: string
  cytotoxicityEffects: string[]
  confidence: number
  keyDrivers: string[]
  citations: Citation[]
  rawData: any
  apiResponse: APIResponse
}

interface Citation {
  title: string
  journal: string
  year: number
}

const API_BASE_URL = 'https://web-production-8aaeb.up.railway.app'

const mockCitations: Citation[] = [
  {
    title: "Machine learning prediction of nanoparticle toxicity",
    journal: "Nature Nanotechnology",
    year: 2023
  },
  {
    title: "Physicochemical descriptors in nanomaterial risk assessment",
    journal: "Environmental Science & Technology",
    year: 2024
  },
  {
    title: "Cytotoxicity mechanisms of engineered nanoparticles",
    journal: "ACS Nano",
    year: 2023
  }
]

const transformFormDataToAPI = (formData: any): PredictionRequest => {
  return {
    nanoparticle_id: formData.nanoparticleId || 'NP-' + Date.now(),
    core_size: parseFloat(formData.coreSize),
    zeta_potential: parseFloat(formData.zetaPotential),
    surface_area: parseFloat(formData.surfaceArea),
    bandgap_energy: parseFloat(formData.bandgapEnergy),
    electric_charge: formData.oxygenAtoms ? parseFloat(formData.oxygenAtoms) : undefined,
    oxygen_atoms: parseFloat(formData.oxygenAtoms),
    dosage: parseFloat(formData.dosage),
    exposure_time: parseFloat(formData.exposureTime),
    environmental_pH: formData.environmentalPH ? parseFloat(formData.environmentalPH) : undefined,
    protein_corona: formData.proteinCorona === 'Present'
  }
}

const transformAPIResponse = (apiResponse: APIResponse, originalData: any): PredictionResponse => {
  // Extract cytotoxicity effects from stage3
  const cytotoxicityEffects = [
    `ROS Generation: ${apiResponse.stage3.ros_generation}`,
    `Apoptosis Induction: ${apiResponse.stage3.apoptosis_induction}`,
    `Membrane Damage: ${apiResponse.stage3.membrane_damage}`,
    `Cell Viability: ${apiResponse.stage3.cell_viability}`
  ]

  // Extract key drivers from key_factors
  const keyDrivers = [
    `Material Effect: ${apiResponse.key_factors.material}`,
    `Size Effect: ${apiResponse.key_factors.size_effect}`,
    `Surface Reactivity: ${apiResponse.key_factors.surface_reactivity}`,
    `Environmental: ${apiResponse.key_factors.environmental}`
  ]

  return {
    toxicity: apiResponse.stage2.toxicity_prediction,
    cytotoxicityEffects,
    confidence: apiResponse.stage2.confidence,
    keyDrivers,
    citations: mockCitations,
    rawData: originalData,
    apiResponse
  }
}

export const predictionService = {
  async predict(formData: any): Promise<PredictionResponse> {
    try {
      const apiData = transformFormDataToAPI(formData)
      
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const apiResponse: APIResponse = await response.json()
      
      if (!apiResponse.success) {
        throw new Error('Prediction failed on server')
      }

      return transformAPIResponse(apiResponse, formData)
    } catch (error) {
      console.error('Prediction API error:', error)
      throw new Error('Failed to get prediction. Please check your connection and try again.')
    }
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      return response.ok
    } catch (error) {
      console.error('Health check failed:', error)
      return false
    }
  }
}

export const contactService = {
  async submitContact(contactData: any): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          attachment: contactData.attachment ? contactData.attachment.name : null
        })
      })

      if (!response.ok) {
        throw new Error(`Contact submission failed: ${response.status}`)
      }

      const result = await response.json()
      return { success: true, message: 'Message sent successfully!' }
    } catch (error) {
      console.error('Contact API error:', error)
      return { success: false, message: 'Failed to send message. Please try again.' }
    }
  }
}