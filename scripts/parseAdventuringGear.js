const trs = Array.from(document.getElementsByTagName('tbody')[0].getElementsByTagName('tr'))
const tds = trs.map(t => Array.from(t.getElementsByTagName('td'))).flat()

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
console.log(res);