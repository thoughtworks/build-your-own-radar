const InputSanitizer = require('../../src/util/inputSanitizer');

describe('InputSanitizer', () => {
  var sanitizer, rawBlip, blip;

  beforeAll(() => {
    sanitizer = new InputSanitizer();
    var description =
      "<b>Hello</b> <script>alert('dangerous');</script>there <h1>heading</h1>";
    rawBlip = {
      name: "Hello <script>alert('dangerous');</script>there <h1>blip</h1>",
      description: description,
      ring: '<a href="/asd">Adopt</a>',
      quadrant: '<strong>techniques and tools</strong>',
      isNew: 'true<br>',
    };

    blip = sanitizer.sanitize(rawBlip);
  });

  it('strips out script tags from blip descriptions', () => {
    expect(blip.description).toEqual('<b>Hello</b> there <h1>heading</h1>');
  });

  it('strips out all tags from blip name', () => {
    expect(blip.name).toEqual('Hello there blip');
  });

  it('strips out all tags from blip status', () => {
    expect(blip.isNew).toEqual('true');
  });

  it('strips out all tags from blip ring', () => {
    expect(blip.ring).toEqual('Adopt');
  });

  it('strips out all tags from blip quadrant', () => {
    expect(blip.quadrant).toEqual('techniques and tools');
  });

  it('trims white spaces in keys and values', () => {
    rawBlip = {
      ' name': '   Some name ',
      '   ring ': '    Some ring name ',
    };
    blip = sanitizer.sanitize(rawBlip);

    expect(blip.name).toEqual('Some name');
    expect(blip.ring).toEqual('Some ring name');
  });
});

describe('Input Santizer for Protected sheet', () => {
  var sanitizer, rawBlip, blip, header;
  beforeAll(() => {
    sanitizer = new InputSanitizer();
    header = ['name', 'quadrant', 'ring', 'isNew', 'description'];

    rawBlip = [
      "Hello <script>alert('dangerous');</script>there <h1>blip</h1>",
      '<strong>techniques & tools</strong>',
      "<a href='/asd'>Adopt</a>",
      'true<br>',
      "<b>Hello</b> <script>alert('dangerous');</script>there <h1>heading</h1>",
    ];

    blip = sanitizer.sanitizeForProtectedSheet(rawBlip, header);
  });

  it('strips out script tags from blip descriptions', () => {
    expect(blip.description).toEqual('<b>Hello</b> there <h1>heading</h1>');
  });

  it('strips out all tags from blip name', () => {
    expect(blip.name).toEqual('Hello there blip');
  });

  it('strips out all tags from blip status', () => {
    expect(blip.isNew).toEqual('true');
  });

  it('strips out all tags from blip ring', () => {
    expect(blip.ring).toEqual('Adopt');
  });

  it('strips out all tags from blip quadrant', () => {
    expect(blip.quadrant).toEqual('techniques & tools');
  });

  it('trims white spaces in keys and values', () => {
    rawBlip = {
      ' name': '   Some name ',
      '   ring ': '    Some ring name ',
    };
    blip = sanitizer.sanitize(rawBlip);

    expect(blip.name).toEqual('Some name');
    expect(blip.ring).toEqual('Some ring name');
  });

  it('should return blip with empty values if headers are empty', () => {
    const emptyHeader = [];
    const emptyBlip = sanitizer.sanitizeForProtectedSheet(rawBlip, emptyHeader);

    expect(emptyBlip).toStrictEqual({
      name: '',
      description: '',
      ring: '',
      quadrant: '',
      isNew: '',
    });
  });
});
