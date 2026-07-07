import { NextResponse } from 'next/server';
import { MOCK_PHONES } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    let query = message.toLowerCase().trim();
    
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 400));

    const formatPrice = (usd: number) => `**Rs. ${(usd * 280).toLocaleString()}**`;

    // -----------------------------------------------------
    // 1. SMALL TALK & CHATBOT PERSONA
    // -----------------------------------------------------
    const smallTalk = [
      { trigger: /^(hi|hello|hey|yo|greetings|salam|assalam)/, reply: "Hello there! 👋 I am MobileHub AI. How can I assist you with smartphones today?" },
      { trigger: /how are you|how do you do|how r u/, reply: "I'm functioning perfectly, thanks for asking! Ready to help you find the best phone. What's on your mind?" },
      { trigger: /who are you|what are you|your name/, reply: "I'm **MobileHub AI**, your ultimate smartphone expert! I know everything about the latest phones, specs, and prices." },
      { trigger: /who made you|who created you|developer/, reply: "I was created by the brilliant developers of MobileHub Pro to help you make the best smartphone choices!" },
      { trigger: /joke/, reply: "Why did the smartphone need glasses? Because it lost its contacts! 🤓 Need help finding a phone?" },
      { trigger: /thank you|thanks|thx|jazakallah/, reply: "You're very welcome! If you need anything else, I'm right here. 😊" },
      { trigger: /bye|goodbye|see ya|allah hafiz/, reply: "Goodbye! Feel free to return whenever you need expert phone advice! 👋" },
    ];

    for (const st of smallTalk) {
      if (st.trigger.test(query)) {
        return NextResponse.json({ reply: st.reply });
      }
    }

    // -----------------------------------------------------
    // 2. MOBILE EXPLAINERS (Education)
    // -----------------------------------------------------
    const explainers = [
      { trigger: /what is 5g|explain 5g|5g benefits/, reply: "**5G** is the 5th generation mobile network. It offers blazing-fast internet speeds, lower latency (great for gaming), and more reliable connections than 4G." },
      { trigger: /refresh rate|what is (120hz|90hz|60hz)/, reply: "**Refresh Rate** (measured in Hz) is how many times the screen updates per second. A 120Hz screen is twice as smooth as 60Hz, making scrolling and animations feel incredibly fluid!" },
      { trigger: /what is oled|oled vs lcd|amoled/, reply: "**OLED/AMOLED** displays light up individual pixels. This means blacks are truly pitch black (saving battery in dark mode) and colors are incredibly vibrant compared to traditional LCD screens." },
      { trigger: /does ram matter|what is ram|how much ram/, reply: "**RAM** (Random Access Memory) handles multitasking. More RAM (like 8GB or 12GB) means you can keep more apps open in the background without the phone slowing down or apps reloading." },
      { trigger: /processor|snapdragon vs|chipset/, reply: "The **Processor (Chipset)** is the brain of the phone. Better processors (like Snapdragon 8 Gen 3 or Apple A18 Pro) handle heavy gaming, complex AI tasks, and high-res video recording without lagging or overheating." },
      { trigger: /what is ois|ois camera/, reply: "**OIS (Optical Image Stabilization)** physically moves the camera lens to compensate for your hand shaking. It results in much sharper night photos and incredibly smooth videos!" },
      { trigger: /android vs iphone|ios vs android|which is better/, reply: "It depends on you! **iPhones (iOS)** offer long-term support, great resale value, and a very smooth, simple ecosystem. **Androids (Samsung, Xiaomi, etc.)** offer massive customization, bleeding-edge hardware features, and wider price ranges." },
    ];

    for (const exp of explainers) {
      if (exp.trigger.test(query)) {
        return NextResponse.json({ reply: exp.reply });
      }
    }

    // -----------------------------------------------------
    // 3. FIX TYPOS / FUZZY MATCHING PRE-PROCESS
    // -----------------------------------------------------
    // Replace common typos in query
    const typoMap: Record<string, string> = {
      'iphne': 'iphone', 'ipon': 'iphone', 'iph': 'iphone',
      'galxy': 'galaxy', 'samsng': 'samsung', 'samung': 'samsung',
      '16pro': '16 pro', 's25ultra': 's25 ultra', 'gt7': 'gt 7'
    };
    for (const [typo, fix] of Object.entries(typoMap)) {
      query = query.replace(new RegExp(`\\b${typo}\\b`, 'g'), fix);
    }

    // -----------------------------------------------------
    // 4. EXTRACT DATA & INTENTS
    // -----------------------------------------------------
    const mentionedPhones = MOCK_PHONES.filter(p => 
      query.includes(p.model.toLowerCase()) || 
      query.includes(p.slug.toLowerCase()) ||
      (p.shortName && query.includes(p.shortName.toLowerCase()))
    );

    const allBrands = Array.from(new Set(MOCK_PHONES.map(p => p.brand.toLowerCase())));
    const requestedBrand = allBrands.find(b => query.includes(b));

    const numbersInQuery = query.match(/\d+/g);
    let budgetLimit = 0;
    if ((query.includes('under') || query.includes('below') || query.includes('max') || query.includes('cheaper than')) && numbersInQuery) {
      budgetLimit = Math.max(...numbersInQuery.map(Number));
      if (budgetLimit > 10000) budgetLimit = budgetLimit / 280; // convert PKR query to USD
    }

    // -----------------------------------------------------
    // 5. COMPARISONS (Specific vs Specific OR Specific vs Category)
    // -----------------------------------------------------
    if (mentionedPhones.length >= 2 || (query.includes('compare') && mentionedPhones.length >= 2) || query.includes(' vs ')) {
      const p1 = mentionedPhones[0];
      const p2 = mentionedPhones[1];
      if (p1 && p2) {
        let reply = `Let's compare the **${p1.model}** and **${p2.model}**:\n\n`;
        
        reply += `💰 **Price:**\n- ${p1.model}: ${formatPrice(p1.price.usd)}\n- ${p2.model}: ${formatPrice(p2.price.usd)}\n`;
        if (p1.price.usd < p2.price.usd) reply += `*(The ${p1.model} is cheaper!)*\n\n`;
        else if (p2.price.usd < p1.price.usd) reply += `*(The ${p2.model} is cheaper!)*\n\n`;
        else reply += `*(They cost exactly the same!)*\n\n`;

        reply += `📱 **Display:**\n- ${p1.model}: ${p1.specs.display.size}" ${p1.specs.display.type} (${p1.specs.display.refreshRate}Hz, ${p1.specs.display.brightness} nits)\n- ${p2.model}: ${p2.specs.display.size}" ${p2.specs.display.type} (${p2.specs.display.refreshRate}Hz, ${p2.specs.display.brightness} nits)\n\n`;
        
        reply += `🚀 **Performance (AnTuTu):**\n- ${p1.model}: ${p1.specs.performance.benchmarks.antutu.toLocaleString()} (${p1.specs.performance.processor})\n- ${p2.model}: ${p2.specs.performance.benchmarks.antutu.toLocaleString()} (${p2.specs.performance.processor})\n`;
        if (p1.specs.performance.benchmarks.antutu > p2.specs.performance.benchmarks.antutu) reply += `*(The ${p1.model} is faster!)*\n\n`;
        else reply += `*(The ${p2.model} is faster!)*\n\n`;

        reply += `📸 **Cameras:**\n- ${p1.model}: ${p1.specs.cameraDeep.main.mp}MP Main\n- ${p2.model}: ${p2.specs.cameraDeep.main.mp}MP Main\n\n`;
        
        reply += `🔋 **Battery:**\n- ${p1.model}: ${p1.specs.batteryDeep.capacity}mAh (${p1.specs.batteryDeep.fastCharging}W charge)\n- ${p2.model}: ${p2.specs.batteryDeep.capacity}mAh (${p2.specs.batteryDeep.fastCharging}W charge)\n\n`;
        
        return NextResponse.json({ reply });
      }
    }

    // -----------------------------------------------------
    // 6. SPECIFIC PHONE QUERIES (Deep Dive)
    // -----------------------------------------------------
    if (mentionedPhones.length === 1) {
      const p = mentionedPhones[0];
      
      // Full Specs
      if (query.match(/everything|all details|full specs|tell me about|specs|specifications/)) {
        let reply = `Here is everything you need to know about the **${p.brand} ${p.model}**:\n\n`;
        reply += `💵 **Price:** ${formatPrice(p.price.usd)}\n`;
        reply += `📱 **Display:** ${p.specs.display.size}-inch ${p.specs.display.type}, ${p.specs.display.refreshRate}Hz refresh rate, peak brightness of ${p.specs.display.brightness} nits. Resolution is ${p.specs.display.resolution}.\n`;
        reply += `🚀 **Processor:** ${p.specs.performance.processor} paired with ${p.specs.performance.ram}GB RAM. It achieves an AnTuTu score of ${p.specs.performance.benchmarks.antutu.toLocaleString()}.\n`;
        reply += `📸 **Cameras:**\n  - Main: ${p.specs.cameraDeep.main.mp}MP (Aperture ${p.specs.cameraDeep.main.aperture}, OIS: ${p.specs.cameraDeep.main.ois ? 'Yes' : 'No'})\n`;
        reply += `  - Ultrawide: ${p.specs.cameraDeep.ultrawide.mp}MP (${p.specs.cameraDeep.ultrawide.angle}° field of view)\n`;
        reply += `  - Telephoto: ${p.specs.cameraDeep.telephoto.mp}MP (${p.specs.cameraDeep.telephoto.zoom} optical zoom)\n`;
        reply += `  - Selfie: ${p.specs.cameraDeep.front.mp}MP\n`;
        reply += `  - Video: ${p.specs.cameraDeep.video}\n`;
        reply += `🔋 **Battery:** ${p.specs.batteryDeep.capacity}mAh with blazing fast ${p.specs.batteryDeep.fastCharging}W wired charging and ${p.specs.batteryDeep.wireless}W wireless charging.\n`;
        reply += `🛡️ **Build:** IP rating of ${p.specs.ipRating}, weighing ${p.specs.weight}g.\n`;
        reply += `🌐 **Connectivity:** 5G Supported: ${p.specs.connectivity.has5g ? 'Yes' : 'No'}, Wi-Fi: ${p.specs.connectivity.wifi}, NFC: ${p.specs.connectivity.nfc ? 'Yes' : 'No'}.\n\n`;
        reply += `It receives **${p.specs.software.updateYears} years of OS updates** and comes in colors like: ${p.colors.join(', ')}.`;
        return NextResponse.json({ reply });
      }

      // Single feature extracts
      if (query.match(/price|cost|how much|rate/)) {
        return NextResponse.json({ reply: `The **${p.model}** is currently priced at ${formatPrice(p.price.usd)}.` });
      }
      if (query.match(/camera|photo|megapixel|zoom|video|shoot/)) {
        return NextResponse.json({ reply: `The **${p.model}** has a **${p.specs.cameraDeep.main.mp}MP main sensor** (f/${p.specs.cameraDeep.main.aperture}), a ${p.specs.cameraDeep.ultrawide.mp}MP ultrawide, and a ${p.specs.cameraDeep.telephoto.mp}MP telephoto lens with ${p.specs.cameraDeep.telephoto.zoom} zoom. The front camera is ${p.specs.cameraDeep.front.mp}MP. It shoots up to **${p.specs.cameraDeep.video}** video!` });
      }
      if (query.match(/battery|charge|mah|last|long/)) {
        return NextResponse.json({ reply: `The **${p.model}** packs a **${p.specs.batteryDeep.capacity}mAh** battery. It supports **${p.specs.batteryDeep.fastCharging}W fast charging** and ${p.specs.batteryDeep.wireless}W wireless charging.` });
      }
      if (query.match(/processor|performance|gaming|chip|antutu|lag|fast|speed/)) {
        return NextResponse.json({ reply: `The **${p.model}** is an absolute powerhouse. It's powered by the **${p.specs.performance.processor}** processor and comes with **${p.specs.performance.ram}GB RAM**. It scores an incredible **${p.specs.performance.benchmarks.antutu.toLocaleString()}** on AnTuTu!` });
      }
      if (query.match(/display|screen|refresh rate|hz|brightness|nits|oled|amoled/)) {
        return NextResponse.json({ reply: `The **${p.model}** features a gorgeous **${p.specs.display.size}-inch ${p.specs.display.type}** display. It has a super smooth **${p.specs.display.refreshRate}Hz** refresh rate and hits a peak brightness of **${p.specs.display.brightness} nits**!` });
      }
      if (query.match(/color|available in|what colors/)) {
        return NextResponse.json({ reply: `The **${p.model}** is available in the following stunning colors: **${p.colors.join(', ')}**.` });
      }
      if (query.match(/water|ip rating|waterproof|dust/)) {
        return NextResponse.json({ reply: `The **${p.model}** comes with an **IP Rating of ${p.specs.ipRating}**, making it highly resistant to dust and water.` });
      }
      
      // Default info if phone is mentioned but no specific feature asked
      return NextResponse.json({ reply: `You asked about the **${p.brand} ${p.model}**! It costs ${formatPrice(p.price.usd)} and packs a ${p.specs.performance.processor} chip. \n\nWould you like to know more about its **camera, battery, display, or full specs**?` });
    }

    // -----------------------------------------------------
    // 7. BEST-OF & DYNAMIC LIST GENERATION
    // -----------------------------------------------------
    let pool = [...MOCK_PHONES];
    
    // Apply Budget Filter
    if (budgetLimit > 0) {
      pool = pool.filter(p => p.price.usd <= budgetLimit);
      if (pool.length === 0) {
        return NextResponse.json({ reply: `I'm sorry, I couldn't find any phones under Rs. ${(budgetLimit * 280).toLocaleString()} in our current database. Try a slightly higher budget!` });
      }
    }

    // Apply Brand Filter
    if (requestedBrand) {
      pool = pool.filter(p => p.brand.toLowerCase() === requestedBrand);
    }

    // Category sorting
    let bestMatch = pool[0];
    let intro = "";

    if (query.match(/best camera|top camera|good camera|photography|photos/)) {
      bestMatch = pool.sort((a, b) => b.specs.cameraDeep.main.mp - a.specs.cameraDeep.main.mp)[0];
      intro = `For the absolute best camera experience${budgetLimit > 0 ? ` under Rs. ${(budgetLimit * 280).toLocaleString()}` : ''}`;
      return NextResponse.json({ reply: `${intro}, I strongly recommend the **${bestMatch.model}**. It features a massive ${bestMatch.specs.cameraDeep.main.mp}MP main lens with OIS. \n\nPrice: ${formatPrice(bestMatch.price.usd)}` });
    }

    if (query.match(/gaming|fastest|performance|best processor|heavy duty/)) {
      bestMatch = pool.sort((a, b) => b.specs.performance.benchmarks.antutu - a.specs.performance.benchmarks.antutu)[0];
      intro = `If you want maximum performance and gaming capability${budgetLimit > 0 ? ` under Rs. ${(budgetLimit * 280).toLocaleString()}` : ''}`;
      return NextResponse.json({ reply: `${intro}, the **${bestMatch.model}** is a beast. Powered by the ${bestMatch.specs.performance.processor}, it crushes benchmarks with an AnTuTu score of ${bestMatch.specs.performance.benchmarks.antutu.toLocaleString()}.\n\nPrice: ${formatPrice(bestMatch.price.usd)}` });
    }

    if (query.match(/battery|longest lasting|good battery/)) {
      bestMatch = pool.sort((a, b) => b.specs.batteryDeep.capacity - a.specs.batteryDeep.capacity)[0];
      intro = `For the best battery life${budgetLimit > 0 ? ` under Rs. ${(budgetLimit * 280).toLocaleString()}` : ''}`;
      return NextResponse.json({ reply: `${intro}, check out the **${bestMatch.model}**. It has a gigantic ${bestMatch.specs.batteryDeep.capacity}mAh battery supported by ${bestMatch.specs.batteryDeep.fastCharging}W hyper-fast charging.\n\nPrice: ${formatPrice(bestMatch.price.usd)}` });
    }

    if (query.match(/display|screen|brightest|movies/)) {
      bestMatch = pool.sort((a, b) => b.specs.display.brightness - a.specs.display.brightness)[0];
      intro = `For stunning visuals and media consumption${budgetLimit > 0 ? ` under Rs. ${(budgetLimit * 280).toLocaleString()}` : ''}`;
      return NextResponse.json({ reply: `${intro}, the **${bestMatch.model}** is amazing. It's a ${bestMatch.specs.display.size}" ${bestMatch.specs.display.type} panel running at ${bestMatch.specs.display.refreshRate}Hz, reaching up to ${bestMatch.specs.display.brightness} nits!\n\nPrice: ${formatPrice(bestMatch.price.usd)}` });
    }

    // General list requests ("Show me Apple phones", "Phones under X")
    if (query.match(/list|all phones|show me|recommend/i) || requestedBrand || budgetLimit > 0) {
      if (pool.length > 0) {
        let replyText = `Here are some great options`;
        if (requestedBrand) replyText += ` from **${requestedBrand.charAt(0).toUpperCase() + requestedBrand.slice(1)}**`;
        if (budgetLimit > 0) replyText += ` under **Rs. ${(budgetLimit * 280).toLocaleString()}**`;
        replyText += `:\n\n`;
        
        pool.slice(0, 5).forEach(p => {
          replyText += `- **${p.model}** (${formatPrice(p.price.usd)})\n`;
        });
        if (pool.length > 5) replyText += `\n...and ${pool.length - 5} more! Let me know if you want to narrow it down by 'best camera' or 'best gaming'.`;
        return NextResponse.json({ reply: replyText });
      }
    }

    // -----------------------------------------------------
    // 8. ABSOLUTE FALLBACK (Intelligent Re-routing)
    // -----------------------------------------------------
    const fallbackResponses = [
      "I'm sorry, I couldn't quite understand that. Are you looking for a specific phone, or maybe a recommendation like 'best phone for gaming'?",
      "That's an interesting question! While I'm still learning, I am incredibly good at comparing phones, checking prices, and explaining specs like RAM or OLED. What phone are you curious about?",
      "I might not have the answer to that specific question just yet! However, if you want to know about the latest Apple, Samsung, or Xiaomi devices, just ask!",
      "I didn't catch that. Try asking me something like:\n- *'Compare iPhone 16 Pro and S25 Ultra'*\n- *'What is the price of OnePlus 13?'*\n- *'Best battery phone under 200000'*"
    ];
    const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return NextResponse.json({ reply: randomFallback });

  } catch (error) {
    return NextResponse.json({ reply: "I encountered a glitch in my system while processing your request. Please try asking again!" }, { status: 500 });
  }
}
