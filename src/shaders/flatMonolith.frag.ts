// FlatMonolithShader — fragment stage.
// Stepped flat shading: lighting is quantized into razor-sharp tonal bands
// with step(), fwidth() gives crisp 1px geometric edge detection.
// ZERO smooth gradients — solid flat fills only.
export const FLAT_MONOLITH_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uEdge;
  uniform vec3 uLight;
  varying vec3 vNormal;
  varying vec3 vPos;
  float bayer(vec2 p) {
    int x = int(mod(p.x, 4.0));
    int y = int(mod(p.y, 4.0));
    int idx = y * 4 + x;
    float m[16];
    m[0]=0.0; m[1]=8.0; m[2]=2.0; m[3]=10.0;
    m[4]=12.0; m[5]=4.0; m[6]=14.0; m[7]=6.0;
    m[8]=3.0; m[9]=11.0; m[10]=1.0; m[11]=9.0;
    m[12]=15.0; m[13]=7.0; m[14]=13.0; m[15]=5.0;
    return m[idx] / 16.0;
  }
  void main() {
    float d = max(dot(normalize(vNormal), normalize(uLight)), 0.0);
    // 2-tone flat architectural shadow: #060709 / #0D1015 bands via step().
    float stepped = step(0.5, d) * 0.55 + 0.45;
    float edge = step(0.92, fwidth(vNormal.x + vNormal.y + vNormal.z) * 40.0);
    float dither = bayer(gl_FragCoord.xy * 0.5) * 0.08;
    vec3 col = uColor * (stepped + dither - 0.04);
    col = mix(col, uEdge, edge * 0.85);
    gl_FragColor = vec4(col, 1.0);
  }
`;
