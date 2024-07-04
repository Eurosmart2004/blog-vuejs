const { React } = require("../models/index");
const mongoose = require("mongoose");

const addReact = async ({ blogId, userId, reactType }) => {
  try {
    const react = await React.findOne({ blogId, userId });
    if (react) {
      if (react.reactType === reactType) {
        await React.deleteOne({ blogId, userId });
        return null;
      }
      react.reactType = reactType;
      await react.save();
      return react;
    } else {
      const newReact = new React({
        _id: new mongoose.Types.ObjectId(),
        blogId,
        userId,
        reactType,
      });
      await newReact.save();
      return newReact;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getReact = async ({ blogId, userId }) => {
  try {
    const react = await React.findOne({ blogId, userId });
    return react;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async ({ blogId }) => {
  try {
    const reacts = await React.find({ blogId });

    const reactCounts = {};
    for (const react of reacts) {
      if (!reactCounts[react.reactType]) {
        reactCounts[react.reactType] = 0;
      }
      reactCounts[react.reactType]++;
    }

    const totalReacts = reacts.length;

    const reactPercentages = {};
    for (const reactType in reactCounts) {
      reactPercentages[reactType] =
        (reactCounts[reactType] / totalReacts) * 100;
    }

    const mostCommonReacts = {};
    for (const reactType in reactPercentages) {
      if (reactPercentages[reactType] > 30) {
        mostCommonReacts[reactType] = reactPercentages[reactType];
      }
    }
    if (Object.keys(mostCommonReacts).length === 0) {
      const sortedReactPercentages = Object.entries(reactPercentages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2);

      for (const [reactType, percentage] of sortedReactPercentages) {
        mostCommonReacts[reactType] = percentage;
      }
    }

    return { reacts, mostCommonReacts };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  addReact,
  getReact,
  getAll,
};
