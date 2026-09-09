/**
 * Normalizes and sanitizes dietary tags from meal data.
 * Guarantees that boolean false or "false" text is NEVER returned or rendered.
 *
 * @param {Array|boolean|string} isDietary
 * @returns {Array<string>} List of valid dietary labels
 */
export const getDietaryTags = (isDietary) => {
  if (isDietary === null || isDietary === undefined) {
    return [];
  }

  // Handle Boolean or String "true"/"false"
  if (typeof isDietary === "boolean") {
    return isDietary ? ["Dietary Friendly"] : [];
  }

  if (typeof isDietary === "string") {
    const trimmed = isDietary.trim();
    if (trimmed.toLowerCase() === "true") {
      return ["Dietary Friendly"];
    }
    if (trimmed.toLowerCase() === "false" || !trimmed) {
      return [];
    }
    return [trimmed];
  }

  // Handle Array
  if (Array.isArray(isDietary)) {
    return isDietary
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (typeof item === "boolean") return item ? "Dietary Friendly" : "";
        return item ? String(item).trim() : "";
      })
      .filter((item) => item && item.toLowerCase() !== "false" && item !== "false");
  }

  return [];
};

export default getDietaryTags;
