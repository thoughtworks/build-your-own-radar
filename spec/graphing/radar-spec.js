// This references very old code that no longer exists
// some tests for graphing will have to be rewritten
const RadarGraph = require('../../src/graphing/radar.js')
const Radar = require('../../src/models/radar')
const Ring = require('../../src/models/ring')
const Quadrant = require('../../src/models/quadrant')
const d3 = require('d3')

describe('Graphing radar', function () {
  var radar

  beforeEach(function () {
    radar = new Radar();
    spyOn(radar, 'rings').and.returnValue([])
  })


  describe('init', function () {
    it('appends the div', function () {
      var radarGraph

      radarGraph = new RadarGraph(500, radar)
      
      radarGraph.init()
      expect(getDiv()).not.toBeNull()
    })

    it('selects body if no selector provided', function () {
      var radarGraph

      radarGraph = new RadarGraph(500, radar)

      radarGraph.init()
      expect(getBody()).not.toBeNull()
    })

    it('selects the selector if provided', function () {
      var radarGraph

      radarGraph = new RadarGraph(500, radar)

      radarGraph.init('#radar')

      expect(getDiv().attr('id')).toBe('radar')
    })
  })

  it('sets the size', function () {
    var svg, radarGraph

    radar.addQuadrant(new Quadrant('Adopt'))
    radar.addQuadrant(new Quadrant('Tools'))
    radar.addQuadrant(new Quadrant('Language'))
    radar.addQuadrant(new Quadrant('Frameworks'))
    
    radarGraph = new RadarGraph(500, radar)
    radarGraph.init()

    radarGraph.plot()
    svg = getSvg()

    expect(svg.attr('width')).toBe(500)
    expect(svg.attr('height')).toBe(500)
  }).pend('There are still some problems with JQuery in this test')

  describe('lines', function () {
    it('plots a vertical line in the center', function () {
      var radarGraph, svg

      radarGraph = new RadarGraph(500, radar)
      radarGraph.init()

      svg = radarGraph.svg()
      spyOn(svg, 'append').and.returnValue(svg)
      spyOn(svg, 'attr').and.returnValue(svg)

      radarGraph.plot()

      expect(svg.append).toHaveBeenCalledWith('line')
      expect(svg.attr).toHaveBeenCalledWith('x1', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('y1', 0)
      expect(svg.attr).toHaveBeenCalledWith('x2', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('y2', 500)
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 14)
    }).pend('This references very old code that no longer exists the tests for graphing will have to be rewritten')

    it('plots a horizontal line in the center', function () {
      var svg, radarGraph

      radarGraph = new RadarGraph(500, radar)
      radarGraph.init()

      svg = radarGraph.svg()
      spyOn(svg, 'append').and.returnValue(svg)
      spyOn(svg, 'attr').and.returnValue(svg)

      radarGraph.plot()

      expect(svg.append).toHaveBeenCalledWith('line')
      expect(svg.attr).toHaveBeenCalledWith('x1', 0)
      expect(svg.attr).toHaveBeenCalledWith('y1', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('x2', 500)
      expect(svg.attr).toHaveBeenCalledWith('y2', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 14)
    }).pend('This references very old code that no longer exists the tests for graphing will have to be rewritten')
  })

  describe('circles', function () {
    var svg, radarGraph

    beforeEach(function () {
      var radar

      radar = new Radar()
      spyOn(radar, 'rings').and.returnValue([
        new Ring('Adopt'),
        new Ring('Hold')
      ])
      radarGraph = new RadarGraph(500, radar)
      radarGraph.init()

      svg = radarGraph.svg()
      spyOn(svg, 'append').and.returnValue(svg)
      spyOn(svg, 'attr').and.returnValue(svg)
    })

    it('plots the circles for the rings', function () {
      radarGraph.plot()

      expect(svg.append).toHaveBeenCalledWith('circle')
      expect(svg.attr).toHaveBeenCalledWith('cx', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('cy', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('r', Math.round(250 / 2))

      expect(svg.append).toHaveBeenCalledWith('circle')
      expect(svg.attr).toHaveBeenCalledWith('cx', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('cy', 500 / 2)
      expect(svg.attr).toHaveBeenCalledWith('r', 250)
    }).pend('This references very old code that no longer exists the tests for graphing will have to be rewritten')

    it('adds the name of each ring for the right side', function () {
      var center = 500 / 2
      spyOn(svg, 'text').and.returnValue(svg)
      radarGraph.plot()

      expect(svg.append).toHaveBeenCalledWith('text')
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4)
      expect(svg.attr).toHaveBeenCalledWith('x', 0 + 10)
      expect(svg.text).toHaveBeenCalledWith('Adopt')

      expect(svg.append).toHaveBeenCalledWith('text')
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4)
      expect(svg.attr).toHaveBeenCalledWith('x', 0 + (center / 2) + 10)
      expect(svg.text).toHaveBeenCalledWith('Hold')
    }).pend('This references very old code that no longer exists the tests for graphing will have to be rewritten')

    it('adds the name of each ring for the right side', function () {
      var center = 500 / 2
      spyOn(svg, 'text').and.returnValue(svg)
      radarGraph.plot()

      expect(svg.append).toHaveBeenCalledWith('text')
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4)
      expect(svg.attr).toHaveBeenCalledWith('x', 500 - 10)
      expect(svg.attr).toHaveBeenCalledWith('text-anchor', 'end')
      expect(svg.text).toHaveBeenCalledWith('Adopt')

      expect(svg.append).toHaveBeenCalledWith('text')
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4)
      expect(svg.attr).toHaveBeenCalledWith('x', 500 - (center / 2) - 10)
      expect(svg.attr).toHaveBeenCalledWith('text-anchor', 'end')
      expect(svg.text).toHaveBeenCalledWith('Hold')
    }).pend('This references very old code that no longer exists the tests for graphing will have to be rewritten')
  })

  function getDiv() {
    return d3.select('div')
  }

  function getBody() {
    return d3.select('body')
  }

  function getSvg() {
    return d3.select('svg')
  }
});
