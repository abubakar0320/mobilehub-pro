const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if(file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Replace dynamic USD formatting: ${phone.price.usd} -> Rs. ${(phone.price.usd * 280).toLocaleString()}
    // We match \$\{([a-zA-Z0-9_.\?]+price\?*\.usd)\}
    content = content.replace(/\$\{([a-zA-Z0-9_.\?]+price\?*\.usd)\}/g, (match, p1) => {
        // If it already has toLocaleString, we need to handle it carefully.
        // Let's just do a generic replacement for standard ones.
        return `Rs. \${(${p1} * 280).toLocaleString()}`;
    });

    // Handle the ones that already have toLocaleString() inside the brackets: ${phone.price?.usd?.toLocaleString()}
    content = content.replace(/\$\{([a-zA-Z0-9_.\?]+price\?*\.usd)\?*\.toLocaleString\(\)\}/g, (match, p1) => {
        return `Rs. \${(${p1} * 280).toLocaleString()}`;
    });

    // 2. Replace hardcoded $ with Rs. in text (like "At $800")
    content = content.replace(/At \$(\d+)/g, (match, p1) => {
        return `At Rs. ${(parseInt(p1) * 280).toLocaleString()}`;
    });
    content = content.replace(/\$(\d+)/g, (match, p1) => {
        return `Rs. ${(parseInt(p1) * 280).toLocaleString()}`;
    });

    // 3. Fix OverallAnalysis string interpolations where price was evaluated
    content = content.replace(/`\$(\$\{.+?\})/g, '`Rs. $1');
    content = content.replace(/At \$(\$\{.+?\})/g, 'At Rs. $1');
    content = content.replace(/is \$(\$\{.+?\})/g, 'is Rs. $1');
    content = content.replace(/and \$(\$\{.+?\})/g, 'and Rs. $1');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
});

console.log(`Updated ${changedFiles} files to PKR.`);
