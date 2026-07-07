import { PhoneData } from './phones';

export function determineWinners(phones: PhoneData[]): Record<string, string> {
  const winners: Record<string, string> = {};

  if (!phones || phones.length === 0) return winners;
  if (phones.length === 1) return winners; // No winner if only 1 phone

  // Helper to find winner
  const getWinner = (compareFn: (a: PhoneData, b: PhoneData) => number) => {
    let best = phones[0];
    let isTie = false;

    for (let i = 1; i < phones.length; i++) {
      const result = compareFn(phones[i], best);
      if (result > 0) {
        best = phones[i];
        isTie = false;
      } else if (result === 0) {
        isTie = true;
      }
    }
    return isTie ? null : best._id;
  };

  // Display: highest brightness -> refresh rate -> PPI -> tiebreak by price
  const displayWinner = getWinner((a, b) => {
    if (a.specs.display.brightness !== b.specs.display.brightness) {
      return a.specs.display.brightness - b.specs.display.brightness;
    }
    if (a.specs.display.refreshRate !== b.specs.display.refreshRate) {
      return a.specs.display.refreshRate - b.specs.display.refreshRate;
    }
    if (a.specs.display.ppi !== b.specs.display.ppi) {
      return a.specs.display.ppi - b.specs.display.ppi;
    }
    return b.price.usd - a.price.usd;
  });
  if (displayWinner) winners['display'] = displayWinner;

  // Performance: highest Geekbench Multi -> Single -> tiebreak by price
  const perfWinner = getWinner((a, b) => {
    if (a.specs.performance.benchmarks.geekbench6Multi !== b.specs.performance.benchmarks.geekbench6Multi) {
      return a.specs.performance.benchmarks.geekbench6Multi - b.specs.performance.benchmarks.geekbench6Multi;
    }
    if (a.specs.performance.benchmarks.geekbench6Single !== b.specs.performance.benchmarks.geekbench6Single) {
      return a.specs.performance.benchmarks.geekbench6Single - b.specs.performance.benchmarks.geekbench6Single;
    }
    return b.price.usd - a.price.usd;
  });
  if (perfWinner) winners['performance'] = perfWinner;

  // Battery: largest capacity -> fastest charging -> tiebreak by price
  const batteryWinner = getWinner((a, b) => {
    // If difference > 500mAh, capacity wins
    const diff = a.specs.batteryDeep.capacity - b.specs.batteryDeep.capacity;
    if (Math.abs(diff) >= 500) return diff;
    
    // Else fallback to charging speed
    if (a.specs.batteryDeep.fastCharging !== b.specs.batteryDeep.fastCharging) {
      return a.specs.batteryDeep.fastCharging - b.specs.batteryDeep.fastCharging;
    }
    
    return b.price.usd - a.price.usd;
  });
  if (batteryWinner) winners['battery'] = batteryWinner;

  // Camera: highest total MP (main + ultrawide + telephoto) -> tiebreak by price
  const cameraWinner = getWinner((a, b) => {
    const totalA = a.specs.cameraDeep.main.mp + a.specs.cameraDeep.ultrawide.mp + a.specs.cameraDeep.telephoto.mp;
    const totalB = b.specs.cameraDeep.main.mp + b.specs.cameraDeep.ultrawide.mp + b.specs.cameraDeep.telephoto.mp;
    if (totalA !== totalB) return totalA - totalB;
    return b.price.usd - a.price.usd; // cheaper wins if tied
  });
  if (cameraWinner) winners['camera'] = cameraWinner;

  // Software: highest updateYears -> tiebreak by newest OS version (string compare approximation) -> tiebreak by price
  const softwareWinner = getWinner((a, b) => {
    if (a.specs.software.updateYears !== b.specs.software.updateYears) {
      return a.specs.software.updateYears - b.specs.software.updateYears;
    }
    return b.price.usd - a.price.usd;
  });
  if (softwareWinner) winners['software'] = softwareWinner;

  // Design: Highest IP rating -> lowest weight
  const designWinner = getWinner((a, b) => {
    // Simple IP rating compare (e.g. IP68 > IP67)
    const ipA = parseInt(a.specs.ipRating.replace(/\D/g, '') || '0');
    const ipB = parseInt(b.specs.ipRating.replace(/\D/g, '') || '0');
    if (ipA !== ipB) return ipA - ipB;
    
    // Lower weight is better
    if (a.specs.weight !== b.specs.weight) return b.specs.weight - a.specs.weight;
    
    return b.price.usd - a.price.usd;
  });
  if (designWinner) winners['design'] = designWinner;

  // Value: Performance + Battery + Camera / Price
  const valueWinner = getWinner((a, b) => {
    const scoreA = (
      a.specs.performance.benchmarks.geekbench6Multi + 
      a.specs.batteryDeep.capacity + 
      (a.specs.cameraDeep.main.mp * 50)
    ) / a.price.usd;

    const scoreB = (
      b.specs.performance.benchmarks.geekbench6Multi + 
      b.specs.batteryDeep.capacity + 
      (b.specs.cameraDeep.main.mp * 50)
    ) / b.price.usd;

    return scoreA - scoreB;
  });
  if (valueWinner) winners['price'] = valueWinner;

  // Overall Winner: Most category wins -> tiebreak by Value Winner
  const winCounts: Record<string, number> = {};
  for (const cat of ['display', 'performance', 'battery', 'camera', 'software', 'design']) {
    const winnerId = winners[cat];
    if (winnerId) {
      winCounts[winnerId] = (winCounts[winnerId] || 0) + 1;
    }
  }

  let overallWinner: string | null = null;
  let maxWins = 0;
  let isTie = false;
  
  for (const [id, count] of Object.entries(winCounts)) {
    if (count > maxWins) {
      maxWins = count;
      overallWinner = id;
      isTie = false;
    } else if (count === maxWins) {
      isTie = true;
    }
  }

  if (overallWinner && !isTie) {
    winners['overall'] = overallWinner;
  } else if (valueWinner) {
    winners['overall'] = valueWinner;
  }

  return winners;
}
