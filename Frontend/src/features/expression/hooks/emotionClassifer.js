export function detectEmotion(blendShapes) {
  const smile =
    ((blendShapes.mouthSmileLeft || 0) + (blendShapes.mouthSmileRight || 0)) /
    2;

  const jawOpen = blendShapes.jawOpen || 0;

  const browUp = blendShapes.browInnerUp || 0;

  const frown =
    ((blendShapes.mouthFrownLeft || 0) + (blendShapes.mouthFrownRight || 0)) /
    2;

  const browDown =
    ((blendShapes.browDownLeft || 0) + (blendShapes.browDownRight || 0)) / 2;

  console.log("Brown Down: ", browDown);
  console.log("Frown: ", frown);

  if (smile > 0.6) {
    return {
      emotion: "😊 Happy",
      confidence: smile,
    };
  }

  if (jawOpen > 0.55 && browUp > 0.35) {
    return {
      emotion: "😲 Surprised",
      confidence: jawOpen,
    };
  }

  if (frown > 0.035) {
    return {
      emotion: "😔 Sad",
      confidence: frown,
    };
  }

  if (browDown > 0.45) {
    return {
      emotion: "😠 Angry",
      confidence: browDown,
    };
  }

  return {
    emotion: "😐 Neutral",

    confidence: 1,
  };
}
