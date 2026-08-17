import { CoordinateSystems } from "./CoordinateSystems"
import { VectorRaster } from "./VectorRaster"
import { EmSpectrum } from "./EmSpectrum"
import { ReflectanceCurve } from "./ReflectanceCurve"
import { NdviScale } from "./NdviScale"
import { SpatialOperations } from "./SpatialOperations"
import { WorkflowTp } from "./WorkflowTp"
import { KernelConvolution } from "./KernelConvolution"
import { ClassificationMethods } from "./ClassificationMethods"
import { NeuralNetwork } from "./NeuralNetwork"
import { CartographyTimeline } from "./CartographyTimeline"
import { SpectralSignatures } from "./SpectralSignatures"
import { DissertationPlan } from "./DissertationPlan"

export const diagramRegistry = {
  "coordinate-systems": { Component: CoordinateSystems, plate: "I" },
  "vector-raster": { Component: VectorRaster, plate: "II" },
  "em-spectrum": { Component: EmSpectrum, plate: "III" },
  "reflectance-curve": { Component: ReflectanceCurve, plate: "IV" },
  "ndvi-scale": { Component: NdviScale, plate: "V" },
  "spatial-operations": { Component: SpatialOperations, plate: "VI" },
  "workflow-tp": { Component: WorkflowTp, plate: "VII" },
  "kernel-convolution": { Component: KernelConvolution, plate: "VIII" },
  "classification-methods": { Component: ClassificationMethods, plate: "IX" },
  "neural-network": { Component: NeuralNetwork, plate: "X" },
  "cartography-timeline": { Component: CartographyTimeline, plate: "XI" },
  "spectral-signatures": { Component: SpectralSignatures, plate: "XII" },
  "dissertation-plan": { Component: DissertationPlan, plate: "XIII" },
} as const

export type DiagramName = keyof typeof diagramRegistry
