const fs = "fs";
const path = "path";

const assetsList = fs.readdirSync(
  path.resolve(__dirname, "public/assets/plan")
);

const asssetsMap = {};
assetsList.forEach((item) => {
  const key = item.match(/.\w+/)[0];
  Object.assign(asssetsMap, {
    [key]: `plan/${item}`,
  });
});
fs.writeFileSync(
  path.resolve(__dirname, "src/config//asset_map.json"),
  JSON.stringify(asssetsMap)
);
