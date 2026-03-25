"use client";

interface CertificateData {
  studentName: string;
  badgeName: string;
  badgeEmoji: string;
  worldTitle: string;
  worldNumber: number;
  date: string;
}

export function generateCertificate(data: CertificateData): void {
  const canvas = document.createElement("canvas");
  const W = 1200;
  const H = 850;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, W, H);

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "rgba(20, 184, 166, 0.08)");
  grad.addColorStop(1, "rgba(6, 182, 212, 0.05)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Border
  ctx.strokeStyle = "rgba(20, 184, 166, 0.4)";
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  // Inner border
  ctx.strokeStyle = "rgba(20, 184, 166, 0.15)";
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  // Corner accents
  const cornerSize = 20;
  ctx.strokeStyle = "#14b8a6";
  ctx.lineWidth = 3;
  const corners = [
    [30, 30, cornerSize, 0, 0, cornerSize],
    [W - 30, 30, -cornerSize, 0, 0, cornerSize],
    [30, H - 30, cornerSize, 0, 0, -cornerSize],
    [W - 30, H - 30, -cornerSize, 0, 0, -cornerSize],
  ];
  corners.forEach(([x, y, dx1, dy1, dx2, dy2]) => {
    ctx.beginPath();
    ctx.moveTo(x + dx1, y + dy1);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dx2, y + dy2);
    ctx.stroke();
  });

  // "CERTIFICATE OF ACHIEVEMENT" header
  ctx.fillStyle = "rgba(20, 184, 166, 0.6)";
  ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("CERTIFICATE OF ACHIEVEMENT", W / 2, 100);
  ctx.letterSpacing = "0px";

  // Badge emoji (large)
  ctx.font = "80px serif";
  ctx.fillText(data.badgeEmoji, W / 2, 200);

  // Badge name
  ctx.fillStyle = "#14b8a6";
  ctx.font = "bold 42px system-ui, -apple-system, sans-serif";
  ctx.fillText(data.badgeName, W / 2, 270);

  // "Awarded to"
  ctx.fillStyle = "#94a3b8";
  ctx.font = "18px system-ui, -apple-system, sans-serif";
  ctx.fillText("Awarded to", W / 2, 330);

  // Student name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px system-ui, -apple-system, sans-serif";
  ctx.fillText(data.studentName, W / 2, 385);

  // Decorative line
  ctx.strokeStyle = "rgba(20, 184, 166, 0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 150, 410);
  ctx.lineTo(W / 2 + 150, 410);
  ctx.stroke();

  // Description
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "20px system-ui, -apple-system, sans-serif";
  ctx.fillText(
    `For successfully completing World ${data.worldNumber}: ${data.worldTitle}`,
    W / 2,
    460
  );
  ctx.fillText("and demonstrating understanding of AI concepts", W / 2, 490);

  // Date
  ctx.fillStyle = "#64748b";
  ctx.font = "16px system-ui, -apple-system, sans-serif";
  ctx.fillText(data.date, W / 2, 550);

  // Footer line
  ctx.strokeStyle = "rgba(20, 184, 166, 0.2)";
  ctx.beginPath();
  ctx.moveTo(100, 620);
  ctx.lineTo(W - 100, 620);
  ctx.stroke();

  // Teach AI Early branding
  ctx.fillStyle = "#14b8a6";
  ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
  ctx.fillText("Teach AI Early", W / 2, 670);

  ctx.fillStyle = "#475569";
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillText("AI Literacy for Kids — teachaiearly.com", W / 2, 700);

  // Stars decoration
  ctx.fillStyle = "rgba(20, 184, 166, 0.15)";
  ctx.font = "24px serif";
  const starPositions = [
    [80, 80], [W - 80, 80], [80, H - 80], [W - 80, H - 80],
    [200, 130], [W - 200, 130], [150, H - 130], [W - 150, H - 130],
  ];
  starPositions.forEach(([x, y]) => {
    ctx.fillText("✦", x, y);
  });

  // Download
  const link = document.createElement("a");
  link.download = `TeachAIEarly-${data.badgeName.replace(/\s+/g, "-")}-Certificate.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
