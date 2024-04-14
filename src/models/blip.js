const { graphConfig } = require('../graphing/config');
const IDEAL_BLIP_WIDTH = 22;
// biome-ignore lint/complexity/useArrowFunction: applying fix breaks the code
const Blip = function (name, ring, isNew, topic, description) {
  let self, blipText, isGroup, id, groupIdInGraph;

  self = {};
  isGroup = false;

  self.width = IDEAL_BLIP_WIDTH;

  self.name = () => name;

  self.id = () => id || -1;

  self.groupBlipWidth = () =>
    isNew ? graphConfig.newGroupBlipWidth : graphConfig.existingGroupBlipWidth;

  self.topic = () => topic || '';

  self.description = () => description || '';

  self.isNew = () => isNew;

  self.isGroup = () => isGroup;

  self.groupIdInGraph = () => groupIdInGraph || '';

  self.setGroupIdInGraph = (groupId) => {
    groupIdInGraph = groupId;
  };

  self.ring = () => ring;

  self.blipText = () => blipText || '';

  self.setBlipText = (newBlipText) => {
    blipText = newBlipText;
  };

  self.setId = (newId) => {
    id = newId;
  };

  self.setIsGroup = (isAGroupBlip) => {
    isGroup = isAGroupBlip;
  };

  return self;
};

module.exports = Blip;
