/**
 * Added functionality to blip links
 *
 * Note: Disabled line 531 in '/src/graphing/radar.js' for conflicting class removal.
 */

const d3 = require("d3");

/**
 * Classnames and selectors
 */
const classNames = {
    expanded: "expanded",
  },
  selectors = {
    blipDesc: ".blip-item-description",
    blipLink: ".blip-link",
  };

/**
 * Clickhandlers for all the 'blips' on the radar
 */
function blipsClickHandlers() {
  const blips = document.querySelectorAll(selectors.blipLink);

  blips.forEach((element) => {
    element.addEventListener("click", (blip) => {
      const blipNr = element.id.split("-").pop();

      // When clicked on blip, remove active classes on all descriptions
      d3.selectAll(selectors.blipDesc).classed(classNames.expanded, false);
      // Open target description in list
      d3.select(`#blip-description-${blipNr}`)
        .node()
        .classList.add(classNames.expanded);
    });
  });
}

/**
 * Init
 */
window.onload = function () {
  blipsClickHandlers();
};
