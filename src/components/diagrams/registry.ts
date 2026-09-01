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
import { IoUDiagram } from "./IoUDiagram"
import { VariogramDiagram } from "./VariogramDiagram"
import { LidarReturns } from "./LidarReturns"
import { SpatialIndexTree } from "./SpatialIndexTree"
import { LisaQuadrant } from "./LisaQuadrant"
import { TissotDistortion } from "./TissotDistortion"
import { TilePyramid } from "./TilePyramid"
import { FlightOverlap } from "./FlightOverlap"
import { RiskLayers } from "./RiskLayers"
import { TrilaterationCircles } from "./TrilaterationCircles"

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
  "iou": { Component: IoUDiagram, plate: "XIV" },
  "variogram": { Component: VariogramDiagram, plate: "XV" },
  "lidar-returns": { Component: LidarReturns, plate: "XVI" },
  "spatial-index-tree": { Component: SpatialIndexTree, plate: "XVII" },
  "lisa-quadrant": { Component: LisaQuadrant, plate: "XVIII" },
  "tissot-distortion": { Component: TissotDistortion, plate: "XIX" },
  "tile-pyramid": { Component: TilePyramid, plate: "XX" },
  "flight-overlap": { Component: FlightOverlap, plate: "XXI" },
  "risk-layers": { Component: RiskLayers, plate: "XXII" },
  "trilateration-circles": { Component: TrilaterationCircles, plate: "XXIII" },
} as const

export type DiagramName = keyof typeof diagramRegistry
