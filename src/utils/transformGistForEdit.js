export default function transformGistForEdit(gistAllData){
    var transformed = { description: null, files: [] };
    transformed.description = gistAllData.description;
    Object.keys(gistAllData.files).forEach((file) =>
      transformed.files.push({
        filename: file,
        content: gistAllData.files[file].content,
      })
    );
    return transformed;
}