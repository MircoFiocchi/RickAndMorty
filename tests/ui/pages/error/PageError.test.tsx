import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { useRouter } from "next/navigation";

import ErrorPage from "@/src/ui/pages/error";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("lottie-react", () => ({
  __esModule: true,
  default: ({ animationData, ...props }: any) => (
    <div data-testid="lottie-mock" {...props} />
  ),
}));

describe("ErrorPage", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
  });

  it("renders 404 error page when is404 is true", () => {
    render(<ErrorPage is404 />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page not found.")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to home/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("lottie-mock")).toBeInTheDocument();
  });

  it("renders generic error page when is404 is false", () => {
    render(<ErrorPage />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("An error occurred.")).toBeInTheDocument();
    expect(screen.getByText("Please try again.")).toBeInTheDocument();
  });

  it("redirects to home when button is clicked", () => {
    render(<ErrorPage />);
    const button = screen.getByRole("button", { name: /go to home/i });
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
