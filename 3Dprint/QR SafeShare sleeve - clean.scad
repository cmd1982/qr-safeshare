//
// QR SafeShare - Clean Lockable QR Sleeve (83x83x2.35mm)
// 7.0 mm lock hole + 14 mm top margin for extra strength
//
// HOW TO USE (OpenSCAD):
// 1) Open in OpenSCAD.
// 2) Render (F6).
// 3) Export STL (F7).
//

// ---------------- Parameters ----------------
qr_size        = 84;     // QR tile width/height (mm)
qr_thickness   = 2.9;   // QR tile thickness (mm)
wall           = 2.0;    // wall thickness (mm)
clearance      = 0.5;    // clearance (mm)
floor_thick    = 2.0;    // bottom thickness (mm)
height_margin  = 14.0;   // free space above QR (mm) for lock zone
lock_hole_d    = 7.0;    // diameter of lock hole (mm)
// --------------------------------------------

// Derived dimensions
inner_w = qr_size + clearance;
inner_d = qr_thickness + clearance;
outer_w = inner_w + 2*wall;
outer_d = inner_d + 2*wall;
qr_top  = floor_thick + qr_size;
outer_h = qr_top + height_margin;

// Sleeve body (open-top box with centered lock hole through front/back walls)
difference(){
    // Outer shell
    cube([outer_w, outer_d, outer_h], center=false);
    // Inner cavity
    translate([wall, wall, floor_thick])
        cube([inner_w, inner_d, qr_size + height_margin + 0.2], center=false);
    // Lock hole (centered in the margin above the QR)
    translate([outer_w/2, outer_d/2, outer_h - height_margin/2])
        rotate([90,0,0])
            cylinder(d=lock_hole_d, h=outer_d, center=true, $fn=96);
}
