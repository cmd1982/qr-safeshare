// qrcode3mf.js



function gcd(a,b){while(b){const t=a%b;a=b;b=t;}return a;}



function detectModulePx(canvas){

  const w=canvas.width,h=canvas.height,ctx=canvas.getContext('2d'),data=ctx.getImageData(0,0,w,h).data;

  function runGcdRow(y){

    let g=0,prev=null,run=0;

    for(let x=0;x<w;x++){

      const i=(y*w+x)*4; const v=(data[i]+data[i+1]+data[i+2])<384?1:0;

      if(prev===null){prev=v;run=1;continue;}

      if(v===prev){run++;} else { if(run>0) g=g?gcd(g,run):run; prev=v; run=1; }

    }

    if(run>0) g=g?gcd(g,run):run;

    return g||1;

  }

  return Math.max(1, runGcdRow(Math.floor(h/2)));

}



function makeBasePlate(W,H,r,segs,baseH){

  const P=[];

  function arc(cx,cy,a0,a1,steps){

    const pts=[]; const step=(a1-a0)/steps;

    for(let i=0;i<=steps;i++){

      const a=(a0+i*step)*Math.PI/180;

      pts.push([cx + r*Math.cos(a), cy + r*Math.sin(a)]);

    }

    return pts;

  }

  P.push([r,0],[W-r,0]);

  P.push(...arc(W-r,r,-90,0,segs).slice(1));

  P.push([W,H-r]);

  P.push(...arc(W-r,H-r,0,90,segs).slice(1));

  P.push([r,H]);

  P.push(...arc(r,H-r,90,180,segs).slice(1));

  P.push([0,r]);

  P.push(...arc(r,r,180,270,segs).slice(1));

  const C=[W/2,H/2];

  let tris=[];

  for(let i=0;i<P.length;i++){const a=P[i], b=P[(i+1)%P.length]; tris.push([[C[0],C[1],baseH],[a[0],a[1],baseH],[b[0],b[1],baseH]]);}

  for(let i=0;i<P.length;i++){const a=P[i], b=P[(i+1)%P.length]; tris.push([[C[0],C[1],0],[b[0],b[1],0],[a[0],a[1],0]]);}

  for(let i=0;i<P.length;i++){const a=P[i], b=P[(i+1)%P.length];

    tris.push([[a[0],a[1],0],[b[0],b[1],0],[b[0],b[1],baseH]]);

    tris.push([[a[0],a[1],0],[b[0],b[1],baseH],[a[0],a[1],baseH]]);

  }

  return tris;

}



function makeQR(canvas,targetSize,baseH,qrH,margin){

  const modPx=detectModulePx(canvas);

  const mods=Math.max(1, Math.round(canvas.width/modPx));

  const modMM=targetSize/mods;

  const ctx=canvas.getContext('2d');

  const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;

  function isDark(mx,my){

    const cx=Math.floor((mx+0.5)*modPx);

    const cy=Math.floor((my+0.5)*modPx);

    const i=(cy*canvas.width+cx)*4;

    return (data[i]+data[i+1]+data[i+2]) < 384;

  }

  let tris=[];

  for(let my=0; my<mods; my++){

    for(let mx=0; mx<mods; mx++){

      if(isDark(mx,my)){

        const x0=margin + mx*modMM;

        const y0=margin + (mods-1-my)*modMM;

        const x1=x0+modMM, y1=y0+modMM;

        const z0=baseH;

        const z1=baseH+qrH; // verhoogd

        // Wil je verdiept graveren, gebruik: const z1=baseH-qrH;

        tris.push([[x0,y0,z1],[x1,y0,z1],[x1,y1,z1]],[[x0,y0,z1],[x1,y1,z1],[x0,y1,z1]]);

        tris.push([[x0,y0,z0],[x1,y1,z0],[x1,y0,z0]],[[x0,y0,z0],[x0,y1,z0],[x1,y1,z0]]);

        tris.push([[x0,y0,z0],[x1,y0,z0],[x1,y0,z1]],[[x0,y0,z0],[x1,y0,z1],[x0,y0,z1]]);

        tris.push([[x1,y0,z0],[x1,y1,z0],[x1,y1,z1]],[[x1,y0,z0],[x1,y1,z1],[x1,y0,z1]]);

        tris.push([[x1,y1,z0],[x0,y1,z0],[x0,y1,z1]],[[x1,y1,z0],[x0,y1,z1],[x1,y1,z1]]);

        tris.push([[x0,y1,z0],[x0,y0,z0],[x0,y0,z1]],[[x0,y1,z0],[x0,y0,z1],[x0,y1,z1]]);

      }

    }

  }

  return tris;

}



function trisToMeshXML(tris){

  let verts=[], vmap=new Map(), vid=0, facets=[];

  for(const tri of tris){

    const vids=[];

    for(const v of tri){

      const key=v.join(',');

      if(!vmap.has(key)){vmap.set(key,vid++);verts.push(v);}

      vids.push(vmap.get(key));

    }

    facets.push(vids);

  }

  let xml=`<mesh>`;

  xml+="<vertices>"+verts.map(v=>`<vertex x="${v[0].toFixed(3)}" y="${v[1].toFixed(3)}" z="${v[2].toFixed(3)}"/>`).join("")+"</vertices>";

  xml+="<triangles>"+facets.map(f=>`<triangle v1="${f[0]}" v2="${f[1]}" v3="${f[2]}"/>`).join("")+"</triangles>";

  xml+="</mesh>";

  return xml;

}



async function generate3MF(canvas){

  const targetSize=75, qrH=0.35, baseH=2, margin=4, radius=6, segs=16;

  const W=targetSize+2*margin, H=targetSize+2*margin;

  const trisBase=makeBasePlate(W,H,radius,segs,baseH);

  const trisQR=makeQR(canvas,targetSize,baseH,qrH,margin);

  const allTris=[...trisBase,...trisQR];

  let model=`<?xml version="1.0" encoding="UTF-8"?>`;

  model+=`<model unit="millimeter" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">`;

  model+=`<resources><object id="1" type="model">`+trisToMeshXML(allTris)+`</object></resources>`;

  model+=`<build><item objectid="1"/></build></model>`;

  const zip=new JSZip();

  zip.file("[Content_Types].xml",'<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>');

  zip.folder("_rels").file(".rels",'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>');

  zip.folder("3D").file("3dmodel.model",model);

  const blob=await zip.generateAsync({type:"blob"});

  return blob;

}

