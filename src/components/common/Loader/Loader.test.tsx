import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader", () => {
    test("відображає лоадер із стандартним розміром medium", () => {
        render(<Loader />);

        const loaderElement = document.querySelector(`.loader.medium`);
        expect(loaderElement).toBeInTheDocument();
    });

    test("відображає лоадер із розміром small", () => {
        render(<Loader size="small" />);

        const loaderElement = document.querySelector(`.loader.small`);
        expect(loaderElement).toBeInTheDocument();
    });

    test("відображає лоадер із розміром large", () => {
        render(<Loader size="large" />);

        const loaderElement = document.querySelector(`.loader.large`);
        expect(loaderElement).toBeInTheDocument();
    });

    test("відображає повідомлення, коли воно передано", () => {
        const testMessage = "Завантаження...";
        render(<Loader message={testMessage} />);

        const messageElement = screen.getByText(testMessage);
        expect(messageElement).toBeInTheDocument();
        expect(messageElement).toHaveClass("message");
    });

    test("не відображає повідомлення, коли воно не передано", () => {
        render(<Loader />);

        const messageElement = document.querySelector(".message");
        expect(messageElement).not.toBeInTheDocument();
    });

    test("відображає лоадер із fullScreen оверлеєм, коли fullScreen=true", () => {
        render(<Loader fullScreen />);

        const overlayElement = document.querySelector(".fullScreenOverlay");
        expect(overlayElement).toBeInTheDocument();
    });

    test("не відображає fullScreen оверлей, коли fullScreen=false", () => {
        render(<Loader fullScreen={false} />);

        const overlayElement = document.querySelector(".fullScreenOverlay");
        expect(overlayElement).not.toBeInTheDocument();
    });

    test("відображає fullScreen лоадер із повідомленням", () => {
        const testMessage = "Будь ласка, зачекайте...";
        render(<Loader fullScreen message={testMessage} />);

        const overlayElement = document.querySelector(".fullScreenOverlay");
        expect(overlayElement).toBeInTheDocument();

        const messageElement = screen.getByText(testMessage);
        expect(messageElement).toBeInTheDocument();
    });

    test("містить елемент спінера", () => {
        render(<Loader />);

        const spinnerElement = document.querySelector(".spinner");
        expect(spinnerElement).toBeInTheDocument();
    });
});