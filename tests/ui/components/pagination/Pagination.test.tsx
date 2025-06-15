import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Pagination from "@/src/ui/components/pagination";

describe("Pagination", () => {
  const setup = (props = {}) => {
    const onPageChange = jest.fn();
    render(
      <Pagination totalPages={5} onPageChange={onPageChange} type="even" {...props} />
    );
    return { onPageChange };
  };

  it("should render 5 page buttons", () => {
    setup();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();
  });

  it("calls onPageChange with correct real index for even type", () => {
    const { onPageChange } = setup({ type: "even" });
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it("calls onPageChange with correct real index for odd type", () => {
    const onPageChange = jest.fn();
    render(<Pagination totalPages={3} onPageChange={onPageChange} type="odd" />);
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disables previous button on first page", () => {
    setup();
    const prevBtn = screen.getByRole("button", { name: /previous/i });
    expect(prevBtn).toBeDisabled();
  });

  it("disables next button on last page", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "5" }));
    const nextBtn = screen.getByRole("button", { name: /next/i });
    expect(nextBtn).toBeDisabled();
  });

  it("navigates to next and previous pages", () => {
    const { onPageChange } = setup();

    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(onPageChange).toHaveBeenLastCalledWith(5);

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });

  it("highlights the current page", () => {
    setup();

    const page1 = screen.getByRole("button", { name: "1" });
    expect(page1).toHaveAttribute("aria-current", "page");
    
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    const page3 = screen.getByRole("button", { name: "3" });
    expect(page3).toHaveAttribute("aria-current", "page");
  });
});