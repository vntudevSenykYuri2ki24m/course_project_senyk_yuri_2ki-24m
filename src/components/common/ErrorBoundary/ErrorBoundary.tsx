import React, { Component, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { withTranslation, WithTranslation } from "react-i18next";

interface ErrorBoundaryProps extends WithTranslation {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryComponent extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{ fontSize: "2rem", marginBottom: "1rem", color: "#111827" }}
          >
            {t("error.title")}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "2rem",
              color: "#6b7280",
              maxWidth: "500px",
            }}
          >
            {t("error.info")}
          </p>
          {this.state.error && (
            <details
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                backgroundColor: "#f3f4f6",
                borderRadius: "0.375rem",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "500" }}>
                {t("error.description")}
              </summary>
              <pre
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button onClick={this.handleReset}>{t("error.try_again")}</Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              {t("error.to_home")}
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
