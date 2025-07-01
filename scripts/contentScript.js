// Function to calculate reading time from article or entire page

 // ✅ Function to calculate reading time
function calculateReadingTime() {
  // ✅ Check if there's an <article>, otherwise use the entire body
  const target = document.querySelector("article") || document.body;

  // ✅ Extract text content
  const text = target.textContent || "";

  // ✅ Count words using regex (matches all non-whitespace sequences)
  const words = text.match(/\S+/g) || [];
  const wordCount = words.length;

  // ✅ Calculate reading time assuming 200 words per minute
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  // ✅ Return the result
  return { wordCount, readingTime };
}

// ✅ Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getReadingTime") {
    const result = calculateReadingTime();
    sendResponse(result); // ✅ Send reading time data back to popup
  }
});

