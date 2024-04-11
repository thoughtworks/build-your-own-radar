const Blip = require('../../src/models/blip');
const Ring = require('../../src/models/ring');
const { graphConfig } = require('../../src/graphing/config');

describe('Blip', () => {
  let blip;

  beforeEach(() => {
    blip = new Blip('My Blip', new Ring('My Ring'));
  });

  it('has a name', () => {
    expect(blip.name()).toEqual('My Blip');
  });

  it('has a topic', () => {
    blip = new Blip(
      'My Blip',
      new Ring('My Ring'),
      true,
      'topic',
      'description',
    );

    expect(blip.topic()).toEqual('topic');
  });

  it('has empty topic when not provided', () => {
    expect(blip.topic()).toEqual('');
  });

  it('has a description', () => {
    blip = new Blip(
      'My Blip',
      new Ring('My Ring'),
      true,
      'topic',
      'description',
    );

    expect(blip.description()).toEqual('description');
  });

  it('has empty description when not provided', () => {
    expect(blip.description()).toEqual('');
  });

  it('has a ring', () => {
    expect(blip.ring().name()).toEqual('My Ring');
  });

  it('has a default blip text', () => {
    expect(blip.blipText()).toEqual('');
  });

  it('sets the blip text', () => {
    blip.setBlipText('blip text1');
    expect(blip.blipText()).toEqual('blip text1');
  });

  it('has a default blip id', () => {
    expect(blip.id()).toEqual(-1);
  });

  it('sets the blip id', () => {
    blip.setId(123);
    expect(blip.id()).toEqual(123);
  });

  it('is new', () => {
    blip = new Blip('My Blip', new Ring('My Ring'), true);

    expect(blip.isNew()).toBe(true);
  });

  it('is not new', () => {
    blip = new Blip('My Blip', new Ring('My Ring'), false);

    expect(blip.isNew()).toBe(false);
  });

  it('has false as default value for isGroup', () => {
    expect(blip.isGroup()).toEqual(false);
  });

  it('sets the blip group', () => {
    blip.setIsGroup(true);
    expect(blip.isGroup()).toEqual(true);
  });

  it('has blank group id by default', () => {
    expect(blip.groupIdInGraph()).toEqual('');
  });

  it('sets the group id as passed value', () => {
    blip.setGroupIdInGraph('group-id-value');
    expect(blip.groupIdInGraph()).toEqual('group-id-value');
  });

  it('get respective group blip width', () => {
    const existingBlip = new Blip('My Blip', new Ring('My Ring'), false);
    const newBlip = new Blip('My Blip', new Ring('My Ring'), true);

    expect(existingBlip.groupBlipWidth()).toEqual(
      graphConfig.existingGroupBlipWidth,
    );
    expect(newBlip.groupBlipWidth()).toEqual(graphConfig.newGroupBlipWidth);
  });
});
