function renderButtons(radarFooter) {
  const buttonsRow = radarFooter.append('div').classed('buttons', true)

  buttonsRow
    .append('button')
    .classed('buttons__wave-btn', true)
    .text('Print this Radar')
    .on('click', window.print.bind(window))

  buttonsRow
    .append('a')
    .classed('buttons__flamingo-btn', true)
    .attr('href', window.location.href.substring(0, window.location.href.indexOf(window.location.search)))
    .text('Generate new Radar')
}

module.exports = {
  renderButtons,
}
