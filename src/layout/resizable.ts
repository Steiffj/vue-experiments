export function makeResizable(
  element: HTMLElement,
  currentResizer: HTMLElement,
  direction: "left" | "right"
) {
  const minimum_size = 150;
  let original_width = 0;
  let original_height = 0;
  // let original_x = 0;
  // let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  currentResizer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    original_width = parseFloat(
      getComputedStyle(element).getPropertyValue("width").replace("px", "")
    );
    original_height = parseFloat(
      getComputedStyle(element).getPropertyValue("height").replace("px", "")
    );
    // original_x = element.getBoundingClientRect().left;
    // original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  function resize(e: MouseEvent) {
    if (direction === "left") {
      const width = original_width + (e.pageX - original_mouse_x);
      if (width > minimum_size) {
        element.style.width = `${width}px`;
      }
    }

    if (direction === "right") {
      const width = original_width - (e.pageX - original_mouse_x);
      if (width > minimum_size) {
        element.style.width = `${width}px`;
      }
    }
  }

  function stopResize() {
    window.removeEventListener("mousemove", resize);
  }
}
