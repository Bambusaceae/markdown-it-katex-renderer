var MarkdownIt=require('markdown-it');
var md=new MarkdownIt();

md.use(require('../src/index.js'));

const testContent='\
# Test\n\
## Test\n\
\n\
Test $a^2+b^2=c^2\\$$\
\n\
$$\n\
\\begin{aligned}\n\
(f*g*h)(n)&=\\sum_{ab=n}\\left[\\sum_{cd=a}f\\left(c\\right)g\\left(d\\right)\\right]h\\left(b\\right)\\\\\n\
&=\\sum_{bcd=n}f\\left(c\\right)g\\left(d\\right)h\\left(b\\right)\\\\\n\
&=\\sum_{acd=n}f\\left(a\\right)g\\left(c\\right)h\\left(d\\right)\\\\\n\
&=\\sum_{ab=n}f\\left(a\\right)\\left[\\sum_{cd=b} g\\left(c\\right)h\\left(d\\right)\\right]\\\\\n\
&=[f*(g*h)](n)\n\
\\end{aligned}\n\
$$\n\
';
console.log(md.render(testContent));