const $ = require('jquery')
require('jquery-ui/ui/widgets/autocomplete')

const AutoComplete = (el, quadrants, cb) => {
  const blips = quadrants.reduce((acc, quadrant) => {
    return [...acc, ...quadrant.quadrant.blips().map((blip) => ({ blip, quadrant }))]
  }, [])

  $(el).autocomplete({
    appendTo: '.search-container',
    source: (request, response) => {
      const matches = blips.filter(({ blip }) => {
        const searchable = `${blip.name()} ${blip.description()}`.toLowerCase()
        return request.term.split(' ').every((term) => searchable.includes(term.toLowerCase()))
      })
      response(matches.map((item) => ({ ...item, value: item.blip.name() })))
    },
    select: cb.bind({}),
  })
}

module.exports = AutoComplete
