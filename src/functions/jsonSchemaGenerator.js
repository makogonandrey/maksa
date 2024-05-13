export function generateJsonSchema(jsonData) {
    const schema = [];
  
    function traverseObject(obj, path = "") {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
  
        if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] !== "object" && !Array.isArray(value[0])) {
            schema.push({
              path: `${currentPath}[]`,
              type: "array",
              valueOptions: Array.prototype,
            });
            schema.push({
              path: `${currentPath}[].[n]`,
              type: typeof value[0],
              valueOptions: Array.from(new Set(value)).map(String),
            });
          } else {
            schema.push({
              path: `${currentPath}[]`,
              type: "array",
              valueOptions: Array.prototype,
            });
            if (value.length > 0) {
              traverseObject(value[0], `${currentPath}[]`);
            }
          }
        } else if (typeof value === "object" && value !== null) {
          schema.push({
            path: currentPath,
            type: "object",
            valueOptions: Array.prototype,
          });
          traverseObject(value, currentPath);
        } else if (value === null) {
          schema.push({
            path: currentPath,
            type: "null",
            valueOptions: Array.prototype,
          });
        } else if (value === undefined) {
          schema.push({
            path: currentPath,
            type: "undefined",
            valueOptions: Array.prototype,
          });
        } else {
          schema.push({
            path: currentPath,
            type: typeof value,
            valueOptions: Array.from(new Set([value])).map(String),
          });
        }
      }
    }
  
    traverseObject(jsonData);
    return schema;
  }