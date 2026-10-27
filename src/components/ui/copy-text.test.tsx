import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyText } from "@/components/ui/copy-text";

describe("copyable participant context", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("copies exactly the visible context", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<CopyText text="Reviewed track context" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy context" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copied."),
    );
    expect(writeText).toHaveBeenCalledWith("Reviewed track context");
    expect(screen.getByRole("textbox")).toHaveValue("Reviewed track context");
  });
  it("keeps the text selectable and shows recovery when clipboard access fails", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    render(<CopyText text="Submission requirements" label="Copy checklist" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy checklist" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Select the text below",
      ),
    );
    expect(
      screen.getByRole("textbox", { name: "Submission checklist" }),
    ).toHaveValue("Submission requirements");
  });
});
