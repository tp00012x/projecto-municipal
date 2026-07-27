import { and, count, eq, ne } from "drizzle-orm";
import { getDb } from "../../../db";
import { comments } from "../../../db/schema";

const blockedTerms = [
  "idiota",
  "imbécil",
  "estúpido",
  "terrorista",
  "racista",
  "nazi",
];

function normalize(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function validationError(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export async function GET() {
  try {
    const db = getDb();
    const rows = await db
      .select({
        proposalNumber: comments.proposalNumber,
        total: count(comments.id),
      })
      .from(comments)
      .where(ne(comments.status, "rejected"))
      .groupBy(comments.proposalNumber);

    const counts = Object.fromEntries(
      rows.map((row) => [String(row.proposalNumber), row.total]),
    );
    return Response.json({ counts });
  } catch {
    return Response.json({ counts: {} });
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      proposalNumber?: unknown;
      name?: unknown;
      email?: unknown;
      comment?: unknown;
      acceptedTerms?: unknown;
    };

    const proposalNumber = Number(payload.proposalNumber);
    const name = normalize(payload.name);
    const email = normalize(payload.email).toLowerCase();
    const comment = normalize(payload.comment);

    if (!Number.isInteger(proposalNumber) || proposalNumber < 1 || proposalNumber > 23) {
      return validationError("Selecciona una propuesta válida.");
    }
    if (name.length < 2 || name.length > 50) {
      return validationError("El nombre o alias debe tener entre 2 y 50 caracteres.");
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return validationError("Ingresa un correo válido o deja el campo vacío.");
    }
    if (comment.length < 20 || comment.length > 800) {
      return validationError("El comentario debe tener entre 20 y 800 caracteres.");
    }
    if (payload.acceptedTerms !== true) {
      return validationError("Debes aceptar el aviso de participación y privacidad.");
    }

    const lowered = `${name} ${comment}`.toLocaleLowerCase("es");
    const urlCount = (comment.match(/https?:\/\/|www\./gi) ?? []).length;
    const repeatedCharacters = /(.)\1{8,}/.test(comment);
    if (
      blockedTerms.some((term) => lowered.includes(term)) ||
      urlCount > 1 ||
      repeatedCharacters
    ) {
      return Response.json(
        {
          error:
            "Revisa tu mensaje: no aceptamos insultos, contenido discriminatorio ni publicidad.",
        },
        { status: 422 },
      );
    }

    const db = getDb();
    await db.insert(comments).values({
      proposalNumber,
      name,
      email,
      comment,
      acceptedTerms: true,
      status: "pending",
    });

    const [result] = await db
      .select({ total: count(comments.id) })
      .from(comments)
      .where(
        and(
          eq(comments.proposalNumber, proposalNumber),
          ne(comments.status, "rejected"),
        ),
      );

    return Response.json(
      {
        count: result?.total ?? 1,
        message: "¡Gracias! Tu sugerencia fue recibida y pasará por moderación.",
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      {
        error:
          "El módulo de participación está iniciándose. Inténtalo nuevamente en unos instantes.",
      },
      { status: 503 },
    );
  }
}
