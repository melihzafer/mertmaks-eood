"use client";

import { useEffect, useState } from "react";
import { Camera, Compass, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findUsStrings } from "@/data/find-us-strings";
import { useCameraStream } from "@/hooks/useCameraStream";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { useGeolocation } from "@/hooks/useGeolocation";

interface Props {
  onReady: () => void;
  onCameraDenied: () => void;
  onGeoDenied: () => void;
  onCancel: () => void;
}

type Step = "camera" | "geo" | "compass" | "done";
type RowStatus = "idle" | "pending" | "done" | "error" | "action";

export function ARPreflight({ onReady, onCameraDenied, onGeoDenied, onCancel }: Props) {
  const [step, setStep] = useState<Step>("camera");
  const camera = useCameraStream();
  const geo = useGeolocation({ enabled: step !== "camera" });
  const orientation = useDeviceOrientation(step === "compass" || step === "done");

  useEffect(() => {
    void camera.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (camera.state.status === "active" && step === "camera") {
      camera.stop();
      setStep("geo");
    } else if (camera.state.status === "denied" || camera.state.status === "unsupported") {
      onCameraDenied();
    }
  }, [camera, step, onCameraDenied]);

  useEffect(() => {
    if (step !== "geo") return;
    if (geo.status === "granted") setStep("compass");
    else if (geo.status === "denied" || geo.status === "unsupported") onGeoDenied();
  }, [step, geo, onGeoDenied]);

  const needsCompassGesture = orientation.state.status === "needs-permission";

  useEffect(() => {
    if (step !== "compass") return;
    if (
      orientation.state.status === "granted" ||
      orientation.state.status === "calibrating" ||
      orientation.state.status === "unsupported"
    ) {
      setStep("done");
      onReady();
    }
  }, [step, orientation.state.status, onReady]);

  const cameraStatus: RowStatus =
    step === "camera"
      ? camera.state.status === "denied"
        ? "error"
        : "pending"
      : "done";

  const geoStatus: RowStatus =
    step === "camera"
      ? "idle"
      : step === "geo"
        ? geo.status === "denied"
          ? "error"
          : "pending"
        : "done";

  const compassStatus: RowStatus =
    step === "camera" || step === "geo"
      ? "idle"
      : step === "compass"
        ? needsCompassGesture
          ? "action"
          : "pending"
        : "done";

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-4 py-10">
      <Card className="p-6">
        <h1 className="text-2xl font-bold">{findUsStrings.preflightHeading}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {findUsStrings.preflightSubheading}
        </p>

        <ul className="mt-6 space-y-3">
          <PreflightRow
            icon={<Camera className="size-5" />}
            label={findUsStrings.requestingCamera}
            status={cameraStatus}
          />
          <PreflightRow
            icon={<MapPin className="size-5" />}
            label={findUsStrings.requestingGeo}
            status={geoStatus}
          />
          <PreflightRow
            icon={<Compass className="size-5" />}
            label={findUsStrings.requestingCompass}
            status={compassStatus}
          />
        </ul>

        <div className="mt-6 flex flex-col gap-2">
          {step === "compass" && needsCompassGesture && (
            <Button
              size="lg"
              className="min-h-11"
              onClick={() => {
                void orientation.request();
              }}
            >
              {findUsStrings.requestingCompass}
            </Button>
          )}
          <Button variant="ghost" size="lg" className="min-h-11" onClick={onCancel}>
            {findUsStrings.cancel}
          </Button>
        </div>
      </Card>
    </div>
  );
}

function PreflightRow({
  icon,
  label,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  status: RowStatus;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={[
          "grid size-9 place-items-center rounded-full",
          status === "done" ? "bg-emerald-500/20 text-emerald-700" : "",
          status === "pending" ? "bg-amber-500/20 text-amber-700" : "",
          status === "action" ? "bg-sky-500/20 text-sky-700" : "",
          status === "error" ? "bg-rose-500/20 text-rose-700" : "",
          status === "idle" ? "bg-muted text-muted-foreground" : "",
        ].join(" ")}
      >
        {status === "pending" ? <Loader2 className="size-5 animate-spin" /> : icon}
      </span>
      <span className="text-sm">{label}</span>
    </li>
  );
}
