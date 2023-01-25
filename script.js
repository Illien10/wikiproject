// Select all links with hashes
const links = document.querySelectorAll('a[href*="#"]');

// Iterate through each link
for (const link of links) {
  // Add click event listener to each link
  link.addEventListener('click', function(e) {
    // Prevent default behavior of link
    e.preventDefault();

    // Get the target element's ID
    const targetId = link.getAttribute('href');

    // Get the target element
    const targetElement = document.querySelector(targetId);

    // Calculate the distance from the top of the page to the target element
    const targetPosition = targetElement.getBoundingClientRect().top;

    // Scroll to the target element
    window.scrollBy({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}