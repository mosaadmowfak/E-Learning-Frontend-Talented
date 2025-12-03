import homeImage from "../assets/hero_bg_01.png";

export default function Home() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      {/* Hero Image */}
      <img
        src={homeImage}
        alt="hero"
        style={{
          width: "260px",
          maxWidth: "80%",
          marginBottom: 20,
          borderRadius: "14px",
          animation: "fadeIn 0.8s ease-in-out",
        }}
      />

      {/* Title */}
      <h1
        style={{
          color: "var(--cyan)",
          fontSize: "38px",
          maxWidth: "900px",
        }}
      >
        TALENTED E-Learning Academy
      </h1>

      {/* Subtitle */}
      <p
        style={{
          marginTop: 10,
          opacity: 0.85,
          fontSize: 18,
        }}
      >
        Learn • Grow • Succeed
      </p>

      <button
        style={{
          marginTop: 30,
          padding: "12px 30px",
          fontSize: 18,
          background: "var(--primary)",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/courses")}
      >
        Browse Courses
      </button>
    </section>
  );
}
