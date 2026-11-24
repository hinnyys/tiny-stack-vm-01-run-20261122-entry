import{readdirSync as A,readFileSync as B,writeFileSync as C,mkdirSync as D}from'node:fs';
import{join as E}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T=atob('ARJCBQcLDBAAAAAAAAAAAAoKCgoKCgoGCgoKBgoKCgAKCgoAAAAAAAAAAAAAAAAAISUlIQEAAAAAAAAAAAAAAAYJAAAAAAAAAAAAAAAAAAAFBQIF');
for(const d of A(I).sort()){
const p=B(E(I,d,'program.bin')),q=B(E(I,d,'input.bin')),n=p.length,S=[],K=[],M=new Int32Array(256),o=[];let s=0,k=0,P=0,t=0,j=0,x=-1;
for(;x<0;){
if(t===1e6){x=10;break}
if(P<0||P>=n){x=9;break}
const b=p[P],v=T.charCodeAt(b);
if(!v){x=5;break}
const m=v-1,im=m>>4,po=(m>>2)&3,pu=m&3;
if(P+im>=n){x=9;break}
t++;
const N=P+1+im;
if(s<po){x=2;break}
if(s-po+pu>256){x=3;break}
P=N;
switch(b){
case 0:x=0;break;
case 1:S[s++]=(p[N-1]<<24)>>24;break;
case 2:S[s++]=p[N-4]|p[N-3]<<8|p[N-2]<<16|p[N-1]<<24;break;
case 3:s--;break;
case 4:S[s]=S[s-1];s++;break;
case 5:[S[s-1],S[s-2]]=[S[s-2],S[s-1]];break;
case 6:S[s]=S[s-2];s++;break;
case 7:[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];break;
case 23:S[s-1]=-S[s-1]|0;break;
case 27:S[s-1]=~S[s-1];break;
case 48:case 49:case 50:{const r=((p[N-2]|p[N-1]<<8)<<16)>>16;if(b===48||(S[--s]===0)===(b===49))P=N+r;break}
case 51:if(k===64){x=7;break}K[k++]=N;P=p[N-2]|p[N-1]<<8;break;
case 52:if(!k){x=8;break}P=K[--k];break;
case 64:{const a=S[s-1];if(a<0||a>255){x=6;break}S[s-1]=M[a];break}
case 65:{const a=S[s-1],w=S[s-2];if(a<0||a>255){x=6;break}s-=2;M[a]=w;break}
case 80:{const z=''+S[s-1];if(o.length+z.length>65536){x=11;break}s--;for(const c of z)o.push(c.charCodeAt(0));break}
case 81:if(o.length+1>65536){x=11;break}o.push(S[--s]&255);break;
case 82:S[s++]=j<q.length?q[j++]:-1;break;
case 83:x=S[--s]&255;break;
default:{const y=S[s-1],w=S[s-2];let r;
if(b>=19&&b<=22&&!y){x=4;break}
if(b==16)r=(w+y)|0;
else if(b==17)r=(w-y)|0;
else if(b==18)r=Math.imul(w,y);
else if(b==19)r=w===-2147483648&&y===-1?w:(w/y)|0;
else if(b==20)r=y===-1?0:(w%y)|0;
else if(b==21)r=Math.floor((w>>>0)/(y>>>0))|0;
else if(b==22)r=(w>>>0)%(y>>>0)|0;
else if(b==24)r=w&y;
else if(b==25)r=w|y;
else if(b==26)r=w^y;
else if(b==28)r=w<<(y&31);
else if(b==29)r=w>>(y&31);
else if(b==30)r=(w>>>(y&31))|0;
else if(b==32)r=w===y?1:0;
else if(b==33)r=w<y?1:0;
else r=(w>>>0)<(y>>>0)?1:0;
s-=2;S[s++]=r}
}
}
D(E(O,d),{recursive:!0});
C(E(O,d,'stdout.bin'),Buffer.from(o));
C(E(O,d,'exit.txt'),x+'\n');
}
