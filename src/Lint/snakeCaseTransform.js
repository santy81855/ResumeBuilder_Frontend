module.exports = function (file, api) {
    const j = api.jscodeshift;
    const root = j(file.source);

    root.find(j.Identifier).forEach((path) => {
        const { name } = path.node;

        // Only transform class names
        if (path.parentPath.parentPath.value.name === "className") {
            const snakeCaseName = name.replace(
                /[A-Z]/g,
                (match) => `_${match.toLowerCase()}`
            );
            j(path).replaceWith(j.identifier(snakeCaseName));
        }
    });

    return root.toSource();
};
