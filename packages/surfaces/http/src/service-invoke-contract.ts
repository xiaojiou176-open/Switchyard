import type { LaneId } from "../../../contracts/src/index.js";

export interface ServiceSurfaceResponse {
  status: number;
  body: unknown;
  headers?: Record<string, string>;
}

export interface ServiceInvokeDiagnostic {
  code?: string;
  message: string;
}

export interface ServiceInvokeSuccess {
  ok: true;
  laneId: LaneId;
  providerId: string;
  modelId: string;
  outputText: string;
  diagnostics: ServiceInvokeDiagnostic[];
  details?: Record<string, unknown>;
}

export interface ServiceInvokeFailure {
  ok: false;
  laneId: LaneId;
  providerId: string;
  modelId: string;
  httpStatus: number;
  errorType: string;
  message: string;
  diagnostics: ServiceInvokeDiagnostic[];
  suggestedAction?: string;
  details?: Record<string, unknown>;
}

export type ServiceInvokeResult = ServiceInvokeSuccess | ServiceInvokeFailure;
