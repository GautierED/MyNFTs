const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const { layersOrder, format } = require("./config.js");
const Hash = require('ipfs-only-hash');

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

if (!process.env.PWD) {
  process.env.PWD = process.cwd();
}

const buildDirImages = `${process.env.PWD}/build/images`;
const buildDirMetadata = `${process.env.PWD}/build/metadata`;
const layersDir = `${process.env.PWD}/layers`;

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
let CID = [];
const Exists = new Map();

const cleanName = _str => {
  let name = _str.slice(0, -4);
  return name;
};

const getElements = path => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: cleanName(i),
        fileName: i
      };
    });
};

const layersSetup = layersOrder => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    name: layerObj.name,
    location: `${layersDir}/${layerObj.name}/`,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    position: { x: 0, y: 0 },
    size: { width: format.width, height: format.height },
    number: layerObj.number
  }));

  return layers;
};

const buildSetup = () => {
  if (fs.existsSync(buildDirImages)) {
    fs.rmdirSync(buildDirImages, { recursive: true });
  }
  fs.mkdirSync(buildDirImages);

  if (fs.existsSync(buildDirMetadata)) {
    fs.rmdirSync(buildDirMetadata, { recursive: true });
  }
  fs.mkdirSync(buildDirMetadata);
};

const saveLayer = (_canvas, _edition) => {
  fs.writeFileSync(`${buildDirImages}/${_edition}.png`, _canvas.toBuffer("image/png"));
};

hashCanvas = async (_canvas) => {
  buffer = await _canvas.toBuffer();
  const imageHash = await Hash.of(buffer);
  return imageHash
}

const addMetadata = _edition => {
  let tempMetadata = {
    image: 'ipfs://' + hash,
    attributes: attributes,
  };
  metadata.push(tempMetadata);
  attributes = [];
  hash = [];
  decodedHash = [];
};

const addAttributes = (_element, _layer) => {
  let tempAttr = {
    trait_type: _layer.name,
    value: _element.name,
  };
  attributes.push(tempAttr);
  hash.push(_layer.id);
  hash.push(_element.id);
  decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
  const rand = Math.random();
  let element =
    _layer.elements[Math.floor(rand * _layer.number)] ? _layer.elements[Math.floor(rand * _layer.number)] : null;
  if (element) {
    addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);

    ctx.drawImage(
      image,
      _layer.position.x,
      _layer.position.y,
      _layer.size.width,
      _layer.size.height
    );
    saveLayer(canvas, _edition);
  }
};

const createFiles = async edition => {
  const layers = layersSetup(layersOrder);

  let numDupes = 0;
 for (let i = 0; i < edition; i++) {
   await layers.forEach(async (layer) => {
     await drawLayer(layer, i);
   });

   let key = hash.toString();
   if (Exists.has(key)) {
     console.log(
       `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
         key
       )}`
     );
     numDupes++;
     if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
     i--;
   } else {
     console.log("Creating edition " + i);
     Exists.set(key, i);
     hash = await hashCanvas(canvas);
     console.log(hash);
     addMetadata(i);
     createMetaData(i, metadata[i]);
   }
 }
};

const createMetaData = (_edition, _metadata) => {
  fs.stat(`${buildDirMetadata}/${_edition}`, (err) => {
    if(err == null || err.code === 'ENOENT') {
      fs.writeFileSync(`${buildDirMetadata}/${_edition}`, JSON.stringify(_metadata));
    } else {
        console.log('Oh no, error: ', err.code);
    }
  });
};

module.exports = { buildSetup, createFiles, createMetaData };
