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
    environmental_pH: formData.environmentalPH ? parseFloat(formData.environmentalPH) : 7.4,
    protein_corona: formData.proteinCorona === 'Present'
  }
}

const transformAPIResponse = (apiResponse: APIResponse, originalData: any): PredictionResponse => {
  // Helper function to classify cytotoxicity levels
  const classifyCytotoxicity = (value: string): string => {
    const val = value.toLowerCase()
    if (val.includes('high') || val.includes('severe') || val.includes('strong')) return 'Cytotoxic'
    if (val.includes('medium') || val.includes('moderate') || val.includes('mild')) return 'Moderately Cytotoxic'
    if (val.includes('low') || val.includes('minimal') || val.includes('weak') || val.includes('none')) return 'Non-Cytotoxic'
    return 'Unknown'
  }

  // Extract cytotoxicity effects from stage3
  const cytotoxicityEffects: CytotoxicityEffect[] = [
    {
      mechanism: 'ROS Generation',
      level: classifyCytotoxicity(apiResponse.stage3.ros_generation)
    },
    {
      mechanism: 'Apoptosis Induction', 
      level: classifyCytotoxicity(apiResponse.stage3.apoptosis_induction)
    },
    {
      mechanism: 'Membrane Damage',
      level: classifyCytotoxicity(apiResponse.stage3.membrane_damage)
    },
    {
      mechanism: 'Cell Viability',
      level: classifyCytotoxicity(apiResponse.stage3.cell_viability)
    }
  ]

  // Extract key drivers from key_factors
  const keyDrivers = [
    `Material Effect: ${apiResponse.key_factors.material}`,
    `Size Effect: ${apiResponse.key_factors.size_effect}`,
    `Surface Reactivity: ${apiResponse.key_factors.surface_reactivity}`,
    `Environmental: ${apiResponse.key_factors.environmental}`
  ]

  // Determine hydrodynamic diameter to display
  const displayHydrodynamicDiameter = originalData.hydrodynamicDiameter 
    ? parseFloat(originalData.hydrodynamicDiameter)
    : parseFloat(apiResponse.stage1.predicted_hydrodynamic_diameter)

  return {
    toxicity: apiResponse.stage2.toxicity_prediction,
    cytotoxicityEffects,
    confidence: apiResponse.stage2.confidence,
    keyDrivers,
    citations: mockCitations,
    rawData: originalData,
    apiResponse,
    hydrodynamicDiameter: displayHydrodynamicDiameter
  }
}

export const predictionService = {
  async predict(formData: any): Promise<PredictionResponse> {
    try {
      const apiData = transformFormDataToAPI(formData)
      
      console.log('Sending prediction request:', apiData)
      
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const apiResponse: APIResponse = await response.json()
      console.log('API Response:', apiResponse)
      
      if (!apiResponse.success) {
        throw new Error('Prediction failed on server')
      }

      return transformAPIResponse(apiResponse, formData)
    } catch (error) {
      console.error('Prediction API error:', error)
      
      // Provide fallback mock response for development
      const mockResponse: PredictionResponse = {
        toxicity: 'Toxic',
        cytotoxicityEffects: [
          'ROS Generation: High',
          'Apoptosis Induction: Medium',
          'Membrane Damage: High',
          'Cell Viability: Low'
        ],
        confidence: 0.85,
        keyDrivers: [
          'High dosage',
          'Small core size',
          'Extended exposure',
          'Surface reactivity'
        ],
        citations: mockCitations,
        rawData: formData,
        apiResponse: {
          success: true,
          nanoparticle_id: formData.nanoparticleId || 'NP-' + Date.now(),
          stage1: {
            predicted_hydrodynamic_diameter: '45.2',
            aggregation_factor: '1.5x',
            stability_assessment: 'MODERATE STABILITY'
          },
          stage2: {
            toxicity_prediction: 'TOXIC',
            confidence: 0.85,
            risk_level: 'HIGH RISK',
            composite_score: 0.78
          },
          stage3: {
            ros_generation: 'HIGH',
            apoptosis_induction: 'MEDIUM',
            membrane_damage: 'HIGH',
            cell_viability: 'LOW'
          },
          key_factors: {
            material: '85.0%',
            size_effect: 'HIGH',
            surface_reactivity: 'MODERATE',
            environmental: 'UNFAVORABLE'
          }
        }
      }
      
      console.log('Using fallback mock response')
      return mockResponse
    }
  },

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
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