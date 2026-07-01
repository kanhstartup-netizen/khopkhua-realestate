// ດຶງຂໍ້ຄວາມຈາກໄຟລ໌ PDF / DOCX ໂດຍກົງໃນ browser (ບໍ່ຕ້ອງມີ server)
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const MAX_CHARS = 60000; // ຈຳກັດຄວາມຍາວ ເພື່ອບໍ່ໃຫ້ເກີນ context ຂອງ API

function truncate(text) {
  if (text.length <= MAX_CHARS) return text;
  return (
    text.slice(0, MAX_CHARS) +
    "\n\n[...ຂໍ້ຄວາມຖືກຕັດ ເພາະເອກະສານຍາວເກີນໄປ...]"
  );
}

async function extractPdfText(file) {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((it) => it.str).join(" ");
    text += `\n\n--- ໜ້າ ${i} ---\n${pageText}`;
  }
  return { text: truncate(text.trim()), pages: pdf.numPages };
}

async function extractDocxText(file) {
  const buf = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buf });
  return { text: truncate(result.value.trim()), pages: null };
}

/**
 * @param {File} file
 * @returns {Promise<{text:string, pages:number|null, name:string, type:string}>}
 */
export async function extractDocument(file) {
  const name = file.name || "ເອກະສານ";
  const isPdf =
    file.type === "application/pdf" || name.toLowerCase().endsWith(".pdf");
  const isDocx =
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.toLowerCase().endsWith(".docx");

  if (isPdf) {
    const { text, pages } = await extractPdfText(file);
    return { text, pages, name, type: "pdf" };
  }
  if (isDocx) {
    const { text, pages } = await extractDocxText(file);
    return { text, pages, name, type: "docx" };
  }
  if (name.toLowerCase().endsWith(".doc")) {
    const err = new Error("UNSUPPORTED_DOC");
    err.code = "UNSUPPORTED_DOC";
    throw err;
  }
  // ລອງອ່ານເປັນ plain text (.txt)
  if (file.type.startsWith("text/") || name.toLowerCase().endsWith(".txt")) {
    const text = await file.text();
    return { text: truncate(text.trim()), pages: null, name, type: "txt" };
  }
  const err = new Error("UNSUPPORTED_TYPE");
  err.code = "UNSUPPORTED_TYPE";
  throw err;
}
