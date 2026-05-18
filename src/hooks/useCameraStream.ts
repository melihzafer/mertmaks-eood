"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CameraState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "unsupported" }
  | { status: "denied"; error: string }
  | { status: "active"; stream: MediaStream };

export interface UseCameraStream {
  state: CameraState;
  start: () => Promise<void>;
  stop: () => void;
}

/**
 * Wraps `getUserMedia({ video: { facingMode: 'environment' } })`.
 * Caller decides when to start (typically after a user gesture).
 * The stream is stopped on unmount to release the camera.
 */
export function useCameraStream(): UseCameraStream {
  const [state, setState] = useState<CameraState>({ status: "idle" });
  const streamRef = useRef<MediaStream | null>(null);

  const stop = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setState({ status: "idle" });
  }, []);

  const start = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setState({ status: "unsupported" });
      return;
    }
    if (streamRef.current) return;

    setState({ status: "pending" });
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setState({ status: "active", stream });
    } catch (error) {
      setState({
        status: "denied",
        error: error instanceof Error ? error.message : "Camera error",
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return { state, start, stop };
}
