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

  // Background — white
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // Subtle gradient overlay
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "rgba(91, 184, 245, 0.06)");
  grad.addColorStop(1, "rgba(52, 211, 153, 0.04)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Border — sky blue
  ctx.strokeStyle = "rgba(91, 184, 245, 0.4)";
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  // Inner border
  ctx.strokeStyle = "rgba(91, 184, 245, 0.15)";
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  // Corner accents
  const cornerSize = 20;
  ctx.strokeStyle = "#5BB8F5";
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
  ctx.fillStyle = "rgba(91, 184, 245, 0.7)";
  ctx.font = "bold 14px Fredoka, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("CERTIFICATE OF ACHIEVEMENT", W / 2, 100);
  ctx.letterSpacing = "0px";

  // Badge emoji (large)
  ctx.font = "80px serif";
  ctx.fillText(data.badgeEmoji, W / 2, 200);

  // Badge name
  ctx.fillStyle = "#5BB8F5";
  ctx.font = "bold 42px Fredoka, system-ui, sans-serif";
  ctx.fillText(data.badgeName, W / 2, 270);

  // "Awarded to"
  ctx.fillStyle = "#94a3b8";
  ctx.font = "18px Nunito, system-ui, sans-serif";
  ctx.fillText("Awarded to", W / 2, 330);

  // Student name
  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 48px Fredoka, system-ui, sans-serif";
  ctx.fillText(data.studentName, W / 2, 385);

  // Decorative line
  ctx.strokeStyle = "rgba(52, 211, 153, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 150, 410);
  ctx.lineTo(W / 2 + 150, 410);
  ctx.stroke();

  // Description
  ctx.fillStyle = "#475569";
  ctx.font = "20px Nunito, system-ui, sans-serif";
  ctx.fillText(
    `For successfully completing World ${data.worldNumber}: ${data.worldTitle}`,
    W / 2,
    460
  );
  ctx.fillText("and demonstrating understanding of AI concepts", W / 2, 490);

  // Date
  ctx.fillStyle = "#94a3b8";
  ctx.font = "16px Nunito, system-ui, sans-serif";
  ctx.fillText(data.date, W / 2, 550);

  // Footer line
  ctx.strokeStyle = "rgba(91, 184, 245, 0.2)";
  ctx.beginPath();
  ctx.moveTo(100, 620);
  ctx.lineTo(W - 100, 620);
  ctx.stroke();

  // Teach AI Early branding
  ctx.fillStyle = "#34D399";
  ctx.font = "bold 22px Fredoka, system-ui, sans-serif";
  ctx.fillText("Teach AI Early", W / 2, 670);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "14px Nunito, system-ui, sans-serif";
  ctx.fillText("AI Literacy for Kids — teachaiearly.com", W / 2, 700);

  // Stars decoration — warm yellow
  ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
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
