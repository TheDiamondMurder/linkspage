const linksContainer = document.querySelector("#links");
const bio = document.querySelector("#bio");

function createLinkButton(link) {
  const item = document.createElement("a");
  item.className = "link-button";
  item.href = link.url;
  item.target = "_blank";
  item.rel = "noopener noreferrer";

  const label = document.createElement("span");
  label.className = "link-label";
  label.textContent = link.label;

  const description = document.createElement("span");
  description.className = "link-description";
  description.textContent = link.description || link.url;

  const arrow = document.createElement("span");
  arrow.className = "link-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "->";

  item.append(label, description, arrow);
  return item;
}

function renderLinks(data) {
  bio.textContent = data.bio || "";
  linksContainer.replaceChildren(...data.links.map(createLinkButton));
}

fetch("links.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load links.json");
    }

    return response.json();
  })
  .then(renderLinks)
  .catch(() => {
    bio.textContent = "Links are unavailable right now.";
    linksContainer.replaceChildren();
  });
