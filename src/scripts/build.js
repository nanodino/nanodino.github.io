const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');
const md = new MarkdownIt();

Handlebars.registerHelper('formatDate', function(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
});

const rootDir = path.join(__dirname, '../../');
const contentDir = path.join(rootDir, 'src/content');
const layoutsDir = path.join(rootDir, 'src/layouts');
const outputDir = path.join(rootDir, 'dist');
const stylesDir = path.join(rootDir, 'src/styles');

function compileTemplate(templateName, data) {
    const templatePath = path.join(layoutsDir, templateName);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateSource);
    return template(data);
}

function buildSite() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const distStylesDir = path.join(outputDir, 'styles');
    if (!fs.existsSync(distStylesDir)) {
        fs.mkdirSync(distStylesDir, { recursive: true });
    }

    fs.copyFileSync(
        path.join(stylesDir, 'main.css'),
        path.join(distStylesDir, 'main.css')
    );

    const postsDir = path.join(contentDir, 'blog/posts');
    const posts = fs.readdirSync(postsDir);
    
    const allPosts = [];

    posts.forEach(post => {
        const postPath = path.join(postsDir, post);
        const postContent = fs.readFileSync(postPath, 'utf-8');
        const { data: frontMatter, content: markdownContent } = matter(postContent);
        const htmlContent = md.render(markdownContent);
        const postData = { 
            ...frontMatter, 
            content: htmlContent,
            url: post.replace('.md', '.html')
        };
        
        allPosts.push(postData);

        const output = compileTemplate('post.hbs', postData);
        const outputFilePath = path.join(outputDir, post.replace('.md', '.html'));
        fs.writeFileSync(outputFilePath, output);
    });
    
    allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const pagesDir = path.join(contentDir, 'pages');
    const pages = fs.readdirSync(pagesDir);

    pages.forEach(page => {
        const pagePath = path.join(pagesDir, page);
        const pageContent = fs.readFileSync(pagePath, 'utf-8');
        const { data: frontMatter, content: markdownContent } = matter(pageContent);
        const htmlContent = md.render(markdownContent);
        
        let pageData = { ...frontMatter, content: htmlContent };
        if (page === 'index.md') {
            pageData.posts = allPosts;
        }

        const output = compileTemplate('main.hbs', pageData);
        const outputFilePath = path.join(outputDir, page.replace('.md', '.html'));
        fs.writeFileSync(outputFilePath, output);
    });

    console.log('Site built successfully!');
}

buildSite();