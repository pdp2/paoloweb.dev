
const postTitle = Deno.args[0];

if (!postTitle) {
    console.error("❌ Error: No post title provided");
    console.error("Usage: deno run --allow-read --allow-write scripts/tasks/new-post.js \"Your Post Title\"");
    Deno.exit(1);
}

// Create filename from title (lowercase, replace spaces with hyphens, remove special chars)
const filename = postTitle
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '') // removes special characters
    .replace(/\s+/g, '-') // removes whitespace
    .replace(/-+/g, '-') // removes multiple dashes
    .replace(/^-|-$/g, '') + '.md'; // removes leading/trailing dashes

const date = new Date().toISOString().slice(0, 16) + 'Z';
const filepath = `posts/${filename}`;

// Check if file already exists
try {
    await Deno.stat(filepath);
    console.error(`❌ Error: File '${filepath}' already exists`);
    Deno.exit(1);
} catch (error) {
    if (error.name !== 'NotFound') {
        throw error;
    }
}

// Create a new git branch
const branchName = `add-post-${filename.replace(/\.md$/, '')}`;
const gitCheckout = new Deno.Command("git", {
    args: ["checkout", "-b", branchName],
    stderr: "piped",
});
const gitResult = await gitCheckout.output();

if (!gitResult.success) {
    const stderr = new TextDecoder().decode(gitResult.stderr);
    console.error(`❌ Error: Could not create branch '${branchName}'`);
    console.error(stderr.trim());
    Deno.exit(1);
}

console.log(`🌿 Created and switched to branch: ${branchName}\n`);

// Create the markdown file with frontmatter
const content = `---
title: ${postTitle} | Paolo Di Pasquale
date: ${date}
---

Write your post content here...
`;

await Deno.writeTextFile(filepath, content);

console.log(`✅ Created new post: ${filepath}\n`);
console.log(`📝 Title: ${postTitle}\n`);
console.log(`📅 Date: ${date}`);

try {
    const command = new Deno.Command("code", {
        args: [filepath],
    });
    await command.output();
    console.log("\n📂 Opening file in Cursor...");
} catch (error) {
    console.error(`\n⚠️  Could not open file in Cursor: ${error.message}`);
}