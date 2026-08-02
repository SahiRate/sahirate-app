export default function HeroBackground() {
  return (
    <>
      {/* Main Glow */}
      <div className="absolute -top-60 -right-60 h-[700px] w-[700px] rounded-full bg-[#FF6B00]/15 blur-[140px]" />

      {/* Bottom Left Glow */}
      <div className="absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial Light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,107,0,.08), transparent 40%)",
        }}
      />
    </>
  );
}