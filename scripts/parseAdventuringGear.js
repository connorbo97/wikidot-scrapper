
const parseCost = raw => {
  const split = raw.split(' ')
  let cost = parseInt(split[0]);

  if (isNaN(cost)) {
    return null;
  }

  const unit = (split[1] || '').toLowerCase();

  if (!split) {
    return null;
  }
  
  switch(unit) {
    case 'sp':
      cost = cost * .1;
      break;
    case 'cp':
      cost = cost * .01;
      break;
    default:
  }
  return cost
}
const generateKey = label => {
  let result = []

  for(let i = 0; i < label.length; i++) {
    if (/[A-Z]/.test(label[i].toUpperCase())) {
      result.push(label[i].toUpperCase());
    } else if (label[i] === ' ') {
      result.push('_');
    }
  }
  return result.join('')
}

const generateGear = () => {
  const trs = Array.from(document.getElementsByTagName('tbody')[0].getElementsByTagName('tr'))
  const tds = trs.map(t => Array.from(t.getElementsByTagName('td'))).flat()
  
  const res = {}
  for (let i = 0; i < tds.length; i += 7) {
    const curTds = tds.slice(i, i + 7).map(t => (t.textContent || '').replaceAll('\n', '').trim());
    let costA = parseCost(curTds[1] || '')
    let costB = parseCost(curTds[5] || '')
    let weightA = (curTds[2] || '').split(' ')[0]
    let weightB = (curTds[6] || '').split(' ')[0]
  
    // console.log(tds.slice(i, i + 7), curTds, tds.slice(i, i + 7)[0], tds.slice(i, i + 7)[0].textContent);
  
    if (!parseInt(weightA)){
      weightA = 0;
    } else {
      weightA = parseInt(weightA);
    }
    if (!parseInt(weightB)){
      weightB = 0;
    } else {
      weightB = parseInt(weightB);
    }
  
    if (costA !== null) {
      res[generateKey(curTds[0])] = {
        label: curTds[0],
        cost: costA,
        weight: weightA,
      }
    }
    if (costB !== null) {
      res[generateKey(curTds[4])] = {
        label: curTds[4],
        cost: costB,
        weight: weightB,
      }
    }
  }
}

const input = [
  "ABACUS",
  "ACID_VIAL",
  "AMULET",
  "ALCHEMISTS_FIRE_FLASK",
  "EMBLEM",
  "RELIQUARY",
  "ARROW",
  "HOLY_WATER_FLASK",
  "BLOWGUN_NEEDLE",
  "HOURGLASS",
  "CROSSBOW_BOLT",
  "HUNTING_TRAP",
  "SLING_BULLETS_",
  "INK_OUNCE_BOTTLE",
  "ANTITOXIN_VIAL",
  "INK_PEN",
  "JUG_OR_PITCHER",
  "CRYSTAL",
  "LADDER_FOOT",
  "ORB",
  "LAMP",
  "ROD",
  "LANTERN_BULLSEYE",
  "STAFF",
  "LANTERN_HOODED",
  "WAND",
  "LOCK",
  "BACKPACK",
  "MAGNIFYING_GLASS",
  "BALL_BEARINGS",
  "MANACLES",
  "BARREL",
  "MESS_KIT",
  "KNIFE_SMALL",
  "SAND_BAG_OF",
  "BASKET",
  "MIRROR_STEEL",
  "BEDROLL",
  "OIL_FLASK",
  "BELL",
  "PAPER_ONE_SHEET",
  "BLANKET",
  "PARCHMENT_ONE_SHEET",
  "BLOCK_AND_TACKLE",
  "PERFUME_VIAL",
  "BOOK",
  "PICK_MINERS",
  "BOTTLE_GLASS",
  "PITON",
  "BUCKET",
  "POISON_BASIC_VIAL",
  "CALTROPS",
  "POLE_FOOT",
  "CANDLE",
  "POT_IRON",
  "CASE_CROSSBOW_BOLT",
  "POTION_OF_HEALING",
  "CASE_MAP_OR_SCROLL",
  "POUCH",
  "CHAIN__FEET",
  "QUIVER",
  "CHALK__PIECE",
  "RAM_PORTABLE",
  "CHEST",
  "RATIONS_DAY",
  "CLIMBERS_KIT",
  "ROBES",
  "CLOTHES_COMMON",
  "ROPE_HEMPEN_50",
  "CLOTHES_COSTUME",
  "ROPE_SILK__FEET",
  "CLOTHES_FINE",
  "CLOTHES_OCCUPATIONAL",
  "SACK",
  "CLOTHES_TRAVELERS",
  "SCALE_MERCHANTS",
  "COMPONENT_POUCH",
  "SEALING_WAX",
  "CROWBAR",
  "SHOVEL",
  "SIGNAL_WHISTLE",
  "SPRIG_OF_MISTLETOE",
  "SIGNET_RING",
  "TOTEM",
  "SOAP",
  "WOODEN_STAFF",
  "SPELLBOOK",
  "YEW_WAND",
  "SPIKES_IRON_",
  "FISHING_TACKLE",
  "SPYGLASS",
  "FLASK_ORTANKARD",
  "TENT_TWOPERSON",
  "GRAPPLING_HOOK",
  "TINDERBOX",
  "HAMMER",
  "TORCH",
  "STRING",
  "HAMMER_SLEDGE",
  "VIAL",
  "HEALERS_KIT",
  "WATERSKIN",
  "ALMS_BOX",
  "INCENSE_BLOCK",
  "CENSER",
  "WHETSONE"
]

const createGearEnum = () => `export enum ADVENTURING_GEAR {\n${input.sort().map(i => `\t${i} = '${i}',`).join('\n')}\n}`;

console.log(createGearEnum());

module.exports = {
  generateGear,
  createGearEnum,
}

