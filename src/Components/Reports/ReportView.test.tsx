/**
 * Unit Tests: ReportView Component
 *
 * These tests cover:
 *  - Correct rendering of report data (title, timestamp, rows)
 *  - Validation: quantity input rejects non-numeric and negative values
 *  - Interactive features: Remove button calls onDelete with the correct food id
 *  - Quantity update: onUpdateQuantity is called with the correct id and parsed number
 *
 * Run with: npm run test:run
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ReportView } from "./ReportView";
import { ReportResult } from "./Report";

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------

const mockReport: ReportResult = {
  title: "Saved Foods Report",
  generatedAt: "6/29/2026, 10:00:00 AM",
  rows: [
    { id: 1, label: "Brown Rice", value: "2" },
    { id: 2, label: "Black Beans", value: "1" },
  ],
};

// ---------------------------------------------------------------------------
// Rendering tests
// ---------------------------------------------------------------------------

describe("ReportView rendering", () => {
  it("shows the empty message when report is null", () => {
    render(<ReportView report={null} emptyMessage="Nothing here yet." />);
    expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
  });

  it("renders the report title", () => {
    render(<ReportView report={mockReport} />);
    expect(screen.getByText("Saved Foods Report")).toBeInTheDocument();
  });

  it("renders the generatedAt timestamp", () => {
    render(<ReportView report={mockReport} />);
    expect(screen.getByText(/6\/29\/2026/)).toBeInTheDocument();
  });

  it("renders all food rows", () => {
    render(<ReportView report={mockReport} />);
    expect(screen.getByText("Brown Rice")).toBeInTheDocument();
    expect(screen.getByText("Black Beans")).toBeInTheDocument();
  });

  it("shows static quantity values when no callbacks are provided", () => {
    render(<ReportView report={mockReport} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    // No inputs should be present in non-interactive mode
    expect(screen.queryAllByRole("spinbutton")).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Delete (Remove button) tests
// ---------------------------------------------------------------------------

describe("ReportView — Remove button", () => {
  it("renders a Remove button for each row when onDelete is provided", () => {
    render(<ReportView report={mockReport} onDelete={vi.fn()} />);
    const removeButtons = screen.getAllByText("Remove");
    expect(removeButtons).toHaveLength(2);
  });

  it("calls onDelete with the correct food id when Remove is clicked", () => {
    const handleDelete = vi.fn();
    render(<ReportView report={mockReport} onDelete={handleDelete} />);

    const removeButtons = screen.getAllByText("Remove");
    // Click the Remove button on the first row (id: 1 — Brown Rice)
    fireEvent.click(removeButtons[0]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  it("does not render Remove buttons when onDelete is not provided", () => {
    render(<ReportView report={mockReport} />);
    expect(screen.queryByText("Remove")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Quantity input and validation tests
// ---------------------------------------------------------------------------

describe("ReportView — quantity input validation", () => {
  it("renders editable quantity inputs when onUpdateQuantity is provided", () => {
    render(
      <ReportView report={mockReport} onUpdateQuantity={vi.fn()} />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(2);
    expect((inputs[0] as HTMLInputElement).value).toBe("2");
    expect((inputs[1] as HTMLInputElement).value).toBe("1");
  });

  it("calls onUpdateQuantity with the correct id and new quantity on blur", () => {
    const handleUpdate = vi.fn();
    render(
      <ReportView report={mockReport} onUpdateQuantity={handleUpdate} />,
    );

    const inputs = screen.getAllByRole("spinbutton");
    // Change the first input (Brown Rice, id: 1) to 5 and blur
    fireEvent.change(inputs[0], { target: { value: "5" } });
    fireEvent.blur(inputs[0]);

    expect(handleUpdate).toHaveBeenCalledTimes(1);
    expect(handleUpdate).toHaveBeenCalledWith(1, 5);
  });

  it("does NOT call onUpdateQuantity if the value has not changed", () => {
    const handleUpdate = vi.fn();
    render(
      <ReportView report={mockReport} onUpdateQuantity={handleUpdate} />,
    );

    const inputs = screen.getAllByRole("spinbutton");
    // Blur without changing the value (still "2")
    fireEvent.blur(inputs[0]);

    expect(handleUpdate).not.toHaveBeenCalled();
  });

  it("resets the input to the original value when a non-numeric value is entered", () => {
    const handleUpdate = vi.fn();
    render(
      <ReportView report={mockReport} onUpdateQuantity={handleUpdate} />,
    );

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "abc" } });
    fireEvent.blur(inputs[0]);

    // Input should revert to "2" and onUpdateQuantity should NOT be called
    expect((inputs[0] as HTMLInputElement).value).toBe("2");
    expect(handleUpdate).not.toHaveBeenCalled();
  });

  it("rejects a negative quantity and resets to the original value", () => {
    const handleUpdate = vi.fn();
    render(
      <ReportView report={mockReport} onUpdateQuantity={handleUpdate} />,
    );

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "-5" } });
    fireEvent.blur(inputs[0]);

    expect((inputs[0] as HTMLInputElement).value).toBe("2");
    expect(handleUpdate).not.toHaveBeenCalled();
  });
});
