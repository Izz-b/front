// This utility helps fix scrolling issues on mobile devices

export function applyScrollFix() {
    // Fix for iOS momentum scrolling
    document.addEventListener(
      "touchmove",
      (event) => {
        // Check if the element is scrollable
        const isScrollable = (el) => {
          const hasScrollableContent = el.scrollHeight > el.clientHeight
          const overflowYStyle = window.getComputedStyle(el).overflowY
          const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1
  
          return hasScrollableContent && !isOverflowHidden
        }
  
        // Find the scrollable parent
        let element = event.target
        while (element !== document.body && !isScrollable(element)) {
          element = element.parentNode
          if (!element) return
        }
  
        // If we've reached the body and nothing is scrollable, prevent default
        if (element === document.body) {
          // Allow the event only if the body needs scrolling
          if (document.body.scrollHeight <= window.innerHeight) {
            event.preventDefault()
          }
        }
      },
      { passive: false },
    )
  }
  