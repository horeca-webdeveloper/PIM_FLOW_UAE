const formatAttributeName = (attributeName) => {
  return attributeName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_") // replaces all non-alphanumeric characters with "_"
    .replace(/_+/g, "_")        // collapses multiple underscores
    .replace(/^_+|_+$/g, "");   // trims leading/trailing underscores
};


export const utilsFn={
    formatAttributeName
}