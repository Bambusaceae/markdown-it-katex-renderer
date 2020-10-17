var katex=require('katex');
let inline=(state,silent)=>{
    if(state.src[state.pos]!=='$')return false;
    var start=state.pos+1,end=start+1;
    while((end=state.src.indexOf('$',end))!==-1){
        var pos=end-1;
        while(state.src.charAt(pos)==='\\')pos--;
        if((end-pos)%2==1)break;
        end++;
    }
    if(end===-1||start===end)return false;
    if(!silent){
        var token=state.push('mathinline','math',0);
        token.markup='$';
        token.content=state.src.slice(start,end);
    }
    state.pos=end+1;
    return true;
};
let block=(state,start,end,silent)=>{
    if(silent)return true;
    const str=state.src.slice(state.bMarks[start]+state.tShift[start]).trimRight();
    if(str.trim().length<4||str.slice(0,2)!=='$$')return false;
    const result=state.src.slice(state.bMarks[start]+state.tShift[start]).trimRight().match(/^\$\$[\s\S]+?\$\$$/m);
    if(!result)return false;
    for(i=0;i<result[0].length;i++)if(result[0].charAt(i)=='\n')state.line++;
    state.line++;
    var token=state.push('mathblock','math',0);
    token.block=true;
    token.content=result[0].slice(2).slice(0,-2);
    token.map=[start,state.line];
    token.markup='$$';
    return true;
};
module.exports=(md,options)=>{
    options=options||{};
    let renderInline=(tokens,idx)=>{
        options.displayMode=false;
        return katex.renderToString(tokens[idx].content,{throwOnError: false});
    };
    let renderBlock=(tokens,idx)=>{
        options.displayMode=true;
        return katex.renderToString(tokens[idx].content,{throwOnError: false});
    };
    md.inline.ruler.after('escape','mathinline',inline);
    md.block.ruler.after('blockquote','mathblock',block,{alt: ['paragraph','reference','blockquote','list']});
    md.renderer.rules.mathinline=renderInline;
    md.renderer.rules.mathblock=renderBlock;
};