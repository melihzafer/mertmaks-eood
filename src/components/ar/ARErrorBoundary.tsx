"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findUsStrings } from "@/data/find-us-strings";

interface Props {
  onReset: () => void;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ARErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("[AR] boundary caught:", error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    this.props.onReset();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-4 py-10">
        <Card className="p-6 text-center">
          <AlertOctagon className="mx-auto size-10 text-rose-600" />
          <h1 className="mt-3 text-xl font-bold">{findUsStrings.errorHeading}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{findUsStrings.errorBody}</p>
          <Button size="lg" className="mt-5 min-h-11 w-full" onClick={this.handleReset}>
            {findUsStrings.retry}
          </Button>
        </Card>
      </div>
    );
  }
}
