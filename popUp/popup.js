function getReadingTime() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "getReadingTime" },
      (response) => {
        if (chrome.runtime.lastError) {
          document.getElementById("reading-time").innerText =
            "Error: Unable to retrieve reading time.";
          return;
        }

        const { wordCount, readingTime } = response;
        if (wordCount === 0) {
          document.getElementById("reading-time").innerText =
            "No readable text found.";
        } else {
          document.getElementById(
            "reading-time"
          ).innerText = `⏱️ ${readingTime} min read (${wordCount} words)`;
        }
      }
    );
  });
}

// Run when popup loads
getReadingTime();
