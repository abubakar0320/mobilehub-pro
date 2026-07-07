const fs = require('fs');

const filesToFix = [
    "src/app/phones/[slug]/page.tsx",
    "src/components/admin/PhonesTable.tsx",
    "src/components/ai/AiRecommendationCard.tsx",
    "src/components/brands/FeaturedPhones.tsx",
    "src/components/compare/OverallAnalysis.tsx",
    "src/components/compare/SpecTable.tsx",
    "src/components/home/HeroSection.tsx",
    "src/components/home/PhoneGrid.tsx",
    "src/components/phones/PhoneCard.tsx",
    "src/components/phones/PhoneCardList.tsx",
    "src/components/search/SearchSuggestions.tsx"
];

let changedCount = 0;

filesToFix.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        
        // In JSX, the string looks like: "        Rs. ${..." or ">Rs. ${..."
        // We capture any character that is NOT a backtick or quote, followed by "Rs. ${"
        content = content.replace(/([^`'"])Rs\.\s*\$\{/g, '$1Rs. {');
        
        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            changedCount++;
            console.log("Fixed " + file);
        }
    }
});

console.log(`Fixed ${changedCount} files.`);
